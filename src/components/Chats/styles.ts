import { Theme } from '@mui/material/styles';

export const styles = (theme: Theme) => ({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: theme.palette.background.default,
  },
  paper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    p: 2,
    borderRadius: 2,
  },
  chatHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  chatActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  messageList: {
    flexGrow: 1,
    overflow: 'auto',
    mb: 2,
  },
  messageInput: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  createChatBox: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto',
    height: '100%',
  },
});
