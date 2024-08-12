"use server";
import { auth } from "@/auth.config";
import { Size } from "@/interfaces";
import { Address } from "@/interfaces/address.interface";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
  console.log(products);
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let totalPrice = 0;
      let totalItems = 0;

      const orderItems = productToOrderId.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        const price = product?.price ?? 0;
        const itemTotalPrice = price * item.cantidad;

        totalPrice += itemTotalPrice;
        totalItems += item.cantidad;

        return {
          productId: item.productId,
          quantity: item.cantidad,
          size: item.size,
          colorId: item.colorId,
          price: price,
        };
      });

      // Crear la orden
      const order = await tx.order.create({
        data: {
          userId,
          total: totalPrice,
          itemsInOrder: totalItems,
          OrderItem: {
            create: orderItems,
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
    revalidatePath(`orders`)
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
