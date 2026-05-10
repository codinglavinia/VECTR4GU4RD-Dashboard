import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import type { AlertRecord } from '../components/AlertsTable';

// === TIPOS DE DATOS ===
export interface NetworkRecord {
  srcip: string;
  dstip: string;
  proto: string;
  state: string;
  attack_cat: string;
  label: string;
  service: string;
  sbytes: string;
  dbytes: string;
}

export interface DashboardStats {
  totalThreats: number;
  defended: number;
  failures: number;
  totalRecords: number;
}

export interface DatasetResult {
  stats: DashboardStats;
  alerts: AlertRecord[];
  streamRecords: NetworkRecord[];
  loading: boolean;
  error: string | null;
}

function getSeverity(attackCat: string, label: string): 'critical' | 'high' | 'medium' | 'safe' {
  if (label === '0') return 'safe';
  const cat = attackCat.trim().toLowerCase();
  if (['backdoor', 'shellcode', 'worms'].includes(cat)) return 'critical';
  if (['dos', 'exploits'].includes(cat)) return 'high';
  return 'medium';
}

const MOCK_DATA: NetworkRecord[] = [
  { srcip: '192.168.1.105', dstip: '10.0.0.1', proto: 'tcp', state: 'FIN', attack_cat: 'Exploits', label: '1', service: 'http', sbytes: '250', dbytes: '1200' },
  { srcip: '172.16.0.42', dstip: '10.0.0.5', proto: 'udp', state: 'INT', attack_cat: 'None', label: '0', service: 'dns', sbytes: '64', dbytes: '128' },
  { srcip: '192.168.1.110', dstip: '10.0.0.1', proto: 'tcp', state: 'FIN', attack_cat: 'DoS', label: '1', service: 'http', sbytes: '4500', dbytes: '0' },
  { srcip: '192.168.1.105', dstip: '10.0.0.8', proto: 'tcp', state: 'CON', attack_cat: 'None', label: '0', service: 'ssh', sbytes: '120', dbytes: '140' },
  { srcip: '172.16.0.55', dstip: '10.0.0.1', proto: 'tcp', state: 'REQ', attack_cat: 'Fuzzers', label: '1', service: 'http', sbytes: '800', dbytes: '0' },
  { srcip: '192.168.1.200', dstip: '8.8.8.8', proto: 'udp', state: 'INT', attack_cat: 'None', label: '0', service: 'dns', sbytes: '56', dbytes: '56' },
  { srcip: '45.12.33.11', dstip: '10.0.0.1', proto: 'tcp', state: 'FIN', attack_cat: 'Reconnaissance', label: '1', service: 'http', sbytes: '200', dbytes: '400' },
  { srcip: '192.168.1.105', dstip: '10.0.0.15', proto: 'tcp', state: 'CON', attack_cat: 'None', label: '0', service: 'ftp', sbytes: '1500', dbytes: '3000' }
];

export function useDataset(): DatasetResult {
  const [sourceData, setSourceData] = useState<NetworkRecord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(5); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Papa.parse('/CSV Files/Training and Testing Sets/UNSW_NB15_testing-set.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      preview: 500,
      complete: (parsed) => {
        if (parsed.data && parsed.data.length > 1) {
          setSourceData(parsed.data as NetworkRecord[]);
        } else {
          // Si el archivo está vacío o no se encuentra (en producción)
          setSourceData(MOCK_DATA);
        }
        setLoading(false);
      },
      error: () => {
        // Fallback a datos simulados si falla la descarga (Vercel sin CSV)
        setSourceData(MOCK_DATA);
        setLoading(false);
      },
    });
  }, []);

  // 2. Temporizador para soltar una fila cada segundo (Simulación en Vivo)
  useEffect(() => {
    if (sourceData.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev < sourceData.length ? prev + 1 : prev));
    }, 1500); // 1.5 segundos entre filas para que sea legible

    return () => clearInterval(interval);
  }, [sourceData]);

  // 3. Calcular datos derivados basados en la "ventana" actual de la simulación
  const currentWindow = sourceData.slice(0, currentIndex);

  const stats: DashboardStats = {
    totalThreats: currentWindow.filter(r => r.label === '1').length,
    defended: currentWindow.filter(r => r.label === '0').length,
    failures: currentWindow.filter(r => {
      const cat = r.attack_cat?.trim().toLowerCase();
      return ['dos', 'backdoor', 'shellcode', 'worms'].includes(cat);
    }).length,
    totalRecords: currentWindow.length
  };

  const alerts: AlertRecord[] = currentWindow
    .filter(r => r.label === '1' && r.attack_cat?.trim() !== '')
    .slice(-10) // Tomamos las 10 ÚLTIMAS alertas detectadas para la tabla
    .reverse()  // Mostrar la más reciente arriba
    .map((r, i) => ({
      id: `alert-${currentIndex}-${i}`,
      attack_cat: `alerts.cat_${r.attack_cat.trim().toLowerCase().replace(/\s+/g, '_')}`,
      ip: r.srcip || '0.0.0.0',
      severity: getSeverity(r.attack_cat, r.label),
      timestamp: new Date().toLocaleTimeString(),
    }));

  // Para el stream, mostramos las últimas 20 filas en orden cronológico inverso
  const streamRecords = [...currentWindow].reverse().slice(0, 20);

  return {
    stats,
    alerts,
    streamRecords,
    loading,
    error
  };
}
