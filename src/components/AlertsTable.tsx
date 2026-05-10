import { useTranslation } from 'react-i18next';
import './AlertsTable.css';

export interface AlertRecord {
  id: string;
  attack_cat: string;
  ip: string;
  severity: 'critical' | 'high' | 'medium' | 'safe';
  timestamp: string;
}

interface AlertsTableProps {
  alerts: AlertRecord[];
}

export default function AlertsTable({ alerts }: AlertsTableProps) {
  const { t } = useTranslation();

  const renderThreatLevel = (severity: string) => {
    let color = '';
    let translationKey = '';
    
    switch(severity) {
      case 'critical':
        color = '#ef4444'; // Rojo
        translationKey = 'severity.critical';
        break;
      case 'high':
        color = '#f97316'; // Naranja
        translationKey = 'severity.high';
        break;
      case 'medium':
        color = '#eab308'; // Amarillo
        translationKey = 'severity.medium';
        break;
      case 'safe':
        color = '#22c55e'; // Verde
        translationKey = 'severity.safe';
        break;
      default:
        color = 'var(--text-primary)';
        translationKey = 'severity.medium';
    }

    return (
      <span style={{ 
        color: color, 
        fontWeight: 'bold', 
        textTransform: severity === 'critical' || severity === 'safe' ? 'uppercase' : 'none' 
      }}>
        {t(translationKey)}
      </span>
    );
  };

  return (
    <div className="alerts-card glass-panel">
      <div className="alerts-header">
        <h3>{t('alerts.title')}</h3>
      </div>
      
      <div className="table-responsive">
        <table className="alerts-table">
          <thead>
            <tr>
              <th>{t('table.attack')}</th>
              <th>{t('table.severity')}</th>
              <th>{t('table.ip')}</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr key={alert.id}>
                <td className="detection-cell">{t(alert.attack_cat)}</td>
                <td>{renderThreatLevel(alert.severity)}</td>
                <td className="ip-cell">{alert.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
