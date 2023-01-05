import {createStandaloneToast} from "@chakra-ui/react";

export const ToastSuccess = (message: string) => {
    const { toast } = createStandaloneToast();
    return toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 6000,
        isClosable: true,
    })
};

export const ToastError = (error: string) => {
    const { toast } = createStandaloneToast();
    return toast({
        title: 'An error occurred',
        description: error,
        status: 'error',
        duration: 6000,
        isClosable: true,
    })
};
export const ToastInfo = (info: string) => {
    const { toast } = createStandaloneToast();
    return toast({
        title: 'Info',
        description: info,
        status: 'info',
        duration: 6000,
        isClosable: true,
    })
};
