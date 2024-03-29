import { Circle, Divider, Flex, Image, ListItem, Text } from '@chakra-ui/react';
import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { toCurrency } from "../../utilities/formatCurrency";
import { useCart } from "../../context/CartContext";
import OrderStatusBadge from "../../UI/OrderStatusBadge";
import { ICreatedOrder } from '../../models/IOrder';
import { getDate } from '../../utilities/getDate';
import { useTranslation } from 'react-i18next';

interface OrderItemProps {
    order: ICreatedOrder;
}

export const OrderItem = memo(({order}: OrderItemProps) => {
    const {i18n} = useTranslation();
    const lang = i18n.language === 'en' ? 'en-US' : 'Ru-ru';
    const {getTotalCost} = useCart();

    const memorizedList = useMemo(() => (
        order?.items?.slice(0, 4).map(({item, quantity}) =>
            <Flex borderRight='1px solid' borderColor='gray.200' px={2} key={item.id}>
                <Flex maxH='70px'
                      maxW='70px'
                      justifyContent='center'>
                    <Image
                        maxH='100%'
                        maxW='100%'
                        minH='70px'
                        minW='70px'
                        objectFit={'contain'}
                        src={item.image[0]}
                        fallbackSrc='/assets/images/placeholder-image.jpg'
                    />
                </Flex>
                {quantity > 1 && <Circle size='30px' backgroundColor='gray.100' mt={1}>
                    <Text fontSize='sm' fontWeight='bold'>x{quantity}</Text>
                </Circle>}
            </Flex>
        )
    ), [order]);

    return (
        <>
            {order?.items?.length > 0 && (
                <ListItem border='1px solid' borderColor='gray.300' rounded='3xl'
                          width='50%' minW='600px' p={8}>
                    <Link to={`/order/${order.id}`}>
                        <Flex alignItems='center' justifyContent='space-between' w='100%'>
                            <Text fontSize='x-large' fontWeight='bold'>
                                {getDate(order.created_at, lang)}
                            </Text>
                            <OrderStatusBadge status={order.status}/>
                        </Flex>
                        <Flex>
                            <Text color='gray.500'>{toCurrency(getTotalCost(order?.items))} -&nbsp;</Text>
                            <Text color='gray.500'>{order.address.city}, {order.address.street} </Text>
                        </Flex>
                    </Link>
                    <Divider mt={6} mb={4}/>
                    <Flex flexWrap='wrap' p={4} alignItems='center'>
                        {memorizedList}
                        {order?.items?.length > 4 && (
                            <Text ml={4} fontWeight='bold' color='gray.500' fontSize='large'>
                                + {order?.items?.length - 4}
                            </Text>
                        )}
                    </Flex>
                </ListItem>
            )}
        </>
    );
});