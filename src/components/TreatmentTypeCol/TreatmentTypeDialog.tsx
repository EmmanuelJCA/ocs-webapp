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

import { TreatmentType } from '@/types';

interface Props {
  treatmentTypes: TreatmentType[];
}

export const TreatmentTypesDialog = ({ treatmentTypes }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (treatmentTypes.length > 0) setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title={treatmentTypes.map((s) => s.name).join(', ')}>
        <Button startIcon={<MedicationLiquid />} onClick={handleClickOpen}>
          {treatmentTypes.length}
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ m: 0, pr: 10 }}>Tipos de tratamientos</DialogTitle>
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
          {treatmentTypes.map((tt) => (
            <ListItem disableGutters key={tt.id}>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <MedicationLiquid />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={tt.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
};
