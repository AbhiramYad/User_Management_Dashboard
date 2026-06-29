import React, { useEffect } from 'react';

export default function ErrorBanner({ message, type = 'error', onDismiss, autoDismissTime = 5000 }) {
  useEffect(() => {
    if (message && autoDismissTime > 0) {
      const timer = setTimeout(() => {
        onDismiss();
      }, autoDismissTime);
      return () => clearTimeout(timer);
    }
  }, [message, autoDismissTime, onDismiss]);

  if (!message) return null;

  // Determine styles dynamically based on banner type
  const getBannerStyles = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: 'var(--success-bg)',
          borderColor: 'var(--success-border)',
          color: 'var(--success-color)',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          )
        };
      case 'warning':
        return {
          backgroundColor: 'var(--warning-bg)',
          borderColor: 'var(--warning-border)',
          color: 'var(--warning-color)',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          )
        };
      case 'error':
      default:
        return {
          backgroundColor: 'var(--error-bg)',
          borderColor: 'var(--error-border)',
          color: 'var(--error-color)',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          )
        };
    }
  };

  const styleConfig = getBannerStyles();

  return (
    <div 
      className="glass-panel animate-fade-in"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.85rem 1.25rem',
        borderLeftWidth: '4px',
        borderLeftColor: styleConfig.color,
        backgroundColor: styleConfig.backgroundColor,
        borderColor: styleConfig.borderColor,
        gap: '1rem',
        borderRadius: 'var(--border-radius-sm)',
        width: '100%',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ color: styleConfig.color, display: 'flex', alignItems: 'center' }}>
          {styleConfig.icon}
        </div>
        <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>
          {message}
        </span>
      </div>

      <button 
        type="button" 
        onClick={onDismiss}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          fontSize: '1.25rem',
          padding: '0.1rem'
        }}
        title="Dismiss Alert"
        className="btn-icon-danger"
      >
        &times;
      </button>
    </div>
  );
}
