import validator from 'validator';
import { Box, Link, useTheme, Typography, Breadcrumbs } from '@mui/material';

import { usePathname } from '@/router/hooks';
import { Link as RouterLink } from '@/router/components';

interface Route {
  routeName?: string;
  [key: string]: Route | string | undefined;
}

const routeMap: Route = {
  admin: {
    users: {
      routeName: 'Administración de Usuarios',
      new: {
        routeName: 'Crear Usuario',
      },
      edit: {
        routeName: 'Editar Usuario',
      },
    },
    'oncology-centers': {
      routeName: 'Administración de Centros oncológicos',
      new: {
        routeName: 'Crear Centros oncológico',
      },
      edit: {
        routeName: 'Editar Centros oncológicos',
      },
    },
    physicians: {
      routeName: 'Administración de Oncólogos',
      new: {
        routeName: 'Crear Oncólogo',
      },
      edit: {
        routeName: 'Editar Oncólogo',
      },
    },
    'physician-supports': {
      routeName: 'Administración de Ayudantes oncológicos',
      new: {
        routeName: 'Crear Ayudante oncológico',
      },
      edit: {
        routeName: 'Editar Ayudante oncológico',
      },
    },
    supplies: {
      routeName: 'Administración de Insumos',
      new: {
        routeName: 'Registrar Insumo',
      },
      edit: {
        routeName: 'Editar Insumos',
      },
    },
    cancer: {
      routeName: 'Administración de Insumos',
      new: {
        routeName: 'Registrar Insumo',
      },
      edit: {
        routeName: 'Editar Insumos',
      },
    },
  },
  dashboard: {
    routeName: 'Dashboard',
  },
  users: {
    profile: {
      routeName: 'Perfil de Usuario',
    },
  },
  patients: {
    routeName: 'Pacientes',
    new: {
      routeName: 'Registrar Paciente',
    },
    edit: {
      routeName: 'Actualizar Paciente',
    },
  },
  appointments: {
    management: {
      routeName: 'Gestión de citas médicas',
      details: {
        routeName: 'Detalles de la cita',
      },
    },
  },
};

const getRouteName = (paths: string[], routeMap: Route): string | null => {
  let currentMap: Route | string | undefined = routeMap;
  let routeName: string | null = null;

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];

    if (validator.isUUID(path)) {
      continue;
    }

    if (typeof currentMap === 'object' && currentMap[path]) {
      routeName = (currentMap[path] as Route).routeName!;
      currentMap = currentMap[path];
    } else {
      break;
    }
  }

  return routeName;
};

export const Breadcrumb = (): JSX.Element => {
  const theme = useTheme();
  const location = usePathname();
  const pathnames = location.split('/').filter((x) => x);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={
        <Box
          component="span"
          width={4}
          height={4}
          borderRadius="50%"
          bgcolor={theme.palette.grey[500]}
        />
      }
      sx={{ '.MuiBreadcrumbs-separator': { mx: 2 } }}
    >
      <Link component={RouterLink} underline="none" href="/">
        <Typography color="textPrimary">Inicio</Typography>
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        if (validator.isUUID(value)) {
          return null;
        }

        const routeName = getRouteName(pathnames.slice(0, index + 1), routeMap);

        if (!routeName) return null;

        return last ? (
          <Typography key={to}>{routeName}</Typography>
        ) : (
          <Link key={to} component={RouterLink} href={to} underline="none" color="textPrimary">
            {routeName}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
