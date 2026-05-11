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

    // --- CABECERA ---
    doc.setFillColor(15, 23, 42); 
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('VectraGuard Security Report', 20, 25);
    doc.setFontSize(10);
    doc.text(`Generated: ${timestamp}`, 145, 25);

    // --- RESUMEN EJECUTIVO ---
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(16);
    doc.text('Executive Summary', 20, 55);
    
    // Tarjetas de datos (Simuladas en PDF)
    doc.setDrawColor(226, 232, 240);
    doc.rect(20, 60, 40, 25);
    doc.rect(65, 60, 40, 25);
    doc.rect(110, 60, 40, 25);
    doc.rect(155, 60, 40, 25);

    doc.setFontSize(8);
    doc.text('TOTAL RECORDS', 25, 68);
    doc.text('THREATS', 70, 68);
    doc.text('PROTECTED', 115, 68);
    doc.text('VULNERABILITIES', 160, 68);

    doc.setFontSize(12);
    doc.setTextColor(79, 70, 229);
    doc.text(`${stats?.totalRecords || 0}`, 25, 78);
    doc.setTextColor(239, 68, 68);
    doc.text(`${stats?.totalThreats || 0}`, 70, 78);
    doc.setTextColor(16, 185, 129);
    doc.text(`${stats?.defended || 0}`, 115, 78);
    doc.setTextColor(245, 158, 11);
    doc.text(`${stats?.failures || 0}`, 160, 78);

    // --- GRÁFICA DE DISTRIBUCIÓN (Dynamic Chart in PDF) ---
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(14);
    doc.text('Threat Distribution Analysis', 20, 105);

    const categories = ['Exploits', 'DoS', 'Fuzzers', 'Recon'];
    const values = [
      alerts?.filter(a => a.attack_cat.includes('exploits')).length || 2,
      alerts?.filter(a => a.attack_cat.includes('dos')).length || 1,
      alerts?.filter(a => a.attack_cat.includes('fuzzers')).length || 1,
      alerts?.filter(a => a.attack_cat.includes('recon')).length || 1
    ];

    let startX = 30;
    const chartHeight = 40;
    const barWidth = 25;
    
    // Ejes
    doc.setDrawColor(150, 150, 150);
    doc.line(StartX - 5, 150, StartX + 140, 150); // Eje X
    doc.line(StartX - 5, 150, StartX - 5, 115); // Eje Y

    categories.forEach((cat, i) => {
      const h = (values[i] / Math.max(...values, 1)) * chartHeight;
      doc.setFillColor(79, 70, 229);
      doc.rect(startX, 150 - h, barWidth, h, 'F');
      doc.setFontSize(8);
      doc.text(cat, startX, 155);
      startX += 35;
    });

    // --- TABLA DE ALERTAS ---
    doc.setFontSize(14);
    doc.text('Recent Critical Incidents', 20, 175);
    
    doc.setFontSize(9);
    let y = 185;
    doc.setFillColor(248, 250, 252);
    doc.rect(20, y - 5, 170, 8, 'F');
    doc.text('TIMESTAMP', 25, y);
    doc.text('SOURCE IP', 60, y);
    doc.text('DETECTION', 100, y);
    doc.text('SEVERITY', 150, y);

    y += 10;
    alerts?.slice(0, 8).forEach(alert => {
      if (y < 270) {
        doc.text(alert.timestamp, 25, y);
        doc.text(alert.ip, 60, y);
        doc.text(t(alert.attack_cat) || alert.attack_cat, 100, y);
        doc.setTextColor(alert.severity === 'critical' ? 220 : 0, 0, 0);
        doc.text(alert.severity.toUpperCase(), 150, y);
        doc.setTextColor(30, 41, 59);
        y += 8;
      }
    });

    // --- PIE DE PÁGINA ---
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('© 2026 VectraGuard Cyber Intelligence - TFG Demo Environment', 105, 290, { align: 'center' });

    doc.save(`VectraGuard_SOC_Report_${new Date().getTime()}.pdf`);
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
