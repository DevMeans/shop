import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[]
    getTotalItem: () => number;
    addProductCart: (product: CartProduct) => void
    updateProductCart: (product: CartProduct, quantity: number) => void
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
                    console.log({product,quantity})
                    const {cart} =get()
                    const updateCartProducts=cart.map(item=>{
                        if(item.id === product.id && item.size === product.size){
                            return {...item,quantity:quantity}
                        }
                        return item
                    })
                    set({cart:updateCartProducts})
            }
        })
        , {
            name: 'shoping-cart'
        }
    )
)