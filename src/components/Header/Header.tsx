import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import './Header.css';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  const handleDownload = () => {
    // Generamos un contenido de texto simple (mock)
    const content = "=== VECTRAGUARD SECURITY REPORT ===\nGenerado: " + new Date().toISOString() + "\nIntegridad: 7869\nAmenazas Totales: 245";
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'VectraGuard_Report.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <div className="logo-text">
          <span className="logo-title">{t('header_title')}</span>
          <span className="logo-subtitle">VectraGuard</span>
        </div>
      </div>

      <div className="actions">
        <select onChange={changeLanguage} value={i18n.language} className="lang-select">
          <option value="es">ES</option>
          <option value="en">EN</option>
          <option value="ro">RO</option>
          <option value="de">DE</option>
        </select>

        <button onClick={toggleTheme} className="theme-btn" title="Alternar Tema">
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>

        <button className="btn-primary" onClick={handleDownload}>
          <span style={{ marginRight: '8px' }}>↓</span> {t('header.download')}
        </button>
      </div>
    </header>
  );
}
