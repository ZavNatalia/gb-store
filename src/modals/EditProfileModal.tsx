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
import {IUser} from "../models/IUser";
import {RegExpURL} from "../utilities/RegExpURL";

interface EditCategoryModalProps {
    customer: IUser,
    isOpen: boolean,
    onClose: () => void,
    onEditProfile: (customer: IUser) => void,
}

type Values = {
    name: string | undefined;
    avatar: string | undefined;
    email: string | undefined;
};

const EditProfileModal = ({
                              customer,
                              isOpen,
                              onClose,
                              onEditProfile
                          }: EditCategoryModalProps) => {
    const ValidationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Пожалуйста, введите ваше имя'),
        avatar: Yup.string()
            .matches(RegExpURL, 'Пожалуйста, введите корректный URL'),
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
                        name: customer?.name ?? '',
                        avatar: customer?.avatar ?? '',
                        email: customer?.email ?? ''
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={async (values: Values) => {
                        onEditProfile({...customer, name: values.name, avatar: values.avatar})
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
                                        <FormLabel htmlFor='name' fontWeight='bold'>Как к вам
                                            обращаться</FormLabel>
                                        <Field name="name">
                                            {({field, meta}: any) => (
                                                <>
                                                    <Input name='name' type='string' {...field}/>
                                                    {meta.touched && meta.error && (
                                                        <Text color='red.400' fontSize='sm' mt={2}>{meta.error}</Text>
                                                    )}
                                                </>
                                            )}
                                        </Field>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor='avatar' fontWeight='bold'>Аватар</FormLabel>
                                        <Field name="avatar">
                                            {({field, meta}: any) => (
                                                <>
                                                    <Input name='avatar' type='string' {...field}/>
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