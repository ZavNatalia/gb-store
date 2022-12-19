import {Box, Flex, Image, Stack, Text} from '@chakra-ui/react';
import {FC} from "react";
import {Link} from 'react-router-dom';
import { isAdmin } from '../../constants/isAdmin';
import {useCart} from "../../context/CartContext";
import {IProduct} from '../../models/IProduct';
import {formatCurrency} from "../../utilities/formatCurrency";
import Counter from "../UI/Counter";
import {FavouriteSwitcher} from "../UI/FavouriteSwitcher";

interface ProductItemProps {
    product: IProduct
}

export const ProductItem: FC<ProductItemProps> = ({product}) => {
    const {id, images, price, title} = product;
    const {getItemQuantity} = useCart();
    const quantity = getItemQuantity(id);

    const isFav = false;

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
            {!isAdmin && <Box position='absolute'
                             right={2}
                             top={2}>
                <FavouriteSwitcher isFav={isFav}/>
            </Box>

           }
            <Box py={4}>
                <Link
                    to={isAdmin ? `/edit/${id}/${title}` : `/${product.category?.name?.toLowerCase()}/${product.id}/${product.title}`}>
                    <Flex height='250px' width='100%' justifyContent='center'>
                        <Image
                            maxH='100%'
                            maxW='100%'
                            objectFit={'contain'}
                            src={images[0]}
                            fallbackSrc={'/imgs/placeholder-image.jpg'}
                        />
                    </Flex>
                    <Stack height='130px' alignItems='start' justifyContent='center' px={4}>
                        <Text fontWeight={700} fontSize={'xl'}>
                            {formatCurrency(Number(price))}
                        </Text>
                        <Text textAlign='left' fontSize={'md'} fontWeight={500} noOfLines={3}>
                            {title}
                        </Text>
                    </Stack>
                </Link>
                {!isAdmin && <Box px={4}>
                    <Counter product={product} quantity={quantity}/>
                </Box>}
            </Box>
        </Flex>
    );
}