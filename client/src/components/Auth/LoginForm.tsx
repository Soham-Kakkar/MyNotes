import React, { useState } from 'react';
import { UserAPI } from '../../api/UserAPI';

interface LoginFormProps {
  onLoginSuccess: (username: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await UserAPI.loginUser ({ username, password });
      onLoginSuccess(username);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button type="submit">Login</button>
      {error && <p className="auth-error">{error}</p>}
    </form>
  );
};

export default LoginForm;