'use client'

import { useAddressStore, useCartStore } from "@/store"
import { currencyFormat, sleep } from "@/util"
import clsx from "clsx"
import { useEffect, useState } from "react"

export const PlaceOrder = () => {

    const [Loaded, setLoaded] = useState(false)
    const [isPlacingOrder, setPlacingOrder] = useState(false)
    const address = useAddressStore(state => state.address)
    const { itemsInCart, subTotaly, tax, total } = useCartStore(state => state.getSumaryInformation())
    const cart = useCartStore(state => state.cart)
    useEffect(() => {
        setLoaded(true)

    }, [])
    const onPlaceOrder = async () => {
        setPlacingOrder(true);
        const productToOrder = cart.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size
        }))
        console.log(productToOrder)
        console.log(address)
        setPlacingOrder(false)
    }
    if (!Loaded) {
        return <p>Cargando</p>
    }
    return (
        <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
                <p className="text-xl">{
                    address.firtName
                } {address.lastName}</p>
                <p>{address.address}</p>
                <p>{address.address2}</p>
                <p>{address.postalCode}</p>
                <p>{address.city} , {address.country}</p>
                <p>{address.phone}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />


            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">

                <span>nr.Productos</span>
                <span className='text-right'>{itemsInCart === 1 ? '1 articulo' : `${itemsInCart} articulos`}</span>

                <span>Subtotal</span>
                <span className='text-right'>{currencyFormat(subTotaly)}</span>

                <span>Impuestos</span>
                <span className='text-right'>{currencyFormat(tax)}</span>

                <span className='mt-5 text-2xl'>Total :</span>
                <span className='mt-5 text-2xl text-right'>{currencyFormat(total)}</span>
            </div>

            <div className="mt-5 mb-2 w-full">

                <p className="mb-5">
                    {/* Disclaimer */}
                    <span className="text-xs">
                        Al hacer clic en &quot; Colocar orden &quot; , aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a>
                    </span>
                </p>

                <p className="text-red-500">
                    Error de creacion
                </p>
                <button onClick={onPlaceOrder}
                    className={
                        clsx({
                            'btn-primary': !isPlacingOrder,
                            'btn-disable': isPlacingOrder
                        })
                    }
          /*  href="/orders/123"*/>
                    Colocar orden
                </button>
            </div>


        </div>
    )
}