'use client'
import { QuantitySelector, SizeSelector } from "@/components"
import { CartProduct, Product, Size } from "@/interfaces"
import { useCartStore } from "@/store"
import { useState } from "react"

interface Props {
    product: Product
}

export const AddToCart = ({ product }: Props) => {

    const addProductToCart =useCartStore(state =>state.addProductCart)
    const [size, setSize] = useState<Size | undefined>()
    const [quantity, setQuantity] = useState<number>(1)
    const [posted, setPosted] = useState(false)
    const addToCart = () => {
        setPosted(true)
        if (!size) return;
        console.log(size,quantity,product)
        //TODO: ADD TO CART
        const cartProduct:CartProduct={
            id:product.id,
            slug:product.slug,
            title:product.title,
            price:product.price,
            quantity:quantity,
            size:size,
            image:product.images[0] 
        }
        addProductToCart(cartProduct)

        
        setPosted(false)
        setQuantity(1)
        setSize(undefined)
    }

    return (
        <>

            {
                posted && !size && (
                    <p className="mt-2 text-red-500 fade-in">
                        debe seleccionar una talla *
                    </p>
                )
            }

            <SizeSelector onsizeChanged={setSize}
                selectorSize={size}
                availableSizes={product.sizes} />
            {/*Selector de cantidad*/}
            <QuantitySelector quatity={quantity}
                QuantityChanged={setQuantity}
            />
            <button
                onClick={addToCart}
                className="btn-primary my-5">
                Agregar al carrito
            </button>
        </>
    )
}
