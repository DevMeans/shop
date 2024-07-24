import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[]
    getTotalItem: () => number;
    getSumaryInformation: () => {
        subTotaly: number,
        tax: number,
        total: number,
        itemsInCart: number
    };
    addProductCart: (product: CartProduct) => void
    updateProductCart: (product: CartProduct, quantity: number) => void
    removeProduct: (product: CartProduct) => void
    clearCart: () => void
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],
            getTotalItem: () => {
                const { cart } = get()
                return cart.reduce((total, item) => total + item.quantity, 0)
            },
            addProductCart(product: CartProduct) {
                const { cart } = get()
                //revisar si ese productoe existe
                const productInCart = cart.some(
                    (item) => item.id === product.id && item.size === product.size
                )
                if (!productInCart) {
                    set({ cart: [...cart, product] })
                    return
                }
                //producto existe por talla entonces ingrementar la cantidad 
                const updateCarProduct = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + product.quantity }
                    }
                    return item
                })
                set({ cart: updateCarProduct })
            },
            updateProductCart: (product: CartProduct, quantity: number) => {
                console.log({ product, quantity })
                const { cart } = get()
                const updateCartProducts = cart.map(item => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: quantity }
                    }
                    return item
                })
                set({ cart: updateCartProducts })
            },
            removeProduct: (product: CartProduct) => {
                const { cart } = get()

                const removeProduct = cart.filter(
                    (item) => item.id !== product.id || item.size !== product.size
                )
                set({ cart: removeProduct })
            },
            getSumaryInformation() {
                const { cart } = get()
                const subTotaly = cart.reduce(
                    (subtotal, product) => (product.quantity * product.price) + subtotal, 0
                )
                const tax = subTotaly * 0.15;
                const total = subTotaly + tax
                const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0)
                return {
                    subTotaly,
                    tax, total, itemsInCart
                }
            },
            clearCart: () => {
                set({ cart: [] })
            },
        })
        , {
            name: 'shoping-cart'
        }
    )
)