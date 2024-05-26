import { FC } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Tooltip, IconButton } from '@mui/material';
import { Block, CheckCircleOutline } from '@mui/icons-material';

import { formatDateTime } from '@/utils';
import { UsersDialog } from './UsersCol';
import { Iconify, DataTable } from '@/components';
import { User, OncologyCenterWithUsers } from '@/types';
import { OncologyCenterForm } from '../OncologyCenterForm/OncologyCenterForm';

const EditOncologyCenterButton = (props: object) => {
  return (
    <Tooltip title="Editar" {...props}>
      <IconButton>
        <Iconify icon="solar:pen-bold" />
      </IconButton>
    </Tooltip>
  );
};

const columns: GridColDef<OncologyCenterWithUsers>[] = [
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
  // {
  //   field: 'website',
  //   flex: 1,
  //   minWidth: 150,
  //   headerName: 'Web',
  //   renderCell: ({ row }) => {
  //     return <a href={`tel: ${row.website}`}>{row.website}</a>;
  //   },
  // },
  {
    field: 'users',
    flex: 1,
    minWidth: 150,
    headerName: 'Usuarios',
    valueGetter: (value?: User[]) => {
      if (!value) return '';
      return value
        .map(
          (user) =>
            `${user.firstName} ${user.lastName} ${user.identification} ${user.email} ${user.phone}`
        )
        .join(', ');
    },
    renderCell: ({ row }) => {
      return <UsersDialog users={row.users} />;
    },
    sortComparator: (v1, v2) => v1.length - v2.length,
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
      <OncologyCenterForm triggerComponent={EditOncologyCenterButton} oncologyCenter={row} />
    ),
  },
];

interface Props {
  oncologyCenters: OncologyCenterWithUsers[];
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
