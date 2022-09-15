import { Box, Button, ModalBody, ModalFooter } from '@chakra-ui/react';
import React from 'react';
import InputForm from '../../../components/form/InputForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
    .object({
        username: yup.string().required('Username is required!'),
        password: yup.string().required('Password is required!'),
        cpassword: yup
            .string()
            .required('Confirm password is required!')
            .oneOf([yup.ref('password')], 'Password do not match'),
    })
    .required();

const FormRegister = ({ onSubmit, isLoading }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
                <InputForm
                    name={'username'}
                    register={register}
                    errors={errors}
                />
                <InputForm
                    name={'password'}
                    type={'password'}
                    register={register}
                    errors={errors}
                />
                <InputForm
                    name={'cpassword'}
                    label={'confirm password'}
                    type={'password'}
                    register={register}
                    errors={errors}
                />
            </ModalBody>
            <ModalFooter pt={0}>
                <Button type={'submit'} colorScheme={'whatsapp'} size={'lg'} isLoading={isLoading}>
                    Đăng ký
                </Button>
            </ModalFooter>
        </Box>
    );
};

export default FormRegister;
