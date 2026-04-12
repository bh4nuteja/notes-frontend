import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import API from '../api';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) return setError('Please fill in all fields');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API}/api/auth/signup`, form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const inputStyle = {
    display: 'block',
    width: '100%',
    padding: '11px 14px',
    borderRadius: 10,
    border: `1px solid ${theme.inputBorder}`,
    background: theme.bg,
    color: theme.inputText,
    fontSize: 14,
    fontFamily: 'inherit',
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
      padding: '0 16px'
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48, height: 48,
            background: theme.primary,
            borderRadius: 14,
            marginBottom: 16
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <h1 style={{ color: theme.text, fontSize: 22, fontWeight: 700, margin: '0 0 6px', letterSpacing: '-0.5px' }}>
            NoteAI
          </h1>
          <p style={{ color: theme.textMuted, fontSize: 14, margin: 0 }}>
            Take smarter notes with AI
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: theme.surface,
          border: `1px solid ${theme.cardBorder}`,
          borderRadius: 16,
          padding: '28px 28px 24px'
        }}>
          <h2 style={{ color: theme.text, fontSize: 17, fontWeight: 600, margin: '0 0 20px' }}>
            Create your account
          </h2>

          {/* Error message */}
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

          <label style={{ fontSize: 12, fontWeight: 500, color: theme.textMuted, display: 'block', marginBottom: 6 }}>
            Full name
          </label>
          <input
            placeholder="John Doe"
            value={form.name}
            style={inputStyle}
            onChange={e => setForm({ ...form, name: e.target.value })}
            onKeyDown={handleKeyDown}
          />

          <label style={{ fontSize: 12, fontWeight: 500, color: theme.textMuted, display: 'block', marginBottom: 6 }}>
            Email address
          </label>
          <input
            placeholder="you@example.com"
            type="email"
            value={form.email}
            style={inputStyle}
            onChange={e => setForm({ ...form, email: e.target.value })}
            onKeyDown={handleKeyDown}
          />

          <label style={{ fontSize: 12, fontWeight: 500, color: theme.textMuted, display: 'block', marginBottom: 6 }}>
            Password
          </label>
          <input
            placeholder="At least 6 characters"
            type="password"
            value={form.password}
            style={{ ...inputStyle, marginBottom: 20 }}
            onChange={e => setForm({ ...form, password: e.target.value })}
            onKeyDown={handleKeyDown}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? theme.primaryDisabled : theme.primary,
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '12px',
              fontSize: 14,
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              transition: 'background 0.2s',
              letterSpacing: '0.1px'
            }}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </div>

        {/* Footer */}
        <p style={{ textAlign: 'center', fontSize: 13, color: theme.textMuted, margin: '20px 0 0' }}>
          Already have an account?{' '}
          <a href="/login" style={{ color: theme.primary, textDecoration: 'none', fontWeight: 600 }}>
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;