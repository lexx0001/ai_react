import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStatus from '../components/useAuthStatus';
import SpinnerOne from '../components/UI/spinners/SpinnerOne';

const ErrorPage = () => {
    const { authStatus } = useAuthStatus();
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(preCount => preCount + 1);
            // Повторно запускаем проверку статуса авторизации
            console.log('Проверка статуса авторизации...');
            // В кастомном хуке useAuthStatus уже реализована логика проверки и установки состояний authStatus и jwt
        }, 5000); // Проверка каждые 5 секунд

        return () => clearInterval(interval); // Очищаем интервал при размонтировании компонента
    }, []); // Пустой массив зависимостей, чтобы эффект запускался только один раз

    // После завершения проверки авторизации, возвращаем соответствующий редирект
    if (authStatus === 'authorized') {
        return <Navigate to="/main_page" />;
    } else if (authStatus === 'unauthorized') {
        return <Navigate to="/login" />;
    };

    return (
        <div style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', display: 'flex', fontSize: '21px', color: '#e24f2b' }}>
            <h1>Error Page</h1>
            <p>Auth Status: {authStatus}</p>
            <p>connection attempt: {count}</p>
            <SpinnerOne />
        </div >
    );

};

export default ErrorPage;