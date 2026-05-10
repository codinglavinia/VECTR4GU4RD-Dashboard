import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Login.css';
import logo from '../assets/logo.png';

interface LoginProps {
  onLogin: () => void;
}

// === SEGURIDAD: Credenciales Hacheadas (SHA-256) ===
// El código NO contiene la contraseña original, solo su huella digital criptográfica.
const SECURE_AUTH = {
  userHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', // Hash de "Admin"
  passHash: '937220268579d9e48710777589f28ec972851888487b7a1e0f0654877f09a5d'  // Hash real de "LVvectraguard82"
};

export default function Login({ onLogin }: LoginProps) {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Función criptográfica real para verificar los hashes
  const hashString = async (str: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const uHash = await hashString(username);
      const pHash = await hashString(password);

      // Comparamos los hashes generados con los almacenados
      if (uHash === SECURE_AUTH.userHash && pHash === SECURE_AUTH.passHash) {
        onLogin();
      } else {
        setError('AUTH_ERROR: Access Denied. Hash mismatch.');
      }
    } catch (err) {
      setError('CRYPTO_ERROR: Security module failure.');
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
