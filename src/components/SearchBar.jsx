import React, { useState } from 'react';
import FilterPopup from './FilterPopup';

export default function SearchBar({
  searchQuery,
  onSearchChange,
  currentFilters,
  onApplyFilters,
  onResetFilters,
  onClearSingleFilter
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Count active advanced filters
  const activeFiltersCount = Object.keys(currentFilters).reduce((count, key) => {
    return currentFilters[key] ? count + 1 : count;
  }, 0);

  const hasAnyFilters = searchQuery || activeFiltersCount > 0;

  // Clear all fields (search and filters)
  const handleClearAll = () => {
    onSearchChange('');
    onResetFilters();
  };

  const getFilterPillLabel = (key, value) => {
    switch (key) {
      case 'firstName': return `First Name: ${value}`;
      case 'lastName': return `Last Name: ${value}`;
      case 'email': return `Email: ${value}`;
      case 'department': return `Dept: ${value}`;
      default: return `${key}: ${value}`;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
      <div 
        className="glass-panel animate-fade-in" 
        style={{ 
          padding: '1rem', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem', 
          position: 'relative' 
        }}
      >
        {/* Search Icon & Text Input */}
        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ position: 'absolute', left: '1rem', color: 'var(--text-muted)' }}
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search users by name or email..."
            className="form-input"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{ 
              width: '100%', 
              paddingLeft: '3rem', 
              backgroundColor: 'rgba(11, 15, 25, 0.4)',
              border: '1px solid var(--border-color)',
              height: '44px'
            }}
          />
        </div>

        {/* Filter Popup Button */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="btn btn-secondary"
            style={{ 
              height: '44px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              borderColor: activeFiltersCount > 0 ? 'var(--accent-color)' : 'var(--border-color)',
              backgroundColor: activeFiltersCount > 0 ? 'rgba(99, 102, 241, 0.05)' : 'var(--bg-surface)'
            }}
            id="btn-filter-toggle"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <span style={{ display: 'none', md: 'inline' }}>Filters</span>
            {activeFiltersCount > 0 && (
              <span style={{
                background: 'var(--accent-gradient)',
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                padding: '0.1rem 0.4rem',
                borderRadius: '50px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '18px',
                height: '18px'
              }}>
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Absolute Dropdown Popup */}
          <FilterPopup
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onApply={onApplyFilters}
            onReset={onResetFilters}
            currentFilters={currentFilters}
          />
        </div>

        {/* Clear All Shortcut Button */}
        {hasAnyFilters && (
          <button
            onClick={handleClearAll}
            className="btn btn-secondary"
            style={{ 
              height: '44px',
              padding: '0 1rem',
              color: 'var(--error-color)',
              borderColor: 'rgba(244, 63, 94, 0.15)',
              backgroundColor: 'rgba(244, 63, 94, 0.02)'
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Active Filter Pills Indicators */}
      {activeFiltersCount > 0 && (
        <div 
          className="animate-fade-in"
          style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            flexWrap: 'wrap', 
            alignItems: 'center', 
            padding: '0 0.5rem' 
          }}
        >
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Active Filters:</span>
          {Object.entries(currentFilters).map(([key, value]) => {
            if (!value) return null;
            return (
              <div 
                key={key}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.25rem 0.65rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)'
                }}
              >
                <span>{getFilterPillLabel(key, value)}</span>
                <button
                  type="button"
                  onClick={() => onClearSingleFilter(key)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.1rem',
                    fontSize: '0.9rem'
                  }}
                  title="Remove Filter"
                  className="btn-icon-danger"
                >
                  &times;
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
