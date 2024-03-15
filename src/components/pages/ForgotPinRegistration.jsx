// ForgotPinRegistration.js
import React, { useState } from 'react';

const ForgotPinRegistration = () => {
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');
    // Другие состояния и логика

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePinChange = (event) => {
        setPin(event.target.value);
    };

    const handleRegistrationSubmit = async (event) => {
        event.preventDefault();
        // Логика для регистрации
        try {
            console.log('Отправляем email:', email);
            console.log('Отправляем pin:', pin);
            const formData = new FormData();
            formData.append('pin', pin)
            formData.append('email', email);
            // Отправляем данные на сервер
            const response = await fetch('/pin-registr', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Ошибка сети - ответ не ок');
            }

            console.log('Ответ сервера: ', await response.json());
        } catch (error) {
            console.error('Произошла ошибка при выполнении операции с помощью fetch ', error);
        }
    };

    const handleForgotPinSubmit = async (event) => {
        event.preventDefault();
        // Логика для восстановления PIN
        try {
            console.log('Отправляем email:', email);
            const formData = new FormData();
            formData.append('email', email)
            // Отправляем данные на сервер
            const response = await fetch('/email-registr', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Ошибка сети - ответ не ок');
            }

            console.log('Ответ сервера: ', await response.json());
        } catch (error) {
            console.error('Произошла ошибка при выполнении операции с помощью fetch ', error);
        }
    };



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
            <form onSubmit={handleRegistrationSubmit}>
                {/* Форма для регистрации */}
                <div>
                    <label htmlFor='pin'>Pin 4 цифры:</label>
                    <input
                        type='text'
                        id='pin'
                        value={pin}
                        pattern="\d{4}"
                        onChange={handlePinChange} // Обработчик изменения PIN
                        required // поле обязательно для ввода
                    />
                </div>
                <button type='submit'>Ввод</button>
            </form>
        </div>
    );
};

export default ForgotPinRegistration;
