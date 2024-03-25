import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import ForgotPinRegistration from './pages/ForgotPinRegistration';
import AuthChecker from './components/AuthChecker';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';

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
