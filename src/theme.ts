import { createTheme } from '@mui/material/styles';

export const colors = {
  primaryBackground: '#008069',
  darkPrimaryBackground: '#017561',
  background: 'rgb(252, 245, 235)',
  white: '#ffffff',
  text: '#333333',
  danger: '#a72727',
};

const commonShift = '24px';

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primaryBackground,
    },
    background: {
      default: colors.background,
    },
  },
  typography: {
    fontFamily: "'Golos Text', serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: commonShift,
          textTransform: 'capitalize',
          fontWeight: 600,
          color: colors.white,
          paddingLeft: commonShift,
          paddingRight: commonShift,
          '&:hover': {
            boxShadow:
              '0 2px 7px rgba(11, 20, 26, .09), 0 1px 2px rgba(11, 20, 26, .05)',
            background: colors.darkPrimaryBackground,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: commonShift,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            background: '#ededed',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            backgroundColor: colors.primaryBackground,
            borderRadius: '4px',
            minHeight: 24,
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
            {
              backgroundColor: colors.darkPrimaryBackground,
            },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
            {
              backgroundColor: colors.darkPrimaryBackground,
            },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
            {
              backgroundColor: colors.darkPrimaryBackground,
            },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          width: '100%',
          borderRadius: commonShift,
          '& fieldset': {
            borderColor: 'black',
          },
          '&:hover fieldset': {
            borderColor: 'black',
          },
          '&.Mui-focused fieldset, &.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
              borderColor: colors.primaryBackground,
              borderWidth: '1px',
            },
        },
      },
    },
  },
});
