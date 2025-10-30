import React, { useState } from 'react';
import { FiUpload, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '../Gym-owner/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    gymName: '',
    ownerName: '',
    email: '',
    phone: '',
    uniqueId: '',
    status: '',
    subscriptionType: ''
  });

  const [profileImage, setProfileImage] = useState(null);
  const [gymLogo, setGymLogo] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image uploads (shared function)
  const handleImageChange = (e, setImage, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setFormData({
      gymName: '',
      ownerName: '',
      email: '',
      phone: '',
      uniqueId: '',
      status: '',
      subscriptionType: ''
    });
    setProfileImage(null);
    setGymLogo(null);
    setProfilePreview(null);
    setLogoPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="adduser__wrapper">
      {/* Back Button */}
      <Link to="/dashboard/all_owners" className="adduser__back-btn">
        <FiArrowLeft size={20} />
        Back
      </Link>

      {/* Form Container */}
      <div className="adduser__container">
        <div className="adduser__header">
          <h1 className="adduser__title">Add Gym Owner</h1>
          <p className="adduser__subtitle">Fill in the details to register a new gym</p>
        </div>

        {/* Form */}
        <div className="adduser__form-container">
          <form className="adduser__form" onSubmit={handleSubmit}>
            <div className="adduser__form-grid">
              {/* Profile Image */}
              <div className="adduser__form-group">
                <label className="adduser__label">Profile Image</label>
                <label className="adduser__file-input">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, setProfileImage, setProfilePreview)}
                    className="adduser__file-input-hidden"
                  />
                  <div className="adduser__file-label">
                    <FiUpload size={20} />
                    <span>Choose Profile Image</span>
                  </div>
                </label>
                {profilePreview && (
                  <div className="adduser__image-preview">
                    <img src={profilePreview} alt="Profile Preview" />
                  </div>
                )}
              </div>

              {/* Gym Logo */}
              <div className="adduser__form-group">
                <label className="adduser__label">Gym Logo</label>
                <label className="adduser__file-input">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, setGymLogo, setLogoPreview)}
                    className="adduser__file-input-hidden"
                  />
                  <div className="adduser__file-label">
                    <FiUpload size={20} />
                    <span>Choose Gym Logo</span>
                  </div>
                </label>
                {logoPreview && (
                  <div className="adduser__image-preview">
                    <img src={logoPreview} alt="Gym Logo Preview" />
                  </div>
                )}
              </div>

              {/* Gym Name */}
              <div className="adduser__form-group">
                <label className="adduser__label">Gym Name</label>
                <input
                  type="text"
                  name="gymName"
                  placeholder="Enter gym name"
                  value={formData.gymName}
                  onChange={handleChange}
                  className="adduser__input"
                />
              </div>

              {/* Owner Name */}
              <div className="adduser__form-group">
                <label className="adduser__label">Owner Name</label>
                <input
                  type="text"
                  name="ownerName"
                  placeholder="Enter owner name"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="adduser__input"
                />
              </div>

              {/* Email */}
              <div className="adduser__form-group">
                <label className="adduser__label">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className="adduser__input"
                />
              </div>

              {/* Phone Number */}
              <div className="adduser__form-group">
                <label className="adduser__label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="adduser__input"
                />
              </div>

              {/* Unique ID */}
              <div className="adduser__form-group">
                <label className="adduser__label">Unique ID</label>
                <input
                  type="text"
                  name="uniqueId"
                  placeholder="Enter unique ID"
                  value={formData.uniqueId}
                  onChange={handleChange}
                  className="adduser__input"
                />
              </div>

              {/* Status */}
              <div className="adduser__form-group">
                <label className="adduser__label">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="adduser__input"
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Subscription Type */}
              <div className="adduser__form-group">
                <label className="adduser__label">Subscription Type</label>
                <select
                  name="subscriptionType"
                  value={formData.subscriptionType}
                  onChange={handleChange}
                  className="adduser__input"
                >
                  <option value="">Select subscription</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="adduser__actions">
              <button
                type="button"
                onClick={handleReset}
                className="adduser__btn adduser__btn--secondary"
              >
                Reset
              </button>
              <button
                type="submit"
                className="adduser__btn adduser__btn--primary"
              >
                Add Gym
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
