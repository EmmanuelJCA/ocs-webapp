import { GridFilterOperator } from '@mui/x-data-grid';

import { Role, User, Physician } from '@/types';
import { RoleFilterInput } from './RoleFilterInput';

export const roleFilterOperators: GridFilterOperator<User | Physician, Role[]>[] = [
  {
    label: 'alguno de',
    value: 'anyOf',
    getApplyFilterFn: ({ field, value: filterValue = [], operator }) => {
      if (!field || filterValue.length == 0 || !operator) {
        return null;
      }
      return (row) => {
        return row.some((role: Role) => filterValue.includes(role));
      };
    },
    InputComponent: RoleFilterInput,
    InputComponentProps: { type: 'string' },
    getValueAsString: (value: Role[]) => value.toLocaleString(),
  },
  {
    label: 'contiene',
    value: 'contains',
    getApplyFilterFn: ({ field, value: filterValue = [], operator }) => {
      if (!field || filterValue.length == 0 || !operator) {
        return null;
      }
      return (row) => {
        return filterValue.every((fv: Role) => row.includes(fv));
      };
    },
    InputComponent: RoleFilterInput,
    InputComponentProps: { type: 'string' },
    getValueAsString: (value: Role[]) => value.toLocaleString(),
  },
];
