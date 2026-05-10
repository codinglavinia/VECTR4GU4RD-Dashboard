import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Login.css';
import logo from '../assets/logo.png';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'Eddie' && password === 'adminLVectraGuard82') {
      onLogin();
    } else {
      setError('Credenciales de seguridad incorrectas');
    }
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-grid"></div>
      </div>

      <div className="login-card glass-panel">
        <div className="login-header">
          <div className="logo-wrapper">
            <img src={logo} alt="VectraGuard Logo" className="login-logo" />
            <div className="logo-glow"></div>
          </div>
          <h1>VectraGuard</h1>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>{t('login.label')}</label>
            <div className="input-wrapper">
              <input 
                type="text" 
                placeholder="" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>{t('login.password')}</label>
            <div className="input-wrapper">
              <input 
                type="password" 
                placeholder="" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-btn">
            {t('login.submit')}
          </button>

          <p className="login-secure-text">{t('login.secure_access')}</p>
        </form>

        <div className="login-links">
          <a href="#create" className="login-link">{t('login.create_account')}</a>
          <a href="#forgot" className="login-link">{t('login.forgot_password')}</a>
        </div>

        <div className="login-footer">
          <p className="copyright">© 2026 VectraGuard</p>
          <p className="made-by">made by : @codinglavinia</p>
        </div>
      </div>
    </div>
  );
}
