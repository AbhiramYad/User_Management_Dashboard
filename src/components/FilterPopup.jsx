import React, { useState, useEffect } from 'react';
import { DEPARTMENTS } from '../utils/constants';

export default function FilterPopup({ isOpen, onClose, onApply, onReset, currentFilters }) {
  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  });

  // Keep local state in sync with current global filters when modal opens
  useEffect(() => {
    if (isOpen) {
      setFilters({
        firstName: currentFilters.firstName || '',
        lastName: currentFilters.lastName || '',
        email: currentFilters.email || '',
        department: currentFilters.department || ''
      });
    }
  }, [isOpen, currentFilters]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApply = (e) => {
    e.preventDefault();
    onApply(filters);
    onClose();
  };

  const handleResetClick = () => {
    const cleared = { firstName: '', lastName: '', email: '', department: '' };
    setFilters(cleared);
    onReset();
    onClose();
  };

  return (
    <>
      {/* Click-outside backdrop to close popup */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 40,
          background: 'transparent'
        }}
      />
      
      {/* Filter popup container */}
      <div 
        className="glass-panel animate-scale-in"
        style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '0.75rem',
          width: '320px',
          padding: '1.5rem',
          zIndex: 50,
          backgroundColor: 'var(--bg-secondary)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Advanced Filters</h3>
          <button 
            type="button" 
            onClick={handleResetClick}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-color)',
              fontSize: '0.8rem',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            Reset Filters
          </button>
        </div>

        <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* First Name Filter */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="e.g. Leanne"
              className="form-input"
              value={filters.firstName}
              onChange={handleChange}
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.9rem' }}
            />
          </div>

          {/* Last Name Filter */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="e.g. Graham"
              className="form-input"
              value={filters.lastName}
              onChange={handleChange}
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.9rem' }}
            />
          </div>

          {/* Email Filter */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Email Contains</label>
            <input
              type="text"
              name="email"
              placeholder="e.g. @biz"
              className="form-input"
              value={filters.email}
              onChange={handleChange}
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.9rem' }}
            />
          </div>

          {/* Department Filter */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Department</label>
            <select
              name="department"
              className="form-input"
              value={filters.department}
              onChange={handleChange}
              style={{ 
                padding: '0.5rem 0.75rem', 
                fontSize: '0.9rem',
                backgroundColor: 'var(--bg-primary)'
              }}
            >
              <option value="">All Departments</option>
              {DEPARTMENTS.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm" 
              onClick={onClose}
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary btn-sm"
              style={{ flex: 1 }}
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
