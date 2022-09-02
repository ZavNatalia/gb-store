import React from 'react';
import {Button, HStack, IconButton, Text} from "@chakra-ui/react";
import {FaMinus, FaPlus} from "react-icons/fa";
import {useCart} from "../../context/CartContext";
import {IProduct} from '../../models/IProduct';

interface CounterProps {
    product: IProduct,
    quantity: number
}

const Counter = ({product, quantity}: CounterProps) => {
    const {increaseCartQuantity, decreaseCartQuantity} = useCart();
    return (
        <>
            {quantity === 0 ? (
                <Button colorScheme='yellow'
                        rounded='2xl'
                        width='100%'
                        px={8}
                        py={6}
                        boxShadow='md'
                        transition='all .3s ease'
                        _hover={{transform: 'scale(1.05)'}}
                        onClick={() => increaseCartQuantity(product)}
                >
                    В корзину
                </Button>
            ) : (
                <HStack rounded='2xl' backgroundColor='white' boxShadow='md'
                        cursor='default' justifyContent='space-around'>
                    <IconButton aria-label='Уменьшить количество'
                                icon={<FaMinus/>}
                                variant='ghost'
                                borderRadius='2xl'
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
                                borderRadius='2xl'
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