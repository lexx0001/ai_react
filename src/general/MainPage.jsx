import React, { useEffect } from 'react';
import useAuthStatus from '../auth/components/useAuthStatus';
import useWebSocket from './components/useWebSockets';

const MainPage = () => {
    const { authStatus, id } = useAuthStatus();
    const { sendMessage } = useWebSocket('ws://localhost:8080/ws');

    useEffect(() => {

        // Проверка статуса авторизации и установка WebSocket соединения, если пользователь авторизован
        if (authStatus === 'authorized') {
            sendMessage(id);
        }
    }, [authStatus, id, sendMessage]);

    let statusMessage;
    switch (authStatus) {
        case 'loading':
            statusMessage = 'Загрузка...';
            break;
        case 'authorized':
            statusMessage = `Вы авторизованы. ID пользователя: ${id}`;
            break;
        case 'unauthorized':
            statusMessage = 'Вы не авторизованы.';
            break;
        case 'connection error':
            statusMessage = 'Ошибка соединения.';
            break;
        case 'error':
            statusMessage = 'Произошла ошибка.';
            break;
        default:
            statusMessage = 'Неизвестный статус.';
    }

    return (
        <div>
            <h1>Main Page</h1>
            <p>{statusMessage}</p>
        </div>
    );
};

export default MainPage;
