import React from 'react';
import {IconButton} from "@chakra-ui/react";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import { useAuth } from '../context/AuthContext';

interface FavouriteSwitcherProps {
    isFav: boolean
}

export const FavouriteSwitcher = ({isFav}: FavouriteSwitcherProps) => {
    const onAddFavourite = () => {}
    const onDeleteFavourite = () => {}
    const {isAdmin} = useAuth();
    return (
        <IconButton icon={isFav ? <FaHeart/> : <FaRegHeart/>}
                    aria-label='Редактировать'
                    borderRadius='50%'
                    backgroundColor='white'
                    color={isFav ? 'red' : 'gray.400'}
                    boxShadow='lg'
                    fontSize='x-large'
                    _hover={{color: isFav ? 'gray.500' : 'red'}}
                    isDisabled={isAdmin}
                    onClick={() => isFav ? onDeleteFavourite() : onAddFavourite()}
        />
    );
};