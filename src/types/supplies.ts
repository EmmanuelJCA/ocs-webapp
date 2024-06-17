import { TreatmentType } from './treatment';

export interface Supplies {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  treatmentTypes: TreatmentType[];
  measurementUnit: MeasurementUnit;
}

export interface MeasurementUnit {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  abbreviation?: string;
}
