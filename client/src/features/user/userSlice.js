import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../api/setupAxios';
import { setDataAuth } from '../auth/authSlice';

export const setUserImage = createAsyncThunk(
    'user/setUserImage',
    async (data, { dispatch, rejectWithValue }) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    console.log(data);
                    await axiosClient.post(
                        'https://chatappsocketbackend.onrender.com/setImageUser',
                        { image: data }
                    );
                    dispatch(setDataImage(data));
                    dispatch(
                        setDataAuth({ isLogin: true, isFirstLogin: false })
                    );
                    resolve();
                } catch (error) {
                    console.log(error);
                    reject(rejectWithValue(error.message));
                }
            }, 500);
        });
    }
);

const initialState = {
    username: '',
    image: '',
    currentUserTextTo: {
        textToId: '',
        textToUsername: '',
    },
    userId: '',
    isLoading: null,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setDataUser(state, action) {
            const newState = { ...state };
            newState.username = action.payload.username;
            newState.image = action.payload.image;
            newState.userId = action.payload.userId;
            return newState;
        },
        setDataImage(state, action) {
            const newState = { ...state };
            newState.image = action.payload;
            return newState;
        },
        setCurrentUserTextTo(state, action) {
            const newCurrentUserTextTo = { ...state.currentUserTextTo };
            newCurrentUserTextTo.textToId = action.payload.textToId;
            newCurrentUserTextTo.textToUsername = action.payload.textToUsername;
            return { ...state, currentUserTextTo: newCurrentUserTextTo };
        },
        clearData(state, action) {
            return {
                username: '',
                image: '',
                currentUserTextTo: {
                    textToId: '',
                    textToUsername: '',
                },
                userId: '',
                isLoading: null,
                error: null,
            };
        },
    },
    extraReducers: {
        [setUserImage.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [setUserImage.fulfilled]: (state) => {
            state.isLoading = false;
        },
    },
});

export const { setDataUser, setDataImage, setCurrentUserTextTo, clearData } =
    userSlice.actions;

export default userSlice.reducer;
