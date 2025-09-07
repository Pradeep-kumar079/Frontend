import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [data, setData] = useState({ name: '', email: '', password: '', phone: '' });
  const navigate = useNavigate();
  const BASE_API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_API_URL}/api/auth/register`, data);
      alert(res.data.msg);
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      alert(err.response?.data?.msg || 'Something went wrong, please try again.');
    }
  };

  return (
    <div className="back">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Hello guys, welcome to the shopping mart.</h2>
        <p>Fill in the details below to create an account.</p>

        <div className="container">
          {/* Left Section */}
          <div className="left">
            <div className="wave-diagonal-bg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path
                  fill="#ff5500"
                  fillOpacity="1"
                  d="M0,160L21.8,186.7C43.6,213,87,267,131,250.7C174.5,235,218,149,262,138.7C305.5,128,349,192,393,181.3C436.4,171,480,85,524,69.3C567.3,53,611,107,655,122.7C698.2,139,742,117,785,133.3C829.1,149,873,203,916,186.7C960,171,1004,85,1047,58.7C1090.9,32,1135,64,1178,101.3C1221.8,139,1265,181,1309,181.3C1352.7,181,1396,139,1418,117.3L1440,96L1440,320L0,320Z"
                ></path>
              </svg>
            </div>

            <div className="quote-box">
              <h2>“Shop smart, live better.”</h2>
              <Link to="/login" className="btn-link">Start Shopping</Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="right">
            <h2>Register</h2>

            <input
              placeholder="Name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
            <input
              placeholder="Email"
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Phone number"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              required
            />

            <div className="check">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I agree to the terms and conditions</label>
              <p>
                <Link to="/login">Already have an account?</Link>
              </p>
            </div>

            <button type="submit">Register</button>

            <h4>OR</h4>

            <button type="button" className="google-btn">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" />
              Register with Google
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
