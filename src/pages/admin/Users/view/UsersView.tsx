import { GridColDef } from '@mui/x-data-grid';
import { Button, Tooltip, Container, Typography } from '@mui/material';
import { Block, AddOutlined, CheckCircleOutline } from '@mui/icons-material';

import { formatDate } from '@/utils';
import { Loader, DataTable } from '@/components';
import { useGetUsersQuery } from '@/redux/features';

const columns: GridColDef[] = [
  {
    field: 'firstName',
    flex: 2,
    minWidth: 150,
    headerName: 'Nombre',
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'lastName',
    flex: 2,
    minWidth: 150,
    headerName: 'Apellido',
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'identification',
    flex: 1,
    minWidth: 150,
    headerName: 'Cédula',
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'email',
    flex: 2,
    minWidth: 150,
    headerName: 'Correo',
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => {
      return <a href={`mailto: ${row.email}`}>{row.email}</a>;
    },
  },
  {
    field: 'phone',
    flex: 1,
    minWidth: 150,
    headerName: 'Teléfono',
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => {
      return <a href={`tel: ${row.phone}`}>{row.phone}</a>;
    },
  },
  {
    field: 'dateOfBirth',
    flex: 2,
    minWidth: 150,
    headerName: 'Fecha de nacimiento',
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row }) => {
      return formatDate(row.dateOfBirth);
    },
  },
  {
    field: 'inactivatedAt',
    flex: 1,
    minWidth: 150,
    headerName: 'Activo',
    headerAlign: 'center',
    align: 'center',
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

const UserView = () => {
  const { data = [], isLoading } = useGetUsersQuery();

  if (isLoading) return <Loader />;

  return (
    <Container maxWidth="xl" sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h3" fontWeight="regular" my={2}>
        Administrador de Usuarios
      </Typography>
      <Button startIcon={<AddOutlined />} sx={{ ml: 'auto', mb: 2 }}>
        Crear Usuario
      </Button>
      <DataTable columns={columns} rows={data} />
    </Container>
  );
};

export default UserView;
