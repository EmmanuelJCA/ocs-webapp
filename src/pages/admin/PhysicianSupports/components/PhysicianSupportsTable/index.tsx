import { FC } from 'react';
import { Tooltip, IconButton } from '@mui/material';
import { Block, CheckCircleOutline } from '@mui/icons-material';
import { GridColDef, GridFilterOperator } from '@mui/x-data-grid';

import { Iconify, DataTable } from '@/components';
import { formatDate, formatDateTime } from '@/utils';
import { Link as RouterLink } from '@/router/components';
import {
  SpecializationsDialog,
  supportSpecializationFilterOperators,
} from '@/components/SpecializationCol';
import {
  RoleDialog,
  roleFilterOperators,
  OncologyCentersDialog,
  oncologyCenterFilterOperators,
} from '@/components';
import {
  Role,
  Genre,
  Physician,
  RoleInSpanish,
  OncologyCenter,
  genreInSpanish,
  Specialization,
} from '@/types';

const columns: GridColDef<Physician>[] = [
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
    filterOperators: oncologyCenterFilterOperators as GridFilterOperator<
      Physician,
      OncologyCenter[],
      OncologyCenter[]
    >[],
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
    field: 'specializations',
    flex: 1,
    minWidth: 150,
    headerName: 'Especializaciones',
    filterOperators: supportSpecializationFilterOperators,
    valueFormatter: (value?: Specialization[]) => {
      if (!value) return '';
      return value.map((s) => s.name).join(', ');
    },
    renderCell: ({ row }) => {
      return <SpecializationsDialog specializations={row.specializations} />;
    },
    sortComparator: (v1, v2) => v1.length - v2.length,
  },
  {
    field: 'roles',
    flex: 1,
    minWidth: 150,
    headerName: 'Roles',
    filterOperators: roleFilterOperators as GridFilterOperator<Physician, Role[], Role[]>[],
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
        <IconButton component={RouterLink} href={`/admin/physician-supports/${row.id}/edit`}>
          <Iconify icon="solar:pen-bold" />
        </IconButton>
      </Tooltip>
    ),
  },
];

interface Props {
  physicianSupports: Physician[];
}

export const PhysicianSupportsTable: FC<Props> = ({ physicianSupports }) => {
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
      rows={physicianSupports}
    />
  );
};
