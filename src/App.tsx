import { Login } from './components/Login';
import { ChatContainer } from './components/Chats';
import { selectAuth } from './store/auth/authSlice';
import { useAppSelector } from './api/hooks';
import './App.css';

function App() {
  const { isAuthenticated } = useAppSelector(selectAuth);
  return isAuthenticated ? <ChatContainer /> : <Login />;
}

export default App;
