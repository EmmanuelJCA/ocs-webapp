import { FC } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Tooltip, IconButton } from '@mui/material';

import { CancerType } from '@/types';
import { Iconify, DataTable } from '@/components';
import { CancerForm } from '../CancerForm/CancerForm';

const EditCancerButton = (props: object) => {
  return (
    <Tooltip title="Editar" {...props}>
      <IconButton>
        <Iconify icon="solar:pen-bold" />
      </IconButton>
    </Tooltip>
  );
};

const columns: GridColDef<CancerType>[] = [
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
    field: 'actions',
    type: 'actions',
    width: 80,
    renderCell: ({ row }) => <CancerForm triggerComponent={EditCancerButton} cancer={row} />,
  },
];

interface Props {
  cancer: CancerType[];
}

export const CancerTable: FC<Props> = ({ cancer }) => {
  return (
    <DataTable
      initialState={{
        columns: {
          columnVisibilityModel: {
            roles: false,
            dateOfBirth: false,
            genre: false,
          },
        },
      }}
      columns={columns}
      rows={cancer}
    />
  );
};
