"use server";
import { Gender, Product, Size } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");
const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});
export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);
  if (!productParsed.success) {
    console.log(productParsed.error);
    return {
      ok: false,
    };
  }
  console.log(productParsed.data);
  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();
  const { id, ...rest } = product;
  try {
    const prismaTx = await prisma?.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());
      if (id) {
        product = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });

        console.log("Update product");
      } else {
        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }
      //!!Recorrer las imagenes
      if (formData.getAll("images")) {
        const images = await uploadImagenes(
          formData.getAll("images") as File[]
        );
        if (!images) {
          throw new Error("No se puedo cargar las imagenes");
        }
        await prisma.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            productId: product.id,
          })),
        });
      }
      return {
        product,
      };
    });
    revalidatePath(`/admin/products`);
    revalidatePath(`/admin/products/${product.slug}`);
    revalidatePath(`/products/${product.slug}`); //TODO: NO SE SI SERA NECESARIO
    revalidatePath(`/product/gender/${product.gender}`);
    revalidatePath(`/product/${id}`);
    //TODO: REVALIDACIONES DEL PATH
    return {
      ok: true,
      product: prismaTx.product,
    };
  } catch (error) {
    return {
      ok: false,
      message: `Revisar los logs, no se puedo actualizar/crear`,
    };
  }
};
const uploadImagenes = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");
        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });
    const uploadImages = await Promise.all(uploadPromises);
    return uploadImages;
  } catch (error) {
    console.error(error);
    return null;
  }
};
