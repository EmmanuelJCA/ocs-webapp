export enum Genre {
  MALE = 'M',
  FEMALE = 'F',
}

export const genreInSpanish = {
  M: 'Masculino',
  F: 'Femenino',
};

export interface Person {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  genre: Genre;
  identification: string;
  dateOfBirth: Date;
  phone: string;
}
