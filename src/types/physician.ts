import { User } from './user';
import { Specialization } from './department';

export interface Physician extends User {
  specializations: Specialization[];
}
