import { SvgColor } from '@/components';

// ----------------------------------------------------------------------

export interface NavItem {
  title: string;
  path: string;
  icon: JSX.Element;
}

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig: NavItem[] = [
  {
    title: 'inicio',
    path: '/',
    icon: icon('ic_home'),
  },
  {
    title: 'Administración de Usuarios',
    path: '/admin/users',
    icon: icon('ic_users'),
  },
];

export default navConfig;
