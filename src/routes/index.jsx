import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import HomePage from '../pages/HomePage';
import PortfolioPage from '../pages/PortfolioPage';
import PortfolioDetailPage from '../pages/PortfolioDetailPage';
import KatalogPage from '../pages/KatalogPage';
import KatalogDetailPage from '../pages/KatalogDetailPage';
import BlogPage from '../pages/BlogPage';
import BlogDetailPage from '../pages/BlogDetailPage';
import TentangPage from '../pages/TentangPage';
import KontakPage from '../pages/KontakPage';
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminPortfolioPage from '../pages/admin/AdminPortfolioPage';
import AdminCatalogPage from '../pages/admin/AdminCatalogPage';
import AdminBlogPage from '../pages/admin/AdminBlogPage';
import AdminBannerPage from '../pages/admin/AdminBannerPage';
import AdminCategoryPage from '../pages/admin/AdminCategoryPage';
import AdminTestimonialPage from '../pages/admin/AdminTestimonialPage';
import AdminUserPage from '../pages/admin/AdminUserPage';
import AdminSettingsPage from '../pages/admin/AdminSettingsPage';

const router = createBrowserRouter([
  // Admin Login (public)
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },

  // Admin Routes (protected)
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      { path: 'dashboard',    element: <AdminDashboardPage /> },
      { path: 'portfolio',    element: <AdminPortfolioPage /> },
      { path: 'catalog',      element: <AdminCatalogPage /> },
      { path: 'blog',         element: <AdminBlogPage /> },
      { path: 'categories',   element: <AdminCategoryPage /> },
      { path: 'testimonials', element: <AdminTestimonialPage /> },
      { path: 'banners',      element: <AdminBannerPage /> },
      { path: 'users',        element: <AdminUserPage /> },
      { path: 'settings',     element: <AdminSettingsPage /> },
    ],
  },

  // Public Routes
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true,              element: <HomePage /> },
      { path: 'portfolio',        element: <PortfolioPage /> },
      { path: 'portfolio/:slug',  element: <PortfolioDetailPage /> },
      { path: 'katalog',          element: <KatalogPage /> },
      { path: 'katalog/:slug',    element: <KatalogDetailPage /> },
      { path: 'blog',             element: <BlogPage /> },
      { path: 'blog/:slug',       element: <BlogDetailPage /> },
      { path: 'tentang',          element: <TentangPage /> },
      { path: 'kontak',           element: <KontakPage /> },
    ],
  },
]);

export default router;