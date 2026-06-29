import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import UserTable from './components/UserTable';
import Pagination from './components/Pagination';
import { getUsers } from './api/userService';
import { mapUserData } from './utils/helpers';

export default function App() {
  // --- Core State Variables ---
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Search & Advanced Filters State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  });

  // --- Sorting State ---
  const [sortField, setSortField] = useState('firstName');
  const [sortOrder, setSortOrder] = useState('asc');

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // --- Modal Handlers Placeholders (to be implemented in Steps 7 & 8) ---
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  // Fetch Users on initial mount
  useEffect(() => {
    fetchInitialUsers();
  }, []);

  const fetchInitialUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getUsers();
      // Map API array to local Dashboard schema
      const mapped = response.data.map((user, idx) => mapUserData(user, idx));
      setUsers(mapped);
    } catch (err) {
      console.error(err);
      setError("Failed to load users. Please check your network connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset pagination page to 1 when filters or search term change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({ firstName: '', lastName: '', email: '', department: '' });
    setCurrentPage(1);
  };

  const handleClearSingleFilter = (key) => {
    setFilters(prev => ({ ...prev, [key]: '' }));
    setCurrentPage(1);
  };

  // Sorting Handler
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Pagination Handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  // CRUD Trigger actions
  const handleAddUserClick = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleEditUserClick = (user) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteUserClick = (id) => {
    setUserIdToDelete(id);
    setIsDeleteOpen(true);
  };

  // --- Processing Engine (Filtering & Sorting) ---
  const processedUsers = useMemo(() => {
    let result = [...users];

    // 1. Text Search Box (matches firstName, lastName, or email)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(user => 
        (user.firstName || '').toLowerCase().includes(query) ||
        (user.lastName || '').toLowerCase().includes(query) ||
        (user.email || '').toLowerCase().includes(query)
      );
    }

    // 2. Advanced Filters Popup matching
    if (filters.firstName.trim()) {
      result = result.filter(user => 
        (user.firstName || '').toLowerCase().includes(filters.firstName.toLowerCase())
      );
    }
    if (filters.lastName.trim()) {
      result = result.filter(user => 
        (user.lastName || '').toLowerCase().includes(filters.lastName.toLowerCase())
      );
    }
    if (filters.email.trim()) {
      result = result.filter(user => 
        (user.email || '').toLowerCase().includes(filters.email.toLowerCase())
      );
    }
    if (filters.department) {
      result = result.filter(user => 
        (user.department || '').toLowerCase() === filters.department.toLowerCase()
      );
    }

    // 3. Sorting operation
    if (sortField) {
      result.sort((a, b) => {
        const valA = (a[sortField] || '').toString().toLowerCase();
        const valB = (b[sortField] || '').toString().toLowerCase();

        return sortOrder === 'asc' 
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      });
    }

    return result;
  }, [users, searchQuery, filters, sortField, sortOrder]);

  // --- Pagination Slice ---
  const totalItems = processedUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  
  // Guard current page boundaries if list shrinks
  const verifiedCurrentPage = currentPage > totalPages ? totalPages : currentPage;
  
  const paginatedUsers = useMemo(() => {
    const startIndex = (verifiedCurrentPage - 1) * pageSize;
    return processedUsers.slice(startIndex, startIndex + pageSize);
  }, [processedUsers, verifiedCurrentPage, pageSize]);

  return (
    <div className="app-container">
      {/* Dashboard Topbar */}
      <Header 
        totalUsers={users.length} 
        onAddClick={handleAddUserClick}
      />

      {/* Search and Filters */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        currentFilters={filters}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
        onClearSingleFilter={handleClearSingleFilter}
      />

      {/* Main Grid View */}
      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          <div className="shimmer-element" style={{ height: '54px' }}></div>
          <div className="shimmer-element" style={{ height: '350px' }}></div>
        </div>
      ) : error ? (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', borderColor: 'var(--error-border)', backgroundColor: 'var(--error-bg)' }}>
          <h3 style={{ color: 'var(--error-color)', fontWeight: 600, marginBottom: '0.5rem' }}>System Error</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{error}</p>
          <button onClick={fetchInitialUsers} className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }}>Retry Loading</button>
        </div>
      ) : (
        <>
          <UserTable
            users={paginatedUsers}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
            onEdit={handleEditUserClick}
            onDelete={handleDeleteUserClick}
          />

          {/* Navigation Controls */}
          {totalItems > 0 && (
            <Pagination
              currentPage={verifiedCurrentPage}
              pageSize={pageSize}
              totalItems={totalItems}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          )}
        </>
      )}

      {/* To be filled in Steps 7 & 8: */}
      {/* Form Modal for Add/Edit */}
      {/* Delete Confirmation Modal */}
    </div>
  );
}
