import { ProductImage } from "@prisma/client";

export interface Product {
    id:string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
  //TODO:  type: ValidType;
    gender: 'men' | 'women' | 'kid' | 'unisex'
}
export type Category = "men" | "women" | "kid" | "unisex"
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type ValidType = 'shirts' | 'pants' | 'hoodies' | 'hats';

export interface productfindmanyinterface {
        id: string,
        title: string,
        description: string,
        inStock: number,
        price: number,
        sizes: Size[],
        slug: string,
        tags: [],
        gender: 'men' | 'women' | 'kid' | 'unisex'
        categoryId: string,
        ProductImage: ProductImage[]
}