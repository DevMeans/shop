import { QuantitySelector, SizeSelector } from "@/components"
import { Product } from "@/interfaces"
interface Props{
    product:Product
}

export const AddToCart = ({product}:Props) => {
    return (
        <>
            <SizeSelector
                selectorSize={product.sizes[1]}
                availableSizes={product.sizes} />
            {/*Selector de cantidad*/}
            <QuantitySelector quatity={2} />
            <button className="btn-primary my-5">
                Agregar al carrito
            </button>
        </>
    )
}
