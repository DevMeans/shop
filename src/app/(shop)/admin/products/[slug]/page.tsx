import { getCategories, getproductbyslug } from "@/actions";
import { Title } from '../../../../../components/ui/titlle/Title';
import { ProductForm } from './ui/ProductForm';
import { redirect } from "next/navigation";
import { getColors } from "@/actions/colors/get-colors";
import { GetColorForProducts } from "@/actions/colors/ColorForProduct";

interface Props {
    params: {
        slug: string
    }
}

export default async function ProductPage({ params }: Props) {
    const { slug } = params
    const [product, categories, colors, colorForProduct] = await Promise.all([
        getproductbyslug(slug),
        getCategories(),
        getColors(),
        GetColorForProducts(slug)
    ])

    if (!product && slug !== 'new') {
        redirect('/admin/products')
    }
    const title = (slug === 'new') ? 'Nuevo Producto' : 'Editar producto'
    return (
        <>
            <Title title={title}></Title>
            <ProductForm product={product || {}} categories={categories} colors={colors} colorForProduct={colorForProduct} ></ProductForm>
        </>
    );
}