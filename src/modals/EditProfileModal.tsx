import React from 'react';
import {
    Avatar,
    Button,
    Center,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text
} from "@chakra-ui/react";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {ICustomer} from "../models/ICustomer";
import {RegExpURL} from "../utilities/RegExpURL";

interface EditCategoryModalProps {
    customer: ICustomer,
    isOpen: boolean,
    onClose: () => void,
    onEditProfile: (customer: ICustomer) => void,
}

type Values = {
    first_name: string | undefined;
    last_name?: string | undefined;
    email: string | undefined;
    address?: string | undefined;
};

const EditProfileModal = ({
                              customer,
                              isOpen,
                              onClose,
                              onEditProfile
                          }: EditCategoryModalProps) => {
    const ValidationSchema = Yup.object().shape({
        first_name: Yup.string()
            .required('Пожалуйста, введите ваше имя'),
        last_name: Yup.string()
            .required('Пожалуйста, введите вашу фамилию'),
        address: Yup.string()
            .required('Пожалуйста, введите ваш адрес'),
        email: Yup.string()
            .email('Пожалуйста, введите корректный  email')
            .required('Пожалуйста, введите ваш E-mail'),
    });

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay style={{backgroundColor: 'RGBA(0, 0, 0, 0.4)'}}/>
            <ModalContent borderRadius='2xl'>
                <ModalHeader>Ваши данные</ModalHeader>
                <ModalCloseButton/>

                <Formik
                    initialValues={{
                        first_name: customer?.first_name ?? '',
                        last_name: customer?.last_name ?? '',
                        address: '',
                        email: customer?.email ?? ''
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={async (values: Values) => {
                        onEditProfile({...customer, first_name: values.first_name, last_name: values.last_name})
                    }}
                >
                    {({isValid, dirty}) => (
                        <Form>
                            <ModalBody my={4}>
                                <Stack spacing={4}>
                                    <Center>
                                        <Avatar
                                            src={customer.avatar}
                                            size='2xl'
                                        />
                                    </Center>
                                    <FormControl>
                                        <FormLabel htmlFor='first_name' fontWeight='bold'>Ваше имя</FormLabel>
                                        <Field name="first_name">
                                            {({field, meta}: any) => (
                                                <>
                                                    <Input name='first_name' type='string' {...field}/>
                                                    {meta.touched && meta.error && (
                                                        <Text color='red.400' fontSize='sm' mt={2}>{meta.error}</Text>
                                                    )}
                                                </>
                                            )}
                                        </Field>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor='last_name' fontWeight='bold'>Ваша фамилия</FormLabel>
                                        <Field name="last_name">
                                            {({field, meta}: any) => (
                                                <>
                                                    <Input name='last_name' type='string' {...field}/>
                                                    {meta.touched && meta.error && (
                                                        <Text color='red.400' fontSize='sm' mt={2}>{meta.error}</Text>
                                                    )}
                                                </>
                                            )}
                                        </Field>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor='address' fontWeight='bold'>Ваш адрес</FormLabel>
                                        <Field name="address">
                                            {({field, meta}: any) => (
                                                <>
                                                    <Input name='address' type='string' {...field}/>
                                                    {meta.touched && meta.error && (
                                                        <Text color='red.400' fontSize='sm' mt={2}>{meta.error}</Text>
                                                    )}
                                                </>
                                            )}
                                        </Field>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor='email' fontWeight='bold'>Email</FormLabel>
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
                                </Stack>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant='ghost' mr={3} onClick={onClose}>
                                    Отмена
                                </Button>
                                <Button isDisabled={!isValid || !dirty}
                                        type='submit'>Сохранить</Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            </ModalContent>
        </Modal>
    );
};

export default EditProfileModal;