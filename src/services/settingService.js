import api from '../api/axios';

const settingService = {
  getAll: () => api.get('/admin/settings'),
  update: (settings) => api.put('/admin/settings', { settings }),
};

export default settingService;
