import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://superkart.devopspedia.online/auth/login', form);
      login(res.data.name, res.data.token);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left-panel">
        <div className="login-branding">
          <h1>Welcome to <span className="highlight">SuperKart</span></h1>
          <p>Explore the best deals, daily discounts, and lightning-fast delivery — all in one place!</p>
          <ul>
            <li>✔️ Daily exclusive offers</li>
            <li>✔️ Superfast delivery</li>
            <li>✔️ Secure checkout</li>
            <li>✔️ Trusted by thousands</li>
          </ul>
        </div>
      </div>
      <div className="login-right-panel">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login to SuperKart</h2>

          {error && <div className="error-message">{error}</div>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <div className="form-links">
            <a href="#">Forgot your password?</a>
          </div>

          <button type="submit">Login</button>

          <p className="form-footer">
            Don't have an account? <Link to="/signup" className="register-link">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
