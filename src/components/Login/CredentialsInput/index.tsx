import React from 'react';
import { Box, FormControl, OutlinedInput, useTheme } from '@mui/material';
import { styles } from '../styles';

type CredentialsInputProps = {
  idInstance: string;
  setIdInstance: (value: string) => void;
  apiTokenInstance: string;
  setApiTokenInstance: (value: string) => void;
};

export const CredentialsInput: React.FC<CredentialsInputProps> = ({
  idInstance,
  setIdInstance,
  apiTokenInstance,
  setApiTokenInstance,
}) => {
  const theme = useTheme();
  const classes = styles(theme);
  return (
    <Box sx={classes.inputContainer}>
      <FormControl fullWidth variant="outlined" sx={classes.formControl}>
        <OutlinedInput
          value={idInstance}
          placeholder="idInstance"
          onChange={(e) => setIdInstance(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth variant="outlined" sx={classes.formControl}>
        <OutlinedInput
          value={apiTokenInstance}
          placeholder="apiTokenInstance"
          onChange={(e) => setApiTokenInstance(e.target.value)}
        />
      </FormControl>
    </Box>
  );
};
