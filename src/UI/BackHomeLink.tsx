import React from 'react';
import {Icon} from "@chakra-ui/react";
import {MdArrowBackIosNew} from "react-icons/md";
import {Link} from "react-router-dom";
import {useCategory} from "../context/CategoryContext";
import {slashEscape} from "../utilities/RegExpURL";

export const BackHomeLink = () => {
    const {currentCategory} = useCategory();
    return (
        <Link to={`/${slashEscape(currentCategory?.name) ?? ''}`}
              style={{color: 'gray', display: 'flex', alignItems: 'center', marginLeft: '-20px'}}>
            <Icon as={MdArrowBackIosNew} mr={1}/>Вернуться в каталог
        </Link>
    );
};