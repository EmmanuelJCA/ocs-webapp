import { TypeBackground as MuiTypeBackground } from '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground extends MuiTypeBackground {
    neutral: string;
  }
}
