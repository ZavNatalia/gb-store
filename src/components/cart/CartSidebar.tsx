import {
    Text,
    Heading,
    List,
    ListItem,
    Flex,
    Image,
    Button,
    HStack, Icon, Box
} from '@chakra-ui/react';
import React from 'react';
import {useCart} from "../../context/CartContext";
import {toCurrency} from "../../utilities/formatCurrency";
import {Link} from "react-router-dom";
import Counter from "../../UI/Counter";
import {BsBag} from "react-icons/bs";
import {useCategory} from "../../context/CategoryContext";

const CartSidebar = () => {
    const {cartItems, getTotalCost, getDeliveryCost} = useCart();
    const {currentCategory} = useCategory();

    const CartList = () => (
        <>
            {cartItems.length > 0
                ? <List flexGrow={1} spacing={1} overflowY='auto' py={5} pr={1}>
                    {cartItems.map(({product, quantity}) => (
                        <ListItem key={product.id}>
                            <HStack spacing={3}>
                                <Link to={`/${product.category?.name?.toLowerCase()}/${product.id}/${product.title}`}
                                      target='_blank'
                                      style={{display: "flex", alignItems: 'center', flex: 1}}>
                                    <Flex maxH='100px'
                                          maxW='100px'
                                          justifyContent='center'
                                          p={1}
                                          mr={2}
                                    >
                                        <Image
                                            maxH='100%'
                                            maxW='100%'
                                            minH='100px'
                                            minW='100px'
                                            objectFit={'contain'}
                                            src={product.images[0]}
                                            fallbackSrc={'/imgs/placeholder-image.jpg'}
                                        />
                                    </Flex>
                                    <Flex gap={2} flexDirection='column'>
                                        <Text fontSize='sm' noOfLines={3}>{product.title}</Text>
                                        <Text fontSize='sm'
                                              color='gray.500'>{toCurrency(product.price)}</Text>
                                    </Flex>
                                </Link>
                                <Counter product={product} quantity={quantity}/>
                            </HStack>
                        </ListItem>
                    ))}
                </List>
                :
                <Flex flex={1} flexDirection='column' alignItems='center' justifyContent='center'>
                    <Icon fontSize='100px' color='gray.400' as={BsBag}/>
                    <Heading fontSize='large' mt={6} mb={3}>В вашей корзине пока пусто</Heading>
                    <Text>Тут появятся товары, которые вы закажете.</Text>
                </Flex>
            }
        </>
    );

    const CartLink = () => (
        <>
            {cartItems.length > 0 &&
                <Link to={'/cart'}>
                    <Button
                        fontWeight='normal'
                        colorScheme='yellow'
                        justifyContent='space-between'
                        py={6}
                        mt={4}
                        borderRadius='2xl'
                        w='100%'
                    >
                        Перейти в корзину&nbsp;
                        <Text as={"span"} fontSize='xl' fontWeight='bold'>
                            {toCurrency(getTotalCost())}
                        </Text>
                    </Button>
                </Link>
            }
        </>
    )

    return (
        <Flex
            textAlign={"left"}
            position={"sticky"}
            top='80px'
            padding={4}
            height='calc(100vh - 80px)'
            overflow='hidden'
            flexDirection='column'
            bg='gray.100'
            borderLeft="1px"
            borderLeftColor='gray.200'
        >
            <Heading fontSize='x-large'>Корзина</Heading>
            <CartList/>
            {cartItems.length > 0 &&
                <Box borderTop='1px solid' borderColor='gray.300' pt={3} pr={3} color='gray' fontSize='sm'
                     textAlign='right'>
                    <Text>Доставка 15–30 мин </Text>
                    <Text>{toCurrency(getDeliveryCost())}</Text>
                </Box>}
            <CartLink/>
        </Flex>

    );
};

export default CartSidebar;