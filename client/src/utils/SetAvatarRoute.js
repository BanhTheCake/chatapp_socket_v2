import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const SetAvatarRoute = () => {

    const isFirstLogin = useSelector((state) => state.auth.isFirstLogin)

    return <> {!isFirstLogin ? <Outlet /> : <Navigate to="/avatar" />}</>;
};

export default SetAvatarRoute;
