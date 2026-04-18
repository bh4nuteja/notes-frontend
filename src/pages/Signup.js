import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import API from '../api';

function Signup() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/auth/Signup`, form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  const inputStyle = {
    display: 'block', width: '100%', padding: '10px 12px',
    borderRadius: 8, border: `1px solid ${theme.inputBorder}`,
    fontSize: 14, fontFamily: 'inherit', color: theme.inputText,
    background: theme.surface, boxSizing: 'border-box',
    outline: 'none', marginBottom: 12
  };

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", transition: 'background 0.2s' }}>
      <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 32, width: '100%', maxWidth: 380 }}>
        <h2 style={{ color: theme.title, fontSize: 20, fontWeight: 600, margin: '0 0 6px' }}>Welcome back</h2>
        <p style={{ color: theme.muted, fontSize: 13, margin: '0 0 24px' }}>Log in to your NoteAI account</p>

        <input placeholder="Email" type="email"
          onChange={e => setForm({ ...form, email: e.target.value })}
          style={inputStyle}
        />
        <input placeholder="Password" type="password"
          onChange={e => setForm({ ...form, password: e.target.value })}
          style={inputStyle}
        />
        <button onClick={handleSubmit} style={{ width: '100%', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 0', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 16 }}>
          Log in
        </button>
        <p style={{ textAlign: 'center', fontSize: 13, color: theme.muted, margin: 0 }}>
          No account? <a href="/signup" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 500 }}>Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;