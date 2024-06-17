import { FC } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Tooltip, IconButton } from '@mui/material';

import { PatientForm } from '../PatientForm';
import { Iconify, DataTable } from '@/components';
import { Genre, Patient, genreInSpanish } from '@/types';

const EditPatientButton = (props: object) => {
  return (
    <Tooltip title="Editar" {...props}>
      <IconButton>
        <Iconify icon="solar:pen-bold" />
      </IconButton>
    </Tooltip>
  );
};

const columns: GridColDef<Patient>[] = [
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
    field: 'actions',
    type: 'actions',
    width: 80,
    renderCell: ({ row }) => <PatientForm triggerComponent={EditPatientButton} patient={row} />,
  },
];

interface Props {
  patients: Patient[];
}

export const PatientsTable: FC<Props> = ({ patients }) => {
  return <DataTable columns={columns} rows={patients} />;
};
