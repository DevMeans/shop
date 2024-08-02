"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createUpdateColors = async (formdata: FormData, id: string) => {
  const data: Record<string, any> = {};
  formdata.forEach((value, key) => {
    data[key] = value;
  });
  try {
    if (id === "new") {
      const colordb = await prisma.colorProduct.create({
        data: {
          name: data.name,
          hexa: data.hexa,
          estado: parseInt(data.estado),
        },
      });
      revalidatePath(`/admin/colors/${colordb.id}`);
      return {
        ok: true,
        color: colordb,
      };
    } else {
      const updateColor = await prisma.colorProduct.update({
        where: { id },
        data: {
          name: data.name,
          hexa: data.hexa,
          estado: parseInt(data.estado),
        },
      });
      revalidatePath(`/admin/colors/${updateColor.id}`);
      return {
        ok: true,
        color: updateColor,
      };
    }

    //TODO: VER LA LISTA DE COLORES COMO HACERLO CON EL REVALIDATEPATH
  } catch (error) {
    console.error(error);
  }
};
