import { FC } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Tooltip, IconButton } from '@mui/material';

import { SuppliesForm } from '../SuppliesForm';
import { Iconify, DataTable } from '@/components';
import { Supplies, TreatmentType, MeasurementUnit } from '@/types';
import { TreatmentTypesDialog, treatmentTypeFilterOperators } from '@/components/TreatmentTypeCol';

const EditSuppliesButton = (props: object) => {
  return (
    <Tooltip title="Editar" {...props}>
      <IconButton>
        <Iconify icon="solar:pen-bold" />
      </IconButton>
    </Tooltip>
  );
};

const columns: GridColDef<Supplies>[] = [
  {
    field: 'name',
    flex: 2,
    minWidth: 150,
    headerName: 'Nombre',
  },
  {
    field: 'description',
    flex: 2,
    minWidth: 150,
    headerName: 'Descripción',
    renderCell: ({ row }) => {
      return (
        <Tooltip title={row.description}>
          <span>{row.description}</span>
        </Tooltip>
      );
    },
  },
  {
    field: 'measurementUnit',
    flex: 1,
    minWidth: 150,
    headerName: 'Unidad de medida',
    valueGetter: (value: MeasurementUnit) => value.name,
  },
  {
    field: 'treatmentTypes',
    flex: 1,
    minWidth: 150,
    headerName: 'Tipo de tratamiento',
    filterOperators: treatmentTypeFilterOperators,
    valueFormatter: (value?: TreatmentType[]) => {
      if (!value) return '';
      return value.map((tt) => tt.name).join(', ');
    },
    renderCell: ({ row }) => {
      return <TreatmentTypesDialog treatmentTypes={row.treatmentTypes} />;
    },
    sortComparator: (v1, v2) => v1.length - v2.length,
  },
  {
    field: 'actions',
    type: 'actions',
    width: 80,
    renderCell: ({ row }) => <SuppliesForm triggerComponent={EditSuppliesButton} supplies={row} />,
  },
];

interface Props {
  supplies: Supplies[];
}

export const SuppliesTable: FC<Props> = ({ supplies }) => {
  return <DataTable columns={columns} rows={supplies} />;
};
