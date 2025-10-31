import { apiFetch } from '../../utils/api';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Get all support queries/communications
 * @returns {Promise} List of all support queries
 */
export const getAllSupportQueries = async () => {
  try {
    const response = await fetch(`${API_URL}/communicationsupports/get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch support queries');
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('Network error. Please check your connection.');
    }
    throw error;
  }
};
