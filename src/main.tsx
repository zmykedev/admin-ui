import ReactDOM from 'react-dom/client';
import { ColorSchemeScript } from '@mantine/core';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <ColorSchemeScript />
    <App />
  </>
);
