import React, { ReactNode, useContext, useEffect, useState } from "react";
import {IUser} from "../models/IUser";
import { getToken, removeToken } from '../utilities/local-storage-handling';
import axios from 'axios';
import { rootURL } from '../constants/URLs';

type AuthProviderProps = {
    children: ReactNode
}

type AuthContextProps = {
    user: IUser,
    isAuth: boolean,
    isAdmin: boolean,
    isLoading: boolean,
    getUserWithSession: () => void,
    onChangeUser: (value: IUser) => void
}

const AuthContext = React.createContext({} as AuthContextProps);

export const useAuth = () =>  useContext(AuthContext);

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<IUser>({} as IUser);
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const onChangeUser = (value: IUser) => {
        setUser(value);
    }
    const getUserWithSession = async () => {
        const token = getToken(); // Функция получения токена
        if (!token) {
            setIsAuth(false);
            setIsLoading(false);
            return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            const { data } = await axios.get(`${rootURL}/auth/profile`, config);
            setUser(data);
            setIsAuth(true);
            setIsAdmin(data.role === "admin");
        } catch (error) {
            console.error("Ошибка при получении профиля:", error);
            removeToken();
            setIsAuth(false);
            setIsAdmin(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getUserWithSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuth, isAdmin, isLoading, getUserWithSession, onChangeUser }}>
            {children}
        </AuthContext.Provider>
    )
}
