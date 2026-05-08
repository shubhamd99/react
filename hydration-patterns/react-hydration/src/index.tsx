import { hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './App.css';

const rootEl = document.getElementById('root');

if (rootEl) {
  // hydrateRoot reuses the streamed server HTML and attaches event handlers.
  hydrateRoot(rootEl, <App />);
}
