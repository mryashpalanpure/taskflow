import axios from 'axios';

// Create Axios client with base URL
// In development, Vite proxy forwards /api to http://localhost:5000
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Check system health (Backend API & MongoDB tier)
export const checkHealth = async () => {
  const response = await API.get('/api/health');
  return response.data;
};

// Get tasks with optional filters
export const fetchTasks = async (params = {}) => {
  const response = await API.get('/api/tasks', { params });
  return response.data;
};

// Create a new task
export const createTask = async (taskData) => {
  const response = await API.post('/api/tasks', taskData);
  return response.data;
};

// Update an existing task
export const updateTask = async (id, taskData) => {
  const response = await API.put(`/api/tasks/${id}`, taskData);
  return response.data;
};

// Delete a task
export const deleteTask = async (id) => {
  const response = await API.delete(`/api/tasks/${id}`);
  return response.data;
};

export default API;
