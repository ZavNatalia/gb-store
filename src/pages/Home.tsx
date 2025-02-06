import React from 'react';
import {
    Grid,
    GridItem
} from '@chakra-ui/react';
import {CategoryList} from "../components/category/CategoryList";
import ProductList from '../components/product/ProductList';
import CartSidebar from "../components/cart/CartSidebar";
import {useCart} from "../context/CartContext";
import { useAuth } from '../context/AuthContext';

export const Home = () => {
    const {isAdmin} = useAuth();
    const {isOpen} = useCart();
    return (
        <Grid
            templateAreas={`"nav main aside"`}
            gridTemplateRows={'1fr'}
            gridTemplateColumns={`230px minmax(350px, 1fr) ${isOpen && !isAdmin ? '400px' : 0}`}
            h='100%'
            color='blackAlpha.800'
            bg='gray.50'
        >
            <GridItem area={'nav'}>
                <CategoryList/>
            </GridItem>
            <GridItem area={'main'} overflow={"hidden"}>
                <ProductList/>
            </GridItem>
            <GridItem area={'aside'}>
                {isOpen && !isAdmin && <CartSidebar/>}
            </GridItem>
        </Grid>
    );
}
