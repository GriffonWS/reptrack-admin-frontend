import React, { useState, useEffect } from 'react';
import {
  FiArrowLeft,
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiEdit,
  FiTrash
} from 'react-icons/fi';
import './Profile.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';
import { getGymOwnerById, deleteGymOwner } from '../../../services/gymOwner/gymOwnerService';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchOwnerDetails();
    }
  }, [id]);

  const fetchOwnerDetails = async () => {
    try {
      setIsLoading(true);
      setError('');

      console.log('Fetching gym owner with ID:', id);
      const response = await getGymOwnerById(id);
      console.log('Response received:', response);

      if (response.success && response.data) {
        setSelectedOwner(response.data);
      } else {
        setError(response.message || 'Failed to fetch gym owner details');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch gym owner details');
      console.error('Error fetching gym owner details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/dashboard/all_owners');
  };

  const handleDelete = async () => {
    if (!selectedOwner) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedOwner.ownerName}? This action cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      setIsLoading(true);

      const response = await deleteGymOwner(selectedOwner.id);

      if (response.success) {
        alert('Gym owner deleted successfully');
        navigate('/dashboard/all_owners');
      } else {
        alert(response.message || 'Failed to delete gym owner');
      }
    } catch (err) {
      alert(err.message || 'Failed to delete gym owner');
      console.error('Error deleting gym owner:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="profile__wrapper">
        <Loader />
      </div>
    );
  }

  if (error || !selectedOwner) {
    return (
      <div className="profile__wrapper">
        <button className="profile__back-btn" onClick={handleBack}>
          <FiArrowLeft size={20} />
          Back
        </button>
        <div style={{
          padding: '20px',
          backgroundColor: '#fff5f5',
          color: '#c53030',
          border: '1px solid #fc8181',
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          {error || 'Gym owner not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="profile__wrapper">
      {/* Back Button */}
      <button className="profile__back-btn" onClick={handleBack}>
        <FiArrowLeft size={20} />
        Back
      </button>

      {/* Header Card */}
      <div className="profile__header">
        <div className="profile__header-left">
          <div className="profile__avatar">
            {selectedOwner.profileImage ? (
              <img src={selectedOwner.profileImage} alt="Profile" />
            ) : (
              <FiUser size={48} />
            )}
          </div>
          <div className="profile__header-info">
            <h1 className="profile__name">
              {selectedOwner.ownerName}
            </h1>
            <p className="profile__member-id">ID: {selectedOwner.uniqueId}</p>
            <p className="profile__gym-name">Gym: {selectedOwner.gymName}</p>
          </div>
        </div>
        <div className="profile__header-right">
          {selectedOwner.gymLogo && (
            <div className="profile__gym-logo">
              <img src={selectedOwner.gymLogo} alt="Gym Logo" />
            </div>
          )}
        </div>
        <div className="profile__header-actions">
          <Link to={`/dashboard/all_owners/${selectedOwner.id}/edit`} className="profile__btn profile__btn--edit" style={{textDecoration:"none"}}>
            <FiEdit size={18} />
            Edit
          </Link>
          <button className="profile__btn profile__btn--delete" onClick={handleDelete}>
            <FiTrash size={18} />
            Delete
          </button>
        </div>
      </div>

      {/* Contact Information */}
      <div className="profile__section">
        <h3 className="profile__section-title">Contact Information</h3>
        <div className="profile__info-grid">
          <div className="profile__info-item">
            <div className="profile__info-icon">
              <FiPhone size={20} />
            </div>
            <div className="profile__info-content">
              <label className="profile__info-label">Phone Number</label>
              <p className="profile__info-value">{selectedOwner.phoneNumber || '—'}</p>
            </div>
          </div>
          <div className="profile__info-item">
            <div className="profile__info-icon">
              <FiMail size={20} />
            </div>
            <div className="profile__info-content">
              <label className="profile__info-label">Email Address</label>
              <p className="profile__info-value">{selectedOwner.email || '—'}</p>
            </div>
          </div>
          <div className="profile__info-item">
            <div className="profile__info-icon">
              <FiMapPin size={20} />
            </div>
            <div className="profile__info-content">
              <label className="profile__info-label">Address</label>
              <p className="profile__info-value">{selectedOwner.address || '—'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Information */}
      <div className="profile__section">
        <h3 className="profile__section-title">Subscription Information</h3>
        <div className="profile__info-grid">
          <div className="profile__info-item">
            <div className="profile__info-icon">
              <FiUser size={20} />
            </div>
            <div className="profile__info-content">
              <label className="profile__info-label">Subscription Type</label>
              <p className="profile__info-value">{selectedOwner.subscriptionType || '—'}</p>
            </div>
          </div>
          <div className="profile__info-item">
            <div className="profile__info-icon">
              <FiUser size={20} />
            </div>
            <div className="profile__info-content">
              <label className="profile__info-label">Registration Date</label>
              <p className="profile__info-value">{selectedOwner.createdAt ? new Date(selectedOwner.createdAt).toLocaleDateString() : '—'}</p>
            </div>
          </div>
          <div className="profile__info-item">
            <div className="profile__info-icon">
              <FiUser size={20} />
            </div>
            <div className="profile__info-content">
              <label className="profile__info-label">Account Status</label>
              <p className="profile__info-value">
                <span className={`profile__status profile__status--${selectedOwner.active ? 'active' : 'inactive'}`}>
                  {selectedOwner.active ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
