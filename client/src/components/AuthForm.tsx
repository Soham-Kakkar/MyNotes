import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import './AuthForm.css';  // Import the new CSS file

interface AuthFormProps {
  onAuthSuccess: (username: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-header">
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
        </div>
        
        {isLogin ? (
          <LoginForm onLoginSuccess={onAuthSuccess} />
        ) : (
          <RegistrationForm onRegisterSuccess={onAuthSuccess} />
        )}
        
        <div className="auth-switch">
          {isLogin ? (
            <span>
              Don't have an account?{' '}
              <button 
                className="auth-switch-btn" 
                onClick={toggleForm}
              >
                Sign up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button 
                className="auth-switch-btn" 
                onClick={toggleForm}
              >
                Login
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;