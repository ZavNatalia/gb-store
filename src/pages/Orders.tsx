import React, {useState} from 'react';
import {useCategory} from "../context/CategoryContext";
import {Button, Flex, Heading, SimpleGrid, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import MainBlockLayout from "../UI/MainBlockLayout";
import {IOrder} from "../models/IOrder";
import {slashEscape} from "../utilities/RegExpURL";

export const Orders = () => {
    const [list] = useState([] as IOrder[]);
    const {currentCategory} = useCategory();

    const EmptyList = () => (
        <Flex alignItems='center' justifyContent='center' gap={4} flexDirection='column' mt='100px'>
            <Heading fontSize='x-large' my={2}>Список заказов пуст</Heading>
            <Link to={`/${slashEscape(currentCategory?.name) ?? ''}`}>
                <Button colorScheme='yellow' px={10} mt={6}>
                    В каталог
                </Button>
            </Link>
        </Flex>
    )

    return (
        <MainBlockLayout title={'Мои заказы'}>
            {list.length > 0 ? (
                <SimpleGrid minChildWidth='210px' width='100%' spacing='6'>
                    {list.map(order => (
                        <Text>{order.id} - {order.name} - {order.phone}</Text>
                    ))}
                </SimpleGrid>
            ) : (
                <EmptyList/>
            )}
        </MainBlockLayout>
    );
};