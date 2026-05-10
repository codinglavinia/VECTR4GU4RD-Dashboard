import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { jsPDF } from 'jspdf';
import './Header.css';

interface HeaderProps {
  stats?: {
    totalThreats: number;
    defended: number;
    failures: number;
    totalRecords: number;
  };
  alerts?: any[];
}

export default function Header({ stats, alerts }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const timestamp = new Date().toLocaleString();

    // Estilos de cabecera
    doc.setFillColor(30, 41, 59); // Color oscuro SOC
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('VectraGuard Security Report', 20, 25);
    
    doc.setFontSize(10);
    doc.text(`Generated: ${timestamp}`, 140, 25);

    // Resumen ejecutivo
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(16);
    doc.text('Executive Summary', 20, 55);
    
    doc.setFontSize(12);
    doc.text(`Total Network Records Analyzed: ${stats?.totalRecords || 0}`, 20, 65);
    doc.text(`Cyber Threats Detected: ${stats?.totalThreats || 0}`, 20, 75);
    doc.text(`Successfully Defended: ${stats?.defended || 0}`, 20, 85);
    doc.text(`System Vulnerabilities Found: ${stats?.failures || 0}`, 20, 95);

    // Línea divisoria
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 105, 190, 105);

    // Tabla de Alertas Recientes
    doc.setFontSize(16);
    doc.text('Recent Critical Detections', 20, 120);
    
    doc.setFontSize(10);
    let y = 135;
    
    // Cabecera de tabla
    doc.setFillColor(240, 240, 240);
    doc.rect(20, y - 5, 170, 8, 'F');
    doc.text('ID', 25, y);
    doc.text('Source IP', 50, y);
    doc.text('Category', 90, y);
    doc.text('Severity', 140, y);
    doc.text('Time', 170, y);

    y += 12;
    
    // Filas de alertas
    if (alerts && alerts.length > 0) {
      alerts.slice(0, 10).forEach((alert, index) => {
        if (y < 270) {
          doc.text((index + 1).toString(), 25, y);
          doc.text(alert.ip, 50, y);
          doc.text(t(alert.attack_cat) || alert.attack_cat, 90, y);
          doc.text(alert.severity.toUpperCase(), 140, y);
          doc.text(alert.timestamp, 170, y);
          y += 10;
        }
      });
    } else {
      doc.text('No active threats detected in this session.', 20, y);
    }

    // Pie de página
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('© 2026 VectraGuard Cyber Intelligence - CONFIDENTIAL DOCUMENT', 105, 290, { align: 'center' });

    // Descargar
    doc.save(`VectraGuard_Report_${new Date().getTime()}.pdf`);
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

        <button className="btn-primary" onClick={handleDownloadPDF}>
          <span style={{ marginRight: '8px' }}>↓</span> {t('header.download')}
        </button>
      </div>
    </header>
  );
}
