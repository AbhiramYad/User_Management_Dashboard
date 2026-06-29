import React from 'react';

export default function Pagination({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Determine showing range strings
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(totalItems, currentPage * pageSize);

  // Generate page numbers to show in navigation controls
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div 
      className="glass-panel animate-fade-in" 
      style={{ 
        padding: '1rem 1.5rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '1rem',
        marginTop: '0.5rem'
      }}
    >
      {/* Items per Page selector & description info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Show:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="form-input"
            style={{
              padding: '0.35rem 2rem 0.35rem 0.75rem',
              fontSize: '0.85rem',
              height: '34px',
              backgroundColor: 'var(--bg-primary)',
              cursor: 'pointer'
            }}
          >
            {[10, 25, 50, 100].map(limit => (
              <option key={limit} value={limit}>{limit} per page</option>
            ))}
          </select>
        </div>
        
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Showing <strong style={{ color: 'var(--text-primary)' }}>{startItem}</strong> - <strong style={{ color: 'var(--text-primary)' }}>{endItem}</strong> of <strong style={{ color: 'var(--text-primary)' }}>{totalItems}</strong> entries
        </span>
      </div>

      {/* Page Navigation Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        {/* First page button */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.35rem 0.65rem', minWidth: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          title="First Page"
        >
          &laquo;
        </button>

        {/* Previous page button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.35rem 0.65rem', minWidth: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          title="Previous Page"
        >
          &lsaquo;
        </button>

        {/* Dynamic page numbers */}
        {getPageNumbers().map(pageNum => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className="btn btn-sm"
            style={{
              padding: '0.35rem 0.65rem',
              minWidth: '34px',
              height: '34px',
              backgroundColor: currentPage === pageNum ? 'var(--accent-color)' : 'var(--bg-surface)',
              color: currentPage === pageNum ? '#fff' : 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              fontWeight: currentPage === pageNum ? 700 : 500
            }}
          >
            {pageNum}
          </button>
        ))}

        {/* Next page button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.35rem 0.65rem', minWidth: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          title="Next Page"
        >
          &rsaquo;
        </button>

        {/* Last page button */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.35rem 0.65rem', minWidth: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          title="Last Page"
        >
          &raquo;
        </button>
      </div>
    </div>
  );
}
