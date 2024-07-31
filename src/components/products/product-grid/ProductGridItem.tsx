'use client'
import { Product } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
interface Props {
    product: Product
}

export const ProductGridItem = ({ product }: Props) => {
    const localsrc0 = (product.images[0]) ? product.images[0].startsWith('http') ? product.images[0] : `/products/${product.images[0]}` : '/imgs/placeholder.jpg'
    const localsrc1 = (product.images[1]) ? product.images[1].startsWith('http') ? product.images[1] : `/products/${product.images[1]}` : '/imgs/placeholder.jpg'

    const [displayImage, setDisplayImage] = useState(localsrc0)
    return (
        <div className='rounded-md overflow-hidden fade-in'>
            <Link href={`/product/${product.slug}`}>
                <Image
                    src={displayImage}
                    alt={product.title}
                    className='w-full object-cover rounded'
                    width={500}
                    height={500}
                    onMouseEnter={() => setDisplayImage(localsrc1)}
                    onMouseLeave={() => setDisplayImage(localsrc0)}
                >
                </Image>
            </Link>
            <div className='p-4 flex flex-col'>
                <Link href={`/product/${product.slug}`} className='hover:text-blue-600'>
                    {product.title}
                </Link>
                <span className='font-bold'>
                    ${product.price}
                </span>
            </div>
        </div>
    )
}
