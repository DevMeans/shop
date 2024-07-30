'use client'
// import Swiper JS
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as swiperObject } from 'swiper'
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
// import Swiper styles
import './slideshow.css';
import React from 'react';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import { ProductImage } from '@/components/ui/product-image/Product-image';


interface Props {
    images: string[];
    title: string;
    className?: string;
}

export const ProductSlideShow = ({ images, title, className }: Props) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<swiperObject>();

    return (
        <div className={`${className} `}>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                } as React.CSSProperties}
                spaceBetween={10}
                navigation={true}
                autoplay={
                    {
                        delay: 2500
                    }
                }
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                className="mySwiper2"
            >

                {
                    images.map(image => (
                        <SwiperSlide key={image}>
                            <ProductImage width={1920} height={1080} src={image} alt={title} className="rounded-lg" />
                        </SwiperSlide>
                    ))
                }


            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {
                    images.map(image => (
                        <SwiperSlide key={image}>
                            <Image width={300} height={300} src={`/products/${image}`} alt={title} className="rounded-lg object-fill" />
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>

    )
}
