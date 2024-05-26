import { useState } from 'react';
import { blue } from '@mui/material/colors';
import { Mail, Edit, Close, Phone, AccountCircle } from '@mui/icons-material';
import {
  Box,
  List,
  Link,
  Stack,
  Button,
  Dialog,
  Avatar,
  Tooltip,
  ListItem,
  IconButton,
  Typography,
  DialogTitle,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
} from '@mui/material';

import { User } from '@/types';
import { Link as RouterLink } from '@/router/components';

interface Props {
  users: User[];
}

export const UsersDialog = ({ users }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (users.length > 0) setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button startIcon={<AccountCircle />} onClick={handleClickOpen}>
        {users.length}
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ m: 0, pr: 10 }}>Usuarios</DialogTitle>
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
          {users.map((user) => (
            <ListItem disableGutters key={user.id}>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }} src={user.avatar}>
                    <AccountCircle />
                  </Avatar>
                </ListItemAvatar>
                <Box width={1}>
                  <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                  <Typography variant="caption">{user.identification}</Typography>
                </Box>
                <Stack flexDirection="row" gap={2}>
                  <Tooltip title="Editar">
                    <Link component={RouterLink} href={`/admin/users/${user.id}/edit`}>
                      <Edit />
                    </Link>
                  </Tooltip>
                  <Tooltip title={user.email}>
                    <Link href={`mailto: ${user.email}`}>
                      <Mail />
                    </Link>
                  </Tooltip>
                  <Tooltip title={user.phone}>
                    <Link href={`tel: ${user.phone}`}>
                      <Phone />
                    </Link>
                  </Tooltip>
                </Stack>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
};
