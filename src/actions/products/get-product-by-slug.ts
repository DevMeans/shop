import { productfindmanyinterface } from "@/interfaces";
import prisma from '@/lib/prisma';


export const getproductbyslug = async (slug: string) => {
    try {
        const product: productfindmanyinterface = await prisma.product.findFirst({
            include: {
                ProductImage: {
                    select: {
                        url: true
                    }
                }
            }, where: {
                slug: slug
            }
        })
        if (!product) return null;
        return {
            ...product,
            images: product.ProductImage.map((image) => image.url)
        }
    } catch (error) {
        console.log(error)
        throw new Error('Error al obtener producto por slug')
    }
}

