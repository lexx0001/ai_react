import { useEffect, useState } from 'react';

const useWebSocket = (url, reconnectDelay = 6000) => {
    const [socket, setSocket] = useState(null);
    const [readyToReconnect, setReadyToReconnect] = useState(true);

    useEffect(() => {
        const createSocket = () => {
            const newSocket = new WebSocket(url);

            newSocket.onopen = () => {
                console.log('WebSocket соединение установлено');
            };

            newSocket.onmessage = (event) => {
                console.log('Получено сообщение от сервера:', event.data);
            };

            newSocket.onerror = (error) => {
                console.error('Произошла ошибка WebSocket:', error);
            };

            newSocket.onclose = () => {
                console.log('WebSocket соединение закрыто');
                // Устанавливаем флаг и задержку только после закрытия соединения
                setTimeout(() => {
                    setReadyToReconnect(true);
                }, reconnectDelay);
            };

            setSocket(newSocket);
            setReadyToReconnect(false); // Сразу устанавливаем флаг в false после создания сокета
        };

        if (readyToReconnect) {
            createSocket();
        }

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [url, reconnectDelay, readyToReconnect, socket]);

    const sendMessage = (message) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(message);
        } else {
            console.error('Соединение с WebSocket не установлено');
        }
    };

    return { sendMessage };
};

export default useWebSocket;
