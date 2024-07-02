import { Patient } from './patient';
import { Physician } from './physician';

export interface Appointment {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  notes: string;
  startDateTime: Date;
  endDateTime: Date;
  reasons: Reason[];
  physician: Physician;
  patient: Patient;
  diagnostics: Diagnostic[];
  monitoredDiagnostics: Diagnostic[];
}

export interface Diagnostic {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  closedAt: Date;
  date: Date;
  notes: string;
  cancerType: Reason;
  cancerStage: Reason;
}

export interface Reason {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  level?: number;
  name?: string;
  description?: string;
}
