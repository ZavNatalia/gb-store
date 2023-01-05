import {CartItem} from "../context/CartContext";

export type IOrder = {
    id?: number,
    name: string,
    email: string,
    address: string,
    cartItems: CartItem[],
    comment?: string,
    phone: string
}