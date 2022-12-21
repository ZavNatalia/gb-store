import React from 'react';
import {
    Grid,
    GridItem
} from '@chakra-ui/react';
import {CategoryList} from "../components/category/CategoryList";
import ProductList from '../components/product/ProductList';
import CartSidebar from "../components/cart/CartSidebar";

export const Home = () => {
    return (
        <Grid
            templateAreas={`"nav main aside"`}
            gridTemplateRows={'1fr'}
            gridTemplateColumns={'220px 1fr 450px'}
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
                <CartSidebar/>
            </GridItem>
        </Grid>
    );
}
