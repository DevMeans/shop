
import { Title } from '../../components/ui/titlle/Title';
export const revalidate = 60
import { ProducGrid } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import { redirect } from 'next/navigation';
import { Pagination } from '../../components/ui/pagination/Pagination';


interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Home({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { products,curretPage,totalPages } = await getPaginatedProductsWithImages({page});
  if(products.length===0){
    redirect('/')
  }
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
      <Pagination totalPages={totalPages} />
    </>
  );
}
