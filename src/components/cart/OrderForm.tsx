import React from 'react';
import {
    Button,
    FormControl,
    Input,
    InputGroup,
    InputLeftAddon,
    InputLeftElement, Text,
    Textarea,
    VStack
} from "@chakra-ui/react";
import {BsPerson} from "react-icons/bs";
import {BiHomeAlt} from "react-icons/bi";
import {MdOutlineEmail} from "react-icons/md";
import {Field, Form, Formik, FormikHelpers} from "formik";
import * as Yup from "yup";
import {useCart} from "../../context/CartContext";
import {useCustomer} from "../../context/CustomerContext";
import {ToastSuccess} from "../../utilities/error-handling";

interface Values {
    first_name: string;
    last_name: string;
    address: string;
    email: string;
    phone: string;
    comment: string;
}

export const OrderForm = () => {
    const {cartItems, emptyCart} = useCart();
    const {customer} = useCustomer();

    const ValidationSchema = Yup.object().shape({
        first_name: Yup.string()
            .max(70, 'Пожалуйста, введите не более 70 символов')
            .required('Пожалуйста, заполните обязательное поле'),
        last_name: Yup.string()
            .max(70, 'Пожалуйста, введите не более 70 символов')
            .required('Пожалуйста, заполните обязательное поле'),
        address: Yup.string()
            .max(70, 'Пожалуйста, введите не более 200 символов')
            .required('Пожалуйста, заполните обязательное поле'),
        email: Yup.string()
            .email('Введен некорректный email')
            .required('Пожалуйста, заполните обязательное поле'),
        phone: Yup.string()
            .required('Пожалуйста, заполните обязательное поле')
    });

    return (
        <Formik
            initialValues={{
                first_name: customer?.first_name ?? '',
                last_name: customer?.last_name ?? '',
                address: '',
                email: customer?.email ?? '',
                phone: '',
                comment: '',
            }}
            validationSchema={ValidationSchema}
            onSubmit={(
                values: Values,
                {setSubmitting}: FormikHelpers<Values>
            ) => {
                const order = Object.assign({}, [cartItems], values);
                setTimeout(() => {
                    console.log(order);
                    emptyCart();
                    setSubmitting(false);
                    ToastSuccess('Спасибо за заказ. В ближайшее время наши операторы свяжутся с вами для уточнения сроков доставки.')
                }, 1000)
            }}
        >
            {({isSubmitting, isValid, dirty}) => (
                    <Form>
                        <VStack spacing={3} px={1} alignItems='start'>
                            <FormControl id="first_name">
                                <Field name="first_name">
                                    {({field, meta}: any) => (
                                        <>
                                            <InputGroup>
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<BsPerson color="gray.800"/>}
                                                />
                                                <Input type="text"
                                                       placeholder="Введите Ваше имя..."
                                                       isInvalid={meta.touched ? meta.error : false} {...field} />
                                            </InputGroup>
                                            {meta.touched && meta.error && (
                                                <Text color='red.400' fontSize='sm' mt={1}>{meta.error}</Text>
                                            )}
                                        </>
                                    )}
                                </Field>
                            </FormControl>
                            <FormControl id="last_name">
                                <Field name="last_name">
                                    {({field, meta}: any) => (
                                        <>
                                            <InputGroup>
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<BsPerson color="gray.800"/>}
                                                />
                                                <Input type="text"
                                                       placeholder="Введите Вашу фамилию..."
                                                       isInvalid={meta.touched ? meta.error : false} {...field} />
                                            </InputGroup>
                                            {meta.touched && meta.error && (
                                                <Text color='red.400' fontSize='sm' mt={1}>{meta.error}</Text>
                                            )}
                                        </>
                                    )}
                                </Field>
                            </FormControl>
                            <FormControl id="address">
                                <Field name="address">
                                    {({field, meta}: any) => (
                                        <>
                                            <InputGroup>
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<BiHomeAlt color="gray.800"/>}
                                                />
                                                <Input type="text"
                                                       placeholder="Город, улица, номер дома, номер квартиры"
                                                       isInvalid={meta.touched ? meta.error : false} {...field} />

                                            </InputGroup>
                                            {meta.touched && meta.error && (
                                                <Text color='red.400' fontSize='sm' mt={1}>{meta.error}</Text>
                                            )}
                                        </>
                                    )}
                                </Field>
                            </FormControl>
                            <FormControl id="email">
                                <Field name="email">
                                    {({field, meta}: any) => (
                                        <>
                                            <InputGroup>
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<MdOutlineEmail color="gray.800"/>}
                                                />
                                                <Input type="email"
                                                       placeholder="Введите ваш адрес электронной почты..."
                                                       isInvalid={meta.touched ? meta.error : false} {...field} />
                                            </InputGroup>
                                            {meta.touched && meta.error && (
                                                <Text color='red.400' fontSize='sm' mt={1}>{meta.error}</Text>
                                            )}
                                        </>
                                    )}
                                </Field>
                            </FormControl>
                            <FormControl id="phone">
                                <Field name="phone">
                                    {({field, meta}: any) => (
                                        <>
                                            <InputGroup>
                                                <InputLeftAddon children='+7'/>
                                                <Input type="tel"
                                                       placeholder="Введите номер телефона..."
                                                       isInvalid={meta.touched ? meta.error : false} {...field} />
                                            </InputGroup>
                                            {meta.touched && meta.error && (
                                                <Text color='red.400' fontSize='sm' mt={1}>{meta.error}</Text>
                                            )}
                                        </>
                                    )}
                                </Field>
                            </FormControl>
                            <FormControl id="comment">
                                <Field name="comment">
                                    {({field, meta}: any) => (
                                        <>
                                            <Textarea
                                                placeholder="Комментарий курьеру" {...field}
                                            />
                                            {meta.touched && meta.error && (
                                                <Text color='red.400' fontSize='sm' mt={1}>{meta.error}</Text>
                                            )}
                                        </>
                                    )}
                                </Field>
                            </FormControl>
                            <Button
                                type='submit'
                                variant="solid"
                                colorScheme='yellow'
                                isLoading={isSubmitting}
                                isDisabled={!isValid || !dirty}>
                                Отправить заказ
                            </Button>
                        </VStack>
                    </Form>
                )}
        </Formik>
    );
};