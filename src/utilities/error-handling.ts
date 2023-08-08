import {createStandaloneToast} from "@chakra-ui/react";
import { useTranslation } from 'react-i18next';

export const ToastSuccess = (message: string) => {
    const { toast } = createStandaloneToast();
    return toast({
        title: message,
        status: 'success',
        duration: 6000,
        isClosable: true,
    })
};

export const ToastError = (error: string) => {
    const {t} = useTranslation();
    const { toast } = createStandaloneToast();
    return toast({
        title: t('Error'),
        description: error,
        status: 'error',
        duration: 6000,
        isClosable: true,
    })
};
export const ToastInfo = (info: string) => {
    const { toast } = createStandaloneToast();
    return toast({
        title: info,
        status: 'info',
        duration: 6000,
        isClosable: true,
    })
};
