// src/pages/AuthPage.jsx
import { useState } from 'react';
import LoginForm from '../components/LoginForm.jsx';
import RegisterForm from '../components/RegisterForm.jsx';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50/50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 sm:px-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
          {isLogin 
            ? <LoginForm onSwitch={() => setIsLogin(false)} />
            : <RegisterForm onSwitch={() => setIsLogin(true)} />
          }
        </div>
      </div>
    </div>
  );
};

export default AuthPage;