import React, { useState, useEffect } from 'react';
import { FiUpload, FiSave, FiArrowLeft } from 'react-icons/fi';
import './EditOwner.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getGymOwnerById, updateGymOwnerById } from '../../../services/gymOwner/gymOwnerService';
import Loader from '../../../components/Loader/Loader';

const EditOwner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gymName: '',
    ownerName: '',
    email: '',
    phoneNumber: '',
    address: '',
    active: true,
    subscriptionType: 'Monthly',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [gymLogo, setGymLogo] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [gymLogoPreview, setGymLogoPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch gym owner data on mount
  useEffect(() => {
    if (id) {
      fetchGymOwnerData();
    }
  }, [id]);

  const fetchGymOwnerData = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getGymOwnerById(id);

      if (response.success && response.data) {
        const data = response.data;
        setFormData({
          gymName: data.gymName || '',
          ownerName: data.ownerName || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
          address: data.address || '',
          active: data.active ?? true,
          subscriptionType: data.subscriptionType || 'Monthly',
        });
        // Set existing images as previews
        setProfilePreview(data.profileImage || null);
        setGymLogoPreview(data.gymLogo || null);
      } else {
        setError('Failed to fetch gym owner data');
      }
    } catch (err) {
      console.error('Error fetching gym owner:', err);
      setError(err.message || 'Failed to fetch gym owner data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, setImage, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append('gymName', formData.gymName);
      formDataToSend.append('ownerName', formData.ownerName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('active', formData.active);
      formDataToSend.append('subscriptionType', formData.subscriptionType);

      // Append images if they exist
      if (profileImage) {
        formDataToSend.append('profile_image', profileImage);
      }
      if (gymLogo) {
        formDataToSend.append('gym_logo', gymLogo);
      }

      // Call API to update gym owner
      const response = await updateGymOwnerById(id, formDataToSend);

      if (response.success) {
        setSuccess('Gym owner updated successfully!');
        setTimeout(() => {
          navigate(`/dashboard/all_owners/${id}`);
        }, 1500);
      } else {
        setError(response.message || 'Failed to update gym owner');
      }
    } catch (err) {
      console.error('Error updating gym owner:', err);
      setError(err.message || 'Failed to update gym owner');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="editowner__container">
      <div className="editowner__wrapper">
        {/* Header */}
        <div className="editowner__header">
          <Link to={`/dashboard/all_owners/${id}`} className="editowner__back-btn" style={{textDecoration:"none"}}>
            <FiArrowLeft size={18} />
            <span>Back</span>
          </Link>
          <h1 className="editowner__title">Edit Gym Owner</h1>
          <p className="editowner__subtitle">Update existing owner details below</p>
        </div>

        {/* Error & Success Messages */}
        {error && (
          <div className="editowner__error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="editowner__success-message">
            {success}
          </div>
        )}

        {/* Form */}
        <form className="editowner__form" onSubmit={handleSubmit}>
          <div className="editowner__grid">
            {/* Profile Image */}
            <div className="editowner__form-group">
              <label className="editowner__label">Profile Image</label>
              <label className="editowner__file-input">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setProfileImage, setProfilePreview)}
                  className="editowner__file-hidden"
                />
                <div className="editowner__file-label">
                  <FiUpload size={20} />
                  <span>Change Profile Image</span>
                </div>
              </label>
              {profilePreview && (
                <div className="editowner__image-preview">
                  <img src={profilePreview} alt="Profile Preview" />
                </div>
              )}
            </div>

            {/* Gym Logo */}
            <div className="editowner__form-group">
              <label className="editowner__label">Gym Logo</label>
              <label className="editowner__file-input">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setGymLogo, setGymLogoPreview)}
                  className="editowner__file-hidden"
                />
                <div className="editowner__file-label">
                  <FiUpload size={20} />
                  <span>Change Gym Logo</span>
                </div>
              </label>
              {gymLogoPreview && (
                <div className="editowner__image-preview">
                  <img src={gymLogoPreview} alt="Gym Logo Preview" />
                </div>
              )}
            </div>

            {/* Gym Name */}
            <div className="editowner__form-group">
              <label className="editowner__label">Gym Name</label>
              <input
                type="text"
                name="gymName"
                value={formData.gymName || ''}
                onChange={handleChange}
                className="editowner__input"
              />
            </div>

            {/* Owner Name */}
            <div className="editowner__form-group">
              <label className="editowner__label">Owner Name</label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName || ''}
                onChange={handleChange}
                className="editowner__input"
              />
            </div>

            {/* Email */}
            <div className="editowner__form-group">
              <label className="editowner__label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="editowner__input"
              />
            </div>

            {/* Phone Number */}
            <div className="editowner__form-group">
              <label className="editowner__label">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber || ''}
                onChange={handleChange}
                className="editowner__input"
              />
            </div>

            {/* Address */}
            <div className="editowner__form-group editowner__form-group--fullwidth">
              <label className="editowner__label">Address</label>
              <textarea
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                className="editowner__input"
                rows="3"
              />
            </div>

            {/* Active Status */}
            <div className="editowner__form-group">
              <label className="editowner__label">Status</label>
              <select
                name="active"
                value={formData.active ?? true}
                onChange={(e) => handleChange({ target: { name: 'active', value: e.target.value === 'true' }})}
                className="editowner__input"
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>

            {/* Subscription Type */}
            <div className="editowner__form-group">
              <label className="editowner__label">Subscription Type</label>
              <select
                name="subscriptionType"
                value={formData.subscriptionType || 'Monthly'}
                onChange={handleChange}
                className="editowner__input"
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="editowner__actions">
            <button
              type="button"
              className="editowner__btn editowner__btn--secondary"
              onClick={() => navigate(`/dashboard/all_owners/${id}`)}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="editowner__btn editowner__btn--primary"
              disabled={saving}
            >
              {saving ? 'Saving...' : <><FiSave size={18} /> Save Changes</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOwner;
