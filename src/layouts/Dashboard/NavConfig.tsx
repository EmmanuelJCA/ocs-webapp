import { SvgColor } from '@/components';

// ----------------------------------------------------------------------

export interface NavItem {
  title: string;
  path: string;
  icon?: JSX.Element;
  children?: NavItem[];
}

export const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

export const navConfig: NavItem[] = [
  {
    title: 'Inicio',
    path: '/',
    icon: icon('ic_home'),
  },
  {
    title: 'Administración',
    path: '#',
    icon: icon('ic_admin'),
    children: [
      {
        title: 'Usuarios',
        path: '/admin/users',
      },
      {
        title: 'Centros oncológicos',
        path: '/admin/oncology-centers',
      },
      {
        title: 'Oncólogos',
        path: '/admin/physicians',
      },
      {
        title: 'Ayudantes oncológicos',
        path: '/admin/physician-supports',
      },
      {
        title: 'Insumos médicos',
        path: '/admin/supplies',
      },
    ],
  },
  {
    title: 'Pacientes',
    path: '/patients',
    icon: icon('ic_patient'),
  },
  {
    title: 'Citas médicas',
    path: '/appointments',
    icon: icon('ic_medical_book'),
  },
  {
    title: 'Tratamientos',
    path: '/treatments',
    icon: icon('ic_medical_suitcase'),
  },
];
