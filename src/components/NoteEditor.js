import React, { useState } from 'react';
import axios from 'axios';
import { useTheme } from '../ThemeContext';
import API from '../api';

function NoteEditor({ onNoteAdded }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const { theme } = useTheme();

  const handleSave = async () => {
    if (!title || !content) return alert('Please fill in both fields');
    const token = localStorage.getItem('token');
    setSaving(true);
    try {
      const res = await axios.post(`${API}/api/notes`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onNoteAdded(res.data);
      setTitle('');
      setContent('');
    } catch (err) {
      alert('Failed to save note');
    }
    setSaving(false);
  };

  const inputStyle = {
    width: '100%',
    border: `1px solid ${theme.inputBorder}`,
    borderRadius: 8,
    padding: '10px 12px',
    fontSize: 14,
    fontFamily: 'inherit',
    color: theme.inputText,
    background: theme.surface,
    boxSizing: 'border-box',
    outline: 'none',
    marginBottom: 10,
    transition: 'border 0.2s, background 0.2s'
  };

  return (
    <div style={{
      background: theme.surface,
      border: `1px solid ${theme.surfaceBorder}`,
      borderRadius: 14,
      padding: 20,
      marginBottom: 24,
      transition: 'background 0.2s'
    }}>
      <p style={{
        fontSize: 11, fontWeight: 600,
        color: theme.editorLabel,
        letterSpacing: '0.6px',
        textTransform: 'uppercase',
        margin: '0 0 12px'
      }}>
        New note
      </p>
      <input
        placeholder="Give your note a title..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={inputStyle}
      />
      <textarea
        placeholder="Write your note here..."
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={4}
        style={{ ...inputStyle, resize: 'vertical', marginBottom: 12 }}
      />
      <button
        onClick={handleSave}
        disabled={saving}
        style={{
          background: saving ? theme.primaryDisabled : theme.primary,
          color: '#fff', border: 'none', borderRadius: 8,
          padding: '10px 20px', fontSize: 13, fontWeight: 500,
          cursor: saving ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit', transition: 'background 0.2s'
        }}
      >
        {saving ? 'Saving...' : 'Save note'}
      </button>
    </div>
  );
}

export default NoteEditor;