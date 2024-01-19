import {
  Typography as MuiTypography,
  TypographyOptions as MuiTypographyOptions,
} from '@mui/material/styles/createTypography';

declare module '@mui/material/styles/createTypography' {
  interface Typography extends MuiTypography {
    fontWeightSemiBold: React.CSSProperties['fontWeight'];
  }
  interface TypographyOptions extends MuiTypographyOptions {
    fontWeightSemiBold: React.CSSProperties['fontWeight'];
  }
}
