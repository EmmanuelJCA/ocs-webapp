import { DateTime } from 'luxon';
import validator from 'validator';
import { useDropzone } from 'react-dropzone';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { FC, useMemo, useState, SyntheticEvent } from 'react';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Box,
  Card,
  Chip,
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
  FormControlLabel,
} from '@mui/material';

import { Iconify } from '@/components';
import { useRouter } from '@/router/hooks';
import { formatDate, httpErrorHandler } from '@/utils';
import { formatDateTime } from '../../../../../utils/date';
import { useLazyGetPersonQuery } from '@/redux/features/persons';
import { useGetDepartmentsQuery } from '@/redux/features/departments/departmentsApi';
import { PhysicianSchema, PhysicianRequest, UpdatePhysicianSchema } from '@/schemas/physician';
import { Role, Genre, Physician, RoleInSpanish, genreInSpanish, OncologyCenter } from '@/types';
import {
  useAddPhysicianMutation,
  useGetOncologyCentersQuery,
  useUpdatePhysicianMutation,
} from '@/redux/features';

// ----------------------------------------------------------------------

interface Props {
  physician?: Physician;
}

const PhysicianForm: FC<Props> = ({ physician }) => {
  const router = useRouter();
  const theme = useTheme();

  const { data: oncologyCenters = [] } = useGetOncologyCentersQuery();
  const { data: departments = [] } = useGetDepartmentsQuery();

  const {
    control,
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PhysicianRequest>({
    defaultValues: {
      id: physician?.id,
      firstName: physician ? physician.firstName : '',
      lastName: physician ? physician.lastName : '',
      email: physician ? physician.email : '',
      password: undefined,
      identification: physician ? physician.identification : '',
      genre: physician ? physician.genre : ('' as Genre),
      roles: physician ? physician.roles : [],
      dateOfBirth: physician ? new Date(physician.dateOfBirth) : ('' as unknown as Date),
      phone: physician ? physician.phone : '',
      oncologyCentersIds: physician ? physician.oncologyCenters.map((oc) => oc.id) : [],
      avatar: physician ? physician.avatar : '',
      isActive: physician ? physician.inactivatedAt == null : undefined,
      specializationsIds: physician ? physician.specializations.map((s) => s.id) : [],
    },
    resolver: zodResolver(physician ? UpdatePhysicianSchema : PhysicianSchema),
  });

  const [readOnly, setReadOnly] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png'],
    },
    onDrop: async (acceptedFiles) => {
      setValue('avatar', acceptedFiles[0] as File);
    },
  });

  const [addPhysician, { isLoading: isAdding }] = useAddPhysicianMutation();
  const [updatePhysician, { isLoading: isUpdating }] = useUpdatePhysicianMutation();

  const [trigger] = useLazyGetPersonQuery();

  const specializations = useMemo(
    () =>
      departments
        .map((department) => department.physicianSpecializations.map((s) => ({ ...s, department })))
        .flat(),
    [departments]
  );

  const watchPhysician = watch();

  const mutatePhysician = async (value: PhysicianRequest) => {
    try {
      if (physician && validator.isUUID(physician.id)) {
        await updatePhysician(value);
      } else {
        const physician = await addPhysician(value).unwrap();
        router.push(`/admin/physicians/${physician.id}/edit`);
      }
    } catch (error) {
      httpErrorHandler(error, {
        NOT_FOUND: 'Correo o contraseña incorrectos',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(mutatePhysician)}>
      <Grid2 container direction={{ xs: 'row' }} spacing={{ xs: 3 }}>
        <Grid2 xs={12} md={4}>
          <Card
            sx={(theme) => ({
              position: 'relative',
              padding: theme.spacing(8, 3, 5),
            })}
          >
            {physician && (
              <Chip
                sx={{ position: 'absolute', top: 24, right: 24 }}
                label={physician.inactivatedAt == null ? 'Activo' : 'Inactivo'}
                color={physician.inactivatedAt == null ? 'success' : 'error'}
                variant="outlined"
              />
            )}
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
                  <input readOnly={readOnly} {...getInputProps()} />
                  <Box sx={{ width: 1, height: 1, borderRadius: '50%', position: 'relative' }}>
                    {watchPhysician.avatar && (
                      <Box
                        component="img"
                        src={
                          watchPhysician.avatar instanceof File
                            ? URL.createObjectURL(watchPhysician.avatar)
                            : watchPhysician.avatar
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
                        ...(watchPhysician.avatar
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
              <Typography variant="h6">{`${watchPhysician.firstName} ${watchPhysician.lastName}`}</Typography>
              <Typography variant="body2" color="textSecondary">
                {watchPhysician.email}
              </Typography>
            </Stack>
            <Stack width={1}>
              <Box
                sx={{
                  display: 'inline-grid',
                  gap: theme.spacing(3, 8),
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  py: 2,
                  mx: 'auto',
                }}
              >
                <Typography fontSize={12}>
                  <strong>Documento:</strong>
                  <br /> {watchPhysician.identification}
                </Typography>
                <Typography fontSize={12}>
                  <strong>Teléfono:</strong>
                  <br /> {watchPhysician.phone}
                </Typography>
                <Typography fontSize={12}>
                  <strong>Fecha de nacimiento:</strong>
                  <br /> {formatDate(watchPhysician.dateOfBirth)}
                </Typography>
                <Typography fontSize={12}>
                  <strong>Género:</strong>
                  <br /> {genreInSpanish[watchPhysician.genre]}
                </Typography>
              </Box>
            </Stack>
          </Card>
          {physician?.updatedAt && (
            <Typography variant="caption" color="textSecondary" pl={2}>
              Última actualización:{' '}
              {formatDateTime(physician.updatedAt, { hour: 'numeric', minute: 'numeric' })}
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
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Nombre"
                    type="text"
                    inputProps={{ readOnly }}
                    {...field}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Apellido"
                    type="text"
                    inputProps={{ readOnly }}
                    {...field}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
              <Controller
                name="genre"
                control={control}
                render={({ field }) => (
                  <FormControl error={!!errors.genre}>
                    <InputLabel id="genre-label">Género</InputLabel>
                    <Select
                      label="Género"
                      labelId="genre-label"
                      defaultValue={physician ? physician.genre : ''}
                      readOnly={readOnly}
                      {...field}
                    >
                      {Object.values(Genre).map((genre) => (
                        <MenuItem key={genre} value={genre}>
                          {genreInSpanish[genre]}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.genre?.message}</FormHelperText>
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="identification"
                render={({ field }) => (
                  <TextField
                    label="Cédula"
                    type="text"
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(e);
                      if (!physician?.id) {
                        trigger(value).then(({ data }) => {
                          if (data) {
                            reset(
                              {
                                ...data,
                                password: '*******',
                                dateOfBirth: new Date(data.dateOfBirth),
                              },
                              { keepDefaultValues: true }
                            );
                            setReadOnly(true);
                          } else {
                            if (readOnly) reset();
                            setReadOnly(false);
                          }
                        });
                      }
                    }}
                    error={!!errors.identification}
                    helperText={errors.identification?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterLuxon}>
                    <DatePicker
                      readOnly={readOnly}
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
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Teléfono"
                    type="tel"
                    inputProps={{ readOnly }}
                    {...field}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Correo electrónico"
                    type="email"
                    inputProps={{ readOnly }}
                    {...field}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Contraseña"
                    type="password"
                    inputProps={{ readOnly }}
                    {...field}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
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
                    readOnly={readOnly}
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
                    readOnly={readOnly}
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
              <Controller
                name="specializationsIds"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    limitTags={1}
                    disableCloseOnSelect
                    {...register('specializationsIds')}
                    value={
                      field.value ? specializations.filter((d) => field.value.includes(d.id)) : []
                    }
                    options={specializations}
                    getOptionLabel={(option) => option.name}
                    groupBy={(option) => option.department.name}
                    onChange={(_event: SyntheticEvent, value: typeof specializations) =>
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
                        label="Especializaciones"
                        error={!!errors.specializationsIds}
                        helperText={errors.specializationsIds?.message}
                      />
                    )}
                  />
                )}
              />
            </Box>
            <Stack sx={{ mt: 3, flexDirection: 'row', justifyContent: 'space-between' }}>
              {physician && (
                <FormControlLabel
                  control={
                    <Controller
                      name="isActive"
                      control={control}
                      render={({ field: props }) => (
                        <Checkbox
                          {...props}
                          checked={props.value}
                          onChange={(e) => props.onChange(e.target.checked)}
                        />
                      )}
                    />
                  }
                  label="Activo"
                />
              )}
              <Button
                type="submit"
                variant="contained"
                color="inherit"
                disabled={isAdding || isUpdating}
                sx={{ ml: 'auto' }}
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

export default PhysicianForm;
