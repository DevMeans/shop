'use server'
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export const deleteById = async (id: string) => {
  try {
    const deletecolor = await prisma.colorProduct.delete({ where: { id } });
    revalidatePath(`/admin/colors`);
    return deletecolor;
  } catch (error) {
    console.log(error);
  }
};
