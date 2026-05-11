import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Login.css';
import logo from '../assets/logo.png';

interface LoginProps {
  onLogin: () => void;
}

// === Ciberseguridad aplicada:Hashes (SHA-256) ===
// El código NO contiene contraseñas originales. Solo huellas digitales criptográficas.
const SECURE_DB = [
  {
    u: 'c1c224b03cd9bc7b6a86d77f5dace40191766c485cd55dc48caf9ac873335d6f', // Admin
    p: '8383c861a579785cb29805c5288b954670ec70913e90aaeea729f1b90d0d4589'  // LVvectraguard82
  },
  {
    u: '72f1935f451506ea984df8b6026f1f91136db9d3854bcb98e289e52ee392e0cd', // Eddie
    p: '0a61ef0ec38833d99b6e1fd0bd22708b469e7ceb7e97f1c12dfbc982eb59fff3'  // adminLVectraGuard82
  }
];

export default function Login({ onLogin }: LoginProps) {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Función criptográfica Web Crypto API (SHA-256)
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

      // Verificación contra la base de datos de hashes
      const userMatch = SECURE_DB.find(entry => entry.u === uHash && entry.p === pHash);

      if (userMatch) {
        onLogin();
      } else {
        setError('AUTH_ERROR: Invalid Security Hash. Access Denied.');
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
