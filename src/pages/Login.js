import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import API from '../api';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme();

  async function handleSubmit() {
    if (!form.email || !form.password) {
      return setError('Please fill in all fields');
    }
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API}/api/auth/login`, form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed — check your credentials');
    }
    setLoading(false);
  }

  const inputStyle = {
    width: '100%',
    padding: '11px 14px',
    borderRadius: 10,
    border: `1px solid ${theme.inputBorder}`,
    fontSize: 14,
    fontFamily: "'Inter', sans-serif",
    color: theme.inputText,
    background: theme.bg,
    boxSizing: 'border-box',
    outline: 'none',
    marginBottom: 12,
    transition: 'border 0.2s'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
      transition: 'background 0.2s',
      padding: 20
    }}>
      <div style={{
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        borderRadius: 18,
        padding: '36px 32px',
        width: '100%',
        maxWidth: 400
      }}>

        {/* Logo */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 32, height: 32, background: '#4f46e5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>N</span>
            </div>
            <span style={{ fontSize: 18, fontWeight: 700, color: theme.title, letterSpacing: '-0.3px' }}>NoteAI</span>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.title, margin: '0 0 4px', letterSpacing: '-0.3px' }}>
            Welcome back
          </h2>
          <p style={{ fontSize: 13, color: theme.muted, margin: 0 }}>
            Log in to your NoteAI account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: 8,
            padding: '10px 14px',
            marginBottom: 16,
            fontSize: 13,
            color: '#dc2626'
          }}>
            {error}
          </div>
        )}

        {/* Fields */}
        <label style={{ fontSize: 12, fontWeight: 500, color: theme.muted, display: 'block', marginBottom: 5 }}>Email address</label>
        <input
          placeholder="john@example.com"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          style={inputStyle}
        />

        <label style={{ fontSize: 12, fontWeight: 500, color: theme.muted, display: 'block', marginBottom: 5 }}>Password</label>
        <input
          placeholder="Your password"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          style={{ ...inputStyle, marginBottom: 20 }}
        />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            background: loading ? '#a5b4fc' : '#4f46e5',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '12px 0',
            fontSize: 14,
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.1px',
            marginBottom: 16
          }}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ flex: 1, height: 1, background: theme.border }} />
          <span style={{ fontSize: 12, color: theme.muted }}>or</span>
          <div style={{ flex: 1, height: 1, background: theme.border }} />
        </div>

        {/* Signup link */}
        <p style={{ textAlign: 'center', fontSize: 13, color: theme.muted, margin: 0 }}>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            style={{ color: '#4f46e5', fontWeight: 500, cursor: 'pointer' }}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;