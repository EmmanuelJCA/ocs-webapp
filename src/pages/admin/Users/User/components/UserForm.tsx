import { DateTime } from 'luxon';
import validator from 'validator';
import { FC, SyntheticEvent } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Box,
  Card,
  Stack,
  Select,
  Button,
  useTheme,
  MenuItem,
  Checkbox,
  TextField,
  InputLabel,
  Typography,
  FormControl,
  Autocomplete,
  FormHelperText,
} from '@mui/material';

import { Iconify } from '@/components';
import { useRouter } from '@/router/hooks';
import { httpErrorHandler, formatDate } from '@/utils';
import { UserSchema, UserRequest } from '@/schemas/user';
import { formatDateTime } from '../../../../../utils/date';
import { useAddUserMutation, useUpdateUserMutation } from '@/redux/features';
import { Role, User, Genre, RoleInSpanish, genreInSpanish, OncologyCenter } from '@/types';

// ----------------------------------------------------------------------

interface Props {
  user?: User;
}

const oncologyCenters = [
  {
    id: '677ff2a1-dc73-4e47-922b-c60027b9f347',
    createdAt: new Date('2024-03-28T01:16:41.801Z'),
    updatedAt: new Date('2024-03-28T01:16:41.801Z'),
    inactivatedAt: null,
    name: 'San Lucas',
    phone: '+584124567485',
    email: 'sanlucas@ocs.com',
    website: null,
  },
  {
    id: '81307e16-dbf4-4916-acb8-d5f7a32c4c30',
    createdAt: new Date('2024-04-18T12:36:04.435Z'),
    updatedAt: new Date('2024-04-18T12:36:04.435Z'),
    inactivatedAt: null,
    name: 'Madrera Fols',
    phone: '+584247895241',
    email: 'madrerafols@ocs.com',
    website: null,
  },
];

const UserForm: FC<Props> = ({ user }) => {
  const router = useRouter();
  const theme = useTheme();

  const {
    control,
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserRequest>({
    defaultValues: {
      id: user?.id,
      firstName: user ? user.firstName : '',
      lastName: user ? user.lastName : '',
      email: user ? user.email : '',
      password: undefined,
      identification: user ? user.identification : '',
      genre: user ? user.genre : ('' as Genre),
      roles: user ? user.roles : [],
      dateOfBirth: user ? new Date(user.dateOfBirth) : ('' as unknown as Date),
      phone: user ? user.phone : '',
      oncologyCentersIds: user ? user.oncologyCenters.map((oc) => oc.id) : [],
      avatar: user ? user.avatar : '',
    },
    resolver: zodResolver(user ? UserSchema : UserSchema.partial({ password: true })),
  });

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png'],
    },
    onDrop: async (acceptedFiles) => {
      setValue('avatar', acceptedFiles[0] as File);
    },
  });

  const watchUser = watch();

  const [addUser, { isLoading: isAdding }] = useAddUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const mutateUser = async (value: UserRequest) => {
    try {
      if (user && validator.isUUID(user.id)) {
        await updateUser(value);
      } else {
        const user = await addUser(value).unwrap();
        router.push(`/admin/users/${user.id}/edit`);
      }
    } catch (error) {
      httpErrorHandler(error, {
        NOT_FOUND: 'Correo o contraseña incorrectos',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(mutateUser)}>
      <Grid2 container direction={{ xs: 'row' }} spacing={{ xs: 3 }}>
        <Grid2 xs={12} md={4}>
          <Card
            sx={(theme) => ({
              position: 'relative',
              padding: theme.spacing(10, 3, 5),
            })}
          >
            <Box mb={2}>
              <div>
                <Box
                  sx={{
                    padding: 1,
                    margin: 'auto',
                    width: 144,
                    height: 144,
                    cursor: 'pointer',
                    borderRadius: '50%',
                    border: '1px dashed',
                    borderColor: theme.palette.grey[300],
                  }}
                  {...getRootProps({ className: 'dropzone' })}
                >
                  <input {...getInputProps()} />
                  <Box sx={{ width: 1, height: 1, borderRadius: '50%', position: 'relative' }}>
                    {watchUser.avatar && (
                      <Box
                        component="img"
                        src={
                          watchUser.avatar instanceof File
                            ? URL.createObjectURL(watchUser.avatar)
                            : watchUser.avatar
                        }
                        sx={{ width: 1, height: 1, borderRadius: '50%', position: 'relative' }}
                      />
                    )}
                    <Stack
                      sx={{
                        gap: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: 1,
                        height: 1,
                        zIndex: 9,
                        borderRadius: '50%',
                        ...(watchUser.avatar
                          ? {
                              opacity: 0,
                              color: theme.palette.common.white,
                              backgroundColor: theme.palette.grey[900],
                            }
                          : {
                              color: theme.palette.grey[500],
                              backgroundColor: theme.palette.grey[100],
                            }),
                        transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                        '&:hover': {
                          opacity: 0.7,
                        },
                      }}
                    >
                      <Iconify width={32} height={32} icon="solar:camera-add-bold" />
                      <Typography component="span" variant="caption">
                        Subir foto
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              </div>
              {errors.avatar && (
                <Typography variant="caption" color="red">
                  {errors.avatar.message}
                </Typography>
              )}
            </Box>
            <Stack textAlign="center">
              <Typography variant="h6">{`${watchUser.firstName} ${watchUser.lastName}`}</Typography>
              <Typography variant="body2" color="textSecondary">
                {watchUser.email}
              </Typography>
              {/* <Box>
                <Typography>
                  Centros oncológicos: {watchUser.oncologyCentersIds?.toString()}
                </Typography>
                <Typography>Roles: {watchUser.roles?.toString()}</Typography>
              </Box> */}
            </Stack>
            <Box
              sx={{
                display: 'grid',
                gap: theme.spacing(3, 2),
                gridTemplateColumns: 'repeat(2, 1fr)',
                py: 2,
              }}
            >
              <Typography fontSize={12}>
                <strong>Documento:</strong>
                <br /> {watchUser.identification}
              </Typography>
              <Typography fontSize={12}>
                <strong>Teléfono:</strong>
                <br /> {watchUser.phone}
              </Typography>
              <Typography fontSize={12}>
                <strong>Fecha de nacimiento:</strong>
                <br /> {formatDate(watchUser.dateOfBirth)}
              </Typography>
              <Typography fontSize={12}>
                <strong>Género:</strong> {genreInSpanish[watchUser.genre]}
              </Typography>
            </Box>
          </Card>
          {user?.updatedAt && (
            <Typography variant="caption" color="textSecondary" pl={2}>
              Última actualización:{' '}
              {formatDateTime(user.updatedAt, { hour: 'numeric', minute: 'numeric' })}
            </Typography>
          )}
        </Grid2>
        <Grid2 xs={12} md={8}>
          <Card sx={{ padding: 3 }}>
            <Box
              sx={{
                display: 'grid',
                gap: theme.spacing(3, 2),
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <TextField
                label="Nombre"
                type="text"
                {...register('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
              <TextField
                label="Apellido"
                type="text"
                {...register('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
              <FormControl error={!!errors.genre}>
                <InputLabel id="genre-label">Género</InputLabel>
                <Select
                  label="Género"
                  labelId="genre-label"
                  defaultValue={user ? user.genre : ''}
                  {...register('genre')}
                >
                  {Object.values(Genre).map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {genreInSpanish[genre]}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.genre?.message}</FormHelperText>
              </FormControl>
              <TextField
                label="Cédula"
                type="text"
                {...register('identification')}
                error={!!errors.identification}
                helperText={errors.identification?.message}
              />
              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterLuxon}>
                    <DatePicker
                      {...field}
                      value={field.value ? DateTime.fromJSDate(field.value) : null}
                      onChange={(value) => {
                        if (!value) return field.onChange(null);
                        field.onChange(value.toJSDate());
                      }}
                      label="Fecha de nacimiento"
                      disableFuture
                      slotProps={{
                        textField: {
                          error: !!errors.dateOfBirth,
                          helperText: errors.dateOfBirth?.message,
                        },
                        actionBar: {
                          actions: ['clear'],
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
              <TextField
                label="Teléfono"
                type="tel"
                {...register('phone')}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
              <TextField
                label="Correo electrónico"
                type="email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Contraseña"
                type="password"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Controller
                name="roles"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    limitTags={1}
                    disableCloseOnSelect
                    options={Object.values(Role)}
                    value={field.value || []}
                    getOptionLabel={(option) => RoleInSpanish[option]}
                    onChange={(_event: SyntheticEvent, data: Role[]) => field.onChange(data)}
                    renderOption={(props, option: Role, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={<CheckBoxOutlineBlank fontSize="small" />}
                          checkedIcon={<CheckBox fontSize="small" />}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {RoleInSpanish[option]}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Roles"
                        error={!!errors.roles}
                        helperText={errors.roles?.message}
                      />
                    )}
                  />
                )}
              />
              <Controller
                name="oncologyCentersIds"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    limitTags={1}
                    disableCloseOnSelect
                    {...register('oncologyCentersIds')}
                    value={
                      field.value ? oncologyCenters.filter((oc) => field.value.includes(oc.id)) : []
                    }
                    getOptionLabel={(option) => option.name}
                    options={oncologyCenters}
                    onChange={(_event: SyntheticEvent, value: OncologyCenter[]) =>
                      field.onChange(value.map((v) => v.id))
                    }
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={<CheckBoxOutlineBlank fontSize="small" />}
                          checkedIcon={<CheckBox fontSize="small" />}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Centros Oncológicos"
                        error={!!errors.oncologyCentersIds}
                        helperText={errors.oncologyCentersIds?.message}
                      />
                    )}
                  />
                )}
              />
            </Box>
            <Stack sx={{ mt: 3, flexDirection: 'column', alignItems: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                color="inherit"
                disabled={isAdding || isUpdating}
                onClick={() => {
                  console.log({ watchUser, errors });
                }}
              >
                Guardar
              </Button>
            </Stack>
          </Card>
        </Grid2>
      </Grid2>
    </form>
  );
};

export default UserForm;
