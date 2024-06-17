import { useState } from 'react';
import { blue } from '@mui/material/colors';
import { Close, MedicationLiquid } from '@mui/icons-material';
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

import { Specialization } from '@/types';

interface Props {
  specializations: Specialization[];
}

export const SpecializationsDialog = ({ specializations }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (specializations.length > 0) setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title={specializations.map((s) => s.name).join(', ')}>
        <Button startIcon={<MedicationLiquid />} onClick={handleClickOpen}>
          {specializations.length}
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ m: 0, pr: 10 }}>Especializaciones</DialogTitle>
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
          {specializations.map((specialization) => (
            <ListItem disableGutters key={specialization.id}>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <MedicationLiquid />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={specialization.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
};
