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

        const order = await tx.order.create({
            data: {
                userId: userId,
                itemsInOrder: itemInOrder,
                subTotal: subTotal,
                tax: tax,
                total: total,

                OrderItem: {
                    createMany: {
                        data:
                            productsIds.map(p => ({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price: products?.find(product => product.id === p.productId)?.price ?? 0 //TODO: HACER UNA ECEPCION CUANDO UN PRODUCTO VIENE CON PRECIO 0 QUE NO DEBERIA VENIR
                            }))

                    }
                }
            }
        })
        const { firtName, ...restAddress } = address
        const orderAddress = await tx.orderAddress.create({
            data: {
                ...restAddress,
                firstName: firtName,
                countryId: restAddress.country,
                orderId: order.id
            }
        })
        return {
            order: order,
            updatedProducts: [],
            orderAddress: orderAddress
        }
    })

}