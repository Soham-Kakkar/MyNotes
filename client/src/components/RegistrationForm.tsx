import React, { useState } from 'react';
import { loginUser, registerUser  } from '../api';

interface RegistrationFormProps {
  onRegisterSuccess: (username: string) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await registerUser ({ username, nickname, password });
      console.log('Registration succesful');
      loginUser({ username, password });
      onRegisterSuccess(username);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="text" placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      <button type="submit">Register</button>
      {error && <p className="auth-error">{error}</p>}
    </form>
  );
};

export default RegistrationForm;