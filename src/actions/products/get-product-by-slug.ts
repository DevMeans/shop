import prisma from "@/lib/prisma";

export const getproductbyslug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: true,
        ColorForProduct: {
          include: {
            Color: true,
          },
        },
      },
      where: {
        slug: slug,
      },
    });
    if (!product) return null;
    return {
      ...product,
      images: product.ProductImage.map((image) => image.url),

    };
  } catch (error) {
    throw new Error("Error al obtener producto por slug");
  }
};
