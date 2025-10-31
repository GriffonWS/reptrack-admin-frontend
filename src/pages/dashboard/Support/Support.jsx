import React, { useState, useEffect } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import './Support.css';
import { getAllSupportQueries } from '../../../services/support/supportService';
import Loader from '../../../components/Loader/Loader';

const Support = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSupportQueries();
  }, []);

  const loadSupportQueries = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getAllSupportQueries();

      if (response.success && response.data) {
        // Reverse to show newest first
        setQueries(response.data.reverse());
      } else {
        setError('Failed to load support queries');
      }
    } catch (err) {
      console.error('Error loading support queries:', err);
      setError(err.message || 'Failed to load support queries');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="support__wrapper">
      <div className="support__container">
        {/* Header */}
        <div className="support__header">
          <div className="support__header-left">
            <h1 className="support__title">Communication and Support</h1>
            <p className="support__subtitle">Total: {queries.length} queries</p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="support__error-message">
            {error}
          </div>
        )}

        {/* Table Card */}
        <div className="support__table-card">
          <h4 className="support__table-title">Communication and Support List</h4>

          <div className="support__table-wrapper">
            {/* Desktop Table */}
            <div className="support__desktop-table">
              <table className="support__table">
                <thead>
                  <tr>
                    <th>S no</th>
                    <th>Email</th>
                    <th>Unique ID</th>
                    <th>Query</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {queries.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="support__no-data">
                        No support queries found
                      </td>
                    </tr>
                  ) : (
                    queries.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.email || '-'}</td>
                        <td>{item.senderId || '-'}</td>
                        <td className="support__query-cell">{item.query || '-'}</td>
                        <td>
                          <a
                            href={`mailto:${item.email}`}
                            className="support__reply-btn"
                          >
                            <AiOutlineMail size={16} />
                            Reply
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="support__mobile-cards">
              {queries.length === 0 ? (
                <div className="support__no-data-mobile">
                  No support queries found
                </div>
              ) : (
                queries.map((item, index) => (
                  <div key={item.id} className="support__card">
                    <div className="support__card-header">
                      <span className="support__card-number">#{index + 1}</span>
                      <span className="support__card-id">{item.senderId || '-'}</span>
                    </div>
                    <div className="support__card-body">
                      <div className="support__card-row">
                        <span className="support__card-label">Email:</span>
                        <span className="support__card-value">{item.email || '-'}</span>
                      </div>
                      <div className="support__card-row">
                        <span className="support__card-label">Query:</span>
                        <span className="support__card-value">{item.query || '-'}</span>
                      </div>
                    </div>
                    <a
                      href={`mailto:${item.email}`}
                      className="support__card-btn"
                    >
                      <AiOutlineMail size={16} />
                      Reply via Email
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
