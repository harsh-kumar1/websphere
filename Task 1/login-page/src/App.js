import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpPage from './components/SignUpPage';
import Dashboard from './components/Dashboard';


import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';


<GoogleOAuthProvider clientId="353541647580-nfcsijq1voe1g5a41m5o72t9o8g4ca2h.apps.googleusercontent.com">
  <App />
</GoogleOAuthProvider>


function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path= "/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>

    // <div className="container">
    //   <LoginForm />
    // </div>
  );
}

export default App;
