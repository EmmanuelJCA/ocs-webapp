export interface OncologyCenter {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  inactivatedAt: Date | null;
  name: string;
  phone: string;
  email: string;
  website: string | null;
}
