import React, { useState } from 'react';
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Button, FormControl, FormLabel, Input, Stack, Switch, Text } from "@chakra-ui/react";
import * as Yup from "yup";
import { IUser } from "../../models/IUser";
import { RegExpURL } from "../../utilities/RegExpURL";

interface SignUpFormProps {
    signUpHandler: (data: IUser) => void;
    isLoading: boolean;
}

export interface Values {
    name: string;
    email: string;
    password: string;
    avatar: string;
    isAdmin: boolean;
    adminSecret: string;
}

const SignUpForm = ({signUpHandler, isLoading}: SignUpFormProps) => {
    const [showAdminField, setShowAdminField] = useState(false);

    const ValidationSchema = Yup.object().shape({
        name: Yup.string().required("Пожалуйста, введите ваше имя"),
        email: Yup.string().email("Пожалуйста, введите корректный email").required("Пожалуйста, введите ваш E-mail"),
        password: Yup.string()
            .min(8, "Пароль должен содержать минимум 8 символов")
            .max(16, "Пароль может содержать максимум 16 символов")
            .required("Пожалуйста, введите ваш пароль"),
        avatar: Yup.string().matches(RegExpURL, "Пожалуйста, введите корректный URL").required("Добавьте ссылку на ваш аватар"),
        adminSecret: Yup.string(),
    });

    return (
        <Formik<Values>
            initialValues={{
                name: '',
                email: '',
                password: '',
                avatar: '',
                isAdmin: false,
                adminSecret: '',
            } as Values}
            validationSchema={ValidationSchema}
            onSubmit={async (values: Values, {setSubmitting}: FormikHelpers<Values>) => {
                const adminSecret = process.env.REACT_APP_ADMIN_SECRET;
                const isAdmin = values.isAdmin && values.adminSecret === adminSecret;

                const userData: IUser = {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    avatar: values.avatar,
                    role: isAdmin ? "admin" : "customer",
                };

                signUpHandler(userData);
                setSubmitting(false);
            }}
        >
            {({isValid, dirty, values, setFieldValue}) => (
                <Form>
                    <Stack spacing={4} textAlign="left">
                        {/* Role switcher */}
                        <FormControl display="flex" alignItems="center">
                            <FormLabel mb="0">Создать администратора</FormLabel>
                            <Switch
                                isChecked={values.isAdmin}
                                onChange={(e) => {
                                    setFieldValue("isAdmin", e.target.checked);
                                    setShowAdminField(e.target.checked);
                                }}
                            />
                        </FormControl>

                        {/* Field for a secret key (for admin role) */}
                        {showAdminField && (
                            <FormControl>
                                <Field name="adminSecret">
                                    {({field, meta}: any) => (
                                        <>
                                            <Input type="password" placeholder="Введите секретный ключ"
                                                   isInvalid={meta.touched ? meta.error : false} {...field} />
                                            {meta.touched && meta.error &&
                                                <Text color="red.400" fontSize="sm" mt={2}>{meta.error}</Text>}
                                        </>
                                    )}
                                </Field>
                            </FormControl>
                        )}
                        <FormControl>
                            <Field name="name">
                                {({field, meta}: any) => (
                                    <>
                                        <Input type="text" placeholder="Введите ваше имя" mb={2}
                                               isInvalid={meta.touched ? meta.error : false} {...field} />
                                        {meta.touched && meta.error &&
                                            <Text color="red.400" fontSize="md">{meta.error}</Text>}
                                    </>
                                )}
                            </Field>
                        </FormControl>
                        <FormControl>
                            <Field name="email">
                                {({field, meta}: any) => (
                                    <>
                                        <Input type="email" placeholder="E-mail" mb={2}
                                               isInvalid={meta.touched ? meta.error : false} {...field} />
                                        {meta.touched && meta.error &&
                                            <Text color="red.400" fontSize="md">{meta.error}</Text>}
                                    </>
                                )}
                            </Field>
                        </FormControl>
                        <FormControl>
                            <Field name="password">
                                {({field, meta}: any) => (
                                    <>
                                        <Input type="password" placeholder="Пароль" mb={2}
                                               isInvalid={meta.touched ? meta.error : false} {...field} />
                                        {meta.touched && meta.error &&
                                            <Text color="red.400" fontSize="md">{meta.error}</Text>}
                                    </>
                                )}
                            </Field>
                        </FormControl>
                        <FormControl>
                            <Field name="avatar">
                                {({field, meta}: any) => (
                                    <>
                                        <Input type="text" placeholder="Добавьте ссылку на ваш аватар"
                                               isInvalid={meta.touched ? meta.error : false} {...field} />
                                        {meta.touched && meta.error &&
                                            <Text color="red.400" fontSize="sm" mt={2}>{meta.error}</Text>}
                                    </>
                                )}
                            </Field>
                        </FormControl>
                        <Button type="submit" colorScheme="yellow" isLoading={isLoading}
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
