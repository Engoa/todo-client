import { createTheme, ThemeOptions } from "@mui/material";
import { grey, orange } from "@mui/material/colors";

const theme: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: grey[300],
      dark: orange[700],
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "filled",
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: "filled",
      },
      styleOverrides: {
        select: {
          padding: "1rem",
          background: "#333333",
          InputLabel: {
            color: "white",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },

    MuiList: {
      styleOverrides: {
        root: {
          borderradius: "0.2rem",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          background: "#e50914",
          ":hover": {
            background: "#ad2027",
          },
        },
      },
    },

    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#e50914",
          },
        },
      },
    },
  },
};

export default createTheme(theme);
