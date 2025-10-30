import { getToken, removeToken } from '../../utils/token';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Get all gym owners (Admin only)
 * @returns {Promise} List of all gym owners
 */
export const getAllGymOwners = async () => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/gym-owner/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      } else if (response.status === 403) {
        throw new Error('Access denied. Admin privileges required.');
      } else if (response.status === 404) {
        throw new Error('No gym owners found.');
      } else {
        throw new Error(data.message || 'Failed to fetch gym owners');
      }
    }

    // Validate response data
    if (!data.success || !data.data) {
      throw new Error('Invalid response format from server.');
    }

    return data;
  } catch (error) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('Network error. Please check your connection.');
    }

    // Re-throw custom errors
    throw error;
  }
};

/**
 * Get gym owner by ID (Admin only)
 * @param {string} id - Gym owner ID
 * @returns {Promise} Gym owner data
 */
export const getGymOwnerById = async (id) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/gym-owner/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      } else if (response.status === 403) {
        throw new Error('Access denied. Admin privileges required.');
      } else if (response.status === 404) {
        throw new Error('Gym owner not found.');
      } else {
        throw new Error(data.message || 'Failed to fetch gym owner data');
      }
    }

    if (!data.success || !data.data) {
      throw new Error('Invalid response format from server.');
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('Network error. Please check your connection.');
    }

    throw error;
  }
};

/**
 * Register a new gym owner (Admin only)
 * @param {FormData} formData - Form data with gym owner details
 * @returns {Promise} Created gym owner data
 */
export const registerGymOwner = async (formData) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/gym-owner/register`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(data.message || 'Invalid gym owner data');
      } else if (response.status === 401) {
        removeToken();
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      } else if (response.status === 403) {
        throw new Error('Access denied. Admin privileges required.');
      } else if (response.status === 409) {
        throw new Error('Email already exists.');
      } else {
        throw new Error(data.message || 'Failed to register gym owner');
      }
    }

    if (!data.success || !data.data) {
      throw new Error('Invalid response format from server.');
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('Network error. Please check your connection.');
    }

    throw error;
  }
};

/**
 * Update gym owner by ID (Admin only)
 * @param {string} id - Gym owner ID
 * @param {FormData} formData - Form data with updated gym owner details
 * @returns {Promise} Updated gym owner data
 */
export const updateGymOwnerById = async (id, formData) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/gym-owner/update/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(data.message || 'Invalid update data');
      } else if (response.status === 401) {
        removeToken();
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      } else if (response.status === 403) {
        throw new Error('Access denied. Admin privileges required.');
      } else if (response.status === 404) {
        throw new Error('Gym owner not found.');
      } else {
        throw new Error(data.message || 'Failed to update gym owner');
      }
    }

    if (!data.success || !data.data) {
      throw new Error('Invalid response format from server.');
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('Network error. Please check your connection.');
    }

    throw error;
  }
};

/**
 * Delete gym owner (Admin only)
 * @param {string} id - Gym owner ID
 * @returns {Promise} Response data
 */
export const deleteGymOwner = async (id) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/gym-owner/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      } else if (response.status === 403) {
        throw new Error('Access denied. Admin privileges required.');
      } else if (response.status === 404) {
        throw new Error('Gym owner not found.');
      } else {
        throw new Error(data.message || 'Failed to delete gym owner');
      }
    }

    if (!data.success) {
      throw new Error('Invalid response format from server.');
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('Network error. Please check your connection.');
    }

    throw error;
  }
};
