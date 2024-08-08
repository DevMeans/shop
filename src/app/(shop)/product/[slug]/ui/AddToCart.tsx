'use client'
import { QuantitySelector, SizeSelector } from "@/components"
import { CartProduct, Product, Size } from "@/interfaces"
import { useCartStore } from "@/store"
import { useState } from "react"
import { ColorSelectorProducts } from '../../../../../components/product/color-selector/ColorSelectorProduct';

interface Props {
    product: Product
}

export const AddToCart = ({ product }: Props) => {
    console.log(product)
    const addProductToCart = useCartStore(state => state.addProductCart)
    const [size, setSize] = useState<Size | undefined>()
    const [color, setcolor] = useState()
    const [quantity, setQuantity] = useState<number>(1)
    const [posted, setPosted] = useState(false)
    const addToCart = () => {
        setPosted(true)
        if (!size) return;
        // console.log(size,quantity,product)
        //TODO: ADD TO CART
        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            image: product.images[0],
            detalles: {
                talla: size,
                cantidad: quantity,
                color: color
            }
            //TODO: ordenar bien esto 
        }
        console.info('CartProduct', cartProduct)
        addProductToCart(cartProduct)
        setPosted(false)
        setQuantity(1)
        setSize(undefined)
        setcolor(undefined)
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
            {
                posted && !color && (
                    <p className="mt-2 text-red-500 fade-in">
                        debe seleccionar un color *
                    </p>
                )
            }
            <ColorSelectorProducts availableColors={product.ColorForProduct} onColorChange={(color) => setcolor(color)} selectorColor={color}></ColorSelectorProducts>
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
