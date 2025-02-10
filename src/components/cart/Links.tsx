import CartButton from "./CartButton";
import {IconButton} from "@chakra-ui/react";
import {MdFavorite} from "react-icons/md";
import React from "react";

export const Links = [
    {
        title: 'Cart',
        icon: <CartButton/>,
        path: 'cart'
    },
    {
        title: 'Favorite',
        icon: <IconButton aria-label='Избранное' fontSize='x-large' icon={<MdFavorite/>}/>,
        path: 'favorites'
    }
];
