"use server";
import { auth } from "@/auth.config";
import { Size } from "@/interfaces";
import { Address } from "@/interfaces/address.interface";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  cantidad: number;
  size: Size;
  colorId: string;
}

export const postPlaceOrder = async (
  productToOrderId: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return {
      ok: false,
      message: "no existe session de usuario",
    };
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productToOrderId.map((p) => p.productId),
      },
    },
  });
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // Primero, crea la orden
      const order = await tx.order.create({
        data: {
          userId,
          total: products.reduce((acc, product) => acc + product.price, 0),//TODO : ESTO ESTA MAL
          itemsInOrder: productToOrderId.length, //TODO: ESTO TAMBIEN :
          OrderItem: {
            create: productToOrderId.map((item) => ({
              productId: item.productId,
              quantity: item.cantidad,
              size: item.size,
              colorId: item.colorId,
              price: products.find((p) => p.id === item.productId)?.price ?? 0,
            })),
          },
        },
      });

      // Después, crea la dirección asociada a la orden
      await tx.orderAddress.create({
        data: {
          orderId: order.id,
          firstName: address.firtName,
          lastName: address.lastName,
          address: address.address,
          address2: address.address2 || null,
          postalCode: address.postalCode,
          city: address.city,
          phone: address.phone,
          country: address.country,
          countryId: address.country,
        },
      });

      return order;
    });
    console.log("transaccion hecha");
    return {
      ok: true,
      order: prismaTx,
    };
  } catch (error) {
    console.error("Error al guardar la orden:", error);
    return {
      ok: false,
      message: "Error al guardar la orden",
    };
  }
};
