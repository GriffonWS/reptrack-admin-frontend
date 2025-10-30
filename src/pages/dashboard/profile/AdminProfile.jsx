import React, { useState, useEffect } from 'react';
import { FiEdit, FiMail, FiPhone, FiMapPin, FiUser } from 'react-icons/fi';
import './AdminProfile.css';
import { Link } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';
import { getAdminByToken } from '../../../services/auth/authService';

const AdminProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        setLoading(true);
        const response = await getAdminByToken();

        if (response.success && response.data) {
          setProfileData(response.data);
        } else {
          setError(response.message || 'Failed to fetch profile');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching profile');
        console.error('Error fetching admin profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="myprofile__wrapper">
        <div className="myprofile__container">
          <div className="myprofile__error">{error}</div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="myprofile__wrapper">
        <div className="myprofile__container">
          <div className="myprofile__error">No profile data available</div>
        </div>
      </div>
    );
  }

  // Avatar - Generate initials from first and last name
  const getInitials = () => {
    const first = profileData.firstName?.[0] || '';
    const last = profileData.lastName?.[0] || '';
    return (first + last).toUpperCase() || 'AD';
  };

  const fullName = `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim() || 'Admin User';

  return (
    <div className="myprofile__wrapper">
      <div className="myprofile__container">
        {/* Title */}
        <div className="myprofile__header">
          <h1 className="myprofile__title">My Profile</h1>
          <p className="myprofile__subtitle">View and manage your administrator profile</p>
        </div>

        {/* Header Card */}
        <div className="myprofile__header-card">
          <div className="myprofile__header-content">
            <div className="myprofile__avatar">
              {getInitials()}
            </div>
            <div className="myprofile__header-info">
              <h2 className="myprofile__header-name">{fullName}</h2>
              <p className="myprofile__header-role">{profileData.role || 'Administrator'}</p>
              <div className="myprofile__header-location">
                <FiMail size={16} />
                <span>{profileData.email}</span>
              </div>
            </div>
          </div>
          <div className="myprofile__status-badge">
            <span className="myprofile__badge myprofile__badge--active">
              Active
            </span>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="myprofile__section-card">
          <div className="myprofile__section-header">
            <h3 className="myprofile__section-title">Personal Information</h3>
            <Link to="/dashboard/profile/edit" className="myprofile__edit-btn" style={{ textDecoration: "none" }}>
              <FiEdit size={18} />
              Edit Profile
            </Link>
          </div>

          <div className="myprofile__info-grid">
            <div className="myprofile__info-item">
              <label className="myprofile__info-label">First Name</label>
              <p className="myprofile__info-value">{profileData.firstName || '-'}</p>
            </div>

            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Last Name</label>
              <p className="myprofile__info-value">{profileData.lastName || '-'}</p>
            </div>

            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Email Address</label>
              <p className="myprofile__info-value">
                <FiMail size={14} style={{ marginRight: '5px' }} />
                {profileData.email || '-'}
              </p>
            </div>

            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Role</label>
              <p className="myprofile__info-value">
                <FiUser size={14} style={{ marginRight: '5px' }} />
                {profileData.role || 'admin'}
              </p>
            </div>

            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Admin ID</label>
              <p className="myprofile__info-value">{profileData.id || '-'}</p>
            </div>

            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Registration Date</label>
              <p className="myprofile__info-value">
                {profileData.timestamp ? new Date(profileData.timestamp).toLocaleDateString() : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
