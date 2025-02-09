import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { countries, CountryType } from '../types';
import InputAdornment from '@mui/material/InputAdornment';
import { getCountryFlag } from '../utils';

type CountriesInputProps = {
  country: CountryType;
  setCountry: (value: CountryType) => void;
  countryInput: string;
  setCountryInput: (value: string) => void;
};

export const CountriesInput = React.memo((props: CountriesInputProps) => {
  const { country, setCountry, countryInput, setCountryInput } = props;

  const handleCountryChange = useCallback(
    (_e: React.SyntheticEvent, newValue: CountryType) => {
      setCountry(newValue);
    },
    [setCountry]
  );

  const handleInputChange = useCallback(
    (_e: React.SyntheticEvent, newInputValue: string) => {
      setCountryInput(newInputValue);
    },
    [setCountryInput]
  );

  return (
    <Box>
      <Autocomplete
        sx={{ width: 420 }}
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.label}
        disableClearable
        onChange={handleCountryChange}
        value={country}
        inputValue={countryInput}
        onInputChange={handleInputChange}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box
              key={key}
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              {...optionProps}
            >
              {getCountryFlag(option)}
              {option.label} +{option.phone}
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            slotProps={{
              htmlInput: {
                ...params.inputProps,
                autoComplete: 'new-password',
              },
              input: {
                ...params.InputProps,
                sx: {
                  '& fieldset': {
                    border: '1px solid black',
                    borderRadius: '24px',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderWidth: '1px',
                    borderColor: '#008069',
                  },
                },
                startAdornment: (
                  <InputAdornment position="start">
                    {country && getCountryFlag(country)}
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />
    </Box>
  );
});

CountriesInput.displayName = 'CountriesInput';
