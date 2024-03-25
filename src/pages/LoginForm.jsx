import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginForm = () => {

    // Используем хук useLocation для получения объекта location из React Router(получаем даннные с другой страницы)
    const location = useLocation();

    // Проверяем, есть ли данные в состоянии location.state и извлекаем их
    const responseForgotPin = location.state && location.state.serverResponse;
    console.log(responseForgotPin)

    const navigate = useNavigate(); // Используем useNavigate() для получения функции навигации
    let emailResp = '';
    //вставка корректных значений в поле емайл
    if (typeof responseForgotPin === 'object' && responseForgotPin !== null) {
        emailResp = responseForgotPin.respEmail;
    } else {
        emailResp = responseForgotPin || '';
    }
    const [messageResp, setMessageResp] = useState(responseForgotPin && responseForgotPin.message ? responseForgotPin.message : '');
    const [email, setEmail] = useState(emailResp);
    const [pin, setPin] = useState('');
    const emailInputRef = useRef(null);



    useEffect(() => {
        emailInputRef.current.focus();
    }, []);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePinChange = (event) => {
        setPin(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('Отправляем email:', email);
            console.log('Отправляем pin:', pin);

            const formData = new FormData();
            formData.append('email', email);
            formData.append('pin', pin);

            const response = await fetch('/emaillog', {
                method: 'POST',
                body: formData
            });


            if (response.status === 401) {
                setMessageResp('Ошибка авторизации. Проверьте правильность введённых данных.');
            } else if (!response.ok) {
                throw new Error('Ошибка сети');
            } else {
                navigate('/main_page');
            }

            // console.log('Ответ сервера: ', await response.json());
        } catch (error) {
            console.error('Произошла ошибка при выполнении операции с помощью fetch ', error);
            setMessageResp(error.message);
        }
    };

    const handleForgotPinRegistration = () => {
        navigate('/forgot-pin-registration'); // Перенаправляем пользователя на /forgot-pin-registration
    };


    return (
        <>
            <div>{messageResp}</div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        pattern='[^\s@]+@[^\s@]+\.[^\s@]+'
                        onChange={handleEmailChange}
                        required
                        ref={emailInputRef} />
                </div>

                <div>
                    <label htmlFor='pin'>Pin 4 цифры:</label>
                    <input
                        type='text'
                        id='pin'
                        value={pin}
                        pattern="\d{4}"
                        onChange={handlePinChange}
                        required />
                </div>

                <button type="submit">Войти</button>

                <div>

                    {/* Вызываем функцию handleForgotPinRegistration при клике на ссылку */}
                    <button type="button" onClick={handleForgotPinRegistration}>Забыли PIN/Регистрация</button>
                </div>

            </form>

        </>
    );
};

export default LoginForm;
