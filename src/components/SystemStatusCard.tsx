import { useTranslation } from 'react-i18next';
import './SystemStatusCard.css';

type SystemStatus = 'secure' | 'warning' | 'critical';

interface SystemStatusCardProps {
  status: SystemStatus;
  totalAlerts: number;
}

/*
  Componente web que muestra el estado global del sistema IDS
  usado en el Security Control Panel
*/
export default function SystemStatusCard({
  status,
  totalAlerts,
}: SystemStatusCardProps) {
  const { t } = useTranslation();

  const labels: Record<SystemStatus, string> = {
    secure: t('secure'),
    warning: t('warning'),
    critical: t('critical'),
  };

  return (
    <section className={`status-card status-${status}`}>
      <div className="status-header-flex">
        <div className="status-info">
          <h3>{t('system_status')}</h3>
          <p className="status-label">{labels[status]}</p>
          <p className="status-count">
            {t('alerts_registered')}: <strong>{totalAlerts}</strong>
          </p>
        </div>
        <div className="status-logo-container">
          <img src="/logo.png" alt="VectraGuard Logo" className={`status-logo-pulse logo-${status}`} />
        </div>
      </div>
    </section>
  );
}
