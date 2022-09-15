import React from 'react';
import {
    VStack,
    Box,
    Heading,
    Text,
    HStack,
    useDisclosure,
} from '@chakra-ui/react';
import FormLogin from '../components/FormLogin';
import ModalRegister from '../components/ModalRegister';
import { useDispatch, useSelector } from 'react-redux'
import { handleLoginUser } from '../authSlice';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useState } from 'react';



const Login = () => {

    const isLoading = useSelector((state) => state.auth.isLoading)
    const [error, setError] = useState(null) 

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const onSubmit = useCallback((data) => {
        setError(null)
        dispatch(handleLoginUser(data))
        .unwrap()
        .then(() => {
            return navigate('/')
        })
        .catch(err => {setError(err)})
    }, [dispatch, navigate]);

    return (
        <VStack h="100vh" justifyContent="center" bg="gray.100" p={4}>
            <HStack
                w={'full'}
                justifyContent={'center'}
                flexDirection={{ base: 'column', md: 'row' }}
                spacing={0}
            >
                <Box
                    mr={{ base: 0, md: 10 }}
                    mb={{ base: 8, md: 0 }}
                    maxW={{ base: '350px', md: 'unset' }}
                >
                    <Heading 
                        color={'teal.600'}
                        mb={2}
                    >
                        BanhTheCake
                    </Heading>
                    <Text fontSize={'2xl'} maxW={'500px'} lineHeight={'short'} mb={2} >
                        Welcome to BanhTheCake's Chat App, I hope you will love
                        it ❤️
                    </Text>
                    <Text fontSize={'larger'} maxW={'500px'} lineHeight={'short'} color={'red.500'} >
                        { error && error }
                    </Text>
                </Box>
                <FormLogin onSubmit={onSubmit} onOpen={onOpen} isLoading={isLoading} />
            </HStack>
            <ModalRegister isOpen={isOpen} onClose={onClose} />
        </VStack>
    );
};

export default Login;
