import { FC } from 'react';
import { ExpandMore } from '@mui/icons-material';
import {
  Box,
  Card,
  alpha,
  Stack,
  Paper,
  Table,
  Avatar,
  useTheme,
  TableRow,
  Accordion,
  TableHead,
  TableCell,
  TableBody,
  Typography,
  IconButton,
  CardActions,
  CardContent,
  TableContainer,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { Iconify } from '@/components';
import { formatDateTime } from '@/utils';
import { SessionForm } from './SessionForm';
import { Treatment, TreatmentSessions } from '@/types';

interface Props {
  treatment: Treatment;
  session: TreatmentSessions;
}

export const SessionAdminCard: FC<Props> = ({ treatment, session }) => {
  const theme = useTheme();

  return (
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
                src={session.physicianSupport.avatar}
                alt={`${session.physicianSupport.firstName} ${session.physicianSupport.lastName}`}
              />

              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2">
                  {session.physicianSupport.firstName} {session.physicianSupport.lastName}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {session.physicianSupport.identification}
                </Typography>
              </Box>
              <Iconify icon="maki:doctor" width={30} sx={{ position: 'absolute', right: 30 }} />
            </Box>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Instrucciones
              </AccordionSummary>
              <AccordionDetails>{session.instructions}</AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Recipe
              </AccordionSummary>
              <AccordionDetails sx={{ w: 1 }}>
                {session.recipes.map((recipe) => (
                  <Box key={recipe.id} sx={{ w: 1 }}>
                    <Typography>Instrucciones:</Typography>
                    <Typography>{recipe.instructions}</Typography>
                    <TableContainer component={Paper} sx={{ mt: 1 }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Insumo</TableCell>
                            <TableCell align="right">Dosis</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {recipe.supplies.map((row) => (
                            <TableRow
                              key={row.id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="right">
                                {row.dose} {row.measurementUnit.abbreviation}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                ))}
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
              <AccordionDetails>{session.observations}</AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'start' }}>
        <Stack width={1} flexDirection="row" justifyContent="space-between">
          <Box>
            <Typography variant="body2">Inicio: {formatDateTime(session.startDateTime)}</Typography>
            {session.endDateTime && (
              <Typography variant="body2">
                Finalizó: {formatDateTime(session.startDateTime)}
              </Typography>
            )}
          </Box>
          <Box>
            <SessionForm
              treatment={treatment}
              session={session}
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
  );
};
