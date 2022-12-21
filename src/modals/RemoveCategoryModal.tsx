import React from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text
} from "@chakra-ui/react";
import {ICategory} from "../models/ICategory";

interface RemoveCategoryModalProps {
    category: ICategory
    isOpen: boolean,
    onClose: () => void,
    onRemoveCategory: (id: number) => void
}

const RemoveCategoryModal = ({category, isOpen, onClose, onRemoveCategory}: RemoveCategoryModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay style={{backgroundColor: 'RGBA(0, 0, 0, 0.16)'}}/>
            <ModalContent>
                <ModalHeader borderBottom='1px solid' borderBottomColor='gray.200'>Удалить категорию</ModalHeader>
                <ModalCloseButton/>
                <ModalBody my={4}>
                    <Text>Вы уверены, что хотите удалить категорию <b>{category.name}</b></Text>
                </ModalBody>
                <ModalFooter>
                    <Button variant='ghost' mr={3} onClick={onClose}>
                        Отмена
                    </Button>
                    <Button onClick={() => onRemoveCategory(category.id)}>Удалить</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default RemoveCategoryModal;