import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
    { name: 'Portfolio', path: '/admin/portfolio', icon: 'architecture' },
    { name: 'Catalog', path: '/admin/catalog', icon: 'menu_book' },
    { name: 'Blog', path: '/admin/blog', icon: 'article' },
    { name: 'Categories', path: '/admin/categories', icon: 'category' },
    { name: 'Testimonials', path: '/admin/testimonials', icon: 'reviews' },
    { name: 'Banners', path: '/admin/banners', icon: 'view_carousel' },
    { name: 'Users', path: '/admin/users', icon: 'group' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-[#3B2A23] text-on-primary border-r border-outline-variant shadow-sm flex flex-col py-8 z-50">
      <div className="px-8 mb-8">
        <img 
          alt="Kalatmaka Logo" 
          className="h-8 w-auto object-contain" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUH56QYxpGbJ1IAML_Wh7W3hmAwL6SMbNBlT-1NxNoz7rQZlgJvnZDZ2ts5n3shqyc1fj5OlDnMtT8rKS7plY1NE_J6XNgXC6cnPKR5Sz462WoCJC5F--GB_OTMejmAUuEogbp4oloODcjyeCmrRXU3x0rCcmVYOMc7PnnQO5jWVmJjiC1cJU_jN1MQxHeBjfocunrzJH8FM8k6GHJiaAawLAb-sq8DfSikpM9g0n6YEwcyFqVkpKvgDChiR3ROYV1geUzR_bN0dlk"
        />
        <p className="font-body-sm opacity-60 text-on-primary mt-2">Luxury Management</p>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-2">
        {navItems.map((item) => (
          <Link 
            key={item.name}
            to={item.path} 
            className={`relative flex items-center gap-4 px-6 py-3 transition-all duration-200 ${location.pathname === item.path ? 'bg-[#E8D5C4] text-[#3B2A23] font-bold border-l-4 border-secondary-container' : 'text-on-primary-container opacity-70 hover:bg-primary-container hover:text-on-primary-container'}`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-body-md">{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="px-2 mt-auto pt-8 border-t border-white/10">
        <Link to="/admin/settings" className="flex items-center gap-4 text-on-primary-container opacity-70 px-6 py-3 hover:bg-primary-container hover:text-on-primary-container transition-colors">
          <span className="material-symbols-outlined">settings</span>
          <span className="font-body-md">Settings</span>
        </Link>
        <Link to="/admin/support" className="flex items-center gap-4 text-on-primary-container opacity-70 px-6 py-3 hover:bg-primary-container hover:text-on-primary-container transition-colors">
          <span className="material-symbols-outlined">help_outline</span>
          <span className="font-body-md">Support</span>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
