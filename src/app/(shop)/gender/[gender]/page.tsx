
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProducGrid, Title } from "@/components";
import { Category } from "@/interfaces";

import {  redirect } from "next/navigation";

interface Props {
  params: {
    gender: Category,

  },
  searchParams: {
    page?: string
  }
}

export default async function CategoryIdPage({ params, searchParams }: Props) {
  const { gender } = params
  //  const products = initialData.products.find((cat) => cat.gender == id) || [];
  //const products = (initialData.products.filter((cat) => cat.gender == id) || []) as Product[];
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { products, curretPage, totalPages } = await getPaginatedProductsWithImages({ page:page, gender: gender });
  if (products.length === 0) {
    redirect('/')
  }
  const labels: Record<Category, string> = {
    "men": "Hombres",
    "women": "Mujeres",
    "kid": "niños",
    "unisex": "para todos"
  }
  return (
    <>
      <Title title={`Articulos de ${labels[gender]}`} subtitle="Todos los productos" className="mb-2" />
      {<ProducGrid products={products}></ProducGrid>}
      <Pagination totalPages={totalPages} />
    </>

  );
}