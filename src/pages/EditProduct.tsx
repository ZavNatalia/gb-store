import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Divider, Flex, Skeleton, SkeletonText, VStack} from "@chakra-ui/react";
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import {IProduct} from "../models/IProduct";
import MainBlockLayout from "../components/UI/MainBlockLayout";
import EditTitle from "../components/edit-product/EditTitle";
import {EditDescription} from "../components/edit-product/EditDescription";
import {EditPrice} from '../components/edit-product/EditPrice';
import {EditImage} from "../components/edit-product/EditImage";
import {useCategory} from "../context/CategoryContext";
import EditCategory from "../components/edit-product/EditCategory";
import ErrorMessage from "../components/UI/ErrorMessage";
import {isEmpty} from "../utilities/isEmpty";
import {ICategory} from "../models/ICategory";
import {MdDelete} from 'react-icons/md';
import {ToastError, ToastSuccess} from "../utilities/error-handling";
import {rootURL} from "../constants/URLs";

export const EditProduct = () => {
    const {productId} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({} as IProduct);
    const [error, setError] = useState('');
    const {categories, currentCategory} = useCategory();
    const navigate = useNavigate();

    const [isInStock, setIsInStock] = useState(false);

    const getProduct = async () => {
        setIsLoading(true);
        await axios
            .get(`${rootURL}/items/${productId}`)
            .then(({data}) => {
                setProduct(data);
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

    const updateCategory = (categoryName: string) => {
        const selectedCategory: ICategory = categories.find(category => category.name === categoryName) ?? currentCategory;
        setProduct({...product, category: selectedCategory})
    }

    const updateTitle = (v: string) => setProduct({...product, title: v})
    const updateDescription = (v: string) => setProduct({...product, description: v})
    const updatePrice = (v: string) => setProduct({...product, price: +v})
    const updateImage = (v: string) => setProduct({...product, image: [v]})


    // const updateIsInStock = (e: ChangeEvent<HTMLInputElement>) => setProduct({...product, inStock: e.target.value})
    const updateIsInStock = (e: any) => {
        setIsInStock(e.target.checked)
    }

    const onSaveChanges = async () => {
        await axios.put(`${rootURL}/items/update`, product)
            .then(() => {
                    ToastSuccess('The product has been updated successfully');
                }
            )
            .catch((error) => {
                ToastError(error.message);
            });
    }

    const onRemoveProduct = async () => {
        await axios.delete(`${rootURL}/items/${productId}`)
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
            {isLoading && <Flex gap={10} pt={20}>
                <Skeleton height='400px' rounded='2xl' maxW='400px' flex={2} startColor='gray.300' endColor='gray.300'/>
                <Flex flexDirection='column' justifyContent='center' flex={1} height='400px' gap={5}>
                    <SkeletonText noOfLines={3} spacing='4' pb={5}/>
                    <SkeletonText noOfLines={4} spacing='4'/>
                    <Skeleton height='48px' w='144px' mt={8} borderRadius='2xl'/>
                </Flex>
            </Flex>}
            {!isLoading && error && <ErrorMessage message={error}/>}
            {!isLoading && !isEmpty(product) &&
                <Flex gap={5} pt={20} minH='555px'>
                    <EditImage image={product?.image[0]} updateImage={updateImage}/>
                    <VStack spacing={5} flex={1} alignItems='start' justifyContent='center' alignSelf='start'>
                        <EditCategory category={product.category} updateCategory={updateCategory}/>
                        <Checkbox iconSize='lg' colorScheme='yellow' isChecked={isInStock} onChange={updateIsInStock}>
                            Есть в наличии
                        </Checkbox>
                        <Divider/>
                        <EditTitle
                            title={product.title}
                            updateTitle={updateTitle}
                        />
                        <EditDescription
                            description={product.description}
                            updateDescription={updateDescription}
                        />
                        <EditPrice
                            price={+product.price}
                            updatePrice={updatePrice}/>
                        <Divider/>
                        <Flex gap={4}>
                            <Button
                                leftIcon={<MdDelete/>}
                                colorScheme='red'
                                boxShadow='md'
                                rounded='2xl'
                                variant='outline'
                                px={6}
                                py={6}
                                onClick={() => onRemoveProduct()}
                            >
                                Удалить товар
                            </Button>
                            <Button colorScheme='yellow'
                                    boxShadow='md'
                                    rounded='2xl'
                                    px={6}
                                    py={6}
                                    onClick={() => onSaveChanges()}
                            >
                                Сохранить изменения
                            </Button>
                        </Flex>
                    </VStack>
                </Flex>
            }
        </MainBlockLayout>
    );
};