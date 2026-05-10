import { useTranslation } from 'react-i18next';
import type { NetworkRecord } from '../hooks/useDataset';
import './LiveDataStream.css';

interface Props {
  records: NetworkRecord[];
  loading: boolean;
}

export default function LiveDataStream({ records, loading }: Props) {
  const { t } = useTranslation();

  const getRowClass = (record: NetworkRecord) => {
    if (record.label === '1') {
      const cat = record.attack_cat?.trim().toLowerCase();
      if (['backdoor', 'shellcode', 'worms', 'dos'].includes(cat)) return 'row-critical';
      return 'row-warning';
    }
    return '';
  };

  const getStatus = (record: NetworkRecord) => {
    if (record.label === '0') return 'OK';
    const cat = record.attack_cat?.trim();
    return cat ? `ALERT: ${cat.toUpperCase()}` : 'ALERT';
  };

  return (
    <div className="live-stream-card glass-panel">
      <div className="stream-header">
        <div className="header-left">
          <span className="pulse-dot"></span>
          <h3>{t('stream.title')}</h3>
        </div>
        <div className="header-right">
          <span className="stream-clock">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Gráfico de ondas SVG animado */}
      <div className="stream-graph-container">
        <svg viewBox="0 0 800 100" className="stream-svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="streamGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,50 L50,40 L100,60 L150,30 L200,70 L250,20 L300,50 L350,10 L400,60 L450,40 L500,80 L550,30 L600,50 L650,20 L700,60 L750,40 L800,50 V100 H0 Z"
            fill="url(#streamGradient)"
          />
          <path
            d="M0,50 L50,40 L100,60 L150,30 L200,70 L250,20 L300,50 L350,10 L400,60 L450,40 L500,80 L550,30 L600,50 L650,20 L700,60 L750,40 L800,50"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            className="stream-line"
          />
        </svg>
      </div>

      {/* Tabla con datos reales del CSV */}
      <div className="stream-table-container">
        {loading && records.length === 0 ? (
          <div className="stream-loading">Conectando con el flujo de datos...</div>
        ) : (
          <table className="stream-table">
            <thead>
              <tr>
                <th>{t('table.ip')}</th>
                <th>{t('table.dest_ip')}</th>
                <th>{t('table.protocol')}</th>
                <th>State</th>
                <th>{t('table.status')}</th>
              </tr>
            </thead>
            <tbody>
              {records.map((row, i) => (
                <tr key={`${row.srcip}-${i}`} className={getRowClass(row)}>
                  <td className="ip-cell">{row.srcip}</td>
                  <td className="ip-cell">{row.dstip}</td>
                  <td className="proto-cell">{row.proto?.toUpperCase()}</td>
                  <td>{row.state}</td>
                  <td className="status-cell">{getStatus(row)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
