// https://tailwindcomponents.com/component/hoverable-table
export const revalidate = 0;
import { getPaginatedProductsWithImages } from '@/actions';
import { Title } from '@/components';
import { Pagination } from '../../../../components/ui/pagination/Pagination';
import Link from 'next/link';
import Image from 'next/image';
interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Products({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { curretPage, totalPages, products = [] } = await getPaginatedProductsWithImages({ page });
  //TODO : CUANDO VUELVES DEL PEDIDO NO SE VEN LOS PEDIDOS HECHOS A MENOS QUE REFRESQUES LA PAGINA

  return (
    <>
      <Title title="Orders" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                image
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Nombre
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                precio
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                genero
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                inventario
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                talla
              </th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product) => (
                <tr
                  key={product.id}
                  className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link href={`/product/${product.slug}`}>
                      <Image src={`/products/${product.ProductImage[0].url}`} width={80} height={80} alt={product.title} />
                    </Link>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <Link href={`/product/${product.slug}`}>
                      {product.title}</Link>
                  </td>
                  <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {product.price}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 ">
                    {product.gender}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 ">
                    {product.inStock}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 ">
                    {product.sizes.join(',')}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <Pagination totalPages={totalPages}></Pagination>
    </>
  );
}