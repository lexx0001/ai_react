// useAuthStatus.jsx
// Кастом хук для пинания сервера
import { useEffect, useState } from 'react';

const useAuthStatus = () => {

    const [authStatus, setAuthStatus] = useState('loading');
    const [jwt, setJWT] = useState(null); // Добавляем состояние для JWT

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('/check-auth-status', {
                    headers: {
                        Authorization: `Bearer ${jwt}` // Добавляем JWT в заголовок Authorization
                    }
                });
                console.log(response.status)
                console.log(response.headers)
                if (response.status === 200) {
                    // В случае успешной авторизации сохраняем JWT и статус авторизации
                    // const data = await response.json();
                    // setJWT(data.jwt);
                    setAuthStatus('authorized'); //Здесь должно быть 'authorized'!!!!!!!
                } else if (response.status === 401) {
                    setAuthStatus('unauthorized');
                } else {
                    setAuthStatus('error');
                }

            } catch (error) {
                console.error('Ошибка при проверке статуса авторизации', error)
                setAuthStatus('error');

            }
        };
        checkAuthStatus();
    }, []);
    return { authStatus, jwt };
};

export default useAuthStatus;