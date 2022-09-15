import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useFetchDataAfterRefresh from './customHooks/useFetchDataAfterRefresh';
import { setDataAuth } from './features/auth/authSlice';
import Login from './features/auth/layout/Login';
import Register from './features/auth/layout/Register';
import Avatar from './features/user/layout/Avatar';
import Home from './features/user/layout/Home';
import PrivateRoute from './utils/PrivateRoute';
import SetAvatarRoute from './utils/SetAvatarRoute';

function App() {
    const isGetData = useFetchDataAfterRefresh();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<PrivateRoute isGetData={isGetData} />}>
                  <Route element={<SetAvatarRoute />}>
                      <Route path="/" element={<Home />} />
                  </Route>
                    <Route path="/avatar" element={<Avatar />} />
              </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
