'use server'

import { auth } from "@/auth.config";
import type { Size } from "@/interfaces";
import type { Address } from "@/interfaces/address.interface";


interface producToOrder {
    productId: string
    quantity: number
    size: Size;
}
export const placeOrder = async (productsIds: producToOrder[], address: Address) => {

    const session = await auth()
    const userId = session?.user.id
    if (!userId) {
        return {
            ok: false,
            message: 'no existe session de usuario'
        }
    }
    //console.log({ productsIds, address, userId })
    const products = await prisma?.product.findMany({
        where: {
            id: {
                in: productsIds.map(p => p.productId)
            }
        }
    })
    const itemInOrder = productsIds.reduce((count, p) => count + p.quantity, 0);
    const { subTotal, tax, total } = productsIds.reduce((totals, item) => {

        const producQuantity = item.quantity
        const product = products?.find(product => product.id === item.productId)

        if (!product) throw new Error(`${item.productId} no existe - 500`)
        const subTotal = product.price * producQuantity;
        totals.subTotal += subTotal
        totals.tax += subTotal + 0.15
        totals.total += subTotal * 1.15;
        return totals
    }, { subTotal: 0, tax: 0, total: 0 })

    //console.log({ subTotal, tax, total })
    const prismaTx = await prisma?.$transaction(async (tx) => {
        throw new Error('No se pudo grabar algo')
        return {
            order:123,
            updatedProducts:[],
            orderAddress:{}
        }
    })

}