import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Button,
    Flex,
    HStack,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import {useCategory} from "../context/CategoryContext";
import {ICategory} from '../models/ICategory';
import axios from "axios";
import {ToastError, ToastInfo, ToastSuccess} from "../utilities/error-handling";
import SignIn from '../modals/SignIn';
import SignUp from "../modals/SignUp";
import {IUser} from "../models/IUser";
import {Links} from './cart/Links';
import {rootURL} from '../constants/URLs';
import EditProfileModal from '../modals/EditProfileModal';
import {removeToken, setToken} from "../utilities/local-storage-handling";
import {useAuth} from "../context/AuthContext";
import {useCart} from "../context/CartContext";

export const Header = () => {
    const {user, isAuth, isAdmin, onChangeUser, getUserWithSession} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const signInDisclosure = useDisclosure();
    const signUpDisclosure = useDisclosure();
    const editProfileDisclosure = useDisclosure();
    const {emptyCart} = useCart();
    const {onChangeCurrentCategory} = useCategory();

    useEffect(() => {
        getUserWithSession();
    }, [])

    const signInBySocial = async (source: string) => {
        ToastInfo('not implemented');
        // await axios.get(
        //     `/user/login/${source}`
        // )
        //     .then(({data}) => {
        //         ToastSuccess('Вы успешно авторизовались');
        //         setIsAuth(true);
        //     })
        //     .catch(error => {
        //         ToastError(error.message);
        //     })
        //     .finally(() => {
        //         signInDisclosure.onClose();
        //     })
    }

    const signInByEmail = async ({email, password}: IUser) => {
        setIsLoading(true);
        await axios.post(
            `${rootURL}/auth/login`, {
                email, password
            }
        )
            .then(({data}) => {
                ToastSuccess('Вы успешно авторизовались');
                setToken(data.access_token);
            })
            .catch(error => {
                ToastError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
                signInDisclosure.onClose();
                getUserWithSession();
            })
    }
    const signUpHandler = async (data: IUser) => {
        setIsLoading(true);
        await axios.post(
            `${rootURL}/users/`, data
        )
            .then(() => {
                ToastSuccess('Вы успешно зарегистрировались и можете авторизоваться');
            })
            .catch(error => {
                ToastError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
                signUpDisclosure.onClose();
            })
    }

    const logOutHandler = () => {
        removeToken();
        onChangeUser(null);
        emptyCart();
    }
    const onEditProfile = async (values: IUser) => {
        await axios.put(
            `${rootURL}/users/${user?.id}`, values
        )
            .then(({data}) => {
                onChangeUser(data);
                ToastSuccess('Ваши данные были успешно изменены');
            })
            .catch(error => {
                ToastError(error.message);
            })
            .finally(() => {
                editProfileDisclosure.onClose();
            })
    }

    return (
        <Flex bg='gray.100'
              position='sticky'
              top='0'
              left='0'
              w='100%'
              height='80px'
              padding={5}
              boxShadow='md'
              alignItems='center'
              justifyContent='space-between'
              zIndex={100}
        >
            <Link to='/all' onClick={() => onChangeCurrentCategory({} as ICategory)}>
                <Flex alignItems='center' color='gray.500' textTransform={"uppercase"} ml={4}>
                    <svg width="52" height="52"
                         xmlns="http://www.w3.org/2000/svg">
                        <image href="/imgs/logo.svg" height="52" width="52"/>
                    </svg>
                    <Text ml={2} as='h1' fontSize='4xl' fontWeight='thin' textTransform='lowercase'>
                        store
                    </Text>
                </Flex>
            </Link>
            <Flex alignItems={'center'}>
                {!isAuth && <HStack>
                    <Button backgroundColor='gray.200' px={6} _hover={{backgroundColor: 'gray.300'}} onClick={signInDisclosure.onOpen}>
                        Войти
                    </Button>
                    <Button colorScheme="yellow" px={6} onClick={signUpDisclosure.onOpen}>
                        Регистрация
                    </Button>
                </HStack>}

                {isAuth && <>
                    <HStack
                        as={'nav'}
                        spacing={2}
                        marginX={6}
                        fontSize='25px'>
                        {!isAdmin && Links.map(({title, icon, path}) => (
                            <Link to={path} key={title}>
                                {icon}
                            </Link>
                        ))}
                        {isAdmin && <Text>Панель администратора</Text>}
                    </HStack>
                    <Menu>
                        <MenuButton
                            as={Button}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                            minW={0}>
                            <Avatar
                                size={'md'}
                                src={user?.avatar}
                                border='1px solid'
                                borderColor='gray.400'
                            />
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={editProfileDisclosure.onOpen} >Профиль</MenuItem>
                            {!isAdmin &&
                                <Link to={'/orders'}>
                                    <MenuItem>Мои заказы</MenuItem>
                                </Link>
                            }                            <MenuDivider/>
                            <MenuItem onClick={() => logOutHandler()}>Выйти</MenuItem>
                        </MenuList>
                    </Menu>
                </>}
            </Flex>

            {user && <EditProfileModal customer={user}
                               isOpen={editProfileDisclosure.isOpen}
                               onClose={editProfileDisclosure.onClose}
                               onEditProfile={onEditProfile}/>}

            <SignIn isOpen={signInDisclosure.isOpen}
                    isLoading={isLoading}
                    onClose={signInDisclosure.onClose}
                    onOpenSignUp={signUpDisclosure.onOpen}
                    signInHandler={signInBySocial}
                    signInByEmail={signInByEmail}/>
            <SignUp isOpen={signUpDisclosure.isOpen}
                    isLoading={isLoading}
                    onClose={signUpDisclosure.onClose}
                    onOpenSignIn={signInDisclosure.onOpen}
                    signUpHandler={signUpHandler}/>
        </Flex>
    );
}