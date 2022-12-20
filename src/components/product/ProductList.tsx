import {Box, Button, Center, Flex, Heading, SimpleGrid, Text, useDisclosure} from '@chakra-ui/react';
import React, {useEffect, useMemo, useState} from 'react';
import {ProductItem} from "./ProductItem";
import axios from "axios";
import {IProduct} from '../../models/IProduct';
import ErrorMessage from "../UI/ErrorMessage";
import {useCategory} from "../../context/CategoryContext";
import {GrAdd} from "react-icons/gr";
import AddEditProductDrawer, {Values} from '../modals/AddEditProductDrawer';
import {isEmpty} from "../../utilities/isEmpty";
import {ToastError, ToastSuccess} from '../../utilities/error-handling';
import Loader from "../UI/Loader";
import SkeletonList from '../UI/SkeletonList';
import { isAdmin } from '../../constants/isAdmin';

const ProductList = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [error, setError] = useState('');
    const [offset, setOffset] = useState(0);
    const [limit] = useState(8);
    const {currentCategory, onChangeCurrentCategory, categories} = useCategory();
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [isLoading, setIsLoading] = useState(true);
    const [contentLength, setContentLength] = useState(0);

    const fetchProducts = async () => {
        setError('');
        await axios.get(
            isEmpty(currentCategory)
                ? `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
                : `https://api.escuelajs.co/api/v1/categories/${currentCategory.id}/products?offset=${offset}&limit=${limit}`
        )
            .then(response => {
                setProducts([...products, ...response.data]);
                setOffset(prevState => prevState + limit);
                setContentLength(+response.headers['content-length']);
            })
            .catch(e => setError(e.message))
            .finally(() => {
                setIsLoading(false)
            });
    };

    useEffect(() => {
        if (isLoading) {
            fetchProducts();
        }
    }, [isLoading]);

    const updateList = () => {
        setIsLoading(true);
        setProducts([]);
        setOffset(0);
        window.scroll({
            top: 0,
            left: 0,
        });
    }

    useEffect(() => {
        updateList();
    }, [currentCategory]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    })

    const scrollHandler = (e: any) => {
        const scrollHeight = e.target.documentElement.scrollHeight;
        const scrollTop = e.target.documentElement.scrollTop;
        const innerHeight = window.innerHeight;
        if (scrollHeight - (scrollTop + innerHeight) < 200 && contentLength > 2) {
            setIsLoading(true)
        }
    }

    const onChangeCategory = (id: number) => {
        const selectedCategory = categories.find(c => c.id == id);
        if (selectedCategory) {
            onChangeCurrentCategory(selectedCategory)
        }
    }

    const onAddNewProduct = async (values: IProduct) => {
        const result = {
            "title": values.title,
            "price": values.price,
            "description": values.description,
            "categoryId": values.category.id,
            "images": values.images
        };

        await axios.post('https://api.escuelajs.co/api/v1/products/', result)
            .then(() => {
                if (currentCategory.id !== values.category.id) {
                    onChangeCategory(values.category.id);
                }
                ToastSuccess('Товар был успешно добавлен');
                onClose();
            })
            .catch(error => {
                ToastError(error.message);
            }).finally(() => {
                updateList();
            })
    }

    const memoizedList = useMemo(() => (
        <>
            {products.map(product => (
                <ProductItem product={product} key={product.id}/>
            ))}
        </>
    ), [products]);

    const NoContent = () => {
        return isLoading ? <SkeletonList amount={8}/> : (
            <Center h='50vh'>
                <Text color='gray'>В данной категории нет товаров</Text>
            </Center>
        )
    }

    if (error) {
        return <Box py='40px'>
            <ErrorMessage message={error}/>
        </Box>
    }

    return (
        <Box
            textAlign='left'
            py='40px'
            px='50px'
            width='100%'
            height='100%'
            bg='gray.50'
            overflowY='auto'
        >
            <>
                <Flex justifyContent='space-between' gap={5}>
                    <Heading mb={5}>{currentCategory?.name?.toUpperCase() ?? 'All'.toUpperCase()}</Heading>
                    {isAdmin &&
                        <Button
                            position='fixed'
                            right='50px'
                            boxShadow='md'
                            zIndex='10'
                            rightIcon={<GrAdd/>}
                            px={6}
                            minW='fit-content'
                            colorScheme='yellow'
                            fontWeight='normal'
                            onClick={onOpen}>
                            Добавить новый товар
                        </Button>
                    }
                </Flex>
                <SimpleGrid minChildWidth='250px' width='100%' spacing='10'>
                    {products.length === 0 ? <NoContent/> : memoizedList}
                </SimpleGrid>
                {isLoading && products.length > 0 && (
                    <Center mt={10}>
                        <Loader/>
                    </Center>
                )}
            </>
            <AddEditProductDrawer isEdit={false} isOpen={isOpen} onClose={onClose} onSubmit={onAddNewProduct}/>
        </Box>
    );
};

export default ProductList;
