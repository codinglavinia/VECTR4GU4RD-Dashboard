import { useState } from 'react';
import { useDataset } from './hooks/useDataset';
import Header from './components/Header/Header';
import AlertsTable from './components/AlertsTable';
import StatsGrid from './components/StatsGrid';
import Sidebar from './components/Sidebar/Sidebar';
import GaugeChart from './components/GaugeChart';
import CyberMap from './components/CyberMap';
import LiveDataStream from './components/LiveDataStream';
import Login from './components/Login';
import logo from './assets/logo.png';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { stats, alerts, streamRecords, loading } = useDataset();

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="app-layout">
      <div className="background-watermark" style={{ backgroundImage: `url(${logo})` }}></div>
      <Sidebar />

      <div className="main-content">
        <Header />

        <div style={{ padding: '32px 40px', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
          <StatsGrid stats={stats} loading={loading} />

          <div className="dashboard-grid">
            <div className="dashboard-col-left">
              <GaugeChart />
              <AlertsTable alerts={alerts} />
            </div>

            <div className="dashboard-col-right">
              <CyberMap />
            </div>
          </div>

          <LiveDataStream records={streamRecords} loading={loading} />
        </div>
      </div>
    </div>
  );
}
