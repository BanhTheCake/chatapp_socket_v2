import { Button, HStack, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import axiosClient from '../../../api/setupAxios';
import socket from '../../../utils/socketIo';
import { handleSignOut, setDataAuth } from '../../auth/authSlice';
import ChatBox from '../components/ChatBox';
import FriendList from '../components/FriendList';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        socket.connect();
    }, [])

    const handleClick = async () => {
        try {
            const data = await axiosClient.get(
                'http://localhost:3002/getCurrentUser'
            );
            console.log(data);
        } catch (error) {
            console.log(error);
            dispatch(handleSignOut())
            return navigate('/login');
        }
    };

    return (
        <>
            <VStack w={'100vw'} h={'100vh'} p={'12'}>
                <HStack
                    bg={'#f5f6fa'}
                    w={'1000px'}
                    maxW={'100%'}
                    margin={'auto'}
                    h={'100%'}
                    boxShadow={'base'}
                    borderRadius={'lg'}
                    p={'4'}
                    gap={'3'}
                >
                    <FriendList />
                    <ChatBox />
                </HStack>
            </VStack>
        </>
    );
};

export default Home;
