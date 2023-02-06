import React from 'react';
import {Field, Form, Formik, FormikHelpers} from "formik";
import {Button, Flex, FormControl, FormLabel, Input, Select, Stack, Text} from "@chakra-ui/react";
import * as Yup from "yup";
import {IRole} from "../../models/IRole";
import {ORDER_STATUS} from "../../models/IOrder";

export interface Values {
    orderId: string,
    status: string,
    email: string,
    userId: string,
    roleName: string
}

const ValidationSchema = Yup.object().shape({
    orderId: Yup.string()
        .required('Пожалуйста, введите ID заказа'),
    status: Yup.string()
        .required('Пожалуйста, выберите статус заказа'),
    email: Yup.string()
        .email('Пожалуйста, введите корректный Email')
        .required('Пожалуйста, введите ваш E-mail'),
    userId: Yup.string()
        .required('Пожалуйста, введите ID пользователя'),
    roleName: Yup.string()
        .required('Пожалуйста, выберите выберите роль пользователя'),
});

interface EditOrderStatusFormProps {
    roles: IRole[],
    onEditOrderStatus: (result: any) => void,
    onClose: () => void
}

export const EditOrderStatusForm = ({roles, onEditOrderStatus, onClose}: EditOrderStatusFormProps) => {

    return (
        <Formik
            initialValues={{
                orderId: '',
                status: '',
                email: '',
                userId: '',
                roleName: '',
            }}
            validationSchema={ValidationSchema}
            onSubmit={async (
                values: Values,
                {setSubmitting}: FormikHelpers<Values>
            ) => {
                const result = {
                    order_id: values.orderId,
                    status: values.status,
                    user: {
                        email: values.email,
                        id: values.userId,
                        role: values.roleName
                    }
                }
                await onEditOrderStatus(result);
                setSubmitting(false);
            }}
        >
            {({isSubmitting, isValid, dirty}) => (
                <Form>
                    <Stack spacing={4} py={2}>
                        <FormControl>
                            <FormLabel htmlFor='orderId' fontSize='m' color='gray.500'>ID заказа</FormLabel>
                            <Field name="orderId">
                                {({field, meta}: any) => (
                                    <>
                                        <Input type="text"
                                               isInvalid={meta.touched ? meta.error : false} {...field} />
                                        {meta.touched && meta.error && (
                                            <Text color='red.400' mt={2}
                                                  fontSize='sm'>{meta.error}</Text>
                                        )}
                                    </>
                                )}
                            </Field>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='status' fontSize='m' color='gray.500'>Статус заказа</FormLabel>
                            <Field name="status">
                                {({field, meta}: any) => (
                                    <>
                                        <Select id='status' name='status'
                                                placeholder='Выберите новый статус заказа'
                                                {...field}>
                                            {Object.values(ORDER_STATUS).map((value, index) => (
                                                <option value={value.status}
                                                        key={index}>{value.translation}</option>
                                            ))}
                                        </Select>
                                        {meta.touched && meta.error && (
                                            <Text color='red.400' mt={2}
                                                  fontSize='sm'>{meta.error}</Text>
                                        )}
                                    </>
                                )}
                            </Field>
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor='email' fontSize='m' color='gray.500'>Email
                                пользователя</FormLabel>
                            <Field name="email">
                                {({field, meta}: any) => (
                                    <>
                                        <Input type="email"
                                               isInvalid={meta.touched ? meta.error : false} {...field} />
                                        {meta.touched && meta.error && (
                                            <Text color='red.400' mt={2}
                                                  fontSize='sm'>{meta.error}</Text>
                                        )}
                                    </>
                                )}
                            </Field>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='userId' fontSize='m' color='gray.500'>ID
                                пользователя</FormLabel>
                            <Field name="userId">
                                {({field, meta}: any) => (
                                    <>
                                        <Input type="userId"
                                               isInvalid={meta.touched ? meta.error : false} {...field} />
                                        {meta.touched && meta.error && (
                                            <Text color='red.400' mt={2}
                                                  fontSize='sm'>{meta.error}</Text>
                                        )}
                                    </>
                                )}
                            </Field>
                        </FormControl>
                        {roles?.length > 0 && <FormControl>
                            <FormLabel htmlFor='roleName' fontSize='m' color='gray.500'>Роль
                                пользователя</FormLabel>
                            <Field name="roleName">
                                {({field, meta}: any) => (
                                    <>
                                        <Select id='roleName' name='roleName'
                                                placeholder={'Выберите роль пользователя'}
                                                {...field}>
                                            {roles.map((role) => (
                                                <option value={role.name}
                                                        key={role.id}>{role.name}</option>
                                            ))}
                                        </Select>
                                        {meta.touched && meta.error && (
                                            <Text color='red.400' mt={2}
                                                  fontSize='sm'>{meta.error}</Text>
                                        )}
                                    </>
                                )}
                            </Field>
                        </FormControl>
                        }
                    </Stack>
                    <Flex justifyContent={"flex-end"} mt={6}>
                        <Button variant='ghost' mr={3} onClick={onClose}>Отмена</Button>
                        <Button
                            type='submit'
                            colorScheme='yellow'
                            loadingText='Сохранение...'
                            isLoading={isSubmitting}
                            isDisabled={!isValid || !dirty}
                        >
                            Сохранить
                        </Button>
                    </Flex>
                </Form>
            )}
        </Formik>
    );
};