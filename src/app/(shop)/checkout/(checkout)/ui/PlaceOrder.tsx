'use client'

import { placeOrder } from "@/actions/order/place-order"
import { useAddressStore, useCartStore } from "@/store"
import { currencyFormat, sleep } from "@/util"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const PlaceOrder = () => {

    const router = useRouter();

    const [Loaded, setLoaded] = useState(false)
    const [isPlacingOrder, setPlacingOrder] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const address = useAddressStore(state => state.address)
    const cart = useCartStore(state => state.cart)
    const clearCart = useCartStore(state => state.clearCart)
    useEffect(() => {
        setLoaded(true)

    }, [])

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
        </div>
    )
}