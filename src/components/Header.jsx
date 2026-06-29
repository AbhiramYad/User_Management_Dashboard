import React from 'react';

export default function Header({ totalUsers, onAddClick }) {
  return (
    <header className="glass-panel animate-fade-in" style={{ padding: '1.25rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)' }}>
      {/* Branding and Sub-indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          background: 'var(--accent-gradient)',
          width: '40px',
          height: '40px',
          borderRadius: 'var(--border-radius-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-glow)',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '1.25rem'
        }}>
          U
        </div>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            User Management Dashboard
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Seamlessly view, search, and manage system administrators
          </p>
        </div>
      </div>

      {/* Stats & Add Action */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-color)',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--border-radius-sm)',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)'
        }}>
          Total Users: <strong style={{ color: 'var(--text-primary)' }}>{totalUsers}</strong>
        </div>

        <button 
          onClick={onAddClick}
          className="btn btn-primary"
          style={{ height: '42px' }}
          id="btn-add-user"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add User
        </button>
      </div>
    </header>
  );
}
