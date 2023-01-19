import { IProduct } from "./IProduct";

export type ICart = {
    id: string,
    items: ICartItem[],
    user_id: string
}

export type ICartItem = {
    item: IProduct
    quantity: number,
}