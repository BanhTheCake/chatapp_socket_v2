import { Box, Button, Divider } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import InputForm from '../../../components/form/InputForm';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    username: yup.string().required('Username is required!'),
    password: yup.string().required('Password is required!'),
}).required();

const FormLogin = ({ onSubmit, onOpen, isLoading }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    return (
        <Box
            bg="white"
            p={'4'}
            boxShadow={'lg'}
            borderRadius={'lg'}
            w={'350px'}
            maxW={'100%'}
            display={'flex'}
            flexDirection={'column'}
            as="form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <InputForm name={'username'} register={register} errors={errors} />
            <InputForm
                name={'password'}
                type={'password'}
                register={register}
                errors={errors}
            />
            <Button
                w={'full'}
                size={'lg'}
                colorScheme={'facebook'}
                mb={4}
                type={'submit'}
                isLoading={isLoading}
            >
                Đăng Nhập
            </Button>
            <Divider borderBottomWidth={1} opacity={1} mb={4} />
            <Button
                w={'full'}
                size={'lg'}
                margin={'auto'}
                colorScheme="whatsapp"
                onClick={onOpen}
            >
                Đăng ký
            </Button>
        </Box>
    );
};

export default FormLogin;
