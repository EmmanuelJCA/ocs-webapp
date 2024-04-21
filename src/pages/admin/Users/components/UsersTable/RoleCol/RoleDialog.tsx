import { useState } from 'react';
import { blue } from '@mui/material/colors';
import { Close, AdminPanelSettings } from '@mui/icons-material';
import {
  List,
  Button,
  Dialog,
  Avatar,
  Tooltip,
  ListItem,
  IconButton,
  DialogTitle,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
} from '@mui/material';

import { Role, RoleInSpanish } from '@/types';

interface Props {
  roles: Role[];
}

export const RoleDialog = ({ roles }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (roles.length > 0) setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title={roles.map((r) => RoleInSpanish[r]).toString()}>
        <Button startIcon={<AdminPanelSettings />} onClick={handleClickOpen}>
          {roles.length}
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ m: 0, pr: 10 }}>Roles</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <List sx={{ pt: 0 }}>
          {roles.map((role) => (
            <ListItem disableGutters key={role}>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <AdminPanelSettings />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={RoleInSpanish[role]} />
              </ListItemButton>
              {/* TODO: Add role description and permissions */}
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
};
