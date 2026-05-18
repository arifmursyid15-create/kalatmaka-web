import api from '../api/axios';

export const getItems = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

const publicContentService = {
  getHome: () => api.get('/home'),
  getPortfolio: () => api.get('/portfolio'),
  getPortfolioDetail: (slug) => api.get(`/portfolio/${slug}`),
  getKatalog: () => api.get('/katalog'),
  getKatalogDetail: (slug) => api.get(`/katalog/${slug}`),
  getBlog: () => api.get('/blog'),
  getBlogDetail: (slug) => api.get(`/blog/${slug}`),
};

export default publicContentService;
