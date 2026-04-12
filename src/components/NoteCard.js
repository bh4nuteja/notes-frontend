import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';

function NoteCard({ note, onDelete, onSummarise }) {
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const handleSummarise = async () => {
    setLoading(true);
    await onSummarise(note._id);
    setLoading(false);
  };

  return (
    <div style={{
      background: theme.surface,
      border: `1px solid ${theme.cardBorder}`,
      borderRadius: 14,
      padding: '18px 20px',
      marginBottom: 14,
      fontFamily: "'Inter', sans-serif",
      transition: 'background 0.2s'
    }}>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: theme.text, margin: 0 }}>
          {note.title}
        </p>
        <span style={{ fontSize: 11, color: theme.textHint, whiteSpace: 'nowrap', marginLeft: 12 }}>
          {new Date(note.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
      </div>

      <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.65, margin: '0 0 14px' }}>
        {note.content}
      </p>

      {note.summary && (
        <div style={{
          background: theme.summaryBg,
          borderLeft: `3px solid ${theme.summaryBorder}`,
          borderRadius: '0 8px 8px 0',
          padding: '10px 14px',
          marginBottom: 14,
          transition: 'background 0.2s'
        }}>
          <p style={{ fontSize: 10, fontWeight: 600, color: theme.summaryLabel, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 4px' }}>
            AI summary
          </p>
          <p style={{ fontSize: 13, color: theme.summaryText, lineHeight: 1.6, margin: 0 }}>
            {note.summary}
          </p>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={handleSummarise}
          disabled={loading}
          style={{
            background: loading ? theme.primaryDisabled : theme.primary,
            color: '#fff', border: 'none', borderRadius: 8,
            padding: '8px 14px', fontSize: 12, fontWeight: 500,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit', transition: 'background 0.2s'
          }}
        >
          {loading ? 'Summarising...' : note.summary ? 'Re-summarise' : 'Summarise with AI'}
        </button>

        <button
          onClick={() => onDelete(note._id)}
          style={{
            background: 'transparent',
            color: theme.deleteText,
            border: `1px solid ${theme.deleteBorder}`,
            borderRadius: 8, padding: '8px 14px',
            fontSize: 12, fontWeight: 500,
            cursor: 'pointer', fontFamily: 'inherit',
            transition: 'border 0.2s'
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;