import React from 'react';
import { UserRow, UserCard } from './UserRow';

export default function UserTable({ users, sortField, sortOrder, onSort, onEdit, onDelete }) {
  
  // Helper to render sort indicator icons next to headings
  const renderSortIndicator = (field) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? ' ▲' : ' ▼';
  };

  const getHeaderStyle = (field) => {
    const isActive = sortField === field;
    return {
      cursor: 'pointer',
      userSelect: 'none',
      color: isActive ? 'var(--accent-color)' : 'var(--text-secondary)',
      transition: 'color var(--transition-fast)',
      position: 'relative'
    };
  };

  // Render Empty State if no users
  if (!users || users.length === 0) {
    return (
      <div className="glass-panel animate-scale-in" style={{ padding: '4rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.25rem' }}>
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          backgroundColor: 'rgba(99, 102, 241, 0.05)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <line x1="17" y1="8" x2="22" y2="13"></line>
            <line x1="22" y1="8" x2="17" y2="13"></line>
          </svg>
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>No Users Found</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem', maxWidth: '350px' }}>
            We couldn't find any users matching your active filters or search query. Try clearing your search text.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ width: '100%' }}>
      {/* Desktop/Tablet Table Layout */}
      <div className="table-container">
        <table className="responsive-table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>ID</th>
              <th 
                style={getHeaderStyle('firstName')} 
                onClick={() => onSort('firstName')}
                title="Sort by First Name"
              >
                First Name {renderSortIndicator('firstName')}
              </th>
              <th 
                style={getHeaderStyle('lastName')} 
                onClick={() => onSort('lastName')}
                title="Sort by Last Name"
              >
                Last Name {renderSortIndicator('lastName')}
              </th>
              <th 
                style={getHeaderStyle('email')} 
                onClick={() => onSort('email')}
                title="Sort by Email Address"
              >
                Email {renderSortIndicator('email')}
              </th>
              <th 
                style={getHeaderStyle('department')} 
                onClick={() => onSort('department')}
                title="Sort by Department"
              >
                Department {renderSortIndicator('department')}
              </th>
              <th style={{ width: '120px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Grid Layout */}
      <div className="user-cards-grid">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
