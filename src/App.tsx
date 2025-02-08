import { useState } from 'react';
import './App.css';
import { Login } from './components/Login';
import { ChatContainer } from './components/Chats';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return isLoggedIn ? (
    <ChatContainer onLogout={() => setIsLoggedIn(false)} />
  ) : (
    <Login onLogin={() => setIsLoggedIn(true)} />
  );
}

export default App;
