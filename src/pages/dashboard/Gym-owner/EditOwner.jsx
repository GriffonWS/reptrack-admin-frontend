import React, { useState } from 'react';
import { FiUpload, FiSave, FiArrowLeft } from 'react-icons/fi';
import './EditOwner.css';
import { Link } from 'react-router-dom';


const EditOwner = () => {
  const [formData, setFormData] = useState({
    gymName: 'Muscle Factory',
    ownerName: 'Rahul Sharma',
    email: 'rahul@example.com',
    phoneNumber: '+91 9876543210',
    address: '123 Main Street, City',
    active: true,
    subscriptionType: 'Monthly',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [gymLogo, setGymLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      console.log('Updated owner details:', formData);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="editowner__container">
      <div className="editowner__wrapper">
        {/* Header */}
        <div className="editowner__header">
          <Link to="/dashboard" className="editowner__back-btn" style={{textDecoration:"none"}}>
            <FiArrowLeft size={18} />
            <span>Back</span>
          </Link>
          <h1 className="editowner__title">Edit Gym Owner</h1>
          <p className="editowner__subtitle">Update existing owner details below</p>
        </div>

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
                  onChange={(e) => handleImageChange(e, setProfileImage)}
                  className="editowner__file-hidden"
                />
                <div className="editowner__file-label">
                  <FiUpload size={20} />
                  <span>Change Profile Image</span>
                </div>
              </label>
            </div>

            {/* Gym Logo */}
            <div className="editowner__form-group">
              <label className="editowner__label">Gym Logo</label>
              <label className="editowner__file-input">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setGymLogo)}
                  className="editowner__file-hidden"
                />
                <div className="editowner__file-label">
                  <FiUpload size={20} />
                  <span>Change Gym Logo</span>
                </div>
              </label>
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
            <button type="button" className="editowner__btn editowner__btn--secondary">
              Cancel
            </button>
            <button
              type="submit"
              className="editowner__btn editowner__btn--primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : <><FiSave size={18} /> Save Changes</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOwner;
