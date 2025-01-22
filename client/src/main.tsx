import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css'; // Tailwind and custom styles
import App from './App.tsx';
import { ThemeProvider } from './components/ThemeProvider.tsx';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { registerSW } from 'virtual:pwa-register';

console.log(App);

// Register the service worker with automatic updates
const updateSW = registerSW({
  onNeedRefresh() {
    console.log('A new version of the app is available.');
  },
  onOfflineReady() {
    console.log('The app is ready to work offline.');
  },
});
// Rendering both components inside StrictMode
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

      <div>
        <AuthProvider>
          <BrowserRouter>

            <App />
          </BrowserRouter>
        </AuthProvider>

      </div>
    </ThemeProvider>
  </StrictMode>,
);
