import { useState } from 'react';
import { blue } from '@mui/material/colors';
import { Mail, Close, Phone, Language, LocalHospital } from '@mui/icons-material';
import {
  List,
  Link,
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

import { OncologyCenter } from '@/types';

interface Props {
  oncologyCenters: OncologyCenter[];
}

export const OncologyCentersDialog = ({ oncologyCenters }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (oncologyCenters.length > 0) setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title={oncologyCenters.map((oc) => oc.name).join(', ')}>
        <Button startIcon={<LocalHospital />} onClick={handleClickOpen}>
          {oncologyCenters.length}
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ m: 0, pr: 10 }}>Centros oncológicos</DialogTitle>
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
          {oncologyCenters.map((oncologyCenter) => (
            <ListItem disableGutters key={oncologyCenter.id}>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <LocalHospital />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={oncologyCenter.name} />
                {oncologyCenter.website && (
                  <Tooltip title={oncologyCenter.website}>
                    <Language />
                  </Tooltip>
                )}
                <Tooltip title={oncologyCenter.email}>
                  <Link href={`mailto: ${oncologyCenter.email}`}>
                    <Mail />
                  </Link>
                </Tooltip>
                <Tooltip title={oncologyCenter.phone}>
                  <Link href={`tel: ${oncologyCenter.phone}`}>
                    <Phone />
                  </Link>
                </Tooltip>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
};
