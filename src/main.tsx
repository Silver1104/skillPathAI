import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ConvexReactClient } from 'convex/react';
import { ConvexAuthProvider } from '@convex-dev/auth/react';
import './index.css';

// Ensure the VITE_CONVEX_URL environment variable is defined
const convexUrl = import.meta.env.VITE_CONVEX_URL;
if (!convexUrl || !convexUrl.startsWith('https://')) {
  throw new Error('Invalid or missing VITE_CONVEX_URL environment variable');
}

// Initialize Convex client
const convex = new ConvexReactClient(convexUrl);
console.log(`Convex client initialized with URL: ${convexUrl}`);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConvexAuthProvider client={convex}>
      <App />
    </ConvexAuthProvider>
  </React.StrictMode>,
);
