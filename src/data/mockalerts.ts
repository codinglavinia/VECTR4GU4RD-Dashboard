// Datos simulados de alertas IDS
// En producción estos datos vendrán de Firestore o API backend

export interface AlertRecord {
  id: string;
  attack_cat: string;
  ip: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
}

export const mockAlerts: AlertRecord[] = [
  {
    id: '1',
    attack_cat: 'port scan',
    ip: '192.168.1.10',
    severity: 'high',
    timestamp: '2026-01-24 10:15',
  },
  {
    id: '2',
    attack_cat: 'brute force',
    ip: '10.0.0.5',
    severity: 'medium',
    timestamp: '2026-01-24 11:02',
  },
];
