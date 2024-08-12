'use client'
import { ProductImage, QuantitySelector } from '@/components'
import { useAddressStore, useCartStore } from '@/store'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { postPlaceOrder } from '@/actions/order/post-place-order';
import { Size } from '@/interfaces';
import { useRouter } from 'next/navigation';


export const ProductsInCart = () => {
    const router = useRouter();
    const [loaded, setLoaded] = useState(false)

    const productsInCart = useCartStore(state => state.cart)
    console.log(productsInCart)
    const updateProduct = useCartStore(state => state.updateProductCart)
    const removeProduct = useCartStore(state => state.removeProduct)
    const address = useAddressStore(state => state.address)
    const clearCart = useCartStore(state => state.clearCart);
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
    // Calculate total cost of all products
    const totalCartCost = results.reduce((acc: number, productCard: any) => {
        const totalItems = productCard.detalles.reduce((acc: number, detalle: any) => {
            return acc + detalle.items.reduce((accItems: number, item: any) => accItems + item.cantidad, 0);
        }, 0);
        return acc + (totalItems * productCard.price);
    }, 0);
    // console.log(results)

    const transformedArray = productsInCart.map(item => ({
        productId: item.id,
        cantidad: item.detalles.cantidad,
        size: item.size as Size,
        colorId: item.detalles.color.id
    }));
    const placeOrder = async () => {
        const resp = await postPlaceOrder(transformedArray, address)
        console.log(resp)

        if (!resp.ok) {
            return;
        }
        clearCart();
        router.replace('/orders/' + resp.order?.id);

    }

    console.log('objeto transformado', transformedArray);

    return (
        <>
            <div className='flex justify-evenly'>
                <div className='text-xl font-bold'>
                    TOTAL :s/ {totalCartCost}
                </div>
                <div>

                    <button className='bg-blue-500 p-2 rounded-md text-white' onClick={placeOrder}>Hacer pedido</button>
                </div>
            </div>
            {
                results.map((productCard) => {
                    const totalItems = productCard.detalles.reduce((acc: number, detalle: any) => {
                        return acc + detalle.items.reduce((accItems: number, item: any) => accItems + item.cantidad, 0);
                    }, 0);
                    return <div key={productCard.id} className='flex flex-col sm:flex-row bg-slate-300 m-4'>
                        <div className='ms:max-w-40 p-5 max-w-36'>
                            <h2>{productCard.title}</h2>
                            <ProductImage
                                src={productCard.image}
                                width={200}
                                height={200}
                                alt={productCard.title}
                                className='mr-5 rounded'
                            />
                        </div>
                        <div className='p-5 overflow-auto'>
                            {
                                productCard.detalles.map((detalle: any) => {
                                    console.log(detalle)
                                    return <div key={detalle.talla}>
                                        <div className='flex gap-3 mb-2 items-center'>
                                            <div className='font-extrabold text-base sm:text-xl w-9'>
                                                {detalle.talla}
                                            </div>
                                            <div className='flex'>
                                                {
                                                    detalle.items.map((item: any) => {
                                                        return (
                                                            <div key={item.color.id} className='flex items-center gap-3'>
                                                                <div className='size-7 sm:size-10 rounded-md' style={{ backgroundColor: `${item.color.hexa}` }}>
                                                                </div>
                                                                <div className='mr-3'>
                                                                    <input type="text" readOnly value={item.cantidad} className='bg-white size-7 sm:size-10 text-center rounded-md font-bold' style={{ color: `${item.color.hexa}` }} />
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
                        <div className='p-5 border-2 mb-5 sm:m-auto'>
                            <div>
                                Total : {totalItems}
                            </div>

                            <div>
                                Precio Producto: S/ {productCard.price}
                            </div>
                            <div>
                                Total : S/ {totalItems * productCard.price}
                            </div>
                        </div>
                    </div>
                })
            }
        </>
    )
}
