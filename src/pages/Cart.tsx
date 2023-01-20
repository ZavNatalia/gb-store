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
import {ToastError} from "../utilities/error-handling";

export const Cart = () => {
    const {cart, getTotalCost, getItemsCost, getDeliveryCost, getTotalQuantity, onRemoveCart} = useCart();
    const {currentCategory} = useCategory();

    const handleFormSubmit = async () => {
        try {
            // TODO: send the order
            onRemoveCart();
        } catch (e: any) {
            ToastError(e?.message);
        } finally {
            // создать корзину снова
            // onOpenCart(customer.id);
        }
    }

    const TotalCostTable = () => (
        <TableContainer mx={-5} mt={2} mb={4}>
            <Table variant='unstyled'>
                <Tbody borderTop='1px solid' borderColor='gray.200'>
                    <Tr>
                        <Td>Товары</Td>
                        <Td fontWeight='bold'>
                            {toCurrency(getItemsCost())}
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
            <HStack mt={10}>
                <Link to={`/${currentCategory?.name?.toLowerCase() ?? ''}`}>
                    <Button colorScheme='blackAlpha' px={10}>
                        В каталог
                    </Button>
                </Link>
                <Link to={`/orders`}>
                    <Button colorScheme='yellow' px={10}>
                        Мои заказы
                    </Button>
                </Link>
            </HStack>

        </Flex>
    );

    const OrderList = () => (
        <Flex flex={1} overflow='hidden' height='calc(100vh - 300px)' flexDirection='column'>
            <List overflow='auto'>
                {cart?.items.map(({item, quantity}) => (
                    <ListItem key={item.id} pr={2}>
                        <HStack spacing={3}>
                            <Link to={`/${item.category?.name?.toLowerCase()}/${item.id}/${item.title}`}
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
                                        src={item.image[0] ?? '/imgs/placeholder-image.jpg'}
                                    />
                                </Flex>
                                <Flex flexGrow={1} flexDirection='column' px={4}>
                                    <Text fontSize='sm'>{item.title}</Text>
                                    <Text fontSize='sm'
                                          color='gray.500'>{toCurrency(item.price)}</Text>
                                </Flex>
                            </Link>
                            <Spacer/>
                            <Counter product={item} quantity={quantity}/>
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
            {cart?.items?.length > 0 ? (
                <Flex gap={10} borderTop='1px solid' borderColor='gray.200' pt={2}>
                    <OrderList/>
                    <Box flex={1} overflow={"auto"}>
                        <Heading fontSize='x-large' mb={2}>Итого</Heading>
                        <Text color='gray'>Доставка 15–30 мин. Оплата при получении картой или наличными.</Text>
                        <TotalCostTable/>
                        <Heading fontSize='x-large' mb={4}>Адрес доставки</Heading>
                        <OrderForm handleFormSubmit={handleFormSubmit}/>
                    </Box>
                </Flex>
            ) : (
                <EmptyCart/>
            )}
        </MainBlockLayout>
    );
};