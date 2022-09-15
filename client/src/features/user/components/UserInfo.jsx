import { Avatar, HStack, Text } from '@chakra-ui/react';
import React from 'react';

const UserInfo = ({ user, handleClick, isActive = false }) => {
    return (
        <>
            <HStack
                bg={isActive ? 'purple.500' : 'white'}
                boxShadow={'lg'}
                py={'2'}
                px={'4'}
                borderRadius={'lg'}
                w={'full'}
                cursor={'pointer'}
                onClick={() => handleClick(user.userId, user.username)}
                transition={'all 0.25s ease'}
            >
                <Avatar
                    src={user.image}
                    name={user.username}
                    w={'46px'}
                    h={'46px'}
                    mr={2}
                ></Avatar>
                <Text fontSize={'16px'} fontWeight={'semibold'} color={isActive ? 'white' : 'black'}>
                    {user.username}
                </Text>
            </HStack>
        </>
    );
};

export default UserInfo;
