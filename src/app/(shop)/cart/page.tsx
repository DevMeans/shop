import { Title } from '@/components';
import Link from 'next/link';
import { initialData } from '@/seed/seed';
import Image from 'next/image';
import { QuantitySelector } from '../../../components/product/quantity-selector/QuantitySelector';


const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

export default function CartPage() {
    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">
                <Title title='Carrito' />
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
                    <div className='flex flex-col mt-3'>
                        <span className='text-xl'>Agregar mas items</span>
                        <Link href="/" className="underline mb-5" >
                            Continuar comprando
                        </Link>

                        {/* Items  */}
                        {
                            productsInCart.map(product => (
                                <div key={product.slug} className='flex mb-5'>
                                    <Image
                                        src={`/products/${product.images[0]}`}
                                        width={100}
                                        height={100}
                                        style={
                                            {
                                                width:'100px',
                                                height:'100px'
                                            }
                                        }
                                        alt={product.title}
                                        className='mr-5 rounded'
                                    />
                                    <div>
                                        <p>{product.title}</p>
                                        <p>{product.price}</p>
                                        <QuantitySelector quatity={3}></QuantitySelector>
                                        <button className='underline mt-3'>
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {/* Checkout*/}
                    <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
                        <h2 className='text-2xl'>
                            Resumen de orden
                        </h2>
                        <div className='grid grid-cols-2'>
                            <span>nr.Productos</span>
                            <span className='text-right'>3 articulos</span>

                            <span>Subtotal</span>
                            <span className='text-right'>$ 100</span>

                            <span>Impuestos</span>
                            <span className='text-right'>$ 10</span>

                            <span className='mt-5 text-2xl'>Impuestos</span>
                            <span className='mt-5 text-2xl text-right'>$ 110</span>
                        </div>
                        <div className='mt-5 w-full'>
                            <Link className='flex btn-primary justify-center'
                            href={`/checkout/address`}
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}