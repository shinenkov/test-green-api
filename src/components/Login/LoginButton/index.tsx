import React from 'react';
import { Button, CircularProgress } from '@mui/material';

type LoginButtonProps = {
  onClick: () => void;
  loading: boolean;
};

export const LoginButton: React.FC<LoginButtonProps> = ({
  onClick,
  loading,
}) => (
  <Button
    color="primary"
    variant="contained"
    onClick={onClick}
    disabled={loading}
  >
    {loading ? <CircularProgress size={24} color="inherit" /> : 'Next'}
  </Button>
);
