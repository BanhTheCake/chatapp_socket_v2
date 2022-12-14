import { Avatar, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import UserList from './UserList';
import SearchBox from './SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import axiosClient from '../../../api/setupAxios';
import { handleSignOut } from '../../auth/authSlice';
import { debounce } from 'lodash';
import moment from 'moment';
import { useCallback } from 'react';
import { setCurrentUserTextTo } from '../userSlice';
import socket from '../../../utils/socketIo';
import { useRef } from 'react';
import {
    apiAddFriend,
    apiGetFriendList,
    apiSearchFriendList,
} from '../../../constants/apiVar';

const handleSortByDate = (userList = []) => {
    userList.sort((first, last) => {
        const firstDay = moment(first.Friends.createdAt).utc().format('x');
        const lastDay = moment(last.Friends.createdAt).utc().format('x');
        if (firstDay === 'Invalid date') {
            return -1;
        }
        if (lastDay === 'Invalid date') {
            return -1;
        }
        return Number(lastDay) - Number(firstDay);
    });
    return userList;
};

const FriendList = () => {
    const username = useSelector((state) => state.user.username);
    const image = useSelector((state) => state.user.image);
    const userId = useSelector((state) => state.user.userId);

    const [userList, setUserList] = useState(null);
    const [isLoadingFriends, setIsLoadingFriends] = useState(false);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [searchFriends, setSearchFriends] = useState('');
    const [friendList, setFriendList] = useState([]);

    const clearTimeOutFriends = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoadingFriends(true);
                const data = await axiosClient.get(apiGetFriendList);
                if (!data) {
                    dispatch(handleSignOut());
                }
                let newData = handleSortByDate(data);
                newData = [...newData]?.map((user) => {
                    delete user.Friends;
                    return user;
                });
                setTimeout(() => {
                    setIsLoadingFriends(false);
                    setUserList(newData);
                }, 300);
            } catch (error) {
                setIsLoadingFriends(false);
                console.log(error);
            }
        };
        getData();
    }, [username, dispatch]);

    const handleSearchFriends = useMemo(() => {
        const getInput = (data) => {
            setSearchFriends(data);
        };
        return debounce(getInput, 500);
    }, []);

    useEffect(() => {
        const getFriends = async () => {
            setIsLoadingSearch(true);
            if (clearTimeOutFriends.current) {
                clearTimeout(clearTimeOutFriends.current);
            }
            try {
                let data;
                data = await axiosClient.post(apiSearchFriendList, {
                    searchQuery: searchFriends,
                });
                if (data) {
                    const friendListExist = userList?.map(
                        (user) => user?.username
                    );
                    const newData = data.filter((item) => {
                        return (
                            item.username !== username &&
                            !friendListExist.includes(item.username)
                        );
                    });
                    clearTimeOutFriends.current = setTimeout(() => {
                        setIsLoadingSearch(false);
                        setFriendList(newData);
                    }, 300);
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (isOpen) {
            getFriends();
        }
    }, [searchFriends, isOpen, username, userList]);

    const handleAddFriends = useCallback(
        async (friendId, username) => {
            try {
                console.log(friendId);
                console.log(username);
                const data = await axiosClient.post(apiAddFriend, {
                    friendUserId: friendId,
                });
                if (data.message === 'successful') {
                    const currentUser = friendList.find(
                        (friend) => friend.userId === friendId
                    );
                    socket.emit('addFriend', {
                        userId,
                        friend: currentUser.userId,
                    });
                    setUserList((prev) => [currentUser, ...prev]);
                    dispatch(
                        setCurrentUserTextTo({
                            textToId: friendId,
                            textToUsername: username,
                        })
                    );
                }
                setSearchFriends('');
            } catch (error) {
                console.log(error);
            }
        },
        [friendList, userId, dispatch]
    );

    useEffect(() => {
        socket.on('receiveFriend', (data) => {
            try {
                console.log('data', data);
                if (data.friend === userId) {
                    setUserList((prev) => [data.currentUser, ...prev]);
                }
                return;
            } catch (error) {
                console.log(error);
            }
        });
        return () => {
            socket.off('receiveFriend');
        };
    }, [userId]);

    const handleChooseUser = (userId, username) => {
        dispatch(
            setCurrentUserTextTo({ textToId: userId, textToUsername: username })
        );
    };

    return (
        <>
            <VStack
                flexShrink={0}
                flexDirection={'column-reverse'}
                h={'100%'}
                alignItems={'flex-start'}
                gap={'3'}
            >
                <HStack
                    bg={'white'}
                    py={'2'}
                    px={'4'}
                    borderRadius={'lg'}
                    gap={'3'}
                    w={'full'}
                    border={'3px solid #2f3640'}
                >
                    <Avatar
                        src={image}
                        name={username}
                        w={'46px'}
                        h={'46px'}
                    ></Avatar>
                    <Text
                        fontSize={'16px'}
                        fontWeight={'semibold'}
                        color={'black'}
                        textTransform={'capitalize'}
                    >
                        {username}
                    </Text>
                </HStack>
                <UserList
                    userList={userList}
                    handleChooseUser={handleChooseUser}
                    isLoading={isLoadingFriends}
                />
                <SearchBox
                    handleSearchFriends={handleSearchFriends}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    friendList={friendList}
                    handleAddFriends={handleAddFriends}
                    isLoading={isLoadingSearch}
                />
            </VStack>
        </>
    );
};

export default FriendList;
