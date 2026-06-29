import React from 'react';

// Department color styling helper class mapping
const getDeptBadgeClass = (dept) => {
  const normalized = (dept || '').toLowerCase();
  switch (normalized) {
    case 'engineering':
      return 'badge badge-dept-engineering';
    case 'product':
      return 'badge badge-dept-product';
    case 'design':
      return 'badge badge-dept-design';
    case 'marketing':
      return 'badge badge-dept-marketing';
    case 'sales':
      return 'badge badge-dept-sales';
    case 'hr':
    case 'human resources':
      return 'badge badge-dept-hr';
    default:
      return 'badge badge-dept'; // default fallback
  }
};

/**
 * UserRow: Table row component for desktop screens.
 */
export function UserRow({ user, onEdit, onDelete }) {
  return (
    <tr className="animate-fade-in" style={{ borderBottom: '1px solid var(--border-color)' }}>
      <td style={{ fontWeight: 600, color: 'var(--text-muted)', width: '60px' }}>#{user.id}</td>
      <td style={{ fontWeight: 500 }}>{user.firstName}</td>
      <td style={{ fontWeight: 500 }}>{user.lastName}</td>
      <td style={{ color: 'var(--text-secondary)' }}>{user.email}</td>
      <td>
        <span className={getDeptBadgeClass(user.department)}>
          {user.department}
        </span>
      </td>
      <td>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {/* Edit Button */}
          <button
            onClick={() => onEdit(user)}
            className="btn-icon"
            title="Edit User"
            style={{ color: 'var(--accent-color)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path>
            </svg>
          </button>
          
          {/* Delete Button */}
          <button
            onClick={() => onDelete(user.id)}
            className="btn-icon btn-icon-danger"
            title="Delete User"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

/**
 * UserCard: Card component for small screens (mobile viewports).
 */
export function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="glass-panel animate-scale-in" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative' }}>
      
      {/* Header section of mobile card */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>#{user.id}</span>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.15rem' }}>
            {user.firstName} {user.lastName}
          </h3>
        </div>
        <span className={getDeptBadgeClass(user.department)}>
          {user.department}
        </span>
      </div>

      {/* Info details */}
      <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span style={{ wordBreak: 'break-all' }}>{user.email}</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
        <button
          onClick={() => onEdit(user)}
          className="btn btn-secondary btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.35rem 0.75rem' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path>
          </svg>
          Edit
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="btn btn-danger btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.35rem 0.75rem' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}
