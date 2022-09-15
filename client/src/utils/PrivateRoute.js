import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isGetData }) => {

    const isLogin = useSelector((state) => state.auth.isLogin)

    if (isGetData) return null;

    return <> { isLogin ? <Outlet /> : <Navigate to="/login" />} </>;
};

export default PrivateRoute;
