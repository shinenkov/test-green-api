import React, { memo } from 'react';
import { Button } from '@mui/material';

interface ScrollDownButtonProps {
  scrollRef: React.RefObject<HTMLUListElement>;
  count: number;
  handleClose: () => void;
}

export const ScrollDownButton: React.FC<ScrollDownButtonProps> = memo(({
  scrollRef,
  count,
  handleClose,
}) => {
  const handleScrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      handleClose();
    }
  };
  
  return (
    <Button
      variant="contained"
      onClick={handleScrollDown}
      sx={{ position: 'fixed', bottom: '120px', right: '32px' }}
    >
      {`Scroll To (${count})`}
    </Button>
  );
});