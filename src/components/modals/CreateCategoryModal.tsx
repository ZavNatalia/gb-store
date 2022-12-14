import React from 'react';
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    VStack
} from "@chakra-ui/react";
import {ICategory} from "../../models/ICategory";
import {isEmpty} from "../../utilities/isEmpty";

interface EditCategoryModalProps {
    category: ICategory,
    handleSelectedCategory: (category: ICategory) => void,
    isOpen: boolean,
    onClose: () => void,
    onEditCategory: (category: ICategory) => void,
}

const CreateCategoryModal = ({
                                 category = {} as ICategory,
                                 handleSelectedCategory,
                                 isOpen,
                                 onClose,
                                 onEditCategory
                             }: EditCategoryModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay style={{backgroundColor: 'RGBA(0, 0, 0, 0.16)'}}/>
            <ModalContent>
                <ModalHeader borderBottom='1px solid' borderBottomColor='gray.200'>Создание категории</ModalHeader>
                <ModalCloseButton/>
                <ModalBody my={4}>
                    <VStack spacing={3}>
                        <Input placeholder='Введите название категории' value={category.name}
                               onChange={(e) => handleSelectedCategory({...category, name: e.target.value})}/>
                        <Input placeholder='Введите описание категории' value={category.description}
                               onChange={(e) => handleSelectedCategory({...category, description: e.target.value})}/>
                    </VStack>

                </ModalBody>
                <ModalFooter>
                    <Button variant='ghost' mr={3} onClick={onClose}>
                        Отмена
                    </Button>
                    <Button disabled={isEmpty(category) || category.name?.length < 2}
                            onClick={() => onEditCategory(category)}>Сохранить</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CreateCategoryModal;