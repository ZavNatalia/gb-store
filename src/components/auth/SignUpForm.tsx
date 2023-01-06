import React from 'react';
import {Field, Form, Formik, FormikHelpers} from "formik";
import {Button, FormControl, Input, Stack, Text} from "@chakra-ui/react";
import * as Yup from "yup";
import {ICustomer} from "../../models/ICustomer";
import {RegExpURL} from "../../utilities/RegExpURL";

interface SignUpFormProps {
    signUpHandler: (data: ICustomer) => void;
    isLoading: boolean
}

export interface Values {
    name: string;
    email: string;
    password: string;
    avatar: string
}

const SignUpForm = ({signUpHandler, isLoading}: SignUpFormProps) => {
    const ValidationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Пожалуйста, введите вашe имя'),
        email: Yup.string()
            .email('Пожалуйста, введите корректный  email')
            .required('Пожалуйста, введите ваш E-mail'),
        password: Yup.string()
            .min(8, 'Пароль должен содержать минимум 8 символов')
            .max(16, 'Пароль может содержать максимум 16 символов')
            .required('Пожалуйста, введите ваш пароль'),
        avatar: Yup.string()
            .matches(RegExpURL, 'Пожалуйста, введите корректный URL')
            .required('Пожалуйста, добавьте ссылку на ваш аватар')
    });

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: '',
                avatar: ''
            }}
            validationSchema={ValidationSchema}
            onSubmit={async (
                values: Values,
                {setSubmitting}: FormikHelpers<Values>
            ) => {
                signUpHandler(values)
                setSubmitting(false);
            }}
        >
            {({isValid, dirty}) => (
                <Form>
                    <Stack spacing={4} textAlign='left'>
                        <FormControl>
                            <Field name='name'>
                                {({field, meta}: any) => (
                                    <>
                                        <Input type='text'
                                               placeholder='Введите ваше имя'
                                               mb={2}
                                               isInvalid={meta.touched ? meta.error : false} {...field} />
                                        {meta.touched && meta.error && (
                                            <Text color='red.400' fontSize='md'>{meta.error}</Text>
                                        )}
                                    </>
                                )}
                            </Field>
                        </FormControl>
                        <FormControl>
                            <Field name='email'>
                                {({field, meta}: any) => (
                                    <>
                                        <Input type='email'
                                               placeholder='E-mail'
                                               mb={2}
                                               isInvalid={meta.touched ? meta.error : false} {...field} />
                                        {meta.touched && meta.error && (
                                            <Text color='red.400' fontSize='md'>{meta.error}</Text>
                                        )}
                                    </>
                                )}
                            </Field>
                        </FormControl>
                        <FormControl>
                            <Field name='password'>
                                {({field, meta}: any) => (
                                    <>
                                        <Input type='password'
                                               placeholder='Пароль'
                                               mb={2}
                                               isInvalid={meta.touched ? meta.error : false} {...field} />
                                        {meta.touched && meta.error && (
                                            <Text color='red.400' fontSize='md'>{meta.error}</Text>
                                        )}
                                    </>
                                )}
                            </Field>
                        </FormControl>
                        <FormControl>
                            <Field name="avatar">
                                {({field, meta}: any) => (
                                    <>
                                        <Input name='avatar' type='string' isInvalid={meta.touched ? meta.error : false}
                                               placeholder='Добавьте ссылку на ваш аватар' {...field}/>
                                        {meta.touched && meta.error && (
                                            <Text color='red.400' fontSize='sm' mt={2}>{meta.error}</Text>
                                        )}
                                    </>
                                )}
                            </Field>
                        </FormControl>
                        <Button type='submit'
                                colorScheme='yellow'
                                isLoading={isLoading}
                                isDisabled={!isValid || !dirty}>
                            Зарегистрироваться
                        </Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};

export default SignUpForm;