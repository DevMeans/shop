import { titlefont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { SizeSelector } from '@/components/product/size-selector/SizeSelector';
import { ProductMobileSlides, QuantitySelector, StockLabel } from "@/components";
import { ProductSlideShow } from '../../../../components/product/slideshow/ProductSlideShow';
import { getproductbyslug } from "@/actions";
import type { Metadata, ResolvingMetadata } from 'next'

export const revalidate = 10080


interface Props {
  params: {
    slug: string
  }
}


export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const product = await getproductbyslug(slug)

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: (product?.title ?? 'Producto no encontrado') ,
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`/product/${product?.images[2]}`],
    },
  }
}

export default async function ProductoIdPage({ params }: Props) {
  const { slug } = params
  console.log(slug)
  const product = await getproductbyslug(slug)
  if (!product) {
    notFound()
  }
  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 mx-auto">
      {/*SlideShow*/}
      <div className="col-span-1 md:col-span-1 xl:col-start-2 xl:col-span-2">
        <ProductMobileSlides title={product.title} images={product.images} className="block md:hidden" />
        <ProductSlideShow title={product.title} images={product.images} className="hidden md:block" />
      </div>
      {/*Detalles*/}
      <div className="col-span-1 px-5">
        <StockLabel slug={slug} />

        <h1 className={` ${titlefont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">
          ${product.price}
        </p>
        {/*Selector de tallas*/}
        <SizeSelector
          selectorSize={product.sizes[1]}
          availableSizes={product.sizes} />
        {/*Selector de cantidad*/}
        <QuantitySelector quatity={2} />
        <button className="btn-primary my-5">
          Agregar al carrito
        </button>
        <h3 className=" font-bold text-sm ">
          Descripcion
        </h3>
        <p className="font-light">
          {product.description}
        </p>
      </div>
    </div>
  );
}