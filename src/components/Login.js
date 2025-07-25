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

  // Reset password modal states
  const [showReset, setShowReset] = useState(false);
  const [resetForm, setResetForm] = useState({ email: '', newPassword: '', confirmPassword: '' });
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('https://superkart.devopspedia.online/auth/login', form);
      login(res.data.name, res.data.token);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  // Reset password form handlers
  const handleResetChange = (e) => {
    setResetForm({ ...resetForm, [e.target.name]: e.target.value });
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess('');

    const { email, newPassword, confirmPassword } = resetForm;

    if (!email || !newPassword || !confirmPassword) {
      setResetError('Please fill all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('https://superkart.devopspedia.online/auth/reset-password', {
        email,
        newPassword,
        confirmPassword,
      });

      setResetSuccess(res.data.message || 'Password reset successful');
      // Clear reset form fields on success
      setResetForm({ email: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      const msg = err.response?.data?.message || 'Password reset failed';
      setResetError(msg);
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
            <span
              className="forgot-password-link"
              onClick={() => {
                setShowReset(true);
                setError('');
                setResetError('');
                setResetSuccess('');
              }}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter') setShowReset(true);
              }}
            >
              Forgot your password?
            </span>
          </div>

          <button type="submit">Login</button>

          <p className="form-footer">
            Don't have an account? <Link to="/signup" className="register-link">Register</Link>
          </p>
        </form>
      </div>

      {/* Reset Password Modal */}
      {showReset && (
        <div className="reset-password-modal">
          <div className="reset-password-content">
            <h3>Reset Password</h3>

            {resetError && <div className="error-message">{resetError}</div>}
            {resetSuccess && <div className="success-message">{resetSuccess}</div>}

            <form onSubmit={handleResetSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={resetForm.email}
                onChange={handleResetChange}
                required
              />

              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={resetForm.newPassword}
                onChange={handleResetChange}
                required
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={resetForm.confirmPassword}
                onChange={handleResetChange}
                required
              />

              <div className="modal-buttons">
                <button type="submit">Reset Password</button>
                <button type="button" onClick={() => setShowReset(false)}>Cancel</button>
              </div>
            </form>

            <div className="back-to-login-link-container">
              <span
                className="back-to-login-link"
                onClick={() => setShowReset(false)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') setShowReset(false);
                }}
              >
                ← Back to Login
              </span>
            </div>
          </div>
          <div className="reset-password-overlay" onClick={() => setShowReset(false)}></div>
        </div>
      )}
    </div>
  );
};

export default Login;
