import { FC } from 'react';
import { Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { Block, CheckCircleOutline } from '@mui/icons-material';

import { formatDate } from '@/utils';
import { DataTable } from '@/components';
import { RoleDialog, roleFilterOperators } from './RoleCol';
import { User, Role, Genre, RoleInSpanish, OncologyCenter, genreInSpanish } from '@/types';
import { OncologyCentersDialog, oncologyCenterFilterOperators } from './OncologyCenterCol';

const columns: GridColDef<User>[] = [
  {
    field: 'firstName',
    flex: 2,
    minWidth: 150,
    headerName: 'Nombre',
  },
  {
    field: 'lastName',
    flex: 2,
    minWidth: 150,
    headerName: 'Apellido',
  },
  {
    field: 'identification',
    flex: 1,
    minWidth: 150,
    headerName: 'Cédula',
  },
  {
    field: 'genre',
    type: 'singleSelect',
    flex: 2,
    minWidth: 150,
    headerName: 'Género',
    getOptionLabel: (option) => genreInSpanish[option as Genre],
    getOptionValue: (option) => option,
    valueOptions: Object.values(Genre),
    renderCell: ({ row }) => {
      return genreInSpanish[row.genre];
    },
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
    field: 'oncologyCenters',
    flex: 1,
    minWidth: 150,
    headerName: 'Centros oncológicos',
    filterOperators: oncologyCenterFilterOperators,
    valueFormatter: (value?: OncologyCenter[]) => {
      if (!value) return '';
      return value.map((oc) => oc.name).join(', ');
    },
    renderCell: ({ row }) => {
      return <OncologyCentersDialog oncologyCenters={row.oncologyCenters} />;
    },
    sortComparator: (v1, v2) => v1.length - v2.length,
  },
  {
    field: 'roles',
    flex: 1,
    minWidth: 150,
    headerName: 'Roles',
    filterOperators: roleFilterOperators,
    valueFormatter: (value?: Role[]) => {
      if (!value) return '';
      return value.map((r) => RoleInSpanish[r]).toString();
    },
    renderCell: ({ row }) => {
      return <RoleDialog roles={row.roles} />;
    },
    sortComparator: (v1, v2) => v1.length - v2.length,
  },
  {
    field: 'dateOfBirth',
    type: 'date',
    flex: 2,
    minWidth: 150,
    headerName: 'Fecha de nacimiento',
    valueFormatter: (value?: string) => {
      if (!value) return '';
      return formatDate(value);
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
        <Tooltip
          title={formatDate(row.inactivatedAt, {
            weekday: 'long',
            hour: 'numeric',
            minute: 'numeric',
          })}
        >
          <Block color="error" />
        </Tooltip>
      );
    },
  },
];

interface Props {
  users: User[];
}

export const UsersTable: FC<Props> = ({ users }) => {
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
      rows={users}
    />
  );
};
