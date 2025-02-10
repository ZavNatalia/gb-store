import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { IProduct } from "../../models/IProduct";
import { toCurrency } from "../../utilities/formatCurrency";
import Counter from "../../UI/Counter";
import {FavoriteSwitcher} from "../../UI/FavoriteSwitcher";
import { useAuth } from "../../context/AuthContext";
import ProductService from "../../api/ProductService";

interface ProductItemProps {
    product?: IProduct;
    productId?: string;
}

export const ProductItem: FC<ProductItemProps> = ({ product, productId }) => {
    const { isAdmin } = useAuth();
    const { getItemQuantity } = useCart();

    const [currentProduct, setCurrentProduct] = useState<IProduct | null>(product || null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (!product && productId) {
            fetchProduct(productId);
        }
    }, [productId]);

    const fetchProduct = async (id: string) => {
        setIsLoading(true);
        setError("");

        try {
            const { data } = await ProductService.getProduct(id);
            setCurrentProduct(data);
        } catch (e: any) {
            setError("Ошибка загрузки товара");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Text>Загрузка...</Text>;
    }

    if (error) {
        console.log('Error:', error);
        return null;
    }

    if (!currentProduct) {
        console.log('Error:', error);
        return null;
    }

    const { id, images, price, title } = currentProduct;
    const quantity = getItemQuantity(id);

    return (
        <Flex
            maxW="220px"
            overflow="hidden"
            bg="gray.100"
            border="1px solid"
            borderColor="gray.100"
            zIndex={1}
            rounded="2xl"
            flexDirection="column"
            transition="all .3s ease"
            _hover={{ backgroundColor: "gray.200" }}
            justifyContent="space-between"
            position="relative"
            boxShadow="md"
        >
            {!isAdmin && <Box position="absolute" right={2} top={2}>
                <FavoriteSwitcher productId={currentProduct.id.toString()}/>
            </Box>}
            <Box pb={2}>
                <Link
                    to={isAdmin ? `/edit/${id}/${encodeURIComponent(title)}` : `/${currentProduct.category?.name?.toLowerCase()}/${id}/${encodeURIComponent(title)}`}
                >
                    <Flex height="220px" width="100%" justifyContent="center">
                        <Image
                            maxH="100%"
                            maxW="100%"
                            objectFit="contain"
                            src={images?.[0] || "/imgs/placeholder-image.jpg"}
                            fallbackSrc="/imgs/placeholder-image.jpg"
                        />
                    </Flex>
                    <Stack height="130px" alignItems="start" justifyContent="center" px={4}>
                        <Text fontWeight={700} fontSize="xl">
                            {toCurrency(price)}
                        </Text>
                        <Text textAlign="left" fontSize="md" fontWeight={500} noOfLines={3}>
                            {title}
                        </Text>
                    </Stack>
                </Link>
                <Box px={2}>
                    <Counter product={currentProduct} quantity={quantity} />
                </Box>
            </Box>
        </Flex>
    );
};
