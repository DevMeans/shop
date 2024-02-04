'use client'
import { useCartStore } from '@/store'
import React, { useEffect, useState } from 'react'



export const OrderSumary = () => {
    const [loaded, setLoaded] = useState(false)
    const { itemsInCart, subTotaly, tax, total } = useCartStore(state => state.getSumaryInformation())
    useEffect(() => {
        setLoaded(true)


    }, [])
    if (!loaded) {
        return <p>Loading</p>
    }

    return (
        <div className='grid grid-cols-2'>
            <span>nr.Productos</span>
            <span className='text-right'>{itemsInCart === 1 ? '1 articulo' : `${itemsInCart} articulos`}</span>

            <span>Subtotal</span>
            <span className='text-right'>$ {subTotaly}</span>

            <span>Impuestos</span>
            <span className='text-right'>$ {tax}</span>

            <span className='mt-5 text-2xl'>Total :</span>
            <span className='mt-5 text-2xl text-right'>$ {total}</span>
        </div>
    )
}
