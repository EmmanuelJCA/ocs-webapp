import { useState } from 'react';
import { ExpandMore } from '@mui/icons-material';
import {
  Box,
  List,
  Card,
  Chip,
  Grid,
  Paper,
  Stack,
  alpha,
  Dialog,
  Avatar,
  useTheme,
  Accordion,
  IconButton,
  Typography,
  CardHeader,
  DialogTitle,
  CardContent,
  CardActions,
  DialogContent,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';

import { Iconify } from '@/components';

interface Props {
  triggerComponent: React.ComponentType<{ onClick: () => void }>;
}

export const SessionsModal = ({ triggerComponent }: Props) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const TriggerComponent = triggerComponent;

  return (
    <>
      <TriggerComponent onClick={handleClickOpen} />
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Sesiones del tratamiento</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Card sx={{ height: 'calc(100vh - 250px )' }}>
                <CardHeader title="Pendientes" />
                <Paper
                  sx={{
                    height: 1,
                    backgroundColor: 'transparent',
                    overflowY: 'auto',
                    padding: '3px 8px',
                  }}
                >
                  <List>
                    <Card sx={{ marginBottom: 1, backgroundColor: theme.palette.grey[200] }}>
                      <CardContent>
                        <Box>
                          <Box display="flex" flexDirection="column" gap={1.5} paddingY={1}>
                            <Box
                              sx={{
                                py: 1,
                                px: 2.5,
                                display: 'flex',
                                borderRadius: 1.5,
                                alignItems: 'center',
                                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                              }}
                            >
                              <Avatar
                                src={
                                  'https://s3.us-east-1.amazonaws.com/ocsbucket/images/8590b090-02ab-11ef-a995-ebafd2e80171.jpeg'
                                }
                                alt={`Emely Carrillo`}
                              />

                              <Box sx={{ ml: 2 }}>
                                <Typography variant="subtitle2">Emely Carrillo</Typography>

                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                  V-29854064
                                </Typography>
                              </Box>
                              <Chip
                                sx={{ position: 'absolute', right: 30 }}
                                icon={<Iconify icon="maki:doctor" width={30} />}
                                label={'Radioterapeuta'}
                                color="success"
                                variant="outlined"
                              />
                            </Box>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                              >
                                Instrucciones
                              </AccordionSummary>
                              <AccordionDetails>
                                - El paciente debe someterse a una resonancia magnética
                              </AccordionDetails>
                            </Accordion>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                              >
                                Observaciones
                              </AccordionSummary>
                              <AccordionDetails>
                                - El paciente debe someterse a una resonancia magnética
                              </AccordionDetails>
                            </Accordion>
                          </Box>
                        </Box>
                      </CardContent>

                      <CardActions sx={{ display: 'flex', justifyContent: 'start' }}>
                        <Stack width={1} flexDirection="row" justifyContent="space-between">
                          <Box>
                            <Typography variant="body2">
                              Inicio: 18 de Julio a las 9:00 a.m.
                            </Typography>
                            {/* <Typography variant="body2">Finalizó: Hoy a las 8:30 p.m.</Typography> */}
                          </Box>
                          <Box>
                            <SessionsModal
                              // appointment={}
                              triggerComponent={(props: object) => (
                                <IconButton {...props}>
                                  <Iconify icon="solar:pen-bold" />
                                </IconButton>
                              )}
                            />
                          </Box>
                        </Stack>
                      </CardActions>
                    </Card>
                    <Card sx={{ marginBottom: 1, backgroundColor: theme.palette.grey[200] }}>
                      <CardContent>
                        <Box>
                          <Box display="flex" flexDirection="column" gap={1.5} paddingY={1}>
                            <Box
                              sx={{
                                py: 1,
                                px: 2.5,
                                display: 'flex',
                                borderRadius: 1.5,
                                alignItems: 'center',
                                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                              }}
                            >
                              <Avatar
                                src={
                                  'https://s3.us-east-1.amazonaws.com/ocsbucket/images/8590b090-02ab-11ef-a995-ebafd2e80171.jpeg'
                                }
                                alt={`Emely Carrillo`}
                              />

                              <Box sx={{ ml: 2 }}>
                                <Typography variant="subtitle2">Emely Carrillo</Typography>

                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                  V-29854064
                                </Typography>
                              </Box>
                              <Chip
                                sx={{ position: 'absolute', right: 30 }}
                                icon={<Iconify icon="maki:doctor" width={30} />}
                                label={'Radioterapeuta'}
                                color="success"
                                variant="outlined"
                              />
                            </Box>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                              >
                                Instrucciones
                              </AccordionSummary>
                              <AccordionDetails>
                                - El paciente debe someterse a una resonancia magnética
                              </AccordionDetails>
                            </Accordion>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                              >
                                Observaciones
                              </AccordionSummary>
                              <AccordionDetails>
                                - El paciente debe someterse a una resonancia magnética
                              </AccordionDetails>
                            </Accordion>
                          </Box>
                        </Box>
                      </CardContent>

                      <CardActions sx={{ display: 'flex', justifyContent: 'start' }}>
                        <Stack width={1} flexDirection="row" justifyContent="space-between">
                          <Box>
                            <Typography variant="body2">
                              Inicio: 19 de Julio a las 9:00 a.m.
                            </Typography>
                            {/* <Typography variant="body2">Finalizó: Hoy a las 8:30 p.m.</Typography> */}
                          </Box>
                          <Box>
                            <SessionsModal
                              // appointment={}
                              triggerComponent={(props: object) => (
                                <IconButton {...props}>
                                  <Iconify icon="solar:pen-bold" />
                                </IconButton>
                              )}
                            />
                          </Box>
                        </Stack>
                      </CardActions>
                    </Card>
                  </List>
                </Paper>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ height: 'calc(100vh - 250px )' }}>
                <CardHeader title="En Progreso" />
                <Paper
                  sx={{
                    height: 1,
                    backgroundColor: 'transparent',
                    overflowY: 'auto',
                    padding: '3px 8px',
                  }}
                >
                  <List></List>
                </Paper>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ height: 'calc(100vh - 250px )' }}>
                <CardHeader title="Completadas" />
                <Paper
                  sx={{
                    height: 1,
                    backgroundColor: 'transparent',
                    overflowY: 'auto',
                    padding: '3px 8px',
                  }}
                >
                  <List></List>
                </Paper>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};
