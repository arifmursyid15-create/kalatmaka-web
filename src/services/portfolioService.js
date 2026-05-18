import api from '../api/axios';

const portfolioService = {
  getAll: () => api.get('/admin/portfolio'),
  create: (data) => api.post('/admin/portfolio', data),
  update: (id, data) => api.put(`/admin/portfolio/${id}`, data),
  delete: (id) => api.delete(`/admin/portfolio/${id}`),
};

export default portfolioService;