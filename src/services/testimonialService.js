import api from '../api/axios';

const testimonialService = {
  getAll: () => api.get('/admin/testimonials'),
  create: (data) => api.post('/admin/testimonials', data),
  update: (id, data) => api.put(`/admin/testimonials/${id}`, data),
  delete: (id) => api.delete(`/admin/testimonials/${id}`),
};

export default testimonialService;