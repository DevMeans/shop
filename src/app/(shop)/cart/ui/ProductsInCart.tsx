'use client'
import { ProductImage, QuantitySelector } from '@/components'
import { useCartStore } from '@/store'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';


export const ProductsInCart = () => {
    const [loaded, setLoaded] = useState(false)

    const productsInCart = useCartStore(state => state.cart)
    console.log(productsInCart)
    const updateProduct = useCartStore(state => state.updateProductCart)
    const removeProduct = useCartStore(state => state.removeProduct)
    useEffect(() => {
        setLoaded(true)
    }, [])

    if (!loaded) {
        return <p>loding...</p>
    }

    // Paso 1: Crear un objeto para agrupar los productos por 'id'
    const groupedById = productsInCart.reduce((acc: any, product) => {
        if (!acc[product.id]) {
            acc[product.id] = {
                id: product.id,
                slug: product.slug,
                title: product.title,
                price: product.price,
                image: product.image,
                detalles: []
            };
        }
        acc[product.id].detalles.push(product.detalles);
        return acc;
    }, {});

    // Paso 2: Agrupar los detalles por 'talla' para cada producto
    const results = Object.values(groupedById).map((product: any) => {
        const groupedDetalles = product.detalles.reduce((acc: any, detalle: any) => {
            const { talla } = detalle;
            if (!acc[talla]) {
                acc[talla] = [];
            }
            acc[talla].push(detalle);
            return acc;
        }, {});

        // Convertir a un arreglo de objetos con 'talla' y 'detalles'
        product.detalles = Object.entries(groupedDetalles).map(([talla, items]) => ({
            talla,
            items
        }));

        return product;
    });
    const handleQuantityChange = (ProductId: string, cantidad: number, size: string, colorid: string) => {
        updateProduct(ProductId, cantidad, size, colorid)
    }

    console.log(results)
    return (
        <>
            {
                results.map((productCard) => {
                    return <div key={productCard.id}>
                        <h2>{productCard.title}</h2>
                        <ProductImage
                            src={productCard.image}
                            width={100}
                            height={100}
                            alt={productCard.title}
                            className='mr-5 rounded'
                        />
                        <div>
                            {
                                productCard.detalles.map((detalle: any) => {
                                    console.log(detalle)
                                    return <div key={detalle.talla}>
                                        <div className='flex gap-3 mb-2 items-center'>
                                            <div className='font-extrabold text-xl'>
                                                {detalle.talla}
                                            </div>

                                            <div className='flex '>
                                                {
                                                    detalle.items.map((item: any) => {
                                                        return (
                                                            <div key={item.color.id} className='flex items-center gap-3'>
                                                                <div className='size-10 rounded-md' style={{ backgroundColor: `${item.color.hexa}` }}>

                                                                </div>
                                                                <div className='mr-3'>
                                                                    <input type="text" onChange={(e) => handleQuantityChange(productCard.id, parseInt(e.target.value), item.talla, item.color.id)} value={item.cantidad} className='bg-white size-10 text-center rounded-md font-bold' />
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                })
            }
        </>
    )
}
