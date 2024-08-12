import Link from 'next/link';

import { ProductImage, Title } from '@/components';
import { initialData } from '@/seed/seed';
import Image from 'next/image';
import clsx from 'clsx';
import { IoCardOutline } from 'react-icons/io5';
import { getOrderById } from '@/actions/order/get-order-by-id';
import { redirect } from 'next/navigation';
import { currencyFormat } from '@/util';



const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];


interface Props {
  params: {
    id: string;
  };
}


export default async function OrderID({ params }: Props) {

  const { id } = params;
  const { ok, order } = await getOrderById(id)
  if (!ok) {
    redirect('/')
  }
  const address = order!.OrderAddress
  console.log('order', order?.OrderItem)
  // Todo: verificar
  // redirect(/)

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">

        <Title title={`Orden #${id.split('-').at(-1)}`} />


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Carrito */}
          <div className="flex flex-col mt-5">

            <div className="flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5 bg-green-600">
              <IoCardOutline size={30} />
              {/* <span className="mx-2">Pendiente de pago</span> */}
              <span className="mx-2">
                Orden procesada
              </span>
            </div>



            {/* Items */}
            {
              order?.OrderItem.map(item => (

                <div key={item.product.slug + item.size} className="flex mb-5">
                  <ProductImage
                    src={item.product.ProductImage[0].url}
                    width={100}
                    height={100}
                    alt={item.product.title}
                    className="mr-5 rounded"
                  />

                  <div>
                    <p>{item.product.title}</p>
                    <div className='flex'>S/{item.price} x {item.quantity}</div> <span className='flex gap-2 items-center'>Talla {item.size}, color {item.color.name}<div  style={{ backgroundColor: `${item.color.hexa}` }} className='size-4 mb-0'></div></span>
                    <p className="font-bold">Subtotal: S/{(item.price * item.quantity)}</p>
                  </div>

                </div>


              ))
            }
          </div>




          {/* Checkout - Resumen de orden */}
          <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">{
                address?.firstName ? address?.firstName : 'No name'
              } {address?.lastName}</p>
              <p>{address?.address}</p>
              <p>{address?.address2}</p>
              <p>{address?.postalCode}</p>
              <p>{address?.city} , {address?.country}</p>
              <p>{address?.phone}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />


            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>nr.Productos</span>
              <span className='text-right'>{order!.itemsInOrder === 1 ? '1 articulo' : `${order!.itemsInOrder} articulos`}</span>
              <span className='mt-5 text-2xl'>Total :</span>
              <span className='mt-5 text-2xl text-right'>{currencyFormat(order!.total)}</span>

            </div>

            <div className="mt-5 mb-2 w-full">

              <div className='flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5 bg-green-600'>
                <IoCardOutline size={30} />
                {/* <span className="mx-2">Pendiente de pago</span> */}
                <span className="mx-2">Orden procesada</span>
              </div>

            </div>


          </div>



        </div>



      </div>


    </div >
  );
}