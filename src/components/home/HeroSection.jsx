import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = ({ banners = [] }) => {
  const banner = banners[0] || {};
  const image = banner.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPStrG0FRKxVIxeIfYUnMiagAhwvaP8H6aMiozRXF8-05O0fiv01YTG8czorl5fYGkNuzp-PseqgO90OEAOf9Z_p_A6Ea5CcPh1nNvYD-iM3itFaw3TfUDzfop6_C_XjknwTuVDWf15ZAObns-NpQeVIBxTTs2S_xlKKK8IOCrK7x-5qa9Z7SJVuL0ZONzKTmQie8SXRqlFUBQqwjwHt2P8PitHMH__9N4GU0kHbhIfCd1jB4tBS9cPy918dVSRjTrZvrFTSIrVgpj';

  return (
    <section className="relative h-screen min-h-[800px] w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          alt={banner.title || 'Luxury Interior'}
          className="w-full h-full object-cover" 
          src={image}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent"></div>
      </div>
      <div className="relative z-10 h-full flex flex-col justify-center px-margin-desktop max-w-container-max mx-auto">
        <span className="text-primary font-label-sm text-label-sm tracking-[0.3em] uppercase mb-6 block">Interior Excellence</span>
        <h1 className="font-display-lg text-display-lg max-w-3xl mb-8 text-on-background">{banner.title || 'Modern Minimal Luxury'}</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-12">
          {banner.subtitle || 'Crafting the soul of your living space with artisanal wallpanels, refined ceilings, and bespoke flooring designed for the discerning lifestyle.'}
        </p>
        <div className="flex gap-6">
          <Link to={banner.button_link || '/katalog'} className="bg-primary text-on-primary px-10 py-5 rounded-full font-label-sm text-label-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg">
            {banner.button_text || 'Explore Collections'}
          </Link>
          <Link to={banner.secondary_button_link || '/portfolio'} className="border border-outline text-primary px-10 py-5 rounded-full font-label-sm text-label-sm uppercase tracking-widest hover:bg-surface-container transition-all">
            {banner.secondary_button_text || 'View Projects'}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
