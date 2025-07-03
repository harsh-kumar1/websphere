// src/index.js or src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="353541647580-nfcsijq1voe1g5a41m5o72t9o8g4ca2h.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);



// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './App.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
