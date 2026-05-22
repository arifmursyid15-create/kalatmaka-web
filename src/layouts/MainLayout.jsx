import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import BottomNavbar from '../components/layout/BottomNavbar';
import Footer from '../components/layout/Footer';
import StickyWhatsApp from '../components/layout/StickyWhatsApp';
import useSettings from '../hooks/useSettings';

const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { settings } = useSettings();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);


  return (
    <div className="min-h-screen flex flex-col relative pb-16 md:pb-0">
      <Helmet>
        <title>{settings.meta_title || settings.studio_name}</title>
        <meta name="description" content={settings.meta_description || ''} />
        <meta name="keywords" content="jasa plafon UPVC Sidoarjo, jasa wallpanel Sidoarjo, jasa SPC flooring Sidoarjo, jasa gorden custom Sidoarjo, jasa interior rumah Sidoarjo, Kalatmaka Interior" />
        {settings.favicon_url && <link rel="icon" href={settings.favicon_url} />}
      </Helmet>

      <Navbar settings={settings} />

      {/* Main Content */}
      <main className={`flex-grow ${isHome ? '' : 'pt-24'}`}>
        <Outlet context={{ settings }} />
      </main>

      <Footer settings={settings} />
      <BottomNavbar />
      <StickyWhatsApp settings={settings} />
    </div>
  );
};

export default MainLayout;
