import React, { createContext, useContext, useState } from 'react';

// Создаем контекст
const AuthContext = createContext();

// Создаем провайдер контекста, который будет хранить состояние JWT
export const AuthProvider = ({ children }) => {
    const [jwt, setJWT] = useState(null);

    return (
        <AuthContext.Provider value={{ jwt, setJWT }}>
            {children}
        </AuthContext.Provider>
    );
};

// Создаем кастомный хук для удобного доступа к контексту
export const useAuth = () => useContext(AuthContext);
