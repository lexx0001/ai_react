import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthButton from '../components/UI/button/AuthButton';
import AuthInput from '../components/UI/input/AuthInput';
import AuthContainer from '../components/UI/conteiner/AuthContainer';
import MessageText from '../components/UI/message/MessageText';
import FormStyle from '../components/UI/formstyle/FormStyle';

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
    const [previousEmail, setPreviousEmail] = useState('');
    const [previousPin, setPreviousPin] = useState('');



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
            // Проверяем, совпадают ли новые значения с предыдущими
            if (email === previousEmail && pin === previousPin) {
                // Если значения совпадают, не отправляем запрос на сервер
                return;
            }
            // Сохраняем новые значения в качестве предыдущих
            setPreviousEmail(email);
            setPreviousPin(pin);

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
        <AuthContainer>
            <MessageText>{messageResp}</MessageText>

            <FormStyle onSubmit={handleSubmit}>
                <div>
                    <AuthInput
                        placeholder='email'
                        type="email"
                        id="email"
                        value={email}
                        pattern='[^\s@]+@[^\s@]+\.[^\s@]+'
                        onChange={handleEmailChange}
                        required
                        ref={emailInputRef} />
                </div>

                <div>
                    <AuthInput
                        placeholder='PIN'
                        type='text'
                        id='pin'
                        value={pin}
                        pattern="\d{4}"
                        maxLength="4"
                        onChange={handlePinChange}
                        required />
                </div>

                <AuthButton type="submit">Войти</AuthButton>

                <div>

                    {/* Вызываем функцию handleForgotPinRegistration */}
                    <AuthButton type="button" onClick={handleForgotPinRegistration}>Забыли PIN/Регистрация</AuthButton>

                </div>

            </FormStyle>

        </AuthContainer>
    );
};

export default LoginForm;
