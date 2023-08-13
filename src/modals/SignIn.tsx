import React from 'react';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { ICustomer } from "../models/ICustomer";
import SignInByEmailForm from "../components/auth/SignInByEmailForm";
import { useTranslation } from 'react-i18next';
import AuthSocialButtons from '../components/auth/AuthSocialButtons';

interface SignInProps {
    isOpen: boolean,
    onClose: () => void,
    onOpenSignUp: () => void,
    signInByEmail: (data: Partial<ICustomer>) => void,
    signInBySocial: (source: string) => void,
}

const SignIn = (props: SignInProps) => {
    const {isOpen, onClose, onOpenSignUp, signInByEmail, signInBySocial} = props;
    const {t} = useTranslation();

    const onOpenSingUpModal = () => {
        onClose();
        onOpenSignUp();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay style={{backgroundColor: 'RGBA(0, 0, 0, 0.7)'}}/>
            <ModalContent borderRadius='2xl'>
                <ModalHeader borderBottom='1px solid' borderBottomColor='gray.200'>
                    {t('Log in')}
                </ModalHeader>
                <ModalCloseButton/>
                <ModalBody my={4} display='flex' flexDirection='column' gap={4} >
                    <SignInByEmailForm signInByEmail={signInByEmail}/>
                    <Button
                        colorScheme='gray'
                        variant='outline'
                        onClick={onOpenSingUpModal}
                    >
                        {t('Create an account')}
                    </Button>
                    <AuthSocialButtons signInBySocial={signInBySocial}/>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default SignIn;