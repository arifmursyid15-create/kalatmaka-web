import api from '../api/axios';

const authService = {
  login: async (email, password) => {
    const response = await api.post('/admin/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return response.data;
  },

  logout: async () => {
    await api.post('/admin/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  me: async () => {
    const response = await api.get('/admin/me');
    return response.data;
  },

  getToken: () => localStorage.getItem('token'),

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isLoggedIn: () => !!localStorage.getItem('token'),
};

export default authService;