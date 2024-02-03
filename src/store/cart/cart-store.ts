import { CartProduct } from "@/interfaces";
import { create } from "zustand";

interface State {
    cart: CartProduct[]
    addProductCart: (product: CartProduct) => void
}

export const useCartStore = create<State>()(
    (set, get) => ({
        cart: [],
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
            set({cart:updateCarProduct})
        },
    })
)