import { HStack, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import socket from '../../../utils/socketIo';
import ChatBox from '../components/ChatBox';
import FriendList from '../components/FriendList';

const Home = () => {
    useEffect(() => {
        socket.connect();
    }, [])
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
