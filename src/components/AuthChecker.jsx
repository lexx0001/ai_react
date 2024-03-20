import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStatus from './useAuthStatus';

const AuthChecker = () => {

    const authStatus = useAuthStatus();

    useEffect(() => {
        const checkAuthStatus = async () => {

            console.log(authStatus);
        };

        checkAuthStatus();

    }, []);

    // Пока выполняется проверка, возвращаем null или "крутилку"
    if (authStatus === 'loading') {
        return (<p>....Крутилочка....</p>);
    }

    // После завершения проверки авторизации, возвращаем соответствующий редирект
    if (authStatus === 'authorized') {
        return <Navigate to="/error" />;
    } else if (authStatus === 'unauthorized') {
        return <Navigate to="/login" />;
    } else {
        return <Navigate to="/error" />;
    }
};

export default AuthChecker;
