import * as React from "react"
import {
    ChakraProvider,
    theme,
} from "@chakra-ui/react"
import {CartProvider} from "./context/CartContext";
import {Layout} from "./UI/Layout";
import AppRouter from "./router/AppRouter";
import {CategoryProvider} from "./context/CategoryContext";

export const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <CartProvider>
                <CategoryProvider>
                    <Layout>
                        <AppRouter/>
                    </Layout>
                </CategoryProvider>
            </CartProvider>
        </ChakraProvider>
    )
}
