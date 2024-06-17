import { GridFilterOperator } from '@mui/x-data-grid';

import { Physician, Specialization } from '@/types';
import { SpecializationFilterInput } from './SpecializationFilterInput';

export const specializationFilterOperators: GridFilterOperator<Physician, Specialization[]>[] = [
  {
    label: 'alguno de',
    value: 'anyOf',
    getApplyFilterFn: ({ field, value: filterValue = [], operator }) => {
      if (!field || filterValue.length == 0 || !operator) {
        return null;
      }
      return (row) => {
        return row.some((oc: Specialization) => filterValue.includes(oc.id));
      };
    },
    InputComponent: SpecializationFilterInput,
    InputComponentProps: { type: 'string' },
    getValueAsString: (value: Specialization[]) => value.map((v) => v.name).join(', '),
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
          row.map((rv: Specialization) => rv.id).includes(fv)
        );
      };
    },
    InputComponent: SpecializationFilterInput,
    InputComponentProps: { type: 'string' },
    getValueAsString: (value: Specialization[]) => value.map((v) => v.name).join(', '),
  },
];
