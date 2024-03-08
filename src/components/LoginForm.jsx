import React, { useState, useRef, useEffect } from 'react';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');
    const emailInputRef = useRef(null);

    useEffect(() => {
        // Устанавливаем фокус на поле ввода электронной почты при загрузке формы
        emailInputRef.current.focus();
    }, []); // Пустой массив зависимостей, чтобы useEffect вызывался только один раз при загрузке компонента

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePinChange = (event) => {
        setPin(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('Отправляем email:', email); // Вывод в консоль отправляемого email
            console.log('Отправляем pin:', pin); // Вывод в консоль отправляемого PIN

            const formData = new FormData(); // Создаем новый объект FormData
            formData.append('email', email); // Добавляем значение email в объект FormData
            formData.append('pin', pin); // Добавляем значение PIN в объект FormData

            // Отправляем данные на сервер
            const response = await fetch('/emaillog', {
                method: 'POST',
                body: formData // Передаем объект FormData в качестве тела запроса
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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    pattern='[^\s@]+@[^\s@]+\.[^\s@]+'
                    onChange={handleEmailChange}
                    required // поле обязательно для ввода
                    ref={emailInputRef} // ссылка на поле ввода email
                />
            </div>
            <div> {/* Обертка для поля PIN */}
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
            <button type="submit">Войти</button>
        </form>
    );
};

export default LoginForm;
