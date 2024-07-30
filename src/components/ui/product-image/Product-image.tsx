import Image from "next/image";
import React from "react";

interface Props {
    src?: string
    alt: string
    className?: React.StyleHTMLAttributes<HTMLElement>['className']
    width: number
    height: number
}
export const ProductImage = ({ alt, height, width, className, src }: Props) => {
    const localsrc = (src) ? src.startsWith('http') ? src : `/products/${src}` : '/imgs/placeholder.jpg'
    return (
        <Image
            className={className}
            src={localsrc}
            width={width}
            height={height}
            alt={alt}
        />
    );
};
