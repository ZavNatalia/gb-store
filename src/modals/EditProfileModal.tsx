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
    firstname: string | undefined;
    lastname?: string | undefined;
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
        firstname: Yup.string()
            .max(100, 'Пожалуйста, введите не более 50 символов')
            .required('Пожалуйста, введите ваше имя'),
        lastname: Yup.string()
            .max(100, 'Пожалуйста, введите не более 50 символов'),
        address: Yup.string()
            .max(100, 'Пожалуйста, введите не более 200 символов'),
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
                        firstname: customer?.firstname ?? '',
                        lastname: customer?.lastname ?? '',
                        address: '',
                        email: customer?.email ?? ''
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={async (values: Values) => {
                        onEditProfile({...customer, firstname: values.firstname, lastname: values.lastname})
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
                                        <FormLabel htmlFor='firstname' fontWeight='bold'>Ваше имя</FormLabel>
                                        <Field name="firstname">
                                            {({field, meta}: any) => (
                                                <>
                                                    <Input name='firstname' type='string' {...field}/>
                                                    {meta.touched && meta.error && (
                                                        <Text color='red.400' fontSize='sm' mt={2}>{meta.error}</Text>
                                                    )}
                                                </>
                                            )}
                                        </Field>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor='lastname' fontWeight='bold'>Ваша фамилия</FormLabel>
                                        <Field name="lastname">
                                            {({field, meta}: any) => (
                                                <>
                                                    <Input name='lastname' type='string' {...field}/>
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