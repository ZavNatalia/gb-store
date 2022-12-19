import React from 'react';
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    FormControl,
    FormLabel,
    IconButton,
    Image,
    Input,
    Select,
    Stack,
    Text,
    Textarea,
    VStack
} from "@chakra-ui/react";
import {Field, FieldArray, Form, Formik, FormikHelpers} from 'formik';
import * as Yup from "yup";
import {useCategory} from "../../context/CategoryContext";
import {IProduct} from "../../models/IProduct";
import {BiTrash} from "react-icons/bi";
import {RegExpURL} from "../../utils/RegExpURL";

export interface Values {
    title: string;
    price: number;
    description: string;
    category: number;
    image: string[];
}

interface AddEditProductDrawerProps {
    isEdit: boolean,
    product?: IProduct,
    isOpen: boolean,
    onClose: () => void,
    onSubmit: (values: any) => void
}

const AddEditProductDrawer = ({
                                  isEdit,
                                  product = {} as IProduct,
                                  isOpen,
                                  onClose,
                                  onSubmit
                              }: AddEditProductDrawerProps) => {
    const {currentCategory, categories} = useCategory();

    const ValidationSchema = Yup.object().shape({
        title: Yup.string()
            .min(5, 'Пожалуйста, введите не меньше 5 символов')
            .max(100, 'Пожалуйста, введите не более 100 символов')
            .required('Пожалуйста, заполните обязательное поле'),
        // image: Yup.mixed()
        //     .when('isArray', {
        //         is: Array.isArray,
        //         then: Yup.array().of(Yup.string()),
        //         otherwise: Yup.string(),
        //     }),
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
                              display='flex' alignItems='center'>
                    {isEdit ? 'Редактирование товара' : 'Добавление нового товара'}
                </DrawerHeader>

                <Formik
                    initialValues={{
                        title: product.title ?? '',
                        price: product.price ?? 0,
                        description: product.description ?? '',
                        category: product.category?.id ?? currentCategory.id,
                        image: product.image ?? ['']
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={async (
                        values: Values,
                        {setSubmitting}: FormikHelpers<Values>
                    ) => {
                        await onSubmit(values);
                        setSubmitting(false);
                    }}
                >
                    {({isSubmitting, values, isValid, dirty}) => (
                        <Form style={{height: 'calc(100% - 80px)', display: 'flex', flexDirection: 'column'}}>
                            <DrawerBody flex={1}>
                                <Stack spacing={6} py={4}>
                                    {categories.length > 0 && <FormControl>
                                        <FormLabel htmlFor='category' fontSize='sm' color='gray.400'>Категория
                                            товара</FormLabel>
                                        <Field name="category">
                                            {({field, meta}: any) => (
                                                <>
                                                    <Select id='category' name='category'
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
                                        <FormLabel htmlFor='title' fontSize='sm' color='gray.400'>Изображения
                                            товара</FormLabel>
                                        <FieldArray name="image">
                                            {({remove, push}) => (
                                                <VStack spacing={3}>
                                                    {values?.image?.length > 0 &&
                                                        values.image?.map((image, index) => (
                                                            <Box key={index} w='100%'>
                                                                <Image src={image} maxH='100px'/>
                                                                <Flex  gap={2} >
                                                                    <Field name={`image.${index}`}>
                                                                        {({field, meta}: any) => (
                                                                            <Box w='100%'>
                                                                                <Input type='url' variant='flushed'
                                                                                       placeholder='Добавьте ссылку на изображение'
                                                                                       isInvalid={meta.touched ? meta.error : false} {...field} />
                                                                                {meta.touched && meta.error && (
                                                                                    <Text color='red.400' fontSize='sm'>Добавьте
                                                                                        ссылку на изображение</Text>
                                                                                )}
                                                                            </Box>
                                                                        )}
                                                                    </Field>
                                                                    <IconButton aria-label='Delete image' icon={<BiTrash/>}
                                                                                onClick={() => remove(index)}/>
                                                                </Flex>
                                                            </Box>

                                                        ))}
                                                    {values.image.length < 5 && <Button
                                                        mt={4}
                                                        onClick={() => push('')}
                                                    >
                                                        Добавить изображение
                                                    </Button>}
                                                </VStack>
                                            )}
                                        </FieldArray>
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
                                        isDisabled={!isValid || !dirty}
                                        loadingText='Сохранение...'>Сохранить</Button>
                            </DrawerFooter>
                        </Form>
                    )}
                </Formik>
            </DrawerContent>
        </Drawer>
    );
};

export default AddEditProductDrawer;