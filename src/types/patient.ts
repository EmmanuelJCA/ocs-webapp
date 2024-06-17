import { Genre } from './person';

export interface Patient {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  genre: Genre;
  identification: string;
  dateOfBirth: Date;
  email: string;
  phone: string;
}
