import React, {ReactNode, useContext, useEffect, useState} from "react";
import {IProduct} from "../models/IProduct";

type CartProviderProps = {
    children: ReactNode
}

export type CartItem = {
    product: IProduct,
    quantity: number
}

type CartContextProps = {
    openCart: () => void
    closeCart: () => void
    isOpen: boolean
    getItemQuantity: (id: number) => number
    getTotalQuantity: () => number
    getTotalCost: () => number
    getGoodsCost: () => number
    getDeliveryCost: () => number
    increaseCartQuantity: (product: IProduct) => void
    decreaseCartQuantity: (product: IProduct) => void
    emptyCart: () => void
    cartQuantity: number
    cartItems: CartItem[]
}

export const DELIVERY_COST_BASE = 100;

const CartContext = React.createContext({} as CartContextProps);

export const useCart = () => {
    return useContext(CartContext);
}

export const CartProvider = ({children}: CartProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

    useEffect(() => {
        if (cartQuantity > 0) {
            openCart();
        } else {
            closeCart();
        }
    }, [cartQuantity])

    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.product.id === id)?.quantity || 0;
    }

    const getTotalQuantity = () => {
        return cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity
        }, 0)
    }

    const getGoodsCost = () => {
        return cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity * Number(cartItem?.product?.price)
        }, 0)
    }

    const getTotalCost = () => {
        return getGoodsCost() + getDeliveryCost()
    }

    const getDeliveryCost = () => {
        return getTotalQuantity() < 6 ? DELIVERY_COST_BASE : DELIVERY_COST_BASE * 3
    }

    const openCart = () => {
        setIsOpen(true);
    }
    const closeCart = () => {
        setIsOpen(false);
    }

    const increaseCartQuantity = (product: IProduct) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.product.id === product.id) == null) {
                return [...currItems, {product, quantity: 1}]
            } else {
                return currItems.map(item => {
                    if (item.product.id === product.id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item;
                    }
                })
            }
        })
    }

    const decreaseCartQuantity = (product: IProduct) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.product.id === product.id)?.quantity === 1) {
                return currItems.filter(item => item.product.id !== product.id);
            } else {
                return currItems.map(item => {
                    if (item.product.id === product.id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item;
                    }
                })
            }
        })
    }

    const emptyCart = () => {
        setCartItems([])
    }

    return (
        <CartContext.Provider
            value={{
                getItemQuantity,
                getGoodsCost,
                getTotalQuantity,
                getTotalCost,
                getDeliveryCost,
                increaseCartQuantity,
                decreaseCartQuantity,
                emptyCart,
                cartQuantity,
                cartItems,
                openCart,
                closeCart,
                isOpen
            }}>
            {children}
        </CartContext.Provider>
    )
}
