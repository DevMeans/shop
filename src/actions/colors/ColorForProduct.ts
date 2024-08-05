"use server";
import { PrismaClient } from "@prisma/client";
import { getproductbyslug } from "../products/get-product-by-slug";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();
export const CreateColorForProduct = async (
  colorIds: string[],
  productId: string
) => {
  try {
    // Paso 1: Eliminar todas las relaciones existentes para el producto
    await prisma.colorForProduct.deleteMany({
      where: { productId },
    });

    // Paso 2: Insertar las nuevas relaciones
    const colorForProductPromises = colorIds.map((colorId) =>
      prisma.colorForProduct.create({
        data: {
          productId,
          colorId,
        },
      })
    );
    await Promise.all(colorForProductPromises);

    console.log("Relaciones ColorForProduct actualizadas exitosamente");
  } catch (error) {
    console.error("Error actualizando relaciones ColorForProduct:", error);
  }
};
export const GetColorForProducts = async (slug: string) => {
  const product = await getproductbyslug(slug);

  try {
    const colorForProduct = await prisma.colorForProduct.findMany({
      where: { productId: product?.id },
    });
    return colorForProduct;
  } catch (error) {
    console.log(error);
    return [];
  }
};
