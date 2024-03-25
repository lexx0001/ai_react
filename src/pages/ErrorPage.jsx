import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStatus from '../components/useAuthStatus';

const ErrorPage = () => {
    const { authStatus, jwt } = useAuthStatus();
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(preCount => preCount + 1);
            // Повторно запускаем проверку статуса авторизации
            console.log('Проверка статуса авторизации...');
            // В кастомном хуке useAuthStatus уже реализована логика проверки
            // и установки состояний authStatus и jwt
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
        <div>
            <h1>Error Page</h1>
            <p>Auth Status: {authStatus}</p>
            <p>JWT: {jwt}</p>
            <p>count: {count}</p>
        </div>
    );

};

export default ErrorPage;