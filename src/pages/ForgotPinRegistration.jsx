import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPinRegistration = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [serverResponse, setServerResponse] = useState(null); // Состояние для хранения ответа от сервера
    const [isLoading, setIsLoading] = useState(false); // Состояние для отслеживания загрузки данных
    const [errServer, setErrServer] = useState(false);  // Состояние для отслеживания вывода сообщения об ошибке

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleForgotPinSubmit = async (event) => {
        event.preventDefault();
        // Логика для восстановления PIN
        setErrServer(false);
        try {
            setIsLoading(true); // Устанавливаем isLoading в true перед отправкой запроса

            const formData = new FormData();
            formData.append('email', email);

            const response = await fetch('/pin-forgot', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Ошибка сети - ответ не ок');
            }

            setServerResponse({ success: true, message: 'На вашу почту было отправлено письмо с пин-кодом', respEmail: email });
        } catch (error) {
            console.error('Произошла ошибка при выполнении операции с помощью fetch ', error);
            setServerResponse({ success: false, message: 'Произошла ошибка при выполнении операции' });
            setErrServer(true);
        } finally {
            setIsLoading(false); // Устанавливаем isLoading в false после завершения запроса, независимо от результата
        }
    };

    useEffect(() => {
        // Перенаправляем на страницу login в зависимости от результата
        if (serverResponse && serverResponse.success) {
            navigate('/login', { state: { serverResponse } });
            console.log('Отправляем данные на страницу login', serverResponse);
        }
    }, [serverResponse, navigate]);


    return (
        <>
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
                        required />
                </div>
                {/* Крутилочка будет отображаться, если isLoading равен true */}
                {isLoading ? <p>....Крутилочка....</p> : <button type='submit'>Ввод</button>}
                {errServer ? <p>Ошибка отправки email. Попробуйте ещё раз.</p> : <p></p>}

            </form>
        </>
    );
};

export default ForgotPinRegistration;
