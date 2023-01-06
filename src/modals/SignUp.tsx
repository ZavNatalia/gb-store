import React from 'react';
import {ICustomer} from "../models/ICustomer";
import {Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/react";
import SignUpForm from '../components/auth/SignUpForm';

interface SignUpProps {
    isOpen: boolean,
    isLoading: boolean,
    onClose: () => void,
    onOpenSignIn: () => void,
    signUpHandler: (data: ICustomer) => void
}

const SignUp = ({isOpen, isLoading, onClose, onOpenSignIn, signUpHandler}: SignUpProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay style={{backgroundColor: 'RGBA(0, 0, 0, 0.7)'}}/>
            <ModalContent borderRadius='2xl'>
                <ModalHeader borderBottom='1px solid' borderBottomColor='gray.200'>Регистрация</ModalHeader>
                <ModalCloseButton/>
                <ModalBody my={4} textAlign='center'>
                    <SignUpForm signUpHandler={signUpHandler} isLoading={isLoading}/>
                    <Button w='100%' mt={4} colorScheme='gray' variant='outline' onClick={() => {
                        onClose();
                        onOpenSignIn()
                    }}>У меня уже есть аккаунт</Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default SignUp;