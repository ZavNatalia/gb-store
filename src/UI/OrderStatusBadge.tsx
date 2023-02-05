import React from 'react';
import {Badge} from "@chakra-ui/react";

interface OrderStatusBadgeProps  {
    status: string
}

const OrderStatusBadge = ({status}: OrderStatusBadgeProps) => {
    const getOrderStatus = () => {
        switch (status) {
            case 'order created': {
                return {text: 'Заказ создан', color: 'gray'}
            }
            case 'order processing': {
                return {text: 'Обработка заказа', color: 'yellow'}
            }
            case 'order processed': {
                return {text: 'Заказ принят', color: 'yellow'}
            }
            case 'ready for shipment': {
                return {text: 'Готов к отправке', color: 'yellow'}
            }
            case 'picked by courier': {
                return {text: 'Курьер забрал заказ', color: 'purple'}
            }
            case 'delivered': {
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