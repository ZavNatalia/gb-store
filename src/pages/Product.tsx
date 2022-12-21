import React, {useEffect, useState} from 'react';
import {Box, Button, Flex, HStack, Skeleton, SkeletonText, Text, useDisclosure, VStack} from "@chakra-ui/react";
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import {IProduct} from "../models/IProduct";
import {formatCurrency} from "../utilities/formatCurrency";
import Counter from "../UI/Counter";
import {useCart} from "../context/CartContext";
import {FavouriteSwitcher} from "../UI/FavouriteSwitcher";
import MainBlockLayout from "../UI/MainBlockLayout";
import {isEmpty} from "../utilities/isEmpty";
import AddEditProductDrawer, {Values} from "../modals/AddEditProductDrawer";
import {isAdmin} from "../constants/isAdmin";
import Carousel from "../UI/Carousel";
import {ToastError, ToastSuccess} from "../utilities/error-handling";
import {useCategory} from "../context/CategoryContext";
import RemoveProductModal from "../modals/RemoveProductModal";
import ErrorMessage from "../UI/ErrorMessage";

export const Product = () => {
    const {productId} = useParams();
    const {getItemQuantity} = useCart();
    const [error, setError] = useState('');
    const [product, setProduct] = useState<IProduct>({} as IProduct);
    const [isLoading, setIsLoading] = useState(false);
    const editDisclosure = useDisclosure();
    const removeDisclosure = useDisclosure();
    const {currentCategory} = useCategory();
    const navigate = useNavigate();

    const quantity = getItemQuantity(Number(productId));

    const getProduct = async () => {
        setError('');
        setIsLoading(true);
        await axios
            .get(`https://api.escuelajs.co/api/v1/products/${productId}`)
            .then(response => {
                setProduct(response.data);
            }).catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getProduct();
    }, []);

    const onEditProduct = async (result: IProduct) => {
        await axios.put(`https://api.escuelajs.co/api/v1/products/${productId}`,
            result)
            .then(() => {
                    ToastSuccess('The product has been updated successfully');
                    editDisclosure.onClose();
                }
            )
            .catch((error) => {
                ToastError(error.message);
            })
            .finally(() => {
                getProduct();
            })
    }

    const onRemoveProduct = async () => {
        await axios.delete(`https://api.escuelajs.co/api/v1/products/${productId}`)
            .then(() => {
                    ToastSuccess('The product has been removed successfully');
                    navigate(`/${currentCategory?.name?.toLowerCase() ?? 'all'}`)
                }
            )
            .catch((error) => {
                ToastError(error.message);
            })
    }

    return (
        <MainBlockLayout>
            {isLoading && <Flex gap={10} pt={15}>
                <Skeleton height='500px' rounded='2xl' maxW='500px' flex={2} startColor='gray.300'
                          endColor='gray.300'/>
                <Flex flexDirection='column' justifyContent='center' flex={1} height='500px' gap={5}>
                    <SkeletonText noOfLines={3} spacing='4' pb={5}/>
                    <SkeletonText noOfLines={4} spacing='4'/>
                    <Skeleton height='48px' w='144px' mt={8} borderRadius='2xl'/>
                </Flex>
            </Flex>}

            {!isLoading && error && (
                <Box py='40px'>
                    <ErrorMessage message={error}/>
                </Box>
            )}

            {!isLoading && !isEmpty(product) &&
                <>
                    {isAdmin && <HStack mt={6}>
                        <Button onClick={editDisclosure.onOpen} colorScheme='yellow' minWidth='20%'>Редактировать
                            товар</Button>
                        <Button onClick={removeDisclosure.onOpen} colorScheme='red' minWidth='20%'>Удалить
                            товар</Button>

                    </HStack>}
                    <Flex gap={10} pt={6}>
                        <Flex maxH='600px'
                              maxW='600px'
                              minW='300px'
                              justifyContent='center'
                              flex={2}
                              position='relative'
                        >
                            <Carousel images={product.images}/>
                        </Flex>
                        <VStack spacing={8} flex={1} alignItems='start' justifyContent='center' mt='-60px'>
                            <HStack alignItems='flex-start'>
                                <Text fontSize='xx-large' noOfLines={3}>{product.title}</Text>
                                {!isAdmin && <FavouriteSwitcher isFav={true}/>}
                            </HStack>
                            <Text>{product.description}</Text>
                            <Flex
                                border='1px solid' borderColor='gray.200' borderRadius='2xl' p={4}
                                justifyContent='space-between' alignItems='center' minW='350px' w='100%' gap={3} my={5}
                                maxW='450px'>
                                <Text flex={1} color='red.600'
                                      fontSize='x-large'>{formatCurrency(Number(product.price))}</Text>
                                <Box flex={1} textAlign='right'>
                                    <Counter product={product} quantity={quantity} buttonColor='yellow.400'/>
                                </Box>
                            </Flex>
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