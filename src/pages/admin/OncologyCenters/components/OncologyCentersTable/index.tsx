import { FC } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Tooltip, IconButton } from '@mui/material';
import { Block, CheckCircleOutline } from '@mui/icons-material';

import { formatDateTime } from '@/utils';
import { OncologyCenter } from '@/types';
import { Iconify, DataTable } from '@/components';
import { Link as RouterLink } from '@/router/components';

const columns: GridColDef<OncologyCenter>[] = [
  {
    field: 'name',
    flex: 2,
    minWidth: 150,
    headerName: 'Nombre',
  },
  {
    field: 'email',
    flex: 2,
    minWidth: 150,
    headerName: 'Correo',
    renderCell: ({ row }) => {
      return <a href={`mailto: ${row.email}`}>{row.email}</a>;
    },
  },
  {
    field: 'phone',
    flex: 1,
    minWidth: 150,
    headerName: 'Teléfono',
    renderCell: ({ row }) => {
      return <a href={`tel: ${row.phone}`}>{row.phone}</a>;
    },
  },
  {
    field: 'website',
    flex: 1,
    minWidth: 150,
    headerName: 'Web',
    renderCell: ({ row }) => {
      return <a href={`tel: ${row.website}`}>{row.website}</a>;
    },
  },
  {
    field: 'inactivatedAt',
    type: 'boolean',
    flex: 1,
    minWidth: 150,
    headerName: 'Activo',
    valueGetter: (value) => value == null,
    renderCell: ({ row }) => {
      return row.inactivatedAt == null ? (
        <CheckCircleOutline color="success" />
      ) : (
        <Tooltip title={formatDateTime(row.inactivatedAt)}>
          <Block color="error" />
        </Tooltip>
      );
    },
  },
  {
    field: 'actions',
    type: 'actions',
    width: 80,
    renderCell: ({ row }) => (
      <Tooltip title="Editar">
        <IconButton component={RouterLink} href={`/admin/oncology-centers/${row.id}/edit`}>
          <Iconify icon="solar:pen-bold" />
        </IconButton>
      </Tooltip>
    ),
  },
];

interface Props {
  oncologyCenters: OncologyCenter[];
}

export const OncologyCentersTable: FC<Props> = ({ oncologyCenters }) => {
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
      rows={oncologyCenters}
    />
  );
};
