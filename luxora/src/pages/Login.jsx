import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = ({ setIsLoggedIn, setUsername }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('token', data.jwtToken);
          localStorage.setItem('username', data.username);
          setIsLoggedIn(true);
          setUsername(data.username);
          setMessage("Login successful!");
          navigate('/');
        } else {
          setMessage(" Login failed!");
        }
      })
      .catch(() => setMessage(' Login failed!'));
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      <Link to="/signup">
        <div className="signup-button"> Signup</div>
      </Link>
      <p className="login-message">{message}</p>
    </div>
  );
};

export default Login;
