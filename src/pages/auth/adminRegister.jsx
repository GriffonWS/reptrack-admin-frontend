import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './auth.css';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { registerAdmin } from '../../services/auth/authService';

const RegisterAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      const response = await registerAdmin({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });

      if (response.success) {
        setSuccess('Registration successful! Redirecting to login...');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        });

        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(response.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      if (err.message === 'Failed to fetch' || err.name === 'NetworkError') {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError(err.message || 'An error occurred during registration. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left Section */}
        <div className="login-left">
          <div className="login-form-wrapper">
            {/* Logo */}
            <div className="logo">
              <img src={logo} alt="Logo" className="logo-image" />
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="success-message">
                {success}
              </div>
            )}

            {/* Form */}
            <div className="login-form">
              {/* Name Row */}
              <div className="name-row">
                {/* First Name */}
                <div className="form-group half">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-input"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                {/* Last Name */}
                <div className="form-group half">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-input"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="admin@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              {/* Password Field */}
              <div className="form-group password-group">
                <label className="form-label">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-input"
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="submit-btn"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>

            {/* Sign In Link */}
            <div className="signup">
              <p className="signup-text">
                              Already have an account?{' '}
                              <Link to="/login" className="signup-link">
                                Sign in
                              </Link>
                            </p>
            </div>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="login-right">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80"
            alt="Gym"
          />
        </div>
      </div>
    </div>
  );
};
export default RegisterAdmin;