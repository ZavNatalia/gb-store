import React from 'react';
import { Icon, Text } from "@chakra-ui/react";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router-dom";
import { useCategory } from "../context/CategoryContext";

export const BackHomeLink = () => {
    const {currentCategory} = useCategory();
    return (
        <Link to={`/${currentCategory?.name?.toLowerCase() ?? 'all'}`}>
            <Text color='gray'
                  display='flex'
                  alignItems='center'
                  marginLeft='-20px'
                  _hover={{color: 'gray.700'}}
            >
                <Icon as={MdArrowBackIosNew} mr={1}/>Вернуться в каталог
            </Text>
        </Link>
    );
};