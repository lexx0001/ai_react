// useAuthStatus.jsx
import { useEffect, useState } from 'react';

const useAuthStatus = () => {
    const [authStatus, setAuthStatus] = useState('loading');

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('/check-auth-status');
                if (response.status === 200) {
                    setAuthStatus('authorized');
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
    return authStatus;
};

export default useAuthStatus;