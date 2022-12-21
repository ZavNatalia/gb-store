import React from 'react';
import {Button, HStack, IconButton, Text} from "@chakra-ui/react";
import {FaMinus, FaPlus} from "react-icons/fa";
import {useCart} from "../context/CartContext";
import {IProduct} from '../models/IProduct';

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
                        border='1px solid'
                        borderColor='gray.200'
                        rounded='xl'
                        width='100%'
                        px={8}
                        py={6}
                        transition='all .3s ease'
                        _hover={{boxShadow: 'md'}}
                        onClick={() => increaseCartQuantity(product)}
                >
                    В корзину
                </Button>
            ) : (
                <HStack rounded='xl'
                        backgroundColor='gray.50'
                        border='1px solid'
                        borderColor='gray.200'
                        justifyContent='space-around'
                        cursor='default'
                        transition='all .3s ease'
                        _hover={{boxShadow: 'md'}}>
                    <IconButton aria-label='Уменьшить количество'
                                icon={<FaMinus/>}
                                variant='ghost'
                                borderRadius='xl'
                                py={6}
                                _focus={{boxShadow: 'none'}}
                                onClick={() => decreaseCartQuantity(product)}
                    />
                    <Text textAlign={"center"} fontSize={"large"} fontWeight='bold' px={2}>
                        {quantity}
                    </Text>
                    <IconButton aria-label='Увеличить количество'
                                icon={<FaPlus/>}
                                variant='ghost'
                                borderRadius='xl'
                                py={6}
                                _focus={{boxShadow: 'none'}}
                                onClick={() => increaseCartQuantity(product)}
                    />
                </HStack>
            )}
        </>
    );
};

export default Counter;