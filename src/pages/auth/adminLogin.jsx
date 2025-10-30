import React, { useState, useEffect, useRef } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import './auth.css';
import logo from '../../assets/logo.png';
import { loginAdmin } from '../../services/auth/authService';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const emailInputRef = useRef(null);

  // Auto-focus email input on mount
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  // Clear error after 5 seconds with fade out animation
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await loginAdmin({
        email: formData.email,
        password: formData.password
      });

      if (response.success && response.data.token) {
        setTimeout(() => navigate('/dashboard'), 300);
      } else {
        setError(response.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      if (err.message === 'Failed to fetch' || err.name === 'NetworkError') {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError(err.message || 'An error occurred during login. Please try again.');
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
              <img src={logo} alt="RepTrack Logo" className="logo-image" />
            </div>

            {/* Form */}
            <form className="login-form" onSubmit={handleSubmit} noValidate>
              {error && (
                <div className="error-message" role="alert" aria-live="polite">
                  {error}
                </div>
              )}

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  ref={emailInputRef}
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input ${validationErrors.email ? 'input-error' : ''}`}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="username"
                  required
                />
                {validationErrors.email && (
                  <span className="validation-error" role="alert">
                    {validationErrors.email}
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div className="form-group password-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className={`form-input ${validationErrors.password ? 'input-error' : ''}`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
                {validationErrors.password && (
                  <span className="validation-error" role="alert">
                    {validationErrors.password}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>

              <div className="signup">
                <p className="signup-text">
                Don’t have an account?{' '}
                <Link to="/register" className="signup-link">
                  Sign up
                </Link>
              </p>
              </div>
              
            </form>
          </div>
        </div>

        {/* Right Section */}
        <div className="login-right">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80"
            alt="Gym Training"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
