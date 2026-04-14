// src/pages/AuthPage.jsx
import { useState } from 'react';
import LoginForm from '../components/LoginForm.jsx';
import RegisterForm from '../components/RegisterForm.jsx';

const AuthPage = () => {
  // Controls which form is visible
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex 
                    items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {isLogin 
          ? <LoginForm onSwitch={() => setIsLogin(false)} />
          : <RegisterForm onSwitch={() => setIsLogin(true)} />
        }
      </div>
    </div>
  );
};

export default AuthPage;