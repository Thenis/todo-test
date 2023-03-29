import { PropsWithChildren, useMemo } from "react";

import { CssBaseline } from "@mui/material";
import {
  createTheme,
  StyledEngineProvider,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import palette from "./palette";
import typography from "./typography";
import shadows from "./shadows";

declare module "@mui/material/styles" {
  interface Palette {
    inactive: Palette["primary"];
    amber: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    inactive?: PaletteOptions["primary"];
    amber?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    inactive: true;
    amber: true;
  }
}
declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    inactive: true;
    amber: true;
  }
}

export default function AppThemeProvider({ children }: PropsWithChildren) {
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette,
      typography,
      shadows,
    }),
    []
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
