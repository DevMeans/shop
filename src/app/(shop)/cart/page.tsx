import { Title } from '@/components';
import Link from 'next/link';
import { ProductsInCart } from './ui/ProductsInCart';
import { OrderSumary } from './ui/OrderSumary';
export default function CartPage() {

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1300px]">
                <Title title='Carrito' />
                <div className=''>
                    <div className='flex flex-col mt-3'>
                        <span className='text-xl'>Agregar mas items</span>
                        <Link href="/" className="underline mb-5" >
                            Continuar comprando
                        </Link>

                        {/* Items  */}
                        <ProductsInCart />
                    </div>
                    {/* Checkout*/}

                    {
                        /**                    <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
                        <h2 className='text-2xl'>
                            Resumen de orden
                        </h2>
                        <OrderSumary />
                        <div className='mt-5 w-full'>
                            <Link className='flex btn-primary justify-center'
                                href={`/checkout/address`}
                            >
                                Checkout
                            </Link>
                        </div>
                    </div> */
                    }

                </div>
            </div>
        </div>
    );
}