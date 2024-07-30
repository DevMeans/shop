import { getCategories, getproductbyslug } from "@/actions";
import { Title } from '../../../../../components/ui/titlle/Title';
import { ProductForm } from './ui/ProductForm';
import { redirect } from "next/navigation";

interface Props {
    params: {
        slug: string
    }
}
export default async function ProductPage({ params }: Props) {
    const { slug } = params
    const [product, categories] = await Promise.all([
        getproductbyslug(slug),
        getCategories()
    ])

    if (!product && slug!=='new') {
        redirect('/admin/products')
    }
    const title = (slug === 'new') ? 'Nuevo Producto' : 'Editar producto'
    return (
        <>
            <Title title={title}></Title>
            <ProductForm product={product || {}} categories ={categories}></ProductForm>
        </>
    );
}