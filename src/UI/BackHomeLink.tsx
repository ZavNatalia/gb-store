import React from 'react';
import {Icon} from "@chakra-ui/react";
import {MdArrowBackIosNew} from "react-icons/md";
import {Link} from "react-router-dom";
import {useCategory} from "../context/CategoryContext";

export const BackHomeLink = () => {
    const {currentCategory} = useCategory();
    return (
        <Link to={`/${currentCategory?.name?.toLowerCase() ?? ''}`}
              style={{color: 'gray', display: 'flex', alignItems: 'center', marginLeft: '-20px'}}>
            <Icon as={MdArrowBackIosNew} mr={1}/>Вернуться в каталог
        </Link>
    );
};