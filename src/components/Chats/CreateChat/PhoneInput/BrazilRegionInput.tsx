import React from 'react';
import { SxProps, TextField } from '@mui/material';

type BrazilRegionInputProps = {
  code: string;
  setCode: (value: string) => void;
  sx?: SxProps;
  small?: boolean;
};

export const BrazilRegionInput: React.FC<BrazilRegionInputProps> = ({
  code,
  setCode,
  sx,
  small = false,
}) => {
  return (
    <TextField
      value={code}
      variant="outlined"
      label="Code of Region"
      sx={{
        ...sx,
        ml: '20px',
        width: '200px',
      }}
      size={small ? 'small' : 'medium'}
      type="number"
      slotProps={{
        htmlInput: {
          max: 81,
          min: 11,
        },
      }}
      onChange={(e) => setCode(e.target.value)}
    />
  );
};
