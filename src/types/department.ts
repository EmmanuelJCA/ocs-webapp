export interface Department {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  physicianSpecializations: Specialization[];
  physicianSupportSpecialization: Specialization[];
}

export interface Specialization {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}
