import { Theme as MuiTheme, ThemeOptions as MuiThemeOptions } from '@mui/material/styles';

import { CustomShadows } from './customShadows';

declare module '@mui/material/styles' {
  interface Theme extends MuiTheme {
    customShadows: CustomShadows;
  }

  interface ThemeOptions extends MuiThemeOptions {
    customShadows: CustomShadows;
  }
}
