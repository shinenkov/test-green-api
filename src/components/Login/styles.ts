import { Theme } from '@mui/material/styles';

// Common styles
export const commonStyles = {
  centerFlexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};
export const styles = (theme: Theme) => ({
  mainContainer: {
    width: '100vw',
    height: '100vh',
    ...commonStyles.centerFlexColumn,
    justifyContent: 'center',
    background: theme.palette.background.default,
  },
  paper: {
    height: '480px',
    width: '978px',
    border: `1px solid ${theme.palette.text.primary}`,
  },
  paperContent: {
    height: '100%',
    width: '100%',
    padding: theme.spacing(4),
    ...commonStyles.centerFlexColumn,
    justifyContent: 'space-between',
  },
  inputContainer: {
    ...commonStyles.centerFlexColumn,
    justifyContent: 'space-between',
    minHeight: '128px',
    minWidth: '320px',
  },
  formControl: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  footer: {
    display: 'flex',
    marginTop: theme.spacing(2),
  },
  footerText: {
    marginTop: theme.spacing(0.5),
    marginLeft: theme.spacing(1),
  },
});
