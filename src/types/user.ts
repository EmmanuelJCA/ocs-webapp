import { Role } from './role';
import { Person } from './person';
import { OncologyCenter } from './';

// ----------------------------------------------------------------------

export interface User extends Person {
  email: string;
  avatar: string;
  roles: Role[];
  oncologyCenters: OncologyCenter[];
  inactivatedAt: Date | null;
}
