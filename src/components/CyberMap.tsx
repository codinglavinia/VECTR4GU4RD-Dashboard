import './CyberMap.css';

export default function CyberMap() {
  return (
    <div className="cyber-map-container glass-panel">
      <div className="map-header">
        <span className="pulse-dot"></span>
        <h3>Mapa de Ciberamenazas en Tiempo Real</h3>
      </div>
      <div className="iframe-wrapper">
        <iframe 
          src="https://cybermap.kaspersky.com/es/widget/dynamic/dark" 
          frameBorder="0"
          className="kaspersky-iframe"
          title="Kaspersky Cybermap"
        ></iframe>
      </div>
    </div>
  );
}
