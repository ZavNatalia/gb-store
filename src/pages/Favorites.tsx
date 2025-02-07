import { Button, Flex, Heading, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import { IoIosHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";
import MainBlockLayout from "../UI/MainBlockLayout";
import { ProductItem } from "../components/product/ProductItem";
import { useCategory } from "../context/CategoryContext";
import { useFavorites } from "../context/FavoritesContext";

export const Favorites = () => {
    const { favorites } = useFavorites();
    const { currentCategory } = useCategory();

    const EmptyList = () => (
        <Flex alignItems="center" justifyContent="center" gap={4} flexDirection="column" mt={10}>
            <Icon fontSize="140px" color="gray.400" as={IoIosHeartEmpty} />
            <Heading fontSize="xx-large" my={2}>В избранном ничего нет</Heading>
            <Text color="gray" textAlign="center">
                Здесь пока ничего нет, но вы можете <br />
                добавить товар в избранное, кликнув на ❤️
            </Text>
            <Link to={`/${currentCategory?.name?.toLowerCase() ?? "all"}`}>
                <Button colorScheme="yellow" px={10} mt={6}>
                    В каталог
                </Button>
            </Link>
        </Flex>
    );

    return (
        <MainBlockLayout title="Избранное">
            {favorites.length > 0 ? (
                <SimpleGrid minChildWidth="210px" width="100%" spacing="6">
                    {favorites.map(productId => (
                        <ProductItem productId={productId} key={productId} />
                    ))}
                </SimpleGrid>
            ) : (
                <EmptyList />
            )}
        </MainBlockLayout>
    );
};
