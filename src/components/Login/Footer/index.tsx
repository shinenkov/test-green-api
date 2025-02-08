import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import LockIcon from '../icons/lock';
import { styles } from '../styles';

export const Footer: React.FC = () => {
  const theme = useTheme();
  const classes = styles(theme);
  return (
    <Box sx={classes.footer}>
      <LockIcon />
      <Typography variant="subtitle2" sx={classes.footerText}>
        Ваши личные сообщения вроде как чем-то там защищены
      </Typography>
    </Box>
  );
};
