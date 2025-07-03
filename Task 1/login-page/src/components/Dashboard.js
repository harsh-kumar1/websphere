import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // if you want consistent styling

const Dashboard = () => {
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const message = localStorage.getItem('welcomeMessage');
    setWelcomeMessage(message || 'Welcome to your dashboard');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('welcomeMessage');
    navigate('/');
  };

  return (
    <div className="container">
      <div className="login-container">
        <div className="left-panel">
          <div className="logo">WebSphere</div>
          <h1>Dashboard</h1>
          <p>Your one-stop control center</p>
        </div>

        <div className="right-panel">
          <h2>{welcomeMessage}</h2>
          <p className="subtext">You're successfully logged in!</p>
          <button onClick={handleLogout} className="btn btn-dark" style={{ marginTop: '20px' }}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
