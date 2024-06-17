import { GridFilterOperator } from '@mui/x-data-grid';

import { Supplies, TreatmentType } from '@/types';
import { TreatmentTypeFilterInput } from './TreatmentTypeFilterInput';

export const treatmentTypeFilterOperators: GridFilterOperator<Supplies, TreatmentType[]>[] = [
  {
    label: 'alguno de',
    value: 'anyOf',
    getApplyFilterFn: ({ field, value: filterValue = [], operator }) => {
      if (!field || filterValue.length == 0 || !operator) {
        return null;
      }
      return (row) => {
        return row.some((oc: TreatmentType) => filterValue.includes(oc.id));
      };
    },
    InputComponent: TreatmentTypeFilterInput,
    InputComponentProps: { type: 'string' },
    getValueAsString: (value: TreatmentType[]) => value.map((v) => v.name).join(', '),
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
          row.map((rv: TreatmentType) => rv.id).includes(fv)
        );
      };
    },
    InputComponent: TreatmentTypeFilterInput,
    InputComponentProps: { type: 'string' },
    getValueAsString: (value: TreatmentType[]) => value.map((v) => v.name).join(', '),
  },
];
