import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthButton from '../components/UI/button/AuthButton';
import AuthInput from '../components/UI/input/AuthInput';
import classes from '../components/UI/title/TitleText.module.css';
import AuthContainer from '../components/UI/conteiner/AuthContainer';
import MessageText from '../components/UI/message/MessageText';
import FormStyle from '../components/UI/formstyle/FormStyle';


const ForgotPinRegistration = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [serverResponse, setServerResponse] = useState(null); // Состояние для хранения ответа от сервера
    const [isLoading, setIsLoading] = useState(false); // Состояние для отслеживания загрузки данных
    const [errServer, setErrServer] = useState(false);  // Состояние для отслеживания вывода сообщения об ошибке
    const emailInputRef = useRef(null);
    useEffect(() => {
        emailInputRef.current.focus();
    }, []);

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
        <AuthContainer>

            <FormStyle onSubmit={handleForgotPinSubmit}>
                {/* Форма для восстановления PIN */}
                <p className={classes.titleText}>Восстановление PIN / Регистрация</p>
                <div>
                    <AuthInput type="email"
                        placeholder='email'
                        name="email"
                        id="email"
                        value={email}
                        pattern='[^\s@]+@[^\s@]+\.[^\s@]+'
                        onChange={handleEmailChange}
                        required
                        ref={emailInputRef} />
                </div>
                {/* Крутилочка будет отображаться, если isLoading равен true */}
                {isLoading ? <p>....Крутилочка....</p> : <AuthButton type='submit'>Ввод</AuthButton>}
            </FormStyle>
            {errServer ? <MessageText>Ошибка отправки email. Попробуйте ещё раз.</MessageText> : <MessageText></MessageText>}
        </AuthContainer>
    );
};

export default ForgotPinRegistration;
