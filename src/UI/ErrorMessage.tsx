import React from 'react';
import {Alert, AlertDescription, AlertIcon, AlertTitle} from "@chakra-ui/react";

interface ErrorMessageProps {
    message: string
}

const ErrorMessage = ({message}: ErrorMessageProps) => {
    return (
        <Alert status='error'>
            <AlertIcon/>
            <AlertTitle>Ошибка:</AlertTitle>
            <AlertDescription fontSize='sm'>{message}</AlertDescription>
        </Alert>
    );
};

export default ErrorMessage;