import api from '../api/axios';

const katalogService = {
  getAll: () => api.get('/admin/katalog'),
  create: (data) => api.post('/admin/katalog', data),
  update: (id, data) => api.put(`/admin/katalog/${id}`, data),
  delete: (id) => api.delete(`/admin/katalog/${id}`),
};

export default katalogService;