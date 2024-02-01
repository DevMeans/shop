'use server';

import { productfindmanyinterface } from '@/interfaces';
import prisma from '@/lib/prisma';

export const getPaginatedProductsWithImages = async () => {
    try {
        const products: productfindmanyinterface[] = await prisma.product.findMany({
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true
                    }
                }
            }
        });
  
        return {
            products: products.map((product) => ({
                ...product,
                images: product.ProductImage.map((image) => image.url)  // Corregido aquí
            }))
        };
    } catch (error) {
        // Manejar el error aquí
        throw new Error('No se pudo cargar los productos')
    }
};