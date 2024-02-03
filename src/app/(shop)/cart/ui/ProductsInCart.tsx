'use client'
import { QuantitySelector } from '@/components'
import { useCartStore } from '@/store'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';


export const ProductsInCart = () => {
    const [loaded, setLoaded] = useState(false)
    
    const productsInCart = useCartStore(state => state.cart)
    const updateProduct = useCartStore(state=>state.updateProductCart)
    useEffect(() => {
      setLoaded(true)
    }, [])
    
    if(!loaded){
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
                            <Link href={`/product/${product.slug}`} className='hover:underline cursor-pointer'>   
                            <p>{product.title}</p>
                            </Link>
                         
                            <p>{product.price}</p>
                            <QuantitySelector quatity={product.quantity} QuantityChanged={quantity=>updateProduct(product,quantity)} ></QuantitySelector>
                            <button className='underline mt-3'>
                                Remover
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
