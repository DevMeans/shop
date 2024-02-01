'use server';

import { productfindmanyinterface } from '@/interfaces';
import prisma from '@/lib/prisma';

interface PaginationOptions {
    page?: number,
    take?: number
}

export const getPaginatedProductsWithImages = async ({ page = 1, take = 12 }: PaginationOptions) => {

    if (isNaN(Number(page))) page = 1
    if (page < 1) page = 1
    try {
        const products: productfindmanyinterface[] = await prisma.product.findMany({
            skip: (page - 1) * 12,
            take: take,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true
                    }
                }
            }
        });

        //  
        const totalCount = await prisma.product.count({})
        const totalPages = Math.ceil(totalCount / take)
        return {
            curretPage: page,
            totalPages: totalPages,
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