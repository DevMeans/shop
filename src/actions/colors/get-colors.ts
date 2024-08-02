import prisma from "@/lib/prisma";
export const getColor = async (id: string) => {
  try {
    const colordb = await prisma.colorProduct.findFirst({ where: { id } });
    console.log(colordb);
    return colordb;
  } catch (error) {
    console.log(error);
  }
};
export const getColors = async () => {
  try {
    const colordb = await prisma.colorProduct.findMany();
    console.log(colordb);
    return colordb;
  } catch (error) {
    console.log(error);
  }
};
