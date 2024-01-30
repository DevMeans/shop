'use client'
// import Swiper JS
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import Swiper styles
import './slideshow.css';
import React from 'react';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';


interface Props {
    images: string[];
    title: string;
    className?: string;
}

export const ProductMobileSlides = ({ images, title, className }: Props) => {
    return (
        <div className={`${className} `}>
            <Swiper
                navigation={true}
                autoplay={
                    {
                        delay: 2500
                    }
                }
                pagination
                modules={[FreeMode, Navigation, Autoplay, Navigation,Pagination]}
                className="mySwiper2"
            >
                {
                    images.map(image => (
                        <SwiperSlide key={image}>
                            <Image width={1920} height={1080} src={`/products/${image}`} alt={title} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>

    )
}
