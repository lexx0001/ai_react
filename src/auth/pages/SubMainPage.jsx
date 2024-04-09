// MainPage.jsx
import React from 'react';
import useAuthStatus from './useAuthStatus';

const MainPage = () => {
    const { authStatus, id } = useAuthStatus();

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
