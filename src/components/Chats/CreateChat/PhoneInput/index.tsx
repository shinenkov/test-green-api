import React from 'react';
import { FormControl, OutlinedInput, SxProps } from '@mui/material';
import { MaskPhone } from '../utils';

type PhoneInputProps = {
  name: string;
  phone: string;
  setPhone: (value: string) => void;
  sx?: SxProps;
  small?: boolean;
};

export const PhoneInput: React.FC<PhoneInputProps> = ({
  name,
  phone,
  setPhone,
  sx,
  small = false,
}) => {
  return (
    <FormControl
      sx={sx}
      size={small ? 'small' : 'medium'}
      fullWidth
      variant="outlined"
    >
      <OutlinedInput
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        name={name}
        inputComponent={MaskPhone}
      />
    </FormControl>
  );
};
