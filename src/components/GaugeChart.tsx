import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.png';
import './GaugeChart.css';

export default function GaugeChart() {
  const { t } = useTranslation();

  return (
    <div className="gauge-card glass-panel">
      <div className="gauge-header">
        <div>
          <h3>{t('gauge.title')}</h3>
          <p>{t('gauge.subtitle')}</p>
        </div>
        <button className="btn-outline">{t('general.view_all')}</button>
      </div>

      <div className="gauge-container">
        {/* Logo animado reemplazando el SVG */}
        <div className="animated-logo-container">
          <img src={logo} alt="Core Engine" className="core-logo-animated" />
        </div>

        <div className="gauge-center-text">
          <span className="gauge-label">{t('gauge.total')}</span>
          <span className="gauge-value">7869</span>
        </div>
      </div>

      <div className="gauge-stats">
        <div className="gauge-stat">
          <span className="dot dot-critical"></span> {t('gauge.critical')}
          <h4>2573</h4>
        </div>
        <div className="gauge-stat">
          <span className="dot dot-suspicious"></span> {t('gauge.suspicious')}
          <h4>2117</h4>
        </div>
        <div className="gauge-stat">
          <span className="dot dot-stable"></span> {t('gauge.stable')}
          <h4>3179</h4>
        </div>
      </div>
    </div>
  );
}
