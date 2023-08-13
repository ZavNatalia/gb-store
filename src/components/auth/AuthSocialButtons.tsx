import React from 'react';
import { Button, Image, Text } from "@chakra-ui/react";
import { useTranslation } from 'react-i18next';

interface AuthSocialButtonsProps {
    signInBySocial: (source: string) => void
}

const AuthSocialButtons = ({signInBySocial}: AuthSocialButtonsProps) => {
    const {t} = useTranslation();
    return (
        <Button variant='outline' gap={2} py={5} colorScheme='gray'
                onClick={() => signInBySocial('google')}>
            <Text fontWeight='normal' color={'gray.500'}>{t('Continue with Google')}</Text>
            <Image h={5} src={'/assets/images/google-logo.svg'} alt='Google Icon'/>
        </Button>

    );
};

export default AuthSocialButtons;