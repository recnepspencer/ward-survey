// src/theme.ts

import { createTheme, ThemeOptions, TypographyVariantsOptions } from '@mui/material/styles';

import { blue, grey } from '@mui/material/colors';
import { Components } from '@mui/material';

// Define custom colors
const primaryColor = blue[500];
const secondaryColor = grey[800];
const backgroundColor = '#000000'; // Pure black
const surfaceColor = '#121212'; // Slightly lighter than black for surfaces
const errorColor = '#CF6679'; // Standard MUI error color

// Define typography settings
const typography: TypographyVariantsOptions = {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#FFFFFF',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#FFFFFF',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
      color: '#FFFFFF',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#FFFFFF',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 700,
      color: '#FFFFFF',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 700,
      color: '#FFFFFF',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#E0E0E0',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      color: '#E0E0E0',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'none', // Correctly typed
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      color: '#B0BEC5',
    },
  };
  

// Define component overrides
const components: Components<ThemeOptions> = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
        textTransform: 'none',
        padding: '8px 16px',
        fontWeight: 500,
      },
      containedPrimary: {
        backgroundColor: primaryColor,
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: blue[600],
        },
        '&:disabled': {
          backgroundColor: grey[700],
          color: grey[500],
        },
      },
      outlinedPrimary: {
        borderColor: primaryColor,
        color: primaryColor,
        '&:hover': {
          backgroundColor: grey[900],
          borderColor: blue[600],
          color: blue[600],
        },
        '&:disabled': {
          borderColor: grey[700],
          color: grey[500],
        },
      },
      textPrimary: {
        color: primaryColor,
        '&:hover': {
          backgroundColor: grey[900],
          color: blue[600],
        },
        '&:disabled': {
          color: grey[500],
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        margin: '8px 0',
        '& .MuiInputBase-root': {
          color: '#FFFFFF',
        },
        '& label': {
          color: grey[400],
        },
        '& label.Mui-focused': {
          color: primaryColor,
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: grey[700],
          },
          '&:hover fieldset': {
            borderColor: primaryColor,
          },
          '&.Mui-focused fieldset': {
            borderColor: primaryColor,
          },
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: grey[400],
        '&.Mui-focused': {
          color: primaryColor,
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: primaryColor,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: primaryColor,
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundColor: surfaceColor,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      colorPrimary: {
        backgroundColor: backgroundColor,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: surfaceColor,
        color: '#FFFFFF',
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        color: '#FFFFFF',
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: grey[800],
        },
      },
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        color: grey[600],
        '&.Mui-checked': {
          color: primaryColor,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: primaryColor,
          '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.08)',
          },
        },
        '& .MuiSwitch-track': {
          backgroundColor: grey[700],
        },
      },
    },
  },
  MuiSlider: {
    styleOverrides: {
      root: {
        color: primaryColor,
      },
      thumb: {
        '&:hover, &.Mui-focusVisible': {
          boxShadow: `0 0 0 8px rgba(25, 118, 210, 0.16)`,
        },
      },
      track: {
        height: 4,
      },
      rail: {
        height: 4,
        color: grey[700],
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        color: grey[600],
        '&.Mui-checked': {
          color: primaryColor,
        },
      },
    },
  },
  MuiRadio: {
    styleOverrides: {
      root: {
        color: grey[600],
        '&.Mui-checked': {
          color: primaryColor,
        },
      },
    },
  },
};

// Create the theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: primaryColor,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: secondaryColor,
      contrastText: '#FFFFFF',
    },
    background: {
      default: backgroundColor,
      paper: surfaceColor,
    },
    text: {
      primary: '#FFFFFF',
      secondary: grey[400],
    },
    error: {
      main: errorColor,
    },
    action: {
      active: primaryColor,
      hover: blue[600],
      selected: blue[700],
      disabled: grey[700],
      disabledBackground: grey[800],
    },
  },
  typography,
  components,
});

export default theme;
