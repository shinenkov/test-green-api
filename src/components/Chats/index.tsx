import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { NewChat } from './NewChat';
import { ListChats } from './ListChats';
import { Button } from '@mui/material';
import { DrawerHeader, drawerWidth } from './DrawerControl/utils';
import { AppBar, Drawer } from './DrawerControl';
import { useAppDispatch, useAppSelector } from '../../api/hooks';
import { selectChats } from '../../store/chat/chatSlice';
import { logout } from '../../store/auth/authSlice';

export const ChatContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const chatList = useAppSelector(selectChats);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const hideButton = () => {
    return (
      <Button color="inherit" onClick={handleDrawerToggle}>
        {isDrawerOpen ? 'Hide' : 'Show'}
      </Button>
    );
  };

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={isDrawerOpen}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {!isDrawerOpen && hideButton()}
          <Typography variant="h6">WhatsApp</Typography>
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={isDrawerOpen}>
        <DrawerHeader sx={{ background: theme.palette.primary.main }}>
          {isDrawerOpen && hideButton()}
        </DrawerHeader>
        <Divider />
        <ListChats chats={chatList} />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          height: `calc(100vh - ${theme.spacing(8)})`,
          width: `calc(100vw - ${isDrawerOpen ? drawerWidth + 1 : '65'}px)`,
        }}
      >
        <DrawerHeader />
        <NewChat />
      </Box>
    </Box>
  );
};
