import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { ThemeProvider } from "@material-tailwind/react";

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './Context/AuthContext';
import { ToastProvider } from 'react-toast-notifications';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
    <ToastProvider autoDismissTimeout={3000} placement='bottom-right'>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>
);
