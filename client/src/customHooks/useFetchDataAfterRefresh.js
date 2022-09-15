import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDataAuth } from '../features/auth/authSlice';
import { setDataUser } from '../features/user/userSlice';

const useFetchDataAfterRefresh = () => {
    const [isGetData, setIsGetData] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            axios.defaults.withCredentials = true;
            const res = await axios.get(
                'http://localhost:3002/auth/authUserReloadPage'
            );
            setIsGetData(false);
            if (!res.data?.login) {
                console.log(res.data);
                dispatch(
                    setDataAuth({
                        isLogin: res.data.login,
                        isFirstLogin: null,
                    })
                );
                return;
            }
            localStorage.setItem('token', res.data.accessToken);
            dispatch(
                setDataUser({
                    username: res.data.user.username,
                    image: res.data.user.image,
                    userId: res.data.user.userId,
                })
            );
            dispatch(
                setDataAuth({
                    isLogin: res.data.login,
                    isFirstLogin: !!res.data.user.isFirstLogin,
                })
            );
        };
        getData();
    }, [dispatch]);

    return isGetData;
};

export default useFetchDataAfterRefresh;
