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
    title: 'inicio',
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
    ],
  },
];
