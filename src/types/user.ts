import { Role } from './role';

// ----------------------------------------------------------------------

export enum Genre {
  MALE = 'M',
  FEMALE = 'F',
}

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  inactivatedAt: Date | null;
  firstName: string;
  lastName: string;
  genre: Genre;
  identification: string;
  dateOfBirth: Date;
  roles: Role[];
  email: string;
  avatar: string;
  phone: string;
}
