import React from 'react';
import {Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from '@chakra-ui/react';
import {IUser} from "../models/IUser";
import AuthSocialButtons from '../components/auth/AuthSocialButtons';
import SignInByEmailForm from "../components/auth/SignInByEmailForm";

interface SignInProps {
    isOpen: boolean,
    isLoading: boolean,
    onClose: () => void,
    onOpenSignUp: () => void,
    signInHandler: (source: string) => void
    signInByEmail: (data: IUser) => void
}

const SignIn = ({isOpen, isLoading, onClose, onOpenSignUp, signInHandler, signInByEmail}: SignInProps) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay style={{backgroundColor: 'RGBA(0, 0, 0, 0.7)'}}/>
            <ModalContent borderRadius='2xl'>
                <ModalHeader borderBottom='1px solid' borderBottomColor='gray.200'>Войти</ModalHeader>
                <ModalCloseButton/>
                <ModalBody my={4} textAlign='center'>
                    <SignInByEmailForm signInByEmail={signInByEmail} isLoading={isLoading}/>
                    <Button w='100%' mt={4} mb={8} colorScheme='gray' variant='outline' onClick={() => {
                        onClose();
                        onOpenSignUp()
                    }}>
                        Создать аккаунт
                    </Button>
                    <AuthSocialButtons signInHandler={signInHandler}/>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default SignIn;