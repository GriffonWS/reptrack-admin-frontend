import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai';
import {
  MdChevronLeft,
  MdChevronRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import '../Gym-owner/AllOwner.css';
import { Link } from 'react-router-dom';
import { getAllGymOwners } from '../../../services/gymOwner/gymOwnerService';
import Loader from '../../../components/Loader/Loader';

const AllOwner = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch gym owners on component mount
  useEffect(() => {
    fetchGymOwners();
  }, []);

  const fetchGymOwners = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getAllGymOwners();

      if (response.success && response.data) {
        setOwners(response.data);
      } else {
        setError('Failed to fetch gym owners');
      }
    } catch (err) {
      console.error('Error fetching gym owners:', err);
      setError(err.message || 'Failed to fetch gym owners');
    } finally {
      setLoading(false);
    }
  };

  // Filter search and sort by creation date (most recent first)
  const filteredOwners = owners
    .filter((owner) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        owner.ownerName?.toLowerCase().includes(searchLower) ||
        owner.email?.toLowerCase().includes(searchLower) ||
        owner.gymName?.toLowerCase().includes(searchLower) ||
        owner.uniqueId?.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      // Sort by createdAt or timestamp in descending order (newest first)
      const dateA = new Date(a.createdAt || a.timestamp || 0);
      const dateB = new Date(b.createdAt || b.timestamp || 0);
      return dateB - dateA;
    });

  const totalOwners = filteredOwners.length;
  const totalPages = Math.ceil(totalOwners / itemsPerPage);
  const paginatedOwners = filteredOwners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Show loader while fetching
  if (loading) {
    return <Loader />;
  }

  // Show error message if fetch failed
  if (error) {
    return (
      <div className="users__container">
        <div className="users__wrapper">
          <div className="users__error-message">
            <p>{error}</p>
            <button onClick={fetchGymOwners} className="users__retry-btn">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="users__container">
      <div className="users__wrapper">
        {/* Header */}
        <div className="users__header">
          <div className="users__header-content">
            <h1 className="users__title">All Gym Owners</h1>
            <p className="users__subtitle">Total: {totalOwners} owners</p>
          </div>
          <Link to="/dashboard/register_owner" className="users__add-btn" style={{ textDecoration: 'none' }}>
            <AiOutlinePlus size={20} />
            Add Gym Owner
          </Link>
        </div>

        {/* Search */}
        <div className="users__search-box">
          <div className="users__search-wrapper">
            <AiOutlineSearch className="users__search-icon" />
            <input
              type="text"
              placeholder="Search by name, email, gym name, or unique ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="users__search-input"
            />
          </div>
        </div>

        {/* Table */}
        <div className="users__table-wrapper">
          <div className="users__desktop-table">
            <table className="users__table">
              <thead>
                <tr>
                  <th>S no</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gym Name</th>
                  <th>Unique ID</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOwners.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="users__no-data">
                      {searchTerm ? 'No gym owners found matching your search' : 'No gym owners found'}
                    </td>
                  </tr>
                ) : (
                  paginatedOwners.map((owner, index) => (
                    <tr key={owner.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>
                        <div className="users__name-cell">
                          <div className="users__avatar">
                            <span>
                              {owner.ownerName?.split(' ')[0]?.charAt(0) || 'G'}
                              {owner.ownerName?.split(' ')[1]?.charAt(0) || 'O'}
                            </span>
                          </div>
                          <span className="users__name">{owner.ownerName || '-'}</span>
                        </div>
                      </td>
                      <td>{owner.email || '-'}</td>
                      <td>{owner.gymName || '-'}</td>
                      <td className="users__member-id">{owner.uniqueId || '-'}</td>
                      <td>
                        <span className={`users__badge users__badge--${owner.active ? 'active' : 'inactive'}`}>
                          {owner.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <Link
                          to={`/dashboard/all_owners/${owner.id}`}
                          className="users__action-btn"
                          style={{ textDecoration: 'none' }}
                        >
                          <AiOutlineEye size={16} />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="users__mobile-cards">
            {paginatedOwners.length === 0 ? (
              <div className="users__no-data-mobile">
                {searchTerm ? 'No gym owners found matching your search' : 'No gym owners found'}
              </div>
            ) : (
              paginatedOwners.map((owner) => (
                <div key={owner.id} className="users__card">
                  <div className="users__card-header">
                    <div className="users__card-info">
                      <div className="users__avatar">
                        <span>
                          {owner.ownerName?.split(' ')[0]?.charAt(0) || 'G'}
                          {owner.ownerName?.split(' ')[1]?.charAt(0) || 'O'}
                        </span>
                      </div>
                      <div>
                        <h3 className="users__card-name">{owner.ownerName || '-'}</h3>
                        <p className="users__card-id">{owner.uniqueId || '-'}</p>
                      </div>
                    </div>
                    <span className={`users__badge users__badge--${owner.active ? 'active' : 'inactive'}`}>
                      {owner.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="users__card-body">
                    <div className="users__card-row">
                      <span className="users__card-label">Email:</span>
                      <span className="users__card-value">{owner.email || '-'}</span>
                    </div>
                    <div className="users__card-row">
                      <span className="users__card-label">Gym Name:</span>
                      <span className="users__card-value">{owner.gymName || '-'}</span>
                    </div>
                  </div>

                  <Link to={`/dashboard/all_owners/${owner.id}`} className="users__card-btn" style={{textDecoration:"none"}}>
                    <AiOutlineEye size={16} />
                    View Profile
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="users__pagination">
            <div className="users__pagination-info">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, totalOwners)} of {totalOwners} entries
            </div>

            <div className="users__pagination-controls">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="users__pagination-btn"
              >
                <MdKeyboardDoubleArrowLeft />
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="users__pagination-btn"
              >
                <MdChevronLeft />
              </button>
              <span className="users__pagination-page">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="users__pagination-btn"
              >
                <MdChevronRight />
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="users__pagination-btn"
              >
                <MdKeyboardDoubleArrowRight />
              </button>
            </div>

            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="users__items-select"
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOwner;
