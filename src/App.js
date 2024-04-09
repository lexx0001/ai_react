import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './auth/pages/LoginForm';
import ForgotPinRegistration from './auth/pages/ForgotPinRegistration';
import AuthChecker from './auth/components/AuthChecker';
import MainPage from './general/MainPage';
import ErrorPage from './auth/pages/ErrorPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthChecker />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-pin-registration" element={<ForgotPinRegistration />} />
        <Route path="/main_page" element={<MainPage />} />
        <Route path="/error" element={<ErrorPage />} />
        {/* По умолчанию перенаправляем на "/" */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
