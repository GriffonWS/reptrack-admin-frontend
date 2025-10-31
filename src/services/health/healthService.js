import { apiFetch } from '../../utils/api';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Get all health information
 * @returns {Promise} Health information data
 */
export const getHealthInfo = async () => {
  try {
    const response = await fetch(`${API_URL}/health-info/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch health information');
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
 * Update health information by ID
 * @param {number} id - Health info ID
 * @param {Object} contentData - Content data to update
 * @returns {Promise} Updated health information data
 */
export const updateHealthInfo = async (id, contentData) => {
  return await apiFetch(`/health-info/update/${id}`, {
    method: 'PUT',
    body: JSON.stringify(contentData),
  });
};
