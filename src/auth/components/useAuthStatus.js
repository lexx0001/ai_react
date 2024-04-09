// useAuthStatus.jsx
// Кастом хук для пинания сервера
import { useEffect, useState } from 'react';

const useAuthStatus = () => {

    const [authStatus, setAuthStatus] = useState('loading');
    const [id, setId] = useState(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('/check-auth-status');
                console.log(response.status)
                // console.log(response.headers)
                if (response.status === 201) {//Здесь должно быть 201 
                    const id = await response.text(); // Получаем тело ответа как текст
                    console.log('( useAuthStatus)ID пользователя:', id);
                    setAuthStatus('authorized'); //Здесь должно быть 'authorized'!!!!!!!
                    setId(id); // Устанавливаем id в состояние
                } else if (response.status === 401) {
                    setAuthStatus('unauthorized');
                } else {
                    setAuthStatus('connection error');
                }

            } catch (error) {
                console.error('( useAuthStatus)Ошибка при проверке статуса авторизации', error)
                setAuthStatus('error');

            }
        };
        checkAuthStatus();
    }, []);
    return { authStatus, id };
};

export default useAuthStatus;