import {Button, Flex, Heading, Icon, SimpleGrid} from '@chakra-ui/react';
import React, { useState } from 'react';
import {Text} from "@chakra-ui/react";
import {MdFavorite} from "react-icons/md";
import {IoIosHeartEmpty} from "react-icons/io";
import {Link} from "react-router-dom";
import MainBlockLayout from '../UI/MainBlockLayout';
import {ProductItem} from "../components/product/ProductItem";
import {IProduct} from "../models/IProduct";
import {useCategory} from "../context/CategoryContext";

export const Favourites = () => {
    const [list, setList] = useState([] as IProduct[]);
    const {currentCategory} = useCategory();

    const EmptyList = () => (
        <Flex alignItems='center' justifyContent='center' gap={4} flexDirection='column' mt={10}>
            <Icon fontSize='140px' color='gray.400' as={IoIosHeartEmpty}/>
            <Heading fontSize='xx-large' my={2}>В избранном ничего нет</Heading>
            <Text color='gray' textAlign='center'>Здесь пока ничего нет, но вы можете
                <br/>добавить товар в избранное, кликнув на <Icon as={MdFavorite}/></Text>
            <Link to={`/${currentCategory?.name?.toLowerCase() ?? 'all'}`}>
                <Button colorScheme='yellow' px={10} mt={6}>
                    В каталог
                </Button>
            </Link>
        </Flex>
    )

    return (
        <MainBlockLayout title={'Избранное'}>
            {list.length > 0 ? (
                <SimpleGrid minChildWidth='210px' width='100%' spacing='6'>
                    {list.map(product => (
                        <ProductItem product={product} key={product.id}/>
                    ))}
                </SimpleGrid>
            ) : (
                <EmptyList/>
            )}
        </MainBlockLayout>
    );
};