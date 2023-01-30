import React, {useEffect, useMemo, useState} from 'react';
import {IProduct} from "../../models/IProduct";
import {useCategory} from "../../context/CategoryContext";
import {getUserId} from "../../utilities/local-storage-handling";
import ProductService from "../../api/ProductService";
import {ToastError} from "../../utilities/error-handling";
import {Box, Button, Center, Flex, Heading, Icon, SimpleGrid, Text} from "@chakra-ui/react";
import {IoIosHeartEmpty} from "react-icons/io";
import {MdFavorite} from "react-icons/md";
import {Link} from "react-router-dom";
import SkeletonList from "../../UI/SkeletonList";
import {ProductItem} from '../product/ProductItem';
import ErrorMessage from '../../UI/ErrorMessage';
import {slashEscape} from "../../utilities/RegExpURL";
import { getHeaderConfig } from '../../utilities/getHeaderConfig';

const FavoritesList = () => {
    const [list, setList] = useState([] as IProduct[]);
    const [favListQuantity, setFavListQuantity] = useState(0);
    const {currentCategory} = useCategory();

    const [error, setError] = useState('');
    const [offset, setOffset] = useState(0);
    const [limit] = useState(8);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        updateList();
        fetchFavListQuantity();
    }, [])

    useEffect(() => {
        if (isLoading) {
            fetchFavList();
        }
    }, [isLoading]);

    const fetchFavList = async () => {
        setError('');
        if (list.length < favListQuantity) {
            try {
                const config = getHeaderConfig();
                const userId = getUserId();
                if (userId) {
                    const {data} = await ProductService.getFavoriteProducts(userId, limit, offset, config)
                    setList([...list, ...data]);
                    setOffset(prevState => prevState + limit);
                }

            } catch (e: any) {
                if (list?.length > 0) {
                    ToastError('Не удалось загрузить список избранных товаров');
                } else {
                    setError('Не удалось загрузить список избранных товаров. Повторите попытку позже.');
                }
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    };

    const fetchFavListQuantity = async () => {
        setError('');
        try {
            const userId = getUserId();
            if (userId) {
                const config = getHeaderConfig();
                const {data} = await ProductService.getFavListQuantity(userId, config);
                setFavListQuantity(data.quantity);
                if (data.quantity > 0) {
                    setIsLoading(true);
                } else {
                    setIsLoading(false);
                }
            }
        } catch (e: any) {
            if (list?.length > 0) {
                ToastError('Не удалось загрузить список товаров');
            } else {
                setError('Не удалось загрузить список товаров. Повторите попытку позже.');
            }
        }
    };

    const updateList = () => {
        window.scroll({
            top: 0,
            left: 0,
        });
        setList([]);
        setOffset(0);
    }

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
        if (scrollHeight - (scrollTop + innerHeight) < 150 && favListQuantity > 0 && offset < favListQuantity) {
            setIsLoading(true)
        }
    }

    const memoizedList = useMemo(() => (
        <>
            {list?.map(product => (
                <ProductItem product={product} key={product.id}/>
            ))}
        </>
    ), [list]);


    const EmptyList = () => (
        <Flex alignItems='center' justifyContent='center' gap={4} flexDirection='column' mt={10}>
            <Icon fontSize='140px' color='gray.400' as={IoIosHeartEmpty}/>
            <Heading fontSize='xx-large' my={2}>В избранном ничего нет</Heading>
            <Text color='gray' textAlign='center'>Здесь пока ничего нет, но вы можете
                <br/>добавить товар в избранное, кликнув на <Icon as={MdFavorite}/></Text>
            <Link to={`/${slashEscape(currentCategory?.name) ?? ''}`}>
                <Button colorScheme='yellow' px={10} mt={6}>
                    В каталог
                </Button>
            </Link>
        </Flex>
    )

    if (error && list?.length === 0) {
        return <Center h='50vh'>
            <Box py='40px' textAlign='center'>
                <ErrorMessage message={error} borderRadius='2xl'/>
            </Box>
        </Center>
    }

    return (
        <>
            <Box
                textAlign='left'
                py='40px'
                px='50px'
                width='100%'
                height='100%'
                bg='gray.50'
                overflowY='auto'
            >
                <SimpleGrid minChildWidth='210px' width='100%' spacing='6'>
                    {isLoading && list?.length === 0 && <SkeletonList amount={8}/>}
                    {memoizedList}
                </SimpleGrid>
                {!isLoading && list?.length === 0 && <EmptyList/>}
            </Box>

        </>
    );
};

export default FavoritesList;