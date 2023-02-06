import {ICart, ICartItem} from "./ICart";
import {IAddress} from "./ICustomer";

export enum IOrderStatus {
    ORDER_CREATED = 'order created',
    ORDER_PROCESSING = 'order processing',
    ORDER_PROCESSED = 'order processed',
    READY_FOR_SHIPMENT = 'ready for shipment',
    PICKED_BY_COURIER = 'picked by courier',
    DELIVERED = 'delivered',
}

export type IOrder = {
    address: IAddress,
    cart: ICart,
    user: {
        email: string,
        id: string,
        role: string
    }
}

export interface ICreatedOrder {
    address: IAddress,
    id: string,
    items: ICartItem[],
    shipment_time: string,
    created_at: string,
    status: string,
    user_id: string
}

export interface IEditOrderStatus {
    order_id: string,
    status: IOrderStatus,
    user: {
        email: string,
        id: string,
        role: string
    }
}
