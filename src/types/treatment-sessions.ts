import { Physician } from './physician';
import { MeasurementUnit } from './supplies';

export interface TreatmentSessions {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  instructions: string;
  startDateTime: Date;
  endDateTime: Date;
  observations: string;
  physicianSupport: Physician;
  recipes: Recipe[];
}

export interface Recipe {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  instructions: string;
  supplies: Supply[];
}

export interface Supply {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  dose: number;
  measurementUnit: MeasurementUnit;
}
