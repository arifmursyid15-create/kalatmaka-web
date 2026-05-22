import React from 'react';
import { Link } from 'react-router-dom';

const ctaClass = 'bg-primary text-on-primary px-10 py-5 rounded-full font-label-sm text-label-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg';
const secondaryClass = 'border border-outline text-primary px-10 py-5 rounded-full font-label-sm text-label-sm uppercase tracking-widest hover:bg-surface-container transition-all';

const HeroSection = ({ banners = [] }) => {
  const banner = banners[0] || {};
  const image = banner.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPStrG0FRKxVIxeIfYUnMiagAhwvaP8H6aMiozRXF8-05O0fiv01YTG8czorl5fYGkNuzp-PseqgO90OEAOf9Z_p_A6Ea5CcPh1nNvYD-iM3itFaw3TfUDzfop6_C_XjknwTuVDWf15ZAObns-NpQeVIBxTTs2S_xlKKK8IOCrK7x-5qa9Z7SJVuL0ZONzKTmQie8SXRqlFUBQqwjwHt2P8PitHMH__9N4GU0kHbhIfCd1jB4tBS9cPy918dVSRjTrZvrFTSIrVgpj';
  const primaryLink = banner.button_link || 'https://wa.me/6285128025154';
  const secondaryLink = banner.secondary_button_link || '/katalog';
  const isPrimaryExternal = primaryLink.startsWith('http');
  const trustBadges = ['Garansi 6 Bulan', 'Material Distributor Resmi', 'Tukang Berpengalaman', 'Pengerjaan Bersih & Rapi'];

  return (
    <section className="relative h-screen min-h-[800px] w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          alt={banner.title || 'Renovasi Interior'}
          className="w-full h-full object-cover" 
          src={image}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent"></div>
      </div>
      <div className="relative z-10 h-full flex flex-col justify-center px-margin-desktop max-w-container-max mx-auto">
        <span className="text-primary font-label-sm text-label-sm tracking-[0.3em] uppercase mb-6 block">Kalatmaka Interior</span>
        <h1 className="font-display-lg text-display-lg max-w-4xl mb-8 text-on-background">{banner.title || 'Renovasi Interior Tanpa Ribet, Hasil Rapi & Bergaransi'}</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-12">
          {banner.subtitle || 'Kalatmaka membantu Anda memperbarui tampilan rumah dengan layanan plafon UPVC, wallpanel, SPC flooring, dan gorden custom - dikerjakan oleh tenaga berpengalaman menggunakan material berkualitas dari distributor resmi.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {isPrimaryExternal ? (
            <a href={primaryLink} className={ctaClass} target="_blank" rel="noreferrer">
              {banner.button_text || 'Konsultasi Gratis via WhatsApp'}
            </a>
          ) : (
            <Link to={primaryLink} className={ctaClass}>
              {banner.button_text || 'Konsultasi Gratis via WhatsApp'}
            </Link>
          )}
          <Link to={secondaryLink} className={secondaryClass}>
            {banner.secondary_button_text || 'Lihat Layanan'}
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap gap-3 max-w-3xl">
          {trustBadges.map((badge) => (
            <span className="bg-surface/80 border border-outline/20 rounded-full px-4 py-2 text-sm font-semibold text-on-surface-variant" key={badge}>
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
