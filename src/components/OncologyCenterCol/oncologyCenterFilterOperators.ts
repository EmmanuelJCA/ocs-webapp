import { GridFilterOperator } from '@mui/x-data-grid';

import { User, Physician, OncologyCenter } from '@/types';
import { OncologyCenterFilterInput } from './OncologyCenterFilterInput';

export const oncologyCenterFilterOperators: GridFilterOperator<
  User | Physician,
  OncologyCenter[]
>[] = [
  {
    label: 'alguno de',
    value: 'anyOf',
    getApplyFilterFn: ({ field, value: filterValue = [], operator }) => {
      if (!field || filterValue.length == 0 || !operator) {
        return null;
      }
      return (row) => {
        return row.some((oc: OncologyCenter) => filterValue.includes(oc.id));
      };
    },
    InputComponent: OncologyCenterFilterInput,
    InputComponentProps: { type: 'string' },
    getValueAsString: (value: OncologyCenter[]) => value.map((v) => v.name).join(', '),
  },
  {
    label: 'contiene',
    value: 'contains',
    getApplyFilterFn: ({ field, value: filterValue = [], operator }) => {
      if (!field || filterValue.length == 0 || !operator) {
        return null;
      }
      return (row) => {
        return filterValue.every((fv: string) =>
          row.map((rv: OncologyCenter) => rv.id).includes(fv)
        );
      };
    },
    InputComponent: OncologyCenterFilterInput,
    InputComponentProps: { type: 'string' },
    getValueAsString: (value: OncologyCenter[]) => value.map((v) => v.name).join(', '),
  },
];
