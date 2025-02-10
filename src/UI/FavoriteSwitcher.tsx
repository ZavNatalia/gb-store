import React, { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";

interface FavoriteSwitcherProps {
    productId: string;
}

export const FavoriteSwitcher = ({ productId }: FavoriteSwitcherProps) => {
    const { favorites, toggleFavorite } = useFavorites();
    const [isFav, setIsFav] = useState<boolean>(false);

    useEffect(() => {
        setIsFav(favorites.includes(productId));
    }, [favorites, productId]);

    const handleToggle = () => {
        toggleFavorite(productId);
        setIsFav(!isFav);
    };

    return (
        <IconButton
            icon={<FaRegHeart />}
            aria-label="Добавить в избранное"
            borderRadius="50%"
            backgroundColor="white"
            color={isFav ? "red" : "gray.400"}
            boxShadow="md"
            fontSize="x-large"
            _hover={{ color: isFav ? "gray.400" : "red" }}
            onClick={handleToggle}
        />
    );
};
