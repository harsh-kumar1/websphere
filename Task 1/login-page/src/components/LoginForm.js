import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import logo from '../assets/image.png';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { loadRazorpayScript } from '../utils/loadRazorpay';

function LoginForm() {
  const navigate = useNavigate();

  // States for email, password, and message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Handle form submission
  const handleLogin = async (e) => {     
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      const { token, user } = res.data;
      localStorage.setItem('token', token);

      setMessage(`Welcome ${user.name}, login successful.`);
      localStorage.setItem('welcomeMessage', `Welcome ${user.name}, login successful.`);

      setIsError(false);

      // Redirect after 1.5 seconds
      startPayment(user.name, user.email);

    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
      setIsError(true);
    }
  };
  const startPayment = async (userName, userEmail) => {
  const res = await loadRazorpayScript();
  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  // Create order from backend
  const orderRes = await axios.post("http://localhost:5000/create-order", {
    amount: 1, // ₹1
  });

  const order = orderRes.data;

  const options = {
    key: "rzp_test_eKGodt2q8Phebs", // Replace with your Razorpay key ID
    amount: order.amount,
    currency: "INR",
    name: "WebSphere Pvt Ltd",
    description: "Account Access Fee",
    order_id: order.id,
    handler: function (response) {
      alert("Payment successful!");
      navigate("/dashboard");
    },
    prefill: {
      name: userName,
      email: userEmail,
      contact: "9999999999",
    },
    theme: {
      color: "#1a73e8",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

  return (
    <div className='container'>
    <div className="login-container">
      <div className="left-panel">
        <div className="logo">WebSphere</div>
        <h1>Welcome back</h1>
        <p>Log in to your account to continue</p>
        <img src={logo} alt="Lock" className="login-image" />
      </div>

      <div className="right-panel">
        <h2>Sign in</h2>
        <p className="subtext">Enter your credentials to access your account</p>

        <form className="login-form" onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="form-options">
            <a href="#" className="forgot">Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-dark">Sign in</button>

          {/* Display message */}
          {message && (
            <p className={`message-box ${isError ? 'error' : 'success'}`}>
              {message}
            </p>
          )}

          <div className="divider">OR CONTINUE WITH</div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
  <GoogleLogin
    onSuccess={credentialResponse => {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google user:", decoded);

      // Send to backend
      axios.post('http://localhost:5000/api/google-login', {
        token: credentialResponse.credential,
      })
      .then(res => {
        alert(res.data.message);
         setTimeout(() => navigate('/dashboard'), 1000);
        // optional: store token or redirect
      })
      .catch(err => {
        console.error(err);
        alert('Google login failed'+ err);
      });
    }}
    onError={() => {
      alert('Login Failed');
    }}
  />
</div>


          {/* <button type="button" className="btn google-btn">
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" />
            Continue with Google
          </button> */}

          <p className="signup-text">
            Don’t have an account?{" "}
            <a href="#" onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}>
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
    </div>
  );
}

export default LoginForm;





// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // ✅ Import navigate hook
// import '../App.css';
// import logo from '../assets/image.png';

// function LoginForm() {
//   const navigate = useNavigate(); // ✅ Hook for navigation

//   return (
//     <div className="login-container">
//       <div className="left-panel">
//         <div className="logo">WebSphere</div>
//         <h1>Welcome back</h1>
//         <p>Log in to your account to continue</p>
//         <img src={logo} alt="Lock" className="login-image" />
//       </div>

//       <div className="right-panel">
//         <h2>Sign in</h2>
//         <p className="subtext">Enter your credentials to access your account</p>

//         <form className="login-form">
//           <label>Email</label>
//           <input type="email" placeholder="Enter your email" required />

//           <label>Password</label>
//           <input type="password" placeholder="Enter your password" required />

//           <div className="form-options">
//             <a href="#" className="forgot">Forgot password?</a>
//           </div>

//           <button type="submit" className="btn btn-dark">Sign in</button>

//           <div className="divider">OR CONTINUE WITH</div>

//           <button type="button" className="btn google-btn">
//             <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" />
//             Continue with Google
//           </button>

//           <p className="signup-text">
//             Don’t have an account?{" "}
//             <a href="#" onClick={(e) => {
//               e.preventDefault();
//               navigate("/signup"); // ✅ Navigate to sign-up page
//             }}>
//               Sign up
//             </a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;


// import React from 'react';
// import '../App.css';
// import logo from '../assets/image.png';

// function LoginForm() {
//   return (
//     <div className="login-container">
//       <div className="left-panel">
//         <div className="logo">WebSphere</div>
//         <h1>Welcome back</h1>
//         <p>Log in to your account to continue</p>
//         <img src={logo} alt="Lock" className="login-image" />
//       </div>

//       <div className="right-panel">
//         <h2>Sign in</h2>
//         <p className="subtext">Enter your credentials to access your account</p>

//         <form className="login-form">
//           <label>Email</label>
//           <input type="email" placeholder="Enter your email" required />

//           <label>Password</label>
//           <input type="password" placeholder="Enter your password" required />

//           <div className="form-options">
           
//             <a href="#" className="forgot">Forgot password?</a>
//           </div>

//           <button type="submit" className="btn btn-dark">Sign in</button>

//           <div className="divider">OR CONTINUE WITH</div>

//           <button type="button" className="btn google-btn">
//             <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" />
//             Continue with Google
//           </button>

//           <p className="signup-text">
//             Don’t have an account? <a href="#">Sign up</a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }
// export default LoginForm;