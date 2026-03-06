'use client';

import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0B1120',
      paper: '#121A2B',
    },
    primary: {
      main: '#7C4DFF',
    },
    secondary: {
      main: '#22D3EE',
    },
    warning: {
      main: '#F59E0B',
    },
    success: {
      main: '#10B981',
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    h3: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.6,
    },
  },
});

export default darkTheme;
