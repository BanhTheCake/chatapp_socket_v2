import { Search2Icon } from '@chakra-ui/icons';
import {
    Box,
    Center,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import UserInfo from './UserInfo';
import { useRef } from 'react';
const SearchBox = ({
    handleSearchFriends,
    isOpen,
    setIsOpen,
    friendList = [],
    handleAddFriends = () => {},
    isLoading = false,
}) => {
    const [searchBox, setSearchBox] = useState('');
    const inputRef = useRef(null);
    const boxInputRef = useRef(null);

    const handleInput = (e) => {
        setSearchBox(e.target.value);
        handleSearchFriends(e.target.value);
    };

    const handleFocus = () => {
        setIsOpen(true);
    };

    useEffect(() => {
        const input = inputRef.current;
        const boxInput = boxInputRef.current;

        const handleBlur = (e) => {
            if (!input.contains(e.target) && !boxInput.contains(e.target)) {
                setIsOpen(false);
            }
        };

        if (input && boxInput && isOpen) {
            window.addEventListener('click', handleBlur);
        }

        return () => {
            if (isOpen) {
                window.removeEventListener('click', handleBlur);
            }
        };
    }, [isOpen, setIsOpen]);

    const handleClick = (userId, username) => {
        handleAddFriends(userId, username);
        setIsOpen(false);
        setSearchBox('');
    };

    return (
        <>
            <HStack position={'relative'} spacing={'0'}>
                <InputGroup position={'relative'} zIndex={2}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.300" />}
                    />
                    <Input
                        ref={inputRef}
                        bg={'white'}
                        type="text"
                        placeholder="Find Friends"
                        boxShadow={'base'}
                        value={searchBox}
                        onChange={handleInput}
                        onFocus={handleFocus}
                    />
                </InputGroup>
                {isOpen && (
                    <Box
                        position={'absolute'}
                        top={'120%'}
                        zIndex={1}
                        left={'0'}
                        w={'full'}
                        p={'2'}
                        bg={'#2f3640'}
                        overflowY={'auto'}
                        borderRadius={'base'}
                    >
                        <VStack
                            ref={(node) => {
                                if (node) boxInputRef.current = node;
                            }}
                            w={'full'}
                            h={'full'}
                            overflowY={'auto'}
                            gap={'1'}
                            maxHeight={'200px'}
                            sx={{
                                '&::-webkit-scrollbar': {
                                    width: '4px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    width: '6px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    background: 'transparent',
                                    borderRadius: '24px',
                                },
                            }}
                        >
                            {isLoading ? (
                                <Center w={'full'} h={'200px'}>
                                    <Spinner color='white' />
                                </Center>
                            ) : friendList.length ? (
                                friendList.map((friend) => {
                                    return (
                                        <UserInfo
                                            user={friend}
                                            key={friend.userId}
                                            handleClick={handleClick}
                                        />
                                    );
                                })
                            ) : (
                                <Text color={'white'}>Nothing ....</Text>
                            )}
                        </VStack>
                    </Box>
                )}
            </HStack>
        </>
    );
};

export default SearchBox;
