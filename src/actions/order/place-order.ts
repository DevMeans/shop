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

    try {
        const prismaTx = await prisma?.$transaction(async (tx) => {

            if (!products) {
                throw new Error("Products array is undefined");
            }

            const updateProductPromises = products.map((product) => {
                const productQuantity = productsIds.filter(
                    p => p.productId === product.id
                ).reduce((acc, item) => item.quantity + acc, 0)
                if (productQuantity === 0) {
                    throw new Error(`${product.id} no tiene cantidad definida`)
                }
                return tx.product.update({
                    where: { id: product.id },
                    data: {
                        //  inStock: product.inStock - productQuantity estarias tomando un valor viejo
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                })
            })
            const updateProducts = await Promise.all(updateProductPromises)
            updateProducts.forEach(product => {
                if (product.inStock < 0) {
                    throw new Error(`${product.title} no tiene inventario suficiente`)
                }
            })
            //crear order
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
            //crear ordenadress
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
                updatedProducts: updateProducts,
                orderAddress: orderAddress
            }
        })
        return {
            ok:true,
            order:prismaTx?.order,
            prismaTx :prismaTx
        }
    } catch (error: any) {
        return {
            ok: false,
            message: error?.message
        }
    }



}