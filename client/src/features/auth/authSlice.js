import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { clearData, setDataUser } from '../user/userSlice';

export const handleLoginUser = createAsyncThunk(
    'auth/login',
    async (data, { dispatch, rejectWithValue }) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    axios.defaults.withCredentials = true;
                    const res = await axios.post(
                        'https://chatappsocketbackend.onrender.com/auth/login',
                        {
                            username: data.username,
                            password: data.password,
                        }
                    );
                    if (res.data.err) {
                        reject(rejectWithValue(res.data.message));
                    } else {
                        dispatch(
                            setDataUser({
                                username: res.data.user.username,
                                image: res.data.user.image,
                                userId: res.data.user.userId
                            })
                        );
                        localStorage.setItem('token', res.data.token);
                        resolve({
                            isFirstLogin: !!res.data.user.isFirstLogin,
                            isLogin: res.data.login,
                        });
                    }
                } catch (error) {
                    reject(rejectWithValue(error));
                }
            }, 500);
        });
    }
);

export const handleRegisterUser = createAsyncThunk(
    'auth/register',
    async (data, { rejectWithValue }) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    axios.defaults.withCredentials = true;
                    const res = await axios.post(
                        'https://chatappsocketbackend.onrender.com/auth/register',
                        {
                            username: data.username,
                            password: data.password,
                        }
                    );
                    if (res.data.err) {
                        reject(rejectWithValue(res.data.message));
                    } else {
                        resolve();
                    }
                } catch (error) {
                    reject(rejectWithValue(error));
                }
            }, 500);
        });
    }
);

export const handleSignOut = createAsyncThunk(
    'auth/Logout',
    async (_, { dispatch, rejectWithValue }) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    axios.defaults.withCredentials = true
                    await axios.get('https://chatappsocketbackend.onrender.com/auth/logout');
                    localStorage.clear();
                    dispatch(clearData())
                    resolve();
                } catch (error) {
                    reject(rejectWithValue(error));
                }
            }, 500);
        });
    }
);

const initialState = {
    isLogin: false,
    isLoading: false,
    isFirstLogin: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setDataAuth(state, actions) {
            const newState = { ...state };
            newState.isLogin = actions.payload.isLogin;
            newState.isFirstLogin = actions.payload.isFirstLogin;
            return newState;
        },
    },
    extraReducers: {
        [handleLoginUser.pending]: (state) => {
            state.isLoading = true;
        },
        [handleLoginUser.fulfilled]: (state, actions) => {
            state.isLoading = false;
            state.isFirstLogin = actions.payload.isFirstLogin;
            state.isLogin = actions.payload.isLogin;
        },
        [handleLoginUser.rejected]: (state, actions) => {
            state.isLoading = false;
        },
        [handleRegisterUser.pending]: (state) => {
            state.isLoading = true;
        },
        [handleRegisterUser.fulfilled]: (state, actions) => {
            state.isLoading = false;
        },
        [handleRegisterUser.rejected]: (state, actions) => {
            state.isLoading = false;
        },
    },
});

export const { setDataAuth } = authSlice.actions;

export default authSlice.reducer;
