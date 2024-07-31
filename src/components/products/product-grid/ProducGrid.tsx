import { Product } from "@/interfaces"
import { ProductGridItem } from "./ProductGridItem"

interface Props {
    products: Product[]
}

export const ProducGrid = ({ products }: Props) => {
    return (
        products.length != 0 ?
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
                {
                    products.map(product => (
                        <ProductGridItem key={product.slug} product={product} />
                    ))
                }
            </div> : <div> No hay productos</div>
    )
}
