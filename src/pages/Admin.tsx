import React from 'react';
import {Grid, GridItem} from "@chakra-ui/react";
import {CategoryList} from "../components/category/CategoryList";
import ProductList from "../components/product/ProductList";

export const Admin = () => {
    return (
        <>
            <Grid
                templateAreas={`"nav main"`}
                gridTemplateRows={'1fr'}
                gridTemplateColumns={'320px 1fr'}
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
            </Grid>
        </>

    );
};
