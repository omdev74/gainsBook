import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css'; // Tailwind and custom styles
import App from './App.tsx';

// Rendering both components inside StrictMode
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>
      <App />
    </div>
  </StrictMode>,
);
