import {IAddress} from "./ICustomer";
import {ICartItem} from "./ICart";

export interface ICreatedOrder {
    address: IAddress,
    id: string,
    items: ICartItem[],
    shipment_time: string,
    status: string,
    user_id: string
}