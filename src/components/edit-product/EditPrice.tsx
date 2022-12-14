import React, {useState} from 'react';
import {Flex, Input, Text} from "@chakra-ui/react";
import {SaveIcon} from "../UI/SaveIcon";
import {formatCurrency} from "../../utilities/formatCurrency";
import {EditIcon} from "../UI/EditIcon";

interface EditPriceProps {
    price: number,
    updatePrice: (v: string) => void
}

export const EditPrice = ({price, updatePrice}: EditPriceProps) => {
    const [isEditMode, setIsEditMode] = useState(false);
    return (
        <Flex
            border='1px solid' borderColor='gray.300' borderRadius='2xl' px={5} py={3} gap={4} alignItems='center'>
            {isEditMode ? (
                <>
                    <Input
                        value={price}
                        px={4}
                        py={4}
                        m={0}
                        width='150px'
                        fontSize='x-large'
                        type={"number"}
                        _focus={{borderColor: 'yellow.500'}}
                        onChange={(e) => updatePrice(e.target.value)}/>
                    <SaveIcon isDisabled={price === 0}
                              onSave={() => setIsEditMode(false)}/>
                </>
            ) : (
                <>
                    <Text fontSize='x-large' cursor='text' onClick={() => setIsEditMode(true)}>{formatCurrency(Number(price))}</Text>
                    <EditIcon onEdit={() => setIsEditMode(true)}/>
                </>
            )}
        </Flex>
    );
};
