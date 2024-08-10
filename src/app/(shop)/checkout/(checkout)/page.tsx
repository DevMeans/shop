import Link from 'next/link';

import {Title } from '@/components';

import { ProductsInCart } from './ui/ProductsInCart';
import { PlaceOrder } from './ui/PlaceOrder';
import { placeOrder } from '../../../../actions/order/place-order';




export default function checkout () {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">

        <Title title='Verificar orden' />


        <div className="">

          {/* Carrito */ }
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link href="/cart" className="underline mb-5">
              Editar carrito
            </Link>
            {/* Items */ }
            <PlaceOrder></PlaceOrder>
            <div className='h-4'>

            </div>
            <ProductsInCart></ProductsInCart>
          </div>




          {/* Checkout - Resumen de orden */ }
 

      

        </div>



      </div>


    </div>
  );
}