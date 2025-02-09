import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  useTheme,
} from '@mui/material';
import { styles } from '../styles';

type CredentialsInputProps = {
  idInstance: number;
  setIdInstance: (value: number) => void;
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
        <InputLabel htmlFor="idInstance">idInstance</InputLabel>
        <OutlinedInput
          label="idInstance"
          id={'idInstance'}
          value={idInstance}
          placeholder="idInstance"
          onChange={(e) => {
            const { value } = e.target;
            if (value.length < 15)
              setIdInstance(Number(e.target.value.replace(/\D/, '')));
          }}
        />
      </FormControl>
      <FormControl fullWidth variant="outlined" sx={classes.formControl}>
        <InputLabel htmlFor="apiTokenInstance">apiTokenInstance</InputLabel>
        <OutlinedInput
          label="apiTokenInstance"
          id={'apiTokenInstance'}
          value={apiTokenInstance}
          placeholder="apiTokenInstance"
          onChange={(e) => setApiTokenInstance(e.target.value)}
        />
      </FormControl>
    </Box>
  );
};
