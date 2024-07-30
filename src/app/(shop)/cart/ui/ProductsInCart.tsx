'use client'
import { ProductImage, QuantitySelector } from '@/components'
import { useCartStore } from '@/store'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';


export const ProductsInCart = () => {
    const [loaded, setLoaded] = useState(false)

    const productsInCart = useCartStore(state => state.cart)
    const updateProduct = useCartStore(state => state.updateProductCart)
    const removeProduct = useCartStore(state => state.removeProduct)
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
                        <ProductImage
                            src={product.image}
                            width={100}
                            height={100}
                            alt={product.title}
                            className='mr-5 rounded'
                        />
                        <div>
                            <Link href={`/product/${product.slug}`} className='hover:underline cursor-pointer'>
                                <p>{product.title}</p>
                            </Link>

                            <p>{product.price}</p>
                            <QuantitySelector quatity={product.quantity} QuantityChanged={quantity => updateProduct(product, quantity)} ></QuantitySelector>
                            <button className='underline mt-3' onClick={() => removeProduct(product)}>
                                Remover
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
