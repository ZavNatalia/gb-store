import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useCategory} from "../../context/CategoryContext";
import {Flex, Select, Text} from "@chakra-ui/react";
import {ICategory} from "../../models/ICategory";
import { rootURL } from '../../constants/URLs';

interface EditCategoryProps {
    category: ICategory,
    updateCategory: (v: string) => void
}

const EditCategory = ({category, updateCategory}: EditCategoryProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const {categories, onChangeCategories} = useCategory();

    const fetchCategories = async () => {
        setIsLoading(true)
        await axios.get(`${rootURL}/categories/list`)
            .then(response => {
                let result = response.data;
                onChangeCategories(result);
            }).catch(error => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <Flex alignItems='baseline'>
            <Text >Категория: </Text>
            {!isLoading && <Select
                value={category.name}
                ml={4}
                cursor='pointer'
                _focus={{borderColor: 'yellow.500'}}
                onChange={(e) => updateCategory(e.target.value)}
            >
                {categories.map(category => (
                    <option value={category.name} key={category.id}>{category.name}</option>
                ))}
            </Select>}
        </Flex>
    );
};

export default EditCategory;