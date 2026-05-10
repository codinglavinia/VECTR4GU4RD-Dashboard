import { useTranslation } from 'react-i18next';
import type { DashboardStats } from '../hooks/useDataset';
import './StatsGrid.css';

interface Props {
  stats: DashboardStats;
  loading: boolean;
}

export default function StatsGrid({ stats, loading }: Props) {
  const { t } = useTranslation();

  // Muestra un guión si los datos aún están cargando
  const val = (n: number) => loading ? '—' : n.toLocaleString();

  return (
    <div className="stats-grid">
      <div className="stat-card glass-panel">
        <div className="stat-content">
          <div className="stat-info">
            <span className="stat-label">{t('stats.total_threats')}</span>
            <div className="stat-value-row">
              <div className="value-group">
                <h2 className="stat-value">{val(stats.totalThreats)}</h2>
                <span className="dot dot-red pulse"></span>
              </div>
              <div className="mini-chart chart-green">
                <div className="bar b1"></div><div className="bar b2"></div><div className="bar b3"></div><div className="bar b4"></div><div className="bar b5"></div>
              </div>
            </div>
            <div className="stat-comparison">{t('stats.compared_last_week')}</div>
          </div>
        </div>
      </div>

      <div className="stat-card glass-panel">
        <div className="stat-content">
          <div className="stat-info">
            <span className="stat-label">{t('stats.defended')}</span>
            <div className="stat-value-row">
              <div className="value-group">
                <h2 className="stat-value">{val(stats.defended)}</h2>
                <span className="dot dot-green pulse"></span>
              </div>
              <div className="mini-chart chart-red">
                <div className="bar b1"></div><div className="bar b2"></div><div className="bar b3"></div><div className="bar b4"></div><div className="bar b5"></div>
              </div>
            </div>
            <div className="stat-comparison">{t('stats.compared_last_week')}</div>
          </div>
        </div>
      </div>

      <div className="stat-card glass-panel">
        <div className="stat-content">
          <div className="stat-info">
            <span className="stat-label">{t('stats.failures')}</span>
            <div className="stat-value-row">
              <div className="value-group">
                <h2 className="stat-value">{val(stats.failures)}</h2>
                <span className="dot dot-yellow pulse"></span>
              </div>
              <div className="mini-chart chart-green">
                <div className="bar b1"></div><div className="bar b2"></div><div className="bar b3"></div><div className="bar b4"></div><div className="bar b5"></div>
              </div>
            </div>
            <div className="stat-comparison">{t('stats.compared_last_week')}</div>
          </div>
        </div>
      </div>

      <div className="stat-card glass-panel">
        <div className="stat-content">
          <div className="stat-info">
            <span className="stat-label">{t('stats.total_users')}</span>
            <div className="stat-value-row">
              <div className="value-group">
                <h2 className="stat-value">{val(stats.totalRecords)}</h2>
                <span className="dot dot-blue pulse"></span>
              </div>
            </div>
            <div className="stat-comparison">{t('stats.compared_last_week')}</div>
            <div className="stat-legend">
              <span className="dot dot-old"></span> Old
              <span className="dot dot-new"></span> New
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

