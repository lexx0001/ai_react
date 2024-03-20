// controller.jsx

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';

const Controller = () => {
    // Статус авторизации (true - авторизован, false - не авторизован)
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        // Проверяем статус авторизации
        // Здесь можно сделать запрос к серверу для проверки авторизации
        const checkAuthStatus = async () => {
            try {
                // Здесь выполняется запрос к серверу для проверки статуса авторизации
                const response = await fetch('/check-auth-status');
                const data = await response.json();

                // Если пользователь авторизован, устанавливаем статус авторизации в true
                if (data.isAuth) {
                    setIsAuth(true);
                }
            } catch (error) {
                console.error('Ошибка при проверке статуса авторизации', error);
            }
        };

        checkAuthStatus();
    }, []);

    // Если пользователь авторизован, перенаправляем на главную страницу, иначе на страницу авторизации
    return isAuth ? <Navigate to="/MainPage" /> : <LoginForm />;
};

export default Controller;
