import { Box, Paper, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { countries, CountryType } from './types';
import { login, selectAuth } from '../../store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../api/hooks';
import { PhoneInput } from './PhoneInput';
import { CredentialsInput } from './CredentialsInput';
import { LoginButton } from './LoginButton';
import { Footer } from './Footer';
import { styles } from './styles';
import { useTheme } from '@mui/material/styles';
import { CountriesInput } from './Countries';

interface LoginProps {
  onLogin: () => void;
}

export const Login = React.memo(({ onLogin }: LoginProps) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(selectAuth);
  const theme = useTheme();
  const classes = styles(theme);

  const [country, setCountry] = useState<CountryType>(countries[189]);
  const [countryInput, setCountryInput] = useState('');
  const [phone, setPhone] = useState('7');
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');

  const handleLogin = useCallback(() => {
    dispatch(login({ idInstance, apiTokenInstance }));
    onLogin();
  }, [dispatch, idInstance, apiTokenInstance, onLogin]);

  const handleSetCountry = useCallback(
    (newValue: CountryType) => {
      setCountry(newValue);
      setPhone(newValue.phone);
    },
    [setCountry]
  );

  const handleSetPhone = useCallback(
    (newValue: string) => {
      setPhone(newValue);
    },
    [setPhone]
  );

  return (
    <Box sx={classes.mainContainer}>
      <Paper sx={classes.paper}>
        <Box sx={classes.paperContent}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4">Введите номер телефона</Typography>
            <Typography variant="h6">
              Выберите страну и введите свой номер телефона.
            </Typography>
          </Box>
          <Box sx={classes.inputContainer}>
            <CountriesInput
              country={country}
              setCountry={handleSetCountry}
              countryInput={countryInput}
              setCountryInput={setCountryInput}
            />
            <PhoneInput
              name={country.phone}
              phone={phone}
              setPhone={handleSetPhone}
            />
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
          <LoginButton onClick={handleLogin} loading={loading} />
        </Box>
      </Paper>
      <Footer />
    </Box>
  );
});

Login.displayName = 'Login';
