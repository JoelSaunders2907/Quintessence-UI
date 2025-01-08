import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DateProvider } from './contexts/DateContext';
import { ProcessProvider } from './contexts/ProcessContext';
import { App } from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProcessProvider>
      <DateProvider>
        <App />
      </DateProvider>
    </ProcessProvider>
  </StrictMode>
);