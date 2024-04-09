// AuthChecker.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStatus from './useAuthStatus';
import SpinnerOne from './UI/spinners/SpinnerOne';

const AuthChecker = () => {

    const { authStatus } = useAuthStatus();

    // Пока выполняется проверка, возвращаем null или "крутилку"
    if (authStatus.authStatus === 'loading') {
        return <SpinnerOne />;
    }

    // После завершения проверки авторизации, возвращаем соответствующий редирект
    if (authStatus.authStatus === 'authorized') {
        return <Navigate to="/main_page" />;
    } else if (authStatus.authStatus === 'unauthorized') {
        return <Navigate to="/login" />;
    } else {
        return <Navigate to="/error" />;
    }
};

export default AuthChecker;
