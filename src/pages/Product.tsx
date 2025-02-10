import React, {useEffect, useState} from 'react';
import {Box, Button, Flex, HStack, Skeleton, SkeletonText, Text, useDisclosure, VStack} from "@chakra-ui/react";
import {useNavigate, useParams} from 'react-router-dom';
import {IProduct} from "../models/IProduct";
import {toCurrency} from "../utilities/formatCurrency";
import Counter from "../UI/Counter";
import {useCart} from "../context/CartContext";
import {FavoriteSwitcher} from "../UI/FavoriteSwitcher";
import MainBlockLayout from "../UI/MainBlockLayout";
import {isEmpty} from "../utilities/isEmpty";
import AddEditProductDrawer from "../modals/AddEditProductDrawer";
import Carousel from "../UI/Carousel";
import {ToastError, ToastSuccess} from "../utilities/error-handling";
import {useCategory} from "../context/CategoryContext";
import RemoveProductModal from "../modals/RemoveProductModal";
import ErrorMessage from "../UI/ErrorMessage";
import CategoryService from "../api/CategoryService";
import ProductService from "../api/ProductService";
import {AiOutlineReload} from 'react-icons/ai';
import { useAuth } from '../context/AuthContext';

export const Product = () => {
    const {productId} = useParams();
    const {isAdmin} = useAuth();
    const {getItemQuantity} = useCart();
    const [error, setError] = useState('');
    const [product, setProduct] = useState<IProduct>({} as IProduct);
    const [isLoading, setIsLoading] = useState(false);
    const editDisclosure = useDisclosure();
    const removeDisclosure = useDisclosure();
    const {currentCategory, categories, onChangeCategories} = useCategory();
    const navigate = useNavigate();

    const quantity = getItemQuantity(Number(productId));

    const getProduct = async () => {
        if (productId) {
            setError('');
            setIsLoading(true);
            try {
                const {data} = await ProductService.getProduct(productId);
                setProduct(data);
            } catch (e: any) {
                setError(e?.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            const {data} = await CategoryService.getCategories();
            onChangeCategories(data);
            setIsLoading(false);
        } catch (error: any) {
            setError(error?.message);
        }
    };

    useEffect(() => {
        getProduct();
        if (isEmpty(categories)) {
            fetchCategories();
        }
    }, []);

    const onEditProduct = async (result: IProduct) => {
        if (productId) {
            try {
                await ProductService.updateProduct(result, productId);
                ToastSuccess('The product has been updated successfully');
                editDisclosure.onClose();
            } catch (e: any) {
                ToastError(e?.message);
            } finally {
                getProduct();
            }
        }
    }

    const onRemoveProduct = async () => {
        if (productId) {
            try {
                await ProductService.deleteProduct(productId);
                ToastSuccess('The product has been removed successfully');
                navigate(`/${currentCategory?.name?.toLowerCase() ?? 'all'}`)
            } catch (e: any) {
                ToastError(e?.message);
            }
        }
    }

    return (
        <MainBlockLayout>
            {isLoading && <Flex gap={10} mt='40px'>
                <Skeleton height='400px' rounded='2xl' maxW='560px' flex={2} startColor='gray.300'
                          endColor='gray.300'/>
                <Flex flexDirection='column' justifyContent='center'  mt='-10px' flex={1} height='500px' maxW='500px' gap={5}>
                    <Skeleton height='84px' w='320px' mt={8} borderRadius='2xl'/>
                    <SkeletonText noOfLines={3} spacing='2' my={8}/>
                    <SkeletonText noOfLines={4} spacing='4'/>
                </Flex>
            </Flex>}

            {!isLoading && error && (
                <Box py='40px' textAlign='center'>
                    <ErrorMessage message={error}/>
                    <Button leftIcon={<AiOutlineReload/>} mt={6} onClick={() => getProduct()}>Обновить страницу</Button>
                </Box>
            )}

            {!isLoading && !isEmpty(product) &&
                <>
                    {isAdmin && <HStack mt={4}>
                        <Button onClick={editDisclosure.onOpen} colorScheme='yellow' minWidth='20%'>Редактировать
                            товар</Button>
                        <Button onClick={removeDisclosure.onOpen} colorScheme='red' minWidth='20%'>Удалить
                            товар</Button>

                    </HStack>}
                    <Flex gap={10} pt={4}>
                        <Flex maxH='560px'
                              maxW='560px'
                              minW='300px'
                              justifyContent='center'
                              flex={2}
                              position='relative'
                        >
                            <Carousel images={product.images}/>
                        </Flex>
                        <VStack spacing={8} flex={1} alignItems='start' justifyContent='center' mt='-100px'>
                            <Flex
                                border='1px solid' borderColor='gray.200' borderRadius='2xl' p={4}
                                justifyContent='space-between' alignItems='center' minW='320px' maxW='400px' gap={3}>
                                <Text flex={1} color='red.600'
                                      fontSize='x-large'>{toCurrency(product.price)}</Text>
                                <Box flex={1} textAlign='right'>
                                    <Counter product={product} quantity={quantity} buttonColor='yellow.400' buttonHoverColor='yellow.500'/>
                                </Box>
                            </Flex>
                            <HStack alignItems='flex-start'>
                                <Text fontSize='x-large' fontWeight='bold' noOfLines={5}>
                                    {product.title}
                                </Text>
                                {!isAdmin && <FavoriteSwitcher productId={product.id.toString()}/>}
                            </HStack>
                            <Text>{product.description}</Text>
                        </VStack>
                    </Flex>
                </>
            }
            <AddEditProductDrawer isEdit={true} product={product} isOpen={editDisclosure.isOpen}
                                  onClose={editDisclosure.onClose} onSubmit={onEditProduct}/>
            <RemoveProductModal product={product} isOpen={removeDisclosure.isOpen} onClose={removeDisclosure.onClose}
                                onRemoveProduct={onRemoveProduct}/>
        </MainBlockLayout>
    );
};