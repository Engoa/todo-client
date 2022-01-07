import { createTheme, ThemeOptions } from "@mui/material";
import { grey, red } from "@mui/material/colors";

const theme: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: grey[300],
      dark: red[700],
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
          padding: "12px",
          transition: "all 250ms ease",
          ":hover": {
            background: "rgba(255,255,255)",
            color: "black",
          },
        },
      },
    },

    MuiList: {
      styleOverrides: {
        root: {
          overflow: "hidden",
          padding: "0",
          borderradius: "0.2rem",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          background: "#e50914",
          color: "white",
          ":hover": {
            background: "#ad2027",
            color: "black",
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
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "#3a3939",
          borderRadius: "0.2rem !important",
          overflow: "hidden",
          width: "100%",
        },
      },
    },

    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          overflowWrap: "anywhere",
          overflow: "hidden",
          borderTop: "2px solid #e50914",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          height: "90px",
        },
      },
    },

    MuiPopover: {
      styleOverrides: {
        paper: {
          background: "#3a3939",
          borderRadius: "0.2rem",
          overflow: "hidden",
          width: "200px",
        },
      },
    },
  },
};

export default createTheme(theme);
