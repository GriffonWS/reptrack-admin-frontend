import React, { useState } from 'react';
import { FiUpload, FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import '../Gym-owner/Register.css';
import { registerGymOwner } from '../../../services/gymOwner/gymOwnerService';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gymName: '',
    ownerName: '',
    email: '',
    phoneNumber: '',
    address: '',
    subscriptionType: '',
    password: ''
  });

  const [profileImage, setProfileImage] = useState(null);
  const [gymLogo, setGymLogo] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      phoneNumber: '',
      address: '',
      subscriptionType: '',
      password: ''
    });
    setProfileImage(null);
    setGymLogo(null);
    setProfilePreview(null);
    setLogoPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate required fields
      if (!formData.gymName || !formData.ownerName || !formData.email ||
          !formData.phoneNumber || !formData.address || !formData.subscriptionType ||
          !formData.password) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append('gymName', formData.gymName);
      formDataToSend.append('ownerName', formData.ownerName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('subscriptionType', formData.subscriptionType);
      formDataToSend.append('password', formData.password);

      // Append images if they exist
      if (profileImage) {
        formDataToSend.append('profile_image', profileImage);
      }
      if (gymLogo) {
        formDataToSend.append('gym_logo', gymLogo);
      }

      // Call API to register gym owner
      const response = await registerGymOwner(formDataToSend);

      if (response.success) {
        setSuccess('Gym owner registered successfully!');

        // Reset form after successful registration
        setTimeout(() => {
          navigate('/dashboard/all_owners');
        }, 2000);
      } else {
        setError(response.message || 'Failed to register gym owner');
      }
    } catch (err) {
      console.error('Error registering gym owner:', err);
      setError(err.message || 'Failed to register gym owner');
    } finally {
      setLoading(false);
    }
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

        {/* Error & Success Messages */}
        {error && (
          <div className="adduser__error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="adduser__success-message">
            {success}
          </div>
        )}

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
                <label className="adduser__label">Gym Name *</label>
                <input
                  type="text"
                  name="gymName"
                  placeholder="Enter gym name"
                  value={formData.gymName}
                  onChange={handleChange}
                  className="adduser__input"
                  required
                />
              </div>

              {/* Owner Name */}
              <div className="adduser__form-group">
                <label className="adduser__label">Owner Name *</label>
                <input
                  type="text"
                  name="ownerName"
                  placeholder="Enter owner name"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="adduser__input"
                  required
                />
              </div>

              {/* Email */}
              <div className="adduser__form-group">
                <label className="adduser__label">Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className="adduser__input"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="adduser__form-group">
                <label className="adduser__label">Phone Number *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="adduser__input"
                  required
                />
              </div>

              {/* Address */}
              <div className="adduser__form-group adduser__form-group--fullwidth">
                <label className="adduser__label">Address *</label>
                <textarea
                  name="address"
                  placeholder="Enter gym address"
                  value={formData.address}
                  onChange={handleChange}
                  className="adduser__input"
                  rows="3"
                  required
                />
              </div>

              {/* Subscription Type */}
              <div className="adduser__form-group">
                <label className="adduser__label">Subscription Type *</label>
                <select
                  name="subscriptionType"
                  value={formData.subscriptionType}
                  onChange={handleChange}
                  className="adduser__input"
                  required
                >
                  <option value="">Select subscription</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>

              {/* Password */}
              <div className="adduser__form-group">
                <label className="adduser__label">Password *</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="adduser__input"
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="adduser__actions">
              <button
                type="button"
                onClick={handleReset}
                className="adduser__btn adduser__btn--secondary"
                disabled={loading}
              >
                Reset
              </button>
              <button
                type="submit"
                className="adduser__btn adduser__btn--primary"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Add Gym'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
