import {ICart} from "./ICart";
import {IAddress} from "./ICustomer";

export type IOrder = {
    address: IAddress,
    cart: ICart,
    user: {
        email: string,
        id: string,
        role: string
    }
}