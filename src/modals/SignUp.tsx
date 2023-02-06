import React from 'react';
import {Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/react";
import SignUpForm, {SignUpFormValues} from '../components/auth/SignUpForm';

interface SignUpProps {
    isOpen: boolean,
    onClose: () => void,
    onOpenSignIn: () => void,
    signUpHandler: (data: SignUpFormValues) => void
}

const SignUp = ({isOpen, onClose, onOpenSignIn, signUpHandler}: SignUpProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay style={{backgroundColor: 'RGBA(0, 0, 0, 0.7)'}}/>
            <ModalContent borderRadius='2xl'>
                <ModalHeader borderBottom='1px solid' borderBottomColor='gray.200'>Регистрация</ModalHeader>
                <ModalCloseButton/>
                <ModalBody my={4} textAlign='center'>
                    <SignUpForm signUpHandler={signUpHandler}/>
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