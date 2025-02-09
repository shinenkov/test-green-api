import { Box, Paper, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { login, selectAuth } from '../../store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../api/hooks';
import { CredentialsInput } from './CredentialsInput';
import { LoginButton } from './LoginButton';
import { Footer } from './Footer';
import { styles } from './styles';
import { useTheme } from '@mui/material/styles';

export const Login = React.memo(() => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(selectAuth);
  const theme = useTheme();
  const classes = styles(theme);

  const [idInstance, setIdInstance] = useState(0);
  const [apiTokenInstance, setApiTokenInstance] = useState('');

  const handleLogin = useCallback(() => {
    dispatch(login({ idInstance, apiTokenInstance }));
  }, [dispatch, idInstance, apiTokenInstance]);

  return (
    <Box sx={classes.mainContainer}>
      <Paper sx={classes.paper}>
        <Box sx={classes.paperContent}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4">Введите инстанс</Typography>
            <Typography variant="h6">
              Введите idInstance и apiTokenInstance.
            </Typography>
          </Box>
          <CredentialsInput
            idInstance={idInstance}
            setIdInstance={setIdInstance}
            apiTokenInstance={apiTokenInstance}
            setApiTokenInstance={setApiTokenInstance}
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <LoginButton
            disabled={
              idInstance.toString().length !== 10 ||
              apiTokenInstance.length !== 50
            }
            onClick={handleLogin}
            loading={loading}
          />
        </Box>
      </Paper>
      <Footer />
    </Box>
  );
});

Login.displayName = 'Login';
