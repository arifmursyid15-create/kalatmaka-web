import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const fallbackLogo = 'https://lh3.googleusercontent.com/aida/ADBb0ugy9bXXWWqqqLlJ5fxqTWWJn2Ci1wIztPxAgO9s8D9UMrtCRRdvyG2HQWhmiEh5YGvuAEPR-dWzDbFF5s4IDmCWRfOfLLMQTjPC6dgZRA9sUShtqWJYnhYk4WsUybKGqArQK3g_RTgvbrEz3pFOH3eUMPoX44fL_jz-nrZpiMSWMJ7s5KRSw7RNR_otRNV3omFu_9pvEXIY4D4iVbohsb6pE4HDbjywANYGNUujgsZyzFYNTeLN1T-U0kw-pAbvZgKJ1JZt0JzxuhY';

const Navbar = ({ settings }) => {
  const location = useLocation();
  const logo = settings?.dark_logo_url || fallbackLogo;
  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Portofolio', path: '/portfolio' },
    { name: 'Layanan', path: '/katalog' },
    { name: 'Blog', path: '/blog' },
    { name: 'Tentang', path: '/tentang' },
  ];

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-6xl">
      <div className="nav-island flex justify-between items-center px-10 py-4 rounded-full shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] border border-surface-variant/10">
        <div className="font-headline-md text-headline-md text-on-primary-fixed tracking-tight font-bold">
          <Link to="/">
            <img 
              alt={`${settings?.studio_name || 'Kalatmaka'} Logo`}
              className="h-10 w-auto object-contain" 
              src={logo}
            />
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={
                  isActive
                    ? "text-on-primary-fixed font-bold border-b-2 border-primary pb-1 font-body-md text-body-md transition-colors"
                    : "text-on-surface-variant font-semibold font-body-md text-body-md hover:text-primary transition-colors"
                }
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
        <a href={settings?.whatsapp_link || 'https://wa.me/6285128025154'} className="hidden md:block bg-primary-container text-white px-8 py-3 rounded-full font-label-sm text-label-sm uppercase tracking-widest hover:bg-primary transition-all" target="_blank" rel="noreferrer">
          Chat WhatsApp
        </a>
        <a href={settings?.whatsapp_link || 'https://wa.me/6285128025154'} className="md:hidden bg-primary-container text-white px-5 py-2 rounded-full font-label-sm text-xs uppercase tracking-widest hover:bg-primary transition-all" target="_blank" rel="noreferrer">
          Chat
        </a>
      </div>
    </header>
  );
};

export default Navbar;
