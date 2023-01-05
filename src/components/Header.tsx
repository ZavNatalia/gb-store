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
import {ToastError, ToastSuccess} from "../utilities/error-handling";
import SignIn from '../modals/SignIn';
import SignUp from "../modals/SignUp";
import {ICustomer} from "../models/ICustomer";
import {Links} from './cart/Links';
import {isAdmin} from '../constants/isAdmin';
import {rootURL} from '../constants/URLs';
import EditProfileModal from '../modals/EditProfileModal';
import LogOut from '../modals/LogOut';

const ACCESS_TOKEN = 'access_token';

export const Header = () => {
    const {onChangeCurrentCategory} = useCategory();

    const [isAuth, setIsAuth] = useState(false);
    const [customer, setCustomer] = useState({} as ICustomer);
    const signInDisclosure = useDisclosure();
    const signUpDisclosure = useDisclosure();
    const logOutDisclosure = useDisclosure();
    const editProfileDisclosure = useDisclosure();

    useEffect(() => {
        if (getToken()) {
            getUserWithSession();
        }
    }, []);

    const setToken = (token: string) => {
        return localStorage.setItem(ACCESS_TOKEN, token);
    }
    const getToken = () => {
        return localStorage.getItem(ACCESS_TOKEN)
    }
    const removeToken = () => {
        return localStorage.removeItem(ACCESS_TOKEN)
    }

    const signInBySocial = async (source: string) => {
        ToastError('not implemented')
        // await axios.get(
        //     `${rootURL}/user/login/${source}`
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

    const signInByEmail = async ({firstname, email, password}: ICustomer) => {
        await axios.post(
            `${rootURL}/user/login`, {
                firstname, email, password
            }
        )
            .then(({data}) => {
                ToastSuccess('Вы успешно авторизовались');
                setToken(data.access_token);
                setCustomer({
                    firstname, email
                })
            })
            .catch(error => {
                ToastError(error.message);
            })
            .finally(() => {
                signInDisclosure.onClose();
                getUserWithSession();
            })
    }
    const signUpHandler = async ({firstname, email, password}: ICustomer) => {
        await axios.post(
            `${rootURL}/user/create`, {
                firstname, email, password
            }
        )
            .then(({data}) => {
                setCustomer(data)
                ToastSuccess('Вы успешно зарегистрировались');
                setToken(data.access_token);
            })
            .catch(error => {
                ToastError(error.message);
            })
            .finally(() => {
                signUpDisclosure.onClose();
                getUserWithSession();
            })
    }
    const logOutHandler = async () => {
        await axios.get(
            `${rootURL}/user/logout?id=${customer.id}`,
        )
            .then(() => {
                setCustomer({} as ICustomer)
                ToastSuccess('Вы вышли из аккаунта');
                setIsAuth(false);
                removeToken();
            })
            .catch(error => {
                ToastError(error.message);
            })
            .finally(() => {
                logOutDisclosure.onClose();
            })
    }

    const getUserWithSession = async () => {
        const token = getToken();
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
      await axios.get(`${rootURL}/user/profile`, config)
          .then(({data}) => {
              setCustomer(data);
              setIsAuth(true);
          })
          .catch(error => {
              ToastError(error.message);
              removeToken();
              setIsAuth(false);
          })
    }

    const onEditProfile = async (values: ICustomer) => {
        await axios.put(
            `${rootURL}/users/${customer.id}`, values
        )
            .then(({data}) => {
                setCustomer(data)
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
                        <image href="/imgs/logo.png" height="52" width="52"/>
                    </svg>
                    <Text ml={2} as='h1' fontSize='3xl' fontWeight='thin' textTransform='lowercase'>
                        Cozy Dragon
                    </Text>
                </Flex>
            </Link>
            <Flex alignItems={'center'}>
                {!isAuth && <HStack>
                    <Button onClick={signInDisclosure.onOpen} backgroundColor='gray.300' px={6}>Войти</Button>
                    <Button onClick={signUpDisclosure.onOpen} colorScheme={"yellow"} px={6}>Регистрация</Button>
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
                                src={customer?.avatar ?? '/imgs/avatar-placeholder.png'}
                                border='1px solid'
                                borderColor='gray.400'
                            />
                        </MenuButton>
                        <MenuList>
                            {!isAdmin &&
                                <MenuItem onClick={editProfileDisclosure.onOpen}>Профиль</MenuItem>
                            }
                            {!isAdmin && <MenuItem>Мои заказы</MenuItem>}
                            <MenuDivider/>
                            <MenuItem onClick={() => logOutHandler()}>Выйти</MenuItem>
                        </MenuList>
                    </Menu>
                </>}
            </Flex>

            <EditProfileModal customer={customer}
                              isOpen={editProfileDisclosure.isOpen}
                              onClose={editProfileDisclosure.onClose}
                              onEditProfile={onEditProfile}/>

            <SignIn isOpen={signInDisclosure.isOpen}
                    onClose={signInDisclosure.onClose}
                    onOpenSignUp={signUpDisclosure.onOpen}
                    signInHandler={signInBySocial}
                    signInByEmail={signInByEmail}/>
            <SignUp isOpen={signUpDisclosure.isOpen}
                    onClose={signUpDisclosure.onClose}
                    onOpenSignIn={signInDisclosure.onOpen}
                    signUpHandler={signUpHandler}/>
            <LogOut isOpen={logOutDisclosure.isOpen}
                    onClose={logOutDisclosure.onClose}
                    logOutHandler={logOutHandler}/>
        </Flex>
    );
}