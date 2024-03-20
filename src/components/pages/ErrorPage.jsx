import React, { useEffect } from 'react';
import useAuthStatus from '../useAuthStatus';

const ErrorPage = () => {

    const authStatus = useAuthStatus(); // Используем кастомный хук для получения статуса авторизации

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Проверяем статус авторизации, если он изменился, снова запускаем проверку
            console.log(authStatus);
        }, 5000);

        return () => clearInterval(intervalId); // Очищаем интервал при размонтировании компонента
    }, []); // Запускаем только при монтировании компонента

    return (
        <div>
            <p>Error page</p>
            <p>Trying to reconnect...</p>
        </div>
    );
};

export default ErrorPage;
