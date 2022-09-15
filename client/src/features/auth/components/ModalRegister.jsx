import {
    Divider,
    Heading,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleRegisterUser } from '../authSlice';
import FormRegister from './FormRegister';

const ModalRegister = ({ isOpen, onClose }) => {

    const isLoading = useSelector((state) => state.auth.isLoading)
    const [error, setError] = useState(null) 


    const dispatch = useDispatch()

    const onSubmit = (data) => {
        setError(null)
        dispatch(handleRegisterUser(data))
        .unwrap()
        .then(() => {
            onClose()
        })
        .catch(err => {setError(err)})
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Heading fontSize={'3xl'} mb={1}>
                            Đăng ký
                        </Heading>
                        <Text
                            fontSize={'lg'}
                            color={'gray.700'}
                            fontWeight={'normal'}
                        >
                            BanhTheCake Chat app
                        </Text>
                        <Text
                            fontSize={'lg'}
                            color={'red.600'}
                            fontWeight={'normal'}
                        >
                        {error && error}
                        </Text>
                        <Divider mt={4} borderBottomWidth={'1px'} opacity={1} />
                    </ModalHeader>
                    <ModalCloseButton />
                    <FormRegister onSubmit={onSubmit} isLoading={isLoading} />
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalRegister;
