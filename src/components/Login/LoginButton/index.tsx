import React from 'react';
import { Button, CircularProgress } from '@mui/material';

type LoginButtonProps = {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
};

export const LoginButton: React.FC<LoginButtonProps> = ({
  onClick,
  loading,
  disabled,
}) => (
  <Button
    color="primary"
    variant="contained"
    onClick={onClick}
    disabled={loading || disabled}
  >
    {loading ? <CircularProgress size={24} color="inherit" /> : 'Next'}
  </Button>
);
