import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css'; // Tailwind and custom styles
import App from './App.tsx';
import { ThemeProvider } from './components/ThemeProvider.tsx';


console.log(App);
// Rendering both components inside StrictMode
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

      <div>

        <App />
      </div>
    </ThemeProvider>
  </StrictMode>,
);
