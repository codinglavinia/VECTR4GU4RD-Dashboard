import { useTranslation } from 'react-i18next';
import './NodeCluster.css';

export default function NodeCluster() {
  const { t } = useTranslation();

  return (
    <div className="node-card glass-panel">
      <div className="node-header">
        <h3>{t('node.title')}</h3>
        <p>{t('node.subtitle')}</p>
        
        <div className="node-filters">
          <button className="active">{t('node.filter_all')}</button>
          <button>{t('node.filter_risk')}</button>
          <button>{t('node.filter_breached')}</button>
          <button>{t('node.filter_idle')}</button>
          <button>{t('node.filter_new')}</button>
        </div>
      </div>

      <div className="node-visualization">
        {/* Órbitas de fondo simuladas con bordes redondeados */}
        <div className="orbit orbit-1"></div>
        <div className="orbit orbit-2"></div>
        <div className="orbit orbit-3"></div>

        {/* Nodos principales */}
        <div className="node n-center">
          <div className="node-ring"></div>
          <span className="node-value">3652</span>
        </div>

        <div className="node n-top-left type-purple">
          <div className="node-ring"></div>
          <span className="node-value">1278</span>
        </div>

        <div className="node n-top-right type-magenta">
          <div className="node-ring"></div>
          <span className="node-value">1786</span>
        </div>

        <div className="node n-bottom-left type-magenta">
          <div className="node-ring"></div>
          <span className="node-value">1945</span>
        </div>

        <div className="node n-bottom-right type-blue">
          <div className="node-ring"></div>
          <span className="node-value">1289</span>
        </div>

        {/* Nodos pequeños secundarios */}
        <div className="node-small ns-1">986</div>
        <div className="node-small ns-2">828</div>
        <div className="node-small ns-3">896</div>
        <div className="node-small ns-4">725</div>
      </div>

      <div className="node-legend">
        <span><span className="legend-dot" style={{background: '#d946ef'}}></span> {t('node.filter_risk')}</span>
        <span><span className="legend-dot" style={{background: '#3b82f6'}}></span> {t('node.filter_breached')}</span>
        <span><span className="legend-dot" style={{background: '#4b5563'}}></span> {t('node.legend_dormant')}</span>
        <span><span className="legend-dot" style={{background: '#06b6d4'}}></span> {t('node.filter_new')}</span>
      </div>
    </div>
  );
}
