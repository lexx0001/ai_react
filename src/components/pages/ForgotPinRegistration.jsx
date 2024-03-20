// ForgotPinRegistration.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPinRegistration = () => {
    console.log('ForgotPinRegistration монтируется', Date.now()); // Выводим сообщение с временной меткой

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [serverResponse, setServerResponse] = useState(null); // Состояние для хранения ответа от сервера

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleForgotPinSubmit = async (event) => {
        event.preventDefault();
        // Логика для восстановления PIN

        // Имитация успешного ответа от сервера
        try {
            console.log('Отправляем email:', email);
            // Имитируем успешный ответ от сервера
            const response = { success: true, message: 'На вашу почту было отправлен пин-код вставьте его ниже', respEmail: email };
            setServerResponse(response); // Сохраняем ответ от сервера в состоянии
        } catch (error) {
            console.error('Произошла ошибка при выполнении операции с помощью fetch ', error);
            setServerResponse({ success: false, message: 'Произошла ошибка при выполнении операции' });
        }

    };

    useEffect(() => {
        // Передаем данные в LoginForm через маршрут, когда они будут доступны
        if (serverResponse) {
            navigate('/login', { state: { serverResponse } });
            console.log('Отправляем данные на страницу login', serverResponse);
        }
    }, [serverResponse, navigate]);

    return (
        <div>
            <h2>Восстановление PIN / Регистрация</h2>
            <form onSubmit={handleForgotPinSubmit}>
                {/* Форма для восстановления PIN */}
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type="email"
                        name="email"
                        id="email"
                        value={email}
                        pattern='[^\s@]+@[^\s@]+\.[^\s@]+'
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <button type='submit'>Ввод</button>
            </form>
        </div>
    );
};

export default ForgotPinRegistration;
