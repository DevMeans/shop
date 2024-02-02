'use server'
import prisma from '@/lib/prisma';
import { sleep } from '@/util';

export const getStockBySlug = async (slug: string): Promise<number> => {
    try {
        await sleep(1.5)
        const stock = await prisma.product.findFirst({
            where: {
                slug: slug
            },
            select: { inStock: true }
        })
        console.log(stock)
        return stock?.inStock ?? 0
    } catch (error) {
        return 0
    }
}