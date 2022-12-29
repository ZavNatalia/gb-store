import React from 'react';
import {useCart} from "../context/CartContext";
import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Icon,
    Image,
    List,
    ListItem,
    Spacer,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Tr
} from "@chakra-ui/react";
import {toCurrency} from "../utilities/formatCurrency";
import {Link} from 'react-router-dom';
import {BsBag} from 'react-icons/bs';
import Counter from "../UI/Counter";
import {useCategory} from '../context/CategoryContext';
import MainBlockLayout from '../UI/MainBlockLayout';
import {OrderForm} from '../components/cart/OrderForm';

export const Cart = () => {
    const {cartItems, getTotalCost, getGoodsCost, getDeliveryCost, getTotalQuantity} = useCart();
    const {currentCategory} = useCategory();

    // TODO: получить содержимое корзины пользователя /cart/:userID

    const TotalCostTable = () => (
        <TableContainer mx={-5} mt={2} mb={4}>
            <Table variant='unstyled'>
                <Tbody borderTop='1px solid' borderColor='gray.200'>
                    <Tr>
                        <Td>Товары</Td>
                        <Td fontWeight='bold'>
                            {toCurrency(getGoodsCost())}
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>Доставка</Td>
                        <Td fontWeight='bold'>{toCurrency(getDeliveryCost())}</Td>
                    </Tr>
                </Tbody>
                <Tfoot>
                    <Tr borderTop='1px solid' borderColor='gray.200'>
                        <Th fontSize='large' fontWeight='bold'>К оплате</Th>
                        <Th isNumeric fontSize='large' fontWeight='bold'>
                            {toCurrency(getTotalCost())}
                        </Th>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    );

    const EmptyCart = () => (
        <Flex flexDirection='column' alignItems='center' gap={4} mt={10}>
            <Icon fontSize='140px' color='gray.400' as={BsBag}/>
            <Heading fontSize='xx-large' my={2}>В вашей корзине пока пусто</Heading>
            <Text color='gray'>Тут появятся товары, которые вы закажете.</Text>
            <Link to={`/${currentCategory?.name?.toLowerCase() ?? 'all'}`}>
                <Button colorScheme='yellow' px={10} mt={10}>
                    В каталог
                </Button>
            </Link>
        </Flex>
    );

    const OrderList = () => (
        <Flex flex={1} overflow='hidden' height='calc(100vh - 300px)' flexDirection='column'>
            <List overflow='auto'>
                {cartItems.map(({product, quantity}) => (
                    <ListItem key={product.id} pr={2}>
                        <HStack spacing={3}>
                            <Link to={`/${product.category?.name?.toLowerCase()}/${product.id}/${product.title}`}
                                  target='_blank'
                                  style={{display: "flex", alignItems: 'center'}}>
                                <Flex maxH='110px'
                                      maxW='110px'
                                      justifyContent='center'
                                >
                                    <Image
                                        maxH='100%'
                                        maxW='100%'
                                        minH='110px'
                                        minW='110px'
                                        objectFit={'contain'}
                                        src={product.image[0]}
                                        fallbackSrc={'/imgs/placeholder-image.jpg'}
                                    />
                                </Flex>
                                <Flex flexGrow={1} flexDirection='column' px={4}>
                                    <Text fontSize='sm'>{product.title}</Text>
                                    <Text fontSize='sm'
                                          color='gray.500'>{toCurrency(product.price)}</Text>
                                </Flex>
                            </Link>
                            <Spacer/>
                            <Counter product={product} quantity={quantity}/>
                        </HStack>
                    </ListItem>
                ))}
            </List>
            <Text alignSelf='end' color='gray' fontSize='sm' pt={3} pr={3}>
                Общее количество товаров: {getTotalQuantity()}
            </Text>
        </Flex>
    )

    return (
        <MainBlockLayout title={'Корзина'}>
            {cartItems.length > 0 ? (
                <Flex gap={10} borderTop='1px solid' borderColor='gray.200' pt={2}>
                    <OrderList/>
                    <Box flex={1} overflow={"auto"}>
                        <Heading fontSize='x-large' mb={2}>Итого</Heading>
                        <Text color='gray'>Доставка 15–30 мин. Оплата при получении картой или наличными.</Text>
                        <TotalCostTable/>
                        <Heading fontSize='x-large' mb={4}>Адрес доставки</Heading>
                        <OrderForm/>
                    </Box>
                </Flex>
            ) : (
                <EmptyCart/>
            )}
        </MainBlockLayout>
    );
};