import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  getTotalItem: () => number;
  getSumaryInformation: () => {
    subTotaly: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  addProductCart: (product: CartProduct) => void;
  updateProductCart: (
    ProductId: string,
    cantidad: number,
    size: string,
    colorid: string
  ) => void;
  removeProduct: (product: CartProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItem: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      addProductCart(product: CartProduct) {
        const { cart } = get();
        // Revisar si ese producto existe por color y talla
        console.log("product store", product.detalles);
        if (!product.detalles.color) {
          return;
        }
        const productInCart = cart.some(
          (item) =>
            item.id === product.id &&
            item.size === product.size &&
            item.detalles.color.id === product.detalles.color.id
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }
        // Producto existe por color y talla entonces incrementar la cantidad
        const updateCartProduct = cart.map((item) => {
          if (
            item.id === product.id &&
            item.size === product.size &&
            item.detalles.color.id === product.detalles.color.id
          ) {
            return {
              ...item,
              quantity: item.quantity + product.quantity,
              detalles: {
                ...item.detalles,
                cantidad: item.detalles.cantidad + product.detalles.cantidad,
              },
            };
          }
          return item;
        });
        set({ cart: updateCartProduct });
      },
      updateProductCart: (
        ProductId: string,
        cantidad: number,
        size: string,
        colorid: string
      ) => {
        if(isNaN(cantidad)){
          cantidad=0
        }
        // console.log({ product, quantity })
        const { cart } = get();
        const updateCartProducts = cart.map((item) => {
          if (
            item.id === ProductId &&
            item.size === size &&
            item.detalles.color.id === colorid
          ) {
            return {
              ...item,
              detalles: { ...item.detalles, cantidad: cantidad },
            }; //TODO : REGRESAR LA FORMA DE ESTO
          }
          return item;
        });
        set({ cart: updateCartProducts });
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();

        const removeProduct = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );
        set({ cart: removeProduct });
      },
      getSumaryInformation() {
        const { cart } = get();
        const subTotaly = cart.reduce(
          (subtotal, product) => product.quantity * product.price + subtotal,
          0
        );
        const tax = subTotaly * 0.15;
        const total = subTotaly + tax;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );
        return {
          subTotaly,
          tax,
          total,
          itemsInCart,
        };
      },
      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: "shoping-cart",
    }
  )
);
