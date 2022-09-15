import {
    Avatar,
    Center,
    HStack,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import UserInfo from './UserInfo';

const UserList = ({
    userList = [],
    handleChooseUser = () => {},
    isLoading = false,
}) => {
    const currentUserTextToId = useSelector(
        (state) => state.user.currentUserTextTo.textToId
    );

    return (
        <>
            <VStack
                paddingRight={'2'}
                flex={'1'}
                overflowY={'auto'}
                w={'full'}
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
                {isLoading ? (
                    <Center w={'full'} h={'full'}>
                        <Spinner />
                    </Center>
                ) : userList?.length ? (
                    userList.map((user) => (
                        <UserInfo
                            isActive={currentUserTextToId === user.userId}
                            key={user.userId}
                            user={user}
                            handleClick={handleChooseUser}
                        />
                    ))
                ) : (
                    <Center w={'full'} h={'full'}>
                        Nothing in here
                    </Center>
                )}
            </VStack>
        </>
    );
};

export default UserList;
