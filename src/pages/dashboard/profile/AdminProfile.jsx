import React, { useState, useEffect } from 'react';
import { FiEdit, FiMail, FiPhone, FiMapPin, FiUser } from 'react-icons/fi';
import './AdminProfile.css';
import { Link } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';

const AdminProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        setLoading(true);

        // TODO: Replace with actual API call to fetch admin profile
        // const response = await getAdminByToken();

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data for testing
        const mockProfile = {
          adminName: 'Admin User',
          email: 'admin@reptrack.com',
          phoneNumber: '+1 (555) 999-8888',
          role: 'Super Administrator',
          department: 'Management',
          joinDate: '2024-01-01',
          profileImage: null,
          active: true
        };

        setProfileData(mockProfile);
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

  // Avatar
  const avatarUrl = profileData.profileImage
    ? profileData.profileImage
    : `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.adminName || 'Admin'}`;

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
            <img src={avatarUrl} alt="Profile" className="myprofile__avatar" />
            <div className="myprofile__header-info">
              <h2 className="myprofile__header-name">{profileData.adminName}</h2>
              <p className="myprofile__header-role">{profileData.role}</p>
              <div className="myprofile__header-location">
                <FiMail size={16} />
                <span>{profileData.email}</span>
              </div>
            </div>
          </div>
          <div className="myprofile__status-badge">
            <span className={`myprofile__badge myprofile__badge--${profileData.active ? 'active' : 'inactive'}`}>
              {profileData.active ? 'Active' : 'Inactive'}
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
              <label className="myprofile__info-label">Full Name</label>
              <p className="myprofile__info-value">{profileData.adminName || '-'}</p>
            </div>

            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Email Address</label>
              <p className="myprofile__info-value">
                <FiMail size={14} style={{ marginRight: '5px' }} />
                {profileData.email || '-'}
              </p>
            </div>

            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Phone Number</label>
              <p className="myprofile__info-value">
                <FiPhone size={14} style={{ marginRight: '5px' }} />
                {profileData.phoneNumber || '-'}
              </p>
            </div>

            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Role</label>
              <p className="myprofile__info-value">
                <FiUser size={14} style={{ marginRight: '5px' }} />
                {profileData.role || '-'}
              </p>
            </div>

            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Department</label>
              <p className="myprofile__info-value">{profileData.department || '-'}</p>
            </div>

            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Join Date</label>
              <p className="myprofile__info-value">{profileData.joinDate || '-'}</p>
            </div>

            <div className="myprofile__info-item">
              <label className="myprofile__info-label">Account Status</label>
              <p className="myprofile__info-value">
                <span className={`myprofile__badge myprofile__badge--${profileData.active ? 'active' : 'inactive'}`}>
                  {profileData.active ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
