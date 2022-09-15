import { Box, Text, VStack } from '@chakra-ui/react';
import moment from 'moment-timezone';
import React from 'react';

const Message = ({ time, text, isAuthor = false }) => {

    return (
        <>
            <VStack
                w={'full'}
                alignItems={isAuthor ? 'flex-end' : 'flex-start'}
                spacing={'0'}
                m={'0 !important'}
            >
                <Box
                    borderRadius={'base'}
                    p={'1'}
                    px={'3'}
                    maxW={'70%'}
                    bg={'#0097e6'}
                    color={'white'}
                    whiteSpace={'pre-wrap'}
                >
                    <Text >{text}</Text>
                </Box>
                <Text
                    fontSize={'14px'}
                    fontWeight={'semibold'}
                    color={'gray.800'}
                    textTransform={'capitalize'}
                >
                {moment(time).fromNow()}
                </Text>
            </VStack>
        </>
    );
};

export default Message;
