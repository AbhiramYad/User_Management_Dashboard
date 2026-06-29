import React, { useState, useEffect } from 'react';
import { DEPARTMENTS } from '../utils/constants';
import { validateUser } from '../utils/validators';

export default function UserForm({ isOpen, onClose, onSubmit, user = null, isSaving = false }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  });
  const [errors, setErrors] = useState({});

  // Reset form fields when modal opens/closes or user changes
  useEffect(() => {
    if (isOpen) {
      if (user) {
        setFormData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          department: user.department || ''
        });
      } else {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          department: ''
        });
      }
      setErrors({});
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error on type
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateUser(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Call parent handler with form details
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay animate-fade-in" style={{ zIndex: 100 }}>
      <div 
        className="modal-content glass-panel animate-scale-in"
        style={{
          border: '1px solid var(--border-color)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="btn-icon modal-close"
          title="Close Dialog"
          disabled={isSaving}
          id="btn-close-form"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Form Title */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
          {user ? 'Edit User Details' : 'Register New User'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* First Name Input */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="firstName">First Name <span style={{ color: 'var(--error-color)' }}>*</span></label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              className={`form-input ${errors.firstName ? 'error' : ''}`}
              disabled={isSaving}
              autoFocus
            />
            {errors.firstName && <span className="form-error-msg">{errors.firstName}</span>}
          </div>

          {/* Last Name Input */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="lastName">Last Name <span style={{ color: 'var(--error-color)' }}>*</span></label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              className={`form-input ${errors.lastName ? 'error' : ''}`}
              disabled={isSaving}
            />
            {errors.lastName && <span className="form-error-msg">{errors.lastName}</span>}
          </div>

          {/* Email Address Input */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="email">Email Address <span style={{ color: 'var(--error-color)' }}>*</span></label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. administrator@company.com"
              className={`form-input ${errors.email ? 'error' : ''}`}
              disabled={isSaving}
            />
            {errors.email && <span className="form-error-msg">{errors.email}</span>}
          </div>

          {/* Department Select Input */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="department">Department <span style={{ color: 'var(--error-color)' }}>*</span></label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`form-input ${errors.department ? 'error' : ''}`}
              disabled={isSaving}
              style={{ backgroundColor: 'var(--bg-primary)', cursor: 'pointer' }}
            >
              <option value="">-- Choose Department --</option>
              {DEPARTMENTS.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            {errors.department && <span className="form-error-msg">{errors.department}</span>}
          </div>

          {/* Modal Actions Footer */}
          <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '0.5rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSaving}
              style={{ minWidth: '100px' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSaving}
              style={{ minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              {isSaving ? (
                <>
                  <svg style={{ animation: 'spin 1s linear infinite', width: '16px', height: '16px', color: '#fff' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
      
      {/* Global CSS spinner rule inject */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
