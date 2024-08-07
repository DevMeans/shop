import { number } from "zod";

export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  //TODO:  type: ValidType;
  gender: "men" | "women" | "kid" | "unisex";
  ColorForProduct: ColorForProduct[];
}
export interface ProductImage {
  id: number;
  url: string;
  productId?: string;
}
type Category = "men" | "women" | "kid" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type ValidType = "shirts" | "pants" | "hoodies" | "hats";

export interface productfindmanyinterface {
  id: string;
  title: string;
  description: string;
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: [];
  gender: "men" | "women" | "kid" | "unisex";
  categoryId: string;
  ProductImage: ProductImage[];
}
export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  size: Size;
  image: string;
  color: any;
}
export interface ColorForProduct {
  id: string;
  productId: string;
  colorId: string;
}
