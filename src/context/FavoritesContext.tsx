import React, { ReactNode, useContext, useEffect, useState } from "react";

type FavoritesContextType = {
    favorites: string[],
    toggleFavorite: (productId: string) => void;
    clearFavorites: () => void;
}

const FavoritesContext = React.createContext({} as FavoritesContextType);

export const useFavorites = () =>  useContext(FavoritesContext);

export const FavoritesProvider = ({children}: {children: ReactNode}) => {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(storedFavorites);
    }, []);

    const toggleFavorite = (productId: string) => {
        setFavorites(prev => {
            const updatedFavorites = prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId];

            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    const clearFavorites = () => {
        localStorage.removeItem("favorites");
        setFavorites([]);
    };

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                toggleFavorite,
                clearFavorites,
            }}>
            {children}
        </FavoritesContext.Provider>
    )
}
