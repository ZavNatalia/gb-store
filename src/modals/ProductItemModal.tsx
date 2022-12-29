import {
    Button,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text
} from '@chakra-ui/react';
import React, {FC, useEffect} from 'react';
import { IProduct } from '../models/IProduct';
import {toCurrency} from '../utilities/formatCurrency';

interface ProductItemModalInterface {
    product: IProduct,
    onOpen: () => void,
    isOpen: boolean,
    onClose: () => void
}

const ProductItemModal: FC<ProductItemModalInterface> = ({product, onOpen, isOpen, onClose}) => {

    const getProduct = async (id: number) => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(json => console.log(json))
    }

    useEffect(() => {
        getProduct(product.id);
    }, [])
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader/>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Heading fontSize='lg'>
                            {product.title} - {toCurrency(product.price)}
                        </Heading>
                        <Text fontSize='sm'>Category: {product.category.name}</Text>
                        <Text fontSize='sm'>Description: {product.description}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProductItemModal;
