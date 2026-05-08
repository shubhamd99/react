import { hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './style.css';

const root = document.getElementById('root');

if (root) {
  // hydrateRoot reuses the HTML streamed by the server and attaches event handlers.
  hydrateRoot(root, <App />);
}
