import { ProducGrid, Title } from "@/components";
import { Product, Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: Category
  }
}

export default function CategoryIdPage({ params }: Props) {
  const { id } = params
  //  const products = initialData.products.find((cat) => cat.gender == id) || [];
  const products = (initialData.products.filter((cat) => cat.gender == id) || []) as Product[];
  const labels: Record<Category, string> = {
    "men": "Hombres",
    "women": "Mujeres",
    "kid": "niños",
    "unisex": "para todos"
  }
  return (
    <>
      <Title title={`Articulos de ${labels[id]}`} subtitle="Todos los productos" className="mb-2" />
      {<ProducGrid products={products}></ProducGrid>}
    </>

  );
}