import { Patient } from './patient';
import { Physician } from './physician';
import { CancerType } from './cancerType';
import { CancerStage } from './cancerStage';
import { OncologyCenter } from './oncologyCenter';

export interface Appointment {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  notes: string;
  startDateTime: Date;
  endDateTime: Date | null;
  oncologyCenter: OncologyCenter;
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
  cancerType: CancerType;
  cancerStage: CancerStage;
}

export interface Reason {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
}
