import { Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../../api/setupAxios';
import InputBox from './InputBox';
import MessageList from './MessageList';
import socket from '../../../utils/socketIo';
import { useRef } from 'react';
import { handleSignOut } from '../../auth/authSlice';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
    apiAddNewMessage,
    apiGetCurrentMessage,
} from '../../../constants/apiVar';

const ChatBox = () => {
    const [messageList, setMessageList] = useState([]);
    const [inputBox, setInputBox] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const currentUserTextToIdRef = useRef(null);
    const clearTimeOutRef = useRef(null);

    const currentUserTextToId = useSelector(
        (state) => state.user.currentUserTextTo.textToId
    );
    const currentUserTextToUsername = useSelector(
        (state) => state.user.currentUserTextTo.textToUsername
    );
    const userId = useSelector((state) => state.user.userId);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getMessage = async () => {
            if (clearTimeOutRef.current) {
                clearTimeout(clearTimeOutRef.current);
            }
            try {
                setIsLoading(true);
                const data = await axiosClient({
                    method: 'get',
                    url: apiGetCurrentMessage,
                    params: {
                        currentUserId: currentUserTextToId,
                    },
                });
                clearTimeOutRef.current = setTimeout(() => {
                    setIsLoading(false);
                    setMessageList(data);
                }, 300);
            } catch (error) {
                console.log(error);
            }
        };
        if (currentUserTextToId) {
            getMessage();
        }
    }, [currentUserTextToId]);

    useEffect(() => {
        if (currentUserTextToId) {
            currentUserTextToIdRef.current = currentUserTextToId;
            socket.emit('connect-room', {
                from: userId,
                to: currentUserTextToId,
            });
            socket.on(`receive-message`, (data) => {
                try {
                    console.log(data);
                    setMessageList((prev) => [data, ...prev]);
                } catch (error) {
                    console.log(error);
                }
            });
        }
        return () => {
            socket.off('receive-message');
            socket.emit('leave-room', {
                to: currentUserTextToIdRef.current,
                from: userId,
            });
        };
    }, [currentUserTextToId, userId]);

    const handleSendMessage = async (input) => {
        try {
            const emitData = {
                createdAt: moment(Date.now()).format(),
                from: userId,
                to: currentUserTextToId,
                text: input,
            };
            socket.emit('send-message', emitData);
            axiosClient({
                method: 'post',
                url: apiAddNewMessage,
                data: {
                    currentUserId: currentUserTextToId,
                    text: input,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = () => {
        dispatch(handleSignOut());
        return navigate('/login');
    };

    return (
        <>
            <VStack
                w={'full'}
                h={'full'}
                bg={'white'}
                borderRadius={'lg'}
                boxShadow={'md'}
                pt={'2'}
                overflow={'hidden'}
            >
                <HStack justifyContent={'space-between'} w={'full'} px={3}>
                    <Text
                        textTransform={'capitalize'}
                        color={'black'}
                        fontWeight={'semibold'}
                    >
                        {currentUserTextToUsername}
                    </Text>
                    <Button colorScheme={'red'} onClick={handleClick}>
                        Log out
                    </Button>
                </HStack>
                <Divider borderBottomWidth={1} opacity={1} />
                <MessageList
                    isLoading={isLoading}
                    messageList={messageList}
                    currentUserTextToId={currentUserTextToId}
                />
                <InputBox
                    handleSendMessage={handleSendMessage}
                    setInputBox={setInputBox}
                />
            </VStack>
        </>
    );
};

export default ChatBox;
