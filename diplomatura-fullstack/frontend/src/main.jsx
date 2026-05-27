import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sileo';

console.log("🚀 main.jsx se está ejecutando");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
        <Toaster 
          position="top-center"
          defaultOptions={{
            duration: 7000,
            roundness: 12,
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);