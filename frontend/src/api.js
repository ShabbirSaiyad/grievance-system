import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000'
});

export const createGrievance = (data) => api.post('/api/grievances', data);
export const getGrievances = () => api.get('/api/grievances');
export const getGrievanceByTrackingId = (trackingId) =>
  api.get(`/api/grievances/${encodeURIComponent(trackingId)}`);
export const updateGrievance = (id, data) => api.put(`/api/grievances/${id}`, data);
export const submitFeedback = (data) => api.post('/api/feedback', data);
export const submitAppeal = (data) => api.post('/api/appeal', data);

