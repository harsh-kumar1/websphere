import React, { useState } from 'react';
import axios from 'axios';
import './SignUpPage.css';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const password = formData.password;
    const confirmPassword = formData.confirmPassword;


    // ✅ Password length check
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      setIsError(true);
      return;
    }

    // ✅ Password strength check: must include number or special character
    const strengthRegex = /[0-9!@#$%^&*(),.?":{}|<>]/;
    if (!strengthRegex.test(password)) {
      setMessage("Password must include at least one number or special character");
      setIsError(true);
      return;
    }

    // ✅ Password match check
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsError(true);
      return;
    }


    try {
      const res = await axios.post('http://localhost:5000/api/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setMessage(res.data.message || 'Account created successfully!');
      setIsError(false);

      // ✅ Redirect to login page after 2 seconds
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed');
      setIsError(true);
    }
  };

  return (
    <div className="signup-wrapper">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Create your account</h2>
        <p>Enter your information to get started</p>

        <label>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <small>Password must be at least 6 characters and contain a number or special character</small>


        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            required
          />
          <span>
            I agree to the <a href="#">Terms of Service</a> and{' '}
            <a href="#">Privacy Policy</a>
          </span>
        </div>

        <button type="submit">Create Account →</button>

        {message && (
          <p className={`signup-message ${isError ? 'error' : 'success'}`}>
            {message}
          </p>
        )}

        <p className="login-link">
          Already have an account? <a href="/">Log in</a>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;


