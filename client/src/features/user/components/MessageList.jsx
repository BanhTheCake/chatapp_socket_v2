import { Box, Center, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';
import { Spinner } from '@chakra-ui/react'

const MessageList = ({ messageList = [], currentUserTextToId = '', isLoading = false }) => {
    const userId = useSelector((state) => state.user.userId);

    if (isLoading) {
        return (
            <Center w={'full'} h={'full'}>
                <Spinner size={'lg'} />
            </Center>
        )
    }

    return (
        <>
            <VStack
                flex={1}
                flexDirection={'column-reverse'}
                w={'full'}
                px={'3'}
                overflowY={'auto'}
                gap={2}
                sx={{
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#A0AEC0',
                        borderRadius: '24px',
                    },
                }}
            >
                {!currentUserTextToId ? (
                    <Center w={'full'} h={'full'}>
                        <Text>Nothing here...</Text>
                    </Center>
                ) : messageList.length ? (
                    messageList.map((message) => {
                        return (
                            <Message
                                key={message.createdAt}
                                time={message.createdAt}
                                text={message.text}
                                isAuthor={userId === message.from}
                            />
                        );
                    })
                ) : (
                    <Center w={'full'} h={'full'}>
                        <Text>No Text Found ...</Text>
                    </Center>
                )}
            </VStack>
        </>
    );
};

export default MessageList;
