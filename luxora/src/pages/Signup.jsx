import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Assuming you have a CSS file for styling

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '',role: 'customer' });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.text())
      .then(data => {
        setMessage(data);
        if (data.toLowerCase().includes("success")) {
          setMessage("Signup successful!");
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      })
      .catch(() => setMessage('Signup failed!'));
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form onSubmit={handleSignup} className="signup-form">
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={handleChange}
          required
        />
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
        <select name="role" onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="signup-button">Signup</button>
      </form>
      <p className="signup-message">{message}</p>
    </div>
  );
};

export default Signup;