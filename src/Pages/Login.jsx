import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './Login.css';

function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('/api/auth/login', data);

      alert('Login Successful');

      const token = res.data.token;
      localStorage.setItem('token', token);

      // Decode token for userId if not in response
      const decoded = jwtDecode(token);
      const userId = res.data.user?._id || decoded.userId || decoded._id;
      localStorage.setItem('userId', userId);

      // Role-based navigation
      if (res.data.user?.role === 'admin' || res.data.user?.isAdmin) {
        navigate('/admin-dashboard');
      } else {
        navigate('/home');
      }

      // Clear sensitive data
      setData({ email: '', password: '' });

    } catch (err) {
      if (err.response) {
        alert(err.response.data?.msg || 'Login failed');
      } else if (err.request) {
        alert('No response from server');
      } else {
        alert('Error: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="back">
      <form onSubmit={handleSubmit} className="login-container">
        <div className="container">
          <div className="left-container">
            <h2>Login</h2>
            <input
              placeholder="Email"
              type="email"
              value={data.email}
              required
              onChange={e => setData({ ...data, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={data.password}
              required
              onChange={e => setData({ ...data, password: e.target.value })}
            />
            <div className="check">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <button
              type="submit"
              disabled={loading || !data.email || !data.password}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          <div className="right-container">
            <div className="wave-bg-top-left">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path
                  fill="#ff5500"
                  fillOpacity="1"
                  d="M0,32L21.8,58.7C43.6,85,87,139,131,154.7C174.5,171,218,149,262,138.7C305.5,128,349,128,393,106.7C436.4,85,480,43,524,21.3C567.3,0,611,0,655,32C698.2,64,742,128,785,133.3C829.1,139,873,85,916,96C960,107,1004,181,1047,197.3C1090.9,213,1135,171,1178,176C1221.8,181,1265,235,1309,245.3C1352.7,256,1396,224,1418,208L1440,192L1440,0L0,0Z"
                />
              </svg>
            </div>
            <div className="quote-content">
              <h2>Hello guys welcome to ShopMart</h2>
              <p>Please provide valid credentials!</p>
              <Link to="/" className="register-btn">Register</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
