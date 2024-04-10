import { FC, useState, useEffect } from 'react';
import {
  Box,
  List,
  alpha,
  Stack,
  Avatar,
  Drawer,
  Collapse,
  Typography,
  ListItemButton,
} from '@mui/material';

import { NAV } from './config';
import { useResponsive } from '@/hooks';
import { usePathname } from '@/router/hooks';
import { Logo, Scrollbar } from '@/components';
import { useAppSelector } from '@/redux/store';
import { Link as RouterLink } from '@/router/components';
import navConfig, { icon, NavItem as NavItemType } from './NavConfig';

// ----------------------------------------------------------------------

interface NavProps {
  openNav: boolean;
  onCloseNav: VoidFunction;
}

const Nav: FC<NavProps> = ({ openNav, onCloseNav }) => {
  const { user } = useAppSelector((state) => state.auth);
  const pathname = usePathname();

  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={user?.avatar} alt={`${user?.firstName} ${user?.lastName}`} />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{`${user?.firstName} ${user?.lastName}`}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {/* {user?.role} */}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} activePath={pathname} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />

      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
};

export default Nav;

// ----------------------------------------------------------------------

interface NavItemProps {
  item: NavItemType;
  activePath: string;
}

const renderNavItem = ({ item, activePath }: NavItemProps) => {
  let active = item.path === activePath;

  if (item.children) {
    active = item.children.some((child) => child.path === activePath);
  }

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          ...(item.icon && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
            },
          }),
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon ?? icon(active ? 'ic_dot_active' : 'ic_dot')}
      </Box>

      <Box component="span">{item.title}</Box>
    </ListItemButton>
  );
};

export const NavItem: FC<NavItemProps> = ({ item, activePath }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  if (!item.children) {
    return renderNavItem({ item, activePath });
  }

  return (
    <>
      <Box onClick={handleClick}>{renderNavItem({ item, activePath })}</Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.children.map((child) => (
            <NavItem key={child.title} item={child} activePath={activePath} />
          ))}
        </List>
      </Collapse>
    </>
  );
};
