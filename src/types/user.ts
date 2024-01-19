import { Role } from './role';

// ----------------------------------------------------------------------

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  username: string;
  role: Role;
  email: string;
  avatar: string;
  phone: string;
  isActive: boolean;
}
