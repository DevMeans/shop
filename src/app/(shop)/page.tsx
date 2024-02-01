
import { Title } from '../../components/ui/titlle/Title';

import { ProducGrid } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";


export default async function Home() {

  const { products } =await getPaginatedProductsWithImages();
  console.log(products)
  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2" />
      <ProducGrid
        products={products}
      >
      </ProducGrid>
    </>
  );
}
