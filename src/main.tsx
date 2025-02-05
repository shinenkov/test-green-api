import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider as ReduxProvider } from 'react-redux';
import App from './App.tsx';
import { appStore } from './store/appStore.ts';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <ReduxProvider store={appStore}>
    <App />
  </ReduxProvider>
);
