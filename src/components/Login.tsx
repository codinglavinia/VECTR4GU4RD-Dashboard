import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/logo.png';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Credenciales personalizadas para la demo
    if (username === 'Eddie' && password === 'adminLVectraGuard82') {
      onLogin();
    } else {
      setError('Credenciales de seguridad incorrectas');
    }
  };

  return (
    <div className="login-page">
      {/* Elementos de fondo decorativos para profundidad */}
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
            <label>Login:</label>
            <div className="input-wrapper">
              <input 
                type="text" 
                placeholder="Eddie" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Password :</label>
            <div className="input-wrapper">
              <input 
                type="password" 
                placeholder="••••••••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-btn">
            Authenticate System
          </button>
        </form>

        <div className="login-footer">
          <div className="encryption-badge">
            <span className="lock-icon">🔒</span> AES-256 Encrypted Connection
          </div>
          <p className="copyright">© 2026 VectraGuard by @codinglavinia</p>
        </div>
      </div>
    </div>
  );
}
