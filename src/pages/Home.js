import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NoteEditor from '../components/NoteEditor';
import NoteCard from '../components/NoteCard';
import { useTheme } from '../ThemeContext';
import API from '../api';

function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { theme, isDark, toggleTheme } = useTheme();

 async function fetchNotes() {
  try {
    const res = await axios.get(`${API}/api/notes`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setNotes(res.data);
  } catch (err) {
    navigate('/login');
  }
  setLoading(false);
}

useEffect(function fetchOnMount() {
  if (!token) return navigate('/login');
  fetchNotes();
}, []);

  const handleNoteAdded = (newNote) => setNotes([newNote, ...notes]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/notes/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes(notes.filter(n => n._id !== id));
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const handleSummarise = async (id) => {
    try {
      const res = await axios.post(
        `${API}/api/notes/${id}/summarize`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes(notes.map(n =>
        n._id === id ? { ...n, summary: res.data.summary } : n
      ));
    } catch (err) {
      alert('Summarisation failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: theme.bg, minHeight: '100vh', transition: 'background 0.2s' }}>

      {/* Navbar */}
      <div style={{ background: theme.navbar, padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: 18, fontWeight: 600, letterSpacing: '-0.3px', margin: 0 }}>NoteAI</h1>
          <span style={{ background: theme.navBadge, color: theme.navText, fontSize: 11, padding: '3px 8px', borderRadius: 20, marginLeft: 8 }}>
            Gemini 2.5 Flash
          </span>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>

          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: `1px solid ${theme.navBtnBorder}`,
              color: theme.navText,
              padding: '7px 12px',
              borderRadius: 8,
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            {isDark ? '☀ Light' : '☾ Dark'}
          </button>

          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: `1px solid ${theme.navBtnBorder}`,
              color: theme.navText,
              padding: '7px 14px',
              borderRadius: 8,
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            Log out
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '28px 20px' }}>
        <NoteEditor onNoteAdded={handleNoteAdded} />

        {loading && (
          <p style={{ textAlign: 'center', color: theme.muted, fontSize: 14 }}>Loading notes...</p>
        )}

        {!loading && notes.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: theme.emptyText }}>
            <p style={{ fontSize: 15, margin: '0 0 6px' }}>No notes yet</p>
            <p style={{ fontSize: 13 }}>Create your first note above</p>
          </div>
        )}

        {notes.map(note => (
          <NoteCard
            key={note._id}
            note={note}
            onDelete={handleDelete}
            onSummarise={handleSummarise}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;