import React from 'react';
import {IconButton} from "@chakra-ui/react";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {useCustomer} from "../context/CustomerContext";

interface FavoriteSwitcherProps {
    isFav: boolean,
    onAddFavorite: () => void
    onDeleteFavorite: () => void
}

export const FavoriteSwitcher = ({isFav, onAddFavorite, onDeleteFavorite}: FavoriteSwitcherProps) => {
    const {isAdmin, isAuth} = useCustomer();

    return (
        <IconButton icon={isFav ? <FaHeart/> : <FaRegHeart/>}
                    aria-label='Редактировать'
                    borderRadius='50%'
                    backgroundColor='white'
                    color={isFav ? 'red' : 'gray.400'}
                    boxShadow='lg'
                    fontSize='x-large'
                    _hover={{color: isFav ? 'gray.500' : 'red'}}
                    _focus={{boxShadow: 'none'}}
                    isDisabled={isAdmin || !isAuth}
                    onClick={() => isFav ? onDeleteFavorite() : onAddFavorite()}
        />
    );
};