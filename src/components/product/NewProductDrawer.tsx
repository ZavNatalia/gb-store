import React from 'react';
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack,
    Text,
    Textarea
} from "@chakra-ui/react";
import {Field, Form, Formik, FormikHelpers} from 'formik';
import * as Yup from "yup";
import {useCategory} from "../../context/CategoryContext";
import {RegExpURL} from "../../utils/RegExpURL";

export interface Values {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    image: string;
}

interface NewProductDrawerProps {
    isOpen: boolean,
    onClose: () => void,
    onAddNewProduct: (values: Values) => Promise<any>
}

const NewProductDrawer = ({isOpen, onClose, onAddNewProduct}: NewProductDrawerProps) => {
    const {currentCategory, categories} = useCategory();
    const ValidationSchema = Yup.object().shape({
        title: Yup.string()
            .min(5, 'Пожалуйста, введите не меньше 5 символов')
            .max(100, 'Пожалуйста, введите не более 100 символов')
            .required('Пожалуйста, заполните обязательное поле'),
        image: Yup.string()
            .matches(RegExpURL, 'Пожалуйста, введите корректный URL')
            .required('Пожалуйста, добавьте ссылку на изображение'),
        description: Yup.string()
            .min(5, 'Пожалуйста, введите не меньше 5 символов')
            .max(600, 'Пожалуйста, введите не более 600 символов')
            .required('Пожалуйста, заполните обязательное поле'),
        price: Yup.string()
            .required('Пожалуйста, заполните обязательное поле'),
    });

    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
        >
            <DrawerOverlay backdropFilter='blur(2px)'/>
            <DrawerContent minWidth='500px'>
                <DrawerCloseButton/>
                <DrawerHeader borderBottomWidth='1px' backgroundColor='gray.100' boxShadow='md' minH='80px'
                              display='flex'
                              alignItems='center'>
                    Новый товар
                </DrawerHeader>

                <Formik
                    initialValues={{
                        title: '',
                        price: 0,
                        description: '',
                        categoryId: currentCategory.id,
                        image: '',
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={async (
                        values: Values,
                        {setSubmitting}: FormikHelpers<Values>
                    ) => {
                        await onAddNewProduct(values);
                        setSubmitting(false);
                    }}
                >
                    {({isSubmitting}) => (
                        <Form style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                            <DrawerBody flex={1}>
                                <Stack spacing={6} py={4}>
                                    {categories.length > 0 && <FormControl>
                                        <FormLabel htmlFor='categoryId' fontSize='sm' color='gray.400'>Категория
                                            товара</FormLabel>
                                        <Field name="categoryId">
                                            {({field, meta}: any) => (
                                                <>
                                                    <Select id='categoryId' name='categoryId'
                                                            {...field}>
                                                        {categories.map(category => (
                                                            <option value={category.id}
                                                                    key={category.id}>{category.name}</option>
                                                        ))}
                                                    </Select>
                                                    {meta.touched && meta.error && (
                                                        <Text color='red.400' fontSize='sm'>{meta.error}</Text>
                                                    )}
                                                </>
                                            )}
                                        </Field>
                                    </FormControl>
                                    }

                                    <FormControl>
                                        <FormLabel htmlFor='title' fontSize='sm' color='gray.400'>Наименование
                                            товара</FormLabel>
                                        <Field name="title">
                                            {({field, meta}: any) => (
                                                <>
                                                    <Input variant='flushed' type="text"
                                                           placeholder="Введите наименование товара..."
                                                           isInvalid={meta.touched ? meta.error : false} {...field} />
                                                    {meta.touched && meta.error && (
                                                        <Text color='red.400' fontSize='sm'>{meta.error}</Text>
                                                    )}
                                                </>
                                            )}
                                        </Field>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel htmlFor='image' fontSize='sm' color='gray.400'>Фото
                                            товара</FormLabel>
                                        <Field name="image">
                                            {({field, meta}: any) => (
                                                <>
                                                    <Input type='url' variant='flushed'
                                                           placeholder='Добавьте ссылку на изображение'
                                                           isInvalid={meta.touched ? meta.error : false} {...field} />
                                                    {meta.touched && meta.error && (
                                                        <Text color='red.400' fontSize='sm'>{meta.error}</Text>
                                                    )}

                                                </>
                                            )}
                                        </Field>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel htmlFor='description' fontSize='sm'
                                                   color='gray.400'>Описание</FormLabel>
                                        <Field name="description">
                                            {({field, meta}: any) => (
                                                <>
                                                    <Textarea id='description' name='description'
                                                              placeholder='Введите описание...' p={1} maxHeight='300px'
                                                              isInvalid={meta.touched ? meta.error : false} {...field} />
                                                    {meta.touched && meta.error && (
                                                        <Text color='red.400' fontSize='sm'>{meta.error}</Text>
                                                    )}
                                                </>
                                            )}
                                        </Field>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel htmlFor='price' fontSize='sm' color='gray.400'>Цена</FormLabel>
                                        <Field name="price">
                                            {({field, meta}: any) => (
                                                <>
                                                    <Input variant='flushed' type="number"
                                                           placeholder='Введите цену товара...'
                                                           isInvalid={meta.touched ? meta.error : false} {...field} />
                                                    {meta.touched && meta.error && (
                                                        <Text color='red.400' fontSize='sm'>{meta.error}</Text>
                                                    )}
                                                </>
                                            )}
                                        </Field>
                                    </FormControl>
                                </Stack>
                            </DrawerBody>
                            <DrawerFooter borderTopWidth='1px' bgColor='white'>
                                <Button variant='outline' mr={3} fontWeight='500' onClick={onClose}>
                                    Отмена
                                </Button>
                                <Button colorScheme='yellow' type='submit' fontWeight='500' isLoading={isSubmitting}
                                        loadingText='Сохранение...'>Сохранить</Button>
                            </DrawerFooter>
                        </Form>
                    )}
                </Formik>
            </DrawerContent>
        </Drawer>
    );
};

export default NewProductDrawer;