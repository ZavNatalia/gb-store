import React from 'react';
import {Badge} from "@chakra-ui/react";

interface OrderStatusBadgeProps  {
    status: string
}

const OrderStatusBadge = ({status}: OrderStatusBadgeProps) => {
    const getOrderStatus = () => {
        switch (status) {
            case 'order created': {
                return {text: 'Заказ создан', color: 'green'}
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