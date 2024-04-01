import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStatus from '../components/useAuthStatus';
import SpinnerOne from '../components/UI/spinners/SpinnerOne';


const MainPage = () => {

    const { authStatus } = useAuthStatus();
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const newWs = new WebSocket('ws://localhost:8080/ws');

        newWs.onopen = function open() {
            console.log('Соединение WS установлено.');
        };

        newWs.onclose = function close() {
            console.log('Соединение WS закрыто. Попытка восстановления...');
            // Создаем новое соединение при закрытии текущего
            setTimeout(() => {
                setWs(new WebSocket('ws://localhost:8080/ws'));
            }, 5000); // Повторная попытка через 5 секунд
        };

        newWs.onerror = function error() {
            console.error('Ошибка соединения. Попытка восстановления...');
            // Создаем новое соединение при ошибке текущего
            setTimeout(() => {
                setWs(new WebSocket('ws://localhost:8080/ws'));
            }, 5000); // Повторная попытка через 5 секунд
        };

        // Сохраняем созданное соединение в состоянии
        setWs(newWs);

        // Закрываем предыдущее соединение при размонтировании компонента
        return () => {
            newWs.close();
        };
    }, []); // Пустой массив зависимостей, чтобы useEffect выполнился только один раз

    if (authStatus === 'unauthorized') {
        return <Navigate to='/login' />;
    }
    else if (authStatus === 'authorized') {
        return <p>Main page</p>;
    }
    else if (authStatus === 'loading') {
        return <SpinnerOne />;
    }
    else {
        return <Navigate to='/error' />;
    };

}

export default MainPage;