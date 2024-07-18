import { Patient } from './patient';
import { Physician } from './physician';
import { Diagnostic } from './appointment';
import { OncologyCenter } from './oncologyCenter';

export enum TreatmentResult {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

export interface TreatmentType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
}

export interface Treatment {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  instructions: string;
  startDateTime: Date;
  endDateTime: Date;
  result: TreatmentResult;
  resultNotes: string;
  type: TreatmentType;
  oncologyCenter: OncologyCenter;
  physician: Physician;
  patient: Patient;
  diagnostics: Diagnostic[];
  sessions: number;
}
