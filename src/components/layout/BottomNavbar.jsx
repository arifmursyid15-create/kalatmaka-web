import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: 'home', fill: true },
    { name: 'Portofolio', path: '/portfolio', icon: 'grid_view' },
    { name: 'Layanan', path: '/katalog', icon: 'shopping_bag' },
    { name: 'Blog', path: '/blog', icon: 'auto_stories' },
  ];

  return (
    <div className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 pb-2 pt-2 md:hidden bg-surface-container-low shadow-[0_-4px_16px_rgba(141,110,99,0.05)] rounded-t-xl">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
        
        if (isActive) {
          return (
            <Link 
              key={item.name} 
              to={item.path}
              className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-xl p-2 active:scale-95 transition-all w-16"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                {item.icon}
              </span>
              <span className="font-label-sm text-label-sm">{item.name}</span>
            </Link>
          );
        }

        return (
          <Link 
            key={item.name} 
            to={item.path}
            className="flex flex-col items-center justify-center text-on-surface-variant p-2 active:scale-95 transition-all hover:bg-surface-container-high rounded-xl w-16"
          >
            <span className="material-symbols-outlined">
              {item.icon}
            </span>
            <span className="font-label-sm text-label-sm">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavbar;
