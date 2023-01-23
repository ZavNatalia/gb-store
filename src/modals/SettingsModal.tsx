import React from 'react';
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Select,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from "@chakra-ui/react";
import {IRole} from '../models/IRole';
import {Field, Form, Formik, FormikHelpers} from "formik";
import * as Yup from "yup";

interface SettingsModalProps {
    roles: IRole[],
    isOpen: boolean,
    onClose: () => void,
    onEditUserRole: (values: any) => void,
}

export interface Values {
    email: string,
    roleName: string
}

const ValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Пожалуйста, введите корректный Email')
        .required('Пожалуйста, введите ваш E-mail'),
    roleName: Yup.string()
        .required('Пожалуйста, введите выберите роль'),
});

const SettingsModal = ({
                           roles,
                           isOpen,
                           onClose,
                           onEditUserRole
                       }: SettingsModalProps) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay style={{backgroundColor: 'RGBA(0, 0, 0, 0.4)'}}/>
            <ModalContent borderRadius='2xl' minW='500px' maxW='600px'>
                <ModalHeader>Настройки</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Tabs variant='soft-rounded' colorScheme='gray'>
                        <TabList flexWrap='wrap'>
                            <Tab>Права пользователя</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Formik
                                    initialValues={{
                                        email: '',
                                        roleName: '',
                                    }}
                                    validationSchema={ValidationSchema}
                                    onSubmit={async (
                                        values: Values,
                                        {setSubmitting}: FormikHelpers<Values>
                                    ) => {
                                        const result = {
                                            rights: {name: values.roleName},
                                            email: values.email
                                        }
                                        await onEditUserRole(result);
                                        setSubmitting(false);
                                    }}
                                >
                                    {({isSubmitting, values, isValid, dirty}) => (
                                        <Form>
                                            <Stack spacing={4} py={2}>
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
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default SettingsModal;