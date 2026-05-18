import api from '../api/axios';

const blogService = {
  getAll: () => api.get('/admin/blog'),
  create: (data) => api.post('/admin/blog', data),
  update: (id, data) => api.put(`/admin/blog/${id}`, data),
  delete: (id) => api.delete(`/admin/blog/${id}`),
};

export default blogService;