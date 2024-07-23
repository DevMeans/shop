'use client'

import { useCartStore } from '@/store'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { currencyFormat } from '@/util'


export const ProductsInCart = () => {
    const [loaded, setLoaded] = useState(false)
    const productsInCart = useCartStore(state => state.cart)
    useEffect(() => {
        setLoaded(true)
    }, [])

    if (!loaded) {
        return <p>loding...</p>
    }
    return (
        <>
            {
                productsInCart.map(product => (
                    <div key={`${product.slug}-${product.size}`} className='flex mb-5'>
                        <Image
                            src={`/products/${product.image}`}
                            width={100}
                            height={100}
                            style={
                                {
                                    width: '100px',
                                    height: '100px'
                                }
                            }
                            alt={product.title}
                            className='mr-5 rounded'
                        />
                        <div>
                            <span className='hover:underline cursor-pointer'>
                                {product.size} - {product.title} ({product.quantity})
                            </span>
                            <p className='font-bold'> {currencyFormat(product.price * product.quantity)} </p>
                            <p>{product.price}</p>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
