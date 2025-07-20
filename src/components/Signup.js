import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AuthStyles.css'; // Create this CSS file if not already created

const Signup = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      
     await axios.post('http://43.204.142.97:3001/auth/signup', form);
      

      const res = await axios.post(`http://43.204.142.97:3001/auth/login`, {
        email: form.email,
        password: form.password,
      });

      login(res.data.name, res.data.token);
      navigate('/');
    } catch (err) {
      setError('Signup failed. Email may already be used.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card glass" onSubmit={handleSubmit}>
        <h3 className="text-center mb-4">Create Account</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control form-control-lg"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control form-control-lg"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control form-control-lg"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-success w-100 btn-lg" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
