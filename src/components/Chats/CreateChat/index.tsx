import React, { useCallback, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../../api/hooks';
import { selectChat, selectChats } from '../../../store/chat/chatSlice';
import { PhoneInput } from './PhoneInput';
import { addChat } from '../../../store/chat/chatSlice';
import { styles } from '../styles';
import { selectAuth } from '../../../store/auth/authSlice';
import { CountriesInput } from './Countries';
import { countries, CountryType } from './types';
import { BrazilRegionInput } from './PhoneInput/BrazilRegionInput';
import { checkNumber, getPhone } from './utils';
import { colors } from '../../../theme';

export const CreateChat = React.memo(() => {
  const theme = useTheme();
  const classes = styles(theme);
  const dispatch = useAppDispatch();
  const chatList = useAppSelector(selectChats);
  const { idInstance, apiTokenInstance } = useAppSelector(selectAuth);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [newChatPhone, setNewChatPhone] = useState('');
  const [region, setRegion] = useState<string>('11');
  const [country, setCountry] = useState<CountryType>(countries[189]);
  const [countryInput, setCountryInput] = useState('');

  const handleSetCountry = useCallback(
    (newValue: CountryType) => {
      setCountry(newValue);
      setNewChatPhone(newValue.phone);
    },
    [setCountry]
  );

  const handleCreateChat = async () => {
    setError('');
    const phoneNumber = newChatPhone.replace(/\D/g, '');
    const apiPhone = getPhone(phoneNumber, country.code, country.phone, region);
    const havingChat = chatList.findIndex((ch) => ch.phone === apiPhone);
    if (havingChat === -1) {
      setIsLoading(true);
      const isValid = await checkNumber(
        idInstance,
        apiTokenInstance,
        phoneNumber
      );
      setIsLoading(false);
      if (isValid) {
        const newChat = {
          id: (chatList.length + 1).toString(),
          name: newChatPhone,
          phone: apiPhone,
          avatar: '',
          lastMessage: '',
        };

        dispatch(addChat(newChat));
      } else {
        setError('Номер не зарегистрирован в WhatsApp');
        return;
      }
    } else {
      dispatch(selectChat(chatList[havingChat].phone));
    }
  };

  const shortPhone = newChatPhone.replace(/\D/g, '').replace(country.phone, '');
  const isDisabled =
    shortPhone.length !== (country.code === 'BR' ? 8 : 10) || isLoading;

  return (
    <Box sx={classes.createChatBox}>
      <Stack spacing={2} sx={{ textAlign: 'center' }}>
        <Box sx={classes.inputContainer}>
          <CountriesInput
            country={country}
            setCountry={handleSetCountry}
            countryInput={countryInput}
            setCountryInput={setCountryInput}
          />
          <Box sx={{ display: 'flex' }}>
            <PhoneInput
              name={country.phone}
              phone={newChatPhone}
              setPhone={setNewChatPhone}
              sx={
                country.code === 'BR' ? { width: '200px' } : { width: '420px' }
              }
            />
            {country.code === 'BR' && (
              <BrazilRegionInput code={region} setCode={setRegion} />
            )}
          </Box>
        </Box>
        <Button
          fullWidth
          variant="contained"
          disabled={isDisabled}
          onClick={handleCreateChat}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Create Chat'
          )}
        </Button>
        {error.length > 0 && (
          <Typography variant="subtitle1" color={colors.danger}>
            {error}
          </Typography>
        )}
      </Stack>
    </Box>
  );
});
