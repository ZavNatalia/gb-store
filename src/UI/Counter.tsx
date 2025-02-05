import React from 'react';
import {Button, HStack, IconButton, Text} from "@chakra-ui/react";
import {FaMinus, FaPlus} from "react-icons/fa";
import {useCart} from "../context/CartContext";
import {IProduct} from '../models/IProduct';
import {isAdmin} from "../constants/isAdmin";

interface CounterProps {
    product: IProduct,
    quantity: number,
    buttonColor?: string
}

const Counter = ({product, quantity, buttonColor = 'gray.50'}: CounterProps) => {
    const {increaseCartQuantity, decreaseCartQuantity} = useCart();
    return (
        <>
            {quantity === 0 ? (
                <Button backgroundColor={buttonColor}
                        fontWeight='normal'
                        border='1px solid'
                        borderColor='gray.200'
                        rounded='xl'
                        width='100%'
                        py={3}
                        transition='all .3s ease'
                        _hover={{boxShadow: 'md', backgroundColor: 'gray.300', borderColor: 'gray.300'}}
                        isDisabled={isAdmin}
                        onClick={() => increaseCartQuantity(product)}
                >
                    В корзину
                </Button>
            ) : (
                <HStack rounded='xl'
                        backgroundColor='gray.50'
                        border='1px solid'
                        borderColor='gray.200'
                        justifyContent='space-between'
                        cursor='default'
                        overflow='hidden'
                        transition='all .3s ease'
                        _hover={{boxShadow: 'md'}}>
                    <IconButton aria-label='Уменьшить количество'
                                icon={<FaMinus/>}
                                variant='ghost'
                                borderRadius='xl'
                                py={3}
                                _hover={{backgroundColor: 'gray.200'}}
                                onClick={() => decreaseCartQuantity(product)}
                    />
                    <Text textAlign={"center"} fontSize={"large"} fontWeight='bold' px={1}>
                        {quantity}
                    </Text>
                    <IconButton aria-label='Увеличить количество'
                                icon={<FaPlus/>}
                                variant='ghost'
                                borderRadius='xl'
                                py={3}
                                _hover={{backgroundColor: 'gray.200'}}
                                onClick={() => increaseCartQuantity(product)}
                    />
                </HStack>
            )}
        </>
    );
};

export default Counter;