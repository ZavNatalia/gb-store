import {Box, Flex, Image, Stack, Text} from '@chakra-ui/react';
import {FC} from "react";
import {Link} from 'react-router-dom';
import {useCart} from "../../context/CartContext";
import {IProduct} from '../../models/IProduct';
import {toCurrency} from "../../utilities/formatCurrency";
import Counter from "../../UI/Counter";
import {FavoriteSwitcher} from "../../UI/FavoriteSwitcher";
import {useCustomer} from "../../context/CustomerContext";
import ProductService from "../../api/ProductService";
import {ToastError} from "../../utilities/error-handling";
import {slashEscape} from "../../utilities/RegExpURL";
import { getHeaderConfig } from '../../utilities/getHeaderConfig';

interface ProductItemProps {
    product: IProduct
}

export const ProductItem: FC<ProductItemProps> = ({product}) => {
    const {id, image, price, title} = product;
    const {getItemQuantity} = useCart();
    const {isAdmin, isAuth, customer} = useCustomer();

    const onAddFavorite = async () => {
        try {
            const config = getHeaderConfig();
            await ProductService.addFavoriteProduct(customer.id, id, config);
        } catch (e: any) {
            ToastError(e?.message);
        }
    }
    const onDeleteFavorite = async () => {

        try {
            const config = getHeaderConfig();
            await ProductService.deleteFavoriteProduct(customer.id, id, config);
        } catch (e: any) {
            ToastError(e?.message);
        }
    }


    return (
        <Flex
            maxW='300px'
            overflow='hidden'
            bg='gray.100'
            border='1px solid'
            borderColor='gray.100'
            zIndex={1}
            rounded='2xl'
            flexDirection='column'
            transition={'all .3s ease'}
            _hover={{backgroundColor: 'gray.200'}}
            justifyContent='space-between'
            position='relative'
        >
            {isAuth && <Box position='absolute'
                            right={2}
                            top={2}>
                <FavoriteSwitcher isFav={product.isFavourite} onAddFavorite={onAddFavorite}
                                  onDeleteFavorite={onDeleteFavorite}/>
            </Box>}
            <Box py={4}>
                <Link
                    to={isAdmin
                        ? `/edit/${id}/${slashEscape(title)}`
                        : `/${slashEscape(product.category?.name)?.toLowerCase()}/${product.id}/${slashEscape(product.title)}`}>
                    <Flex height='250px' width='100%' justifyContent='center'>
                        {image && <Image
                            maxH='100%'
                            maxW='100%'
                            objectFit={'contain'}
                            src={image[0]}
                            fallbackSrc={'/imgs/placeholder-image.jpg'}
                        />}
                    </Flex>
                    <Stack height='130px' alignItems='start' justifyContent='center' px={4}>
                        <Text fontWeight={700} fontSize={'xl'}>
                            {toCurrency(price)}
                        </Text>
                        <Text textAlign='left' fontSize={'md'} fontWeight={500} noOfLines={3}>
                            {title}
                        </Text>
                    </Stack>
                </Link>
                <Box px={4}>
                    <Counter product={product} quantity={getItemQuantity(product.id)}/>
                </Box>
            </Box>
        </Flex>
    );
}