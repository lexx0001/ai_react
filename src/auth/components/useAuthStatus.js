// useAuthStatus.jsx
// Кастом хук для пинания сервера
import { useEffect, useState } from 'react';

const useAuthStatus = () => {

    const [authStatus, setAuthStatus] = useState('loading');

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('/check-auth-status');
                console.log(response.status)
                // console.log(response.headers)
                if (response.status === 201) {//Здесь должно быть 201 
                    setAuthStatus('authorized'); //Здесь должно быть 'authorized'!!!!!!!
                } else if (response.status === 401) {
                    setAuthStatus('unauthorized');
                } else {
                    setAuthStatus('connection error');
                }

            } catch (error) {
                console.error('Ошибка при проверке статуса авторизации', error)
                setAuthStatus('error');

            }
        };
        checkAuthStatus();
    }, []);
    return { authStatus };
};

export default useAuthStatus;