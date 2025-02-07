import * as React from "react"
import {
    ChakraProvider,
    theme,
} from "@chakra-ui/react"
import {CartProvider} from "./context/CartContext";
import {Layout} from "./UI/Layout";
import AppRouter from "./router/AppRouter";
import {CategoryProvider} from "./context/CategoryContext";
import {AuthProvider} from "./context/AuthContext";
import { FavoritesProvider } from './context/FavoritesContext';

export const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <CartProvider>
                <CategoryProvider>
                    <AuthProvider>
                        <FavoritesProvider>
                            <Layout>
                                <AppRouter/>
                            </Layout>
                        </FavoritesProvider>
                    </AuthProvider>
                </CategoryProvider>
            </CartProvider>
        </ChakraProvider>
    )
}
