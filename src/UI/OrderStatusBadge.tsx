import React from 'react';
import {Badge} from "@chakra-ui/react";
import { IOrderStatus } from '../models/IOrder';

interface OrderStatusBadgeProps  {
    status: string
}

const OrderStatusBadge = ({status}: OrderStatusBadgeProps) => {
    const getOrderStatus = () => {
        switch (status) {
            case IOrderStatus.ORDER_CREATED: {
                return {text: 'Заказ создан', color: 'gray'}
            }
            case IOrderStatus.ORDER_PROCESSING: {
                return {text: 'Обработка заказа', color: 'yellow'}
            }
            case IOrderStatus.ORDER_PROCESSED: {
                return {text: 'Заказ принят', color: 'yellow'}
            }
            case IOrderStatus.READY_FOR_SHIPMENT: {
                return {text: 'Готов к отправке', color: 'yellow'}
            }
            case IOrderStatus.PICKED_BY_COURIER: {
                return {text: 'Курьер забрал заказ', color: 'purple'}
            }
            case IOrderStatus.DELIVERED: {
                return {text: 'Закза доставлен', color: 'green'}
            }
        }
    }

    return (
        <Badge colorScheme={getOrderStatus()?.color} fontSize='sm' px={2} borderRadius='2xl'>
            {getOrderStatus()?.text}
        </Badge>
    );
};

export default OrderStatusBadge;