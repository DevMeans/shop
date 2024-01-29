import { titlefont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

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
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      {/*SlideShow*/}
      <div className="col-span-1 md:col-span-2 ">
        hola
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
        {/*Selector de cantidad*/}

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