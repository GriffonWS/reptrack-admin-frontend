import { setToken } from '../../utils/token';
import { apiFetch, publicFetch } from '../../utils/api';

/**
 * Register a new admin
 * @param {Object} adminData - Object containing firstName, lastName, email, password
 * @returns {Promise} Response data with admin info
 */
export const registerAdmin = async (adminData) => {
  const { firstName, lastName, email, password } = adminData;

  // Validate required fields
  if (!firstName || !lastName || !email || !password) {
    throw new Error('All fields are required');
  }

  const data = await publicFetch('/api/auth/register-admin', {
    method: 'POST',
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  });

  return data;
};

/**
 * Login admin
 * @param {Object} credentials - Object containing email and password
 * @returns {Promise} Response data with admin info and token
 */
export const loginAdmin = async (credentials) => {
  const { email, password } = credentials;

  // Validate required fields
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const data = await publicFetch('/api/auth/login-admin', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!data.success || !data.data || !data.data.token) {
    throw new Error('Invalid response format from server');
  }

  // Save token to localStorage
  setToken(data.data.token);

  return data;
};

/**
 * Get admin profile by token
 * @returns {Promise} Admin profile data
 */
export const getAdminByToken = async () => {
  const data = await apiFetch('/api/admin/get', {
    method: 'GET',
  });

  if (!data.success || !data.data) {
    throw new Error('Invalid response format from server');
  }

  return data;
};

/**
 * Update admin profile
 * @param {Object} updateData - Object containing firstName and/or lastName
 * @returns {Promise} Updated admin data
 */
export const updateAdminByToken = async (updateData) => {
  const data = await apiFetch('/api/admin/update', {
    method: 'PUT',
    body: JSON.stringify(updateData),
  });

  if (!data.success || !data.data) {
    throw new Error('Invalid response format from server');
  }

  return data;
};

/**
 * Change admin password
 * @param {Object} passwordData - Object containing oldPassword, newPassword, confirmNewPassword
 * @returns {Promise} Response data
 */
export const changePassword = async (passwordData) => {
  const data = await apiFetch('/api/admin/change-password', {
    method: 'POST',
    body: JSON.stringify(passwordData),
  });

  if (!data.success) {
    throw new Error('Invalid response format from server');
  }

  return data;
};

/**
 * Logout admin
 * @returns {Promise} Response data
 */
export const logout = async () => {
  const data = await apiFetch('/api/admin/logout', {
    method: 'GET',
  });

  return data;
};
