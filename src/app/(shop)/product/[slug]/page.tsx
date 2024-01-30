import { titlefont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import { SizeSelector } from '@/components/product/size-selector/SizeSelector';
import { QuantitySelector } from "@/components";
import { ProductSlideShow } from '../../../../components/product/slideshow/ProductSlideShow';


interface Props {
  params: {
    slug: string
  }
}

export default function ProductoIdPage({ params }: Props) {
  const { slug } = params
  const product = initialData.products.find(product => product.slug == slug);
  if (!product) {
    notFound()
  }
  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-5 gap-3 mx-auto">
      {/*SlideShow*/}
      <div className="col-span-1 md:col-span-2 md:col-start-2">
        <ProductSlideShow title={product.title} images={product.images} />
      </div>
      {/*Detalles*/}
      <div className="col-span-1 px-5">
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