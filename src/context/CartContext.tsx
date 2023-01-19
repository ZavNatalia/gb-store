import React, {ReactNode, useContext, useState} from "react";
import {IProduct} from "../models/IProduct";
import CartService from "../api/CartService";
import {ToastError, ToastInfo} from "../utilities/error-handling";
import {getCartId, removeCartId, setCartId} from "../utilities/local-storage-handling";
import {ICart} from "../models/ICart";

type CartProviderProps = {
    children: ReactNode
}

export type CartItem = {
    product: IProduct,
    quantity: number
}

type CartContextProps = {
    onOpenCart: (userId: string) => void
    getTotalQuantity: () => number
    getTotalCost: () => number
    getItemsCost: () => number
    getDeliveryCost: () => number
    onAddItemToCart: (id: string) => void
    onDeleteItemFromCart: (id: string) => void
    onRemoveCart: () => void
    onEmptyCart: () => void
    onFetchCart: (id: string) => void
    getCartQuantity: () => number
    cart: ICart,
    getItemQuantity: (id: string) => number
}

export const DELIVERY_COST_BASE = 100;

const CartContext = React.createContext({} as CartContextProps);

export const useCart = () => {
    return useContext(CartContext);
}

export const CartProvider = ({children}: CartProviderProps) => {
    const [cart, setCart] = useState<ICart>({} as ICart);

    const cartId = getCartId();

    const getCartQuantity = () => {
        return cart?.items?.reduce((quantity, item) => item.quantity + quantity, 0);
    };

    const getItemQuantity = (id: string) => {
        return cart?.items?.find(({item}) => item.id == id)?.quantity ?? 0
    }

    const getTotalQuantity = () => {
        return cart?.items?.reduce((total, {quantity}) => {
            return total + quantity
        }, 0)
    }

    const getItemsCost = () => {
        return cart?.items?.reduce((total, cartItem) => {
            return total + cartItem.quantity * Number(cartItem.item.price)
        }, 0)
    }

    const getTotalCost = () => {
        return getItemsCost() + getDeliveryCost()
    }

    const getDeliveryCost = () => {
        return getTotalQuantity() < 6 ? DELIVERY_COST_BASE : DELIVERY_COST_BASE * 3
    }

    const onCreateCart = async (userId: string) => {
        if (userId) {
            try {
                const {data} = await CartService.createCart(userId);
                setCartId(data.id);
                onFetchCart(data.id);
            } catch (e: any) {
                ToastError(e?.message);
            }
        }
    };
    const onFetchCart = async (cartID: string) => {
        try {
            const {data} = await CartService.getCart(cartID);
            setCart(data);
        } catch (e: any) {
            ToastError(e?.message);
        }
    };

    const onRemoveCart = async () => {
        if (cartId) {
            try {
                await CartService.deleteCart(cartId);
                onEmptyCart();
                removeCartId();
            } catch (e: any) {
                ToastError(e?.message);
            }
        }
    };

    const onOpenCart = (userId: string) => {
        if (!cartId) {
            onCreateCart(userId);
        } else {
            onFetchCart(cartId);
        }
    }

    const onAddItemToCart = async (id: string) => {
        if (cartId && id) {
            try {
                await CartService.addItemToCart(cartId, id);
                onFetchCart(cartId);
            } catch (e: any) {
                ToastInfo(e?.message);
            }
        }
    }

    const onDeleteItemFromCart = async (id: string) => {
        if (cartId) {
            try {
                await CartService.deleteItemFromCart(cartId, id);
                onFetchCart(cartId);
            } catch (e: any) {
                ToastInfo(e?.message);
            }
        }
    }

    const onEmptyCart = () => {
        setCart({} as ICart)
    }

    return (
        <CartContext.Provider
            value={{
                getItemQuantity,
                getItemsCost,
                getTotalQuantity,
                getTotalCost,
                getDeliveryCost,
                onAddItemToCart,
                onDeleteItemFromCart,
                onFetchCart,
                getCartQuantity,
                cart,
                onOpenCart,
                onRemoveCart,
                onEmptyCart
            }}>
            {children}
        </CartContext.Provider>
    )
}
