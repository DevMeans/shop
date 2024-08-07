"use client";

import { Category, Product, ProductImage as ProductWidImage } from "@/interfaces";

import { useForm } from "react-hook-form";
import Image from 'next/image';
import clsx from "clsx";
import { createUpdateProduct } from '../../../../../../actions/products/create-update-product';
import { useRouter } from "next/navigation";
import { ProductImage } from "@/components";
import { deleteProductImage } from "@/actions";
import { ColorSelector } from "@/components/product/color-selector/ColorSelector";
interface Props {
    product: Partial<Product> & { ProductImage?: ProductWidImage[] };
    categories: Category[];
    colors: any[],
    colorForProduct: any[]

}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
    title: string;
    slug: string;
    description: string;
    price: number;
    inStock: number
    sizes: string[];
    tags: string;
    gender: 'men' | 'women' | 'kid' | 'unisex'
    categoryId: string
    images?: FileList
}

export const ProductForm = ({ product, categories, colors, colorForProduct }: Props) => {

    let arreglo:any[]= []
    console.log(colorForProduct)
    colorForProduct.map((r: any) => arreglo.push(r.colorId))
    const router = useRouter()

    const {
        handleSubmit,
        register,
        getValues,
        setValue,
        watch,
        formState: { isValid }
    } = useForm<FormInputs>({
        defaultValues: {
            ...product,
            tags: product.tags?.join(', '),//TODO : ENTENDER ESTO Y POR QUE MEJOR NO PONER UN ARREGLO EN EL INTERFACE
            sizes: product.sizes ?? [],
            images: undefined
        }
    });
    watch('sizes')
    const onSizeChanged = (size: string) => {
        const sizes = new Set(getValues("sizes"))
        sizes.has(size) ? sizes.delete(size) : sizes.add(size) //TODO ESTE METODO PROBAR
        setValue('sizes', Array.from(sizes))
    }
    const onSubmit = async (data: FormInputs) => {
        const formData = new FormData();
        const { images, ...productToSave } = data
        if (product.id) {
            formData.append('id', product.id ?? "")
        }
        formData.append('title', productToSave.title)
        formData.append('slug', productToSave.slug)
        formData.append('description', productToSave.description)
        formData.append('price', productToSave.price.toString())
        formData.append('inStock', productToSave.inStock.toString())
        formData.append('sizes', productToSave.sizes.toString())
        formData.append('tags', productToSave.tags)
        formData.append('categoryId', productToSave.categoryId)
        formData.append('gender', productToSave.gender)
        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i])
            }
        }
        const { ok, product: updatedProduct } = await createUpdateProduct(formData)
        if (!ok) {
            alert('El producto no se pudo actualizar')
            return;
        }
        router.replace(`/admin/products/${updatedProduct?.slug}`)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
            {/* Textos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Título</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('title', { required: true })} />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Slug</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('slug', { required: true })} />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Descripción</span>
                    <textarea
                        rows={5}
                        className="p-2 border rounded-md bg-gray-200" {...register('description', { required: true })}
                    ></textarea>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Price</span>
                    <input {...register('price', { minLength: 0 })} type="number" className="p-2 border rounded-md bg-gray-200" />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Tags</span>
                    <input {...register('tags', { required: true })} type="text" className="p-2 border rounded-md bg-gray-200" />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Gender</span>
                    <select className="p-2 border rounded-md bg-gray-200"
                        {...register('gender', { required: true })}
                    >
                        <option value="">[Seleccione]</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kid">Kid</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Categoria</span>
                    <select className="p-2 border rounded-md bg-gray-200"
                        {...register('categoryId', { required: true })}
                    >
                        <option value="">[Seleccione]</option>
                        {
                            categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>

                <button className="btn-primary w-full">
                    Guardar
                </button>
            </div>

            {/* Selector de tallas y fotos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Inventario</span>
                    <input {...register('inStock', { minLength: 0 })} type="number" className="p-2 border rounded-md bg-gray-200" />
                </div>
                <ColorSelector colors={colors} productId={product.id!} colorsSelected={arreglo}></ColorSelector>
                {/* As checkboxes */}
                <div className="flex flex-col">

                    <span>Tallas</span>
                    <div className="flex flex-wrap">

                        {
                            sizes.map(size => (
                                // bg-blue-500 text-white <--- si está seleccionado
                                <div key={size}
                                    onClick={() => onSizeChanged(size)}
                                    className={
                                        clsx("p-2 border cur rounded-e-md mr-2 mb-2 w-14 transition-all text-center", {
                                            'bg-blue-500 text-white': getValues('sizes').includes(size)
                                        })
                                    }>
                                    <span>{size}</span>
                                </div>
                            ))
                        }

                    </div>


                    <div className="flex flex-col mb-2">

                        <span>Fotos</span>
                        <input
                            {...register('images')}
                            type="file"
                            multiple
                            className="p-2 border rounded-md bg-gray-200"
                            accept="image/png, image/jpeg, image/avif"
                        />

                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                        {
                            product.ProductImage?.map(image => (
                                <div key={image.id} className="">
                                    <ProductImage
                                        alt={product.title ?? ''}
                                        src={image.url}
                                        width={300}
                                        height={300}
                                        className="rounded-t shadow-md"
                                    />
                                    <button
                                        onClick={() => deleteProductImage(image.id, image.url)}

                                        type="button" className="btn-danger rounded-b-xl w-full">
                                        eliminar
                                    </button>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </form>
    );
};