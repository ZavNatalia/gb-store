import React, {ReactNode} from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Text,
} from '@chakra-ui/react';
import {MdFavorite} from 'react-icons/md';
import {Link} from 'react-router-dom'
import {BsBagFill} from 'react-icons/bs';
import {useCategory} from "../context/CategoryContext";

const Links = [
    {title: 'Favorite', icon: <MdFavorite/>, path: 'favourites'},
    {title: 'Cart', icon: <BsBagFill/>, path: 'cart'}
];

const NavLink = ({children}: { children: ReactNode }) => (
    <Box
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: 'gray.200',
        }}>
        {children}
    </Box>
);

export const Header = () => {
    const {onChangeCurrentCategory} = useCategory();

    const isAdmin = false;

    return (
        <Flex bg='gray.100'
              position='sticky'
              top='0'
              left='0'
              w='100%'
              height='80px'
              padding='20px'
              boxShadow='md'
              alignItems='center'
              justifyContent='space-between'
              zIndex={100}
        >
            <Link to='/all' onClick={() => onChangeCurrentCategory('all')}>
                <Flex alignItems='center' color='gray.600' textTransform={"uppercase"} ml={4}>
                    <svg width="52" height="52"
                         xmlns="http://www.w3.org/2000/svg">
                        <image href="/imgs/logo.svg" height="52" width="52"/>
                    </svg>
                    <Text ml={2} fontStyle='italic' as='h1' fontSize='xx-large'>GB Store</Text>
                </Flex>
            </Link>
            <Flex alignItems={'center'}>
                {<HStack
                    as={'nav'}
                    spacing={4}
                    marginX={6}
                    fontSize='25px'>
                    {!isAdmin && Links.map(({title, icon, path}) => (
                        <Link to={path} key={title}>
                            <NavLink>
                                {icon}
                            </NavLink>
                        </Link>
                    ))}
                </HStack>}
                <Menu>
                    <MenuButton
                        as={Button}
                        rounded={'full'}
                        variant={'link'}
                        cursor={'pointer'}
                        minW={0}>
                        <Avatar
                            size={'sm'}
                            src={
                                'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                            }
                        />
                    </MenuButton>
                    <MenuList>
                        {!isAdmin && <MenuItem>Мои заказы</MenuItem>}
                        <MenuDivider/>
                        <MenuItem>Выйти</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    );
}