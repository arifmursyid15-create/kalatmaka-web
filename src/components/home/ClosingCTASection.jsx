import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';

const ClosingCTASection = () => {
  const { settings } = useOutletContext() || {};
  const consultLink = settings?.whatsapp_link || 'https://wa.me/6285128025154';

  return (
    <section className="py-section-gap px-margin-desktop">
      <div className="max-w-4xl mx-auto bg-surface-container-highest rounded-[40px] p-16 text-center shadow-inner relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <h2 className="font-display-lg text-headline-lg mb-6 text-on-background">Siap Memperbarui Tampilan Rumah Anda?</h2>
        <p className="font-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto">
          Konsultasikan kebutuhan plafon UPVC, wallpanel, SPC flooring, atau gorden custom bersama Kalatmaka.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
          <a href={consultLink} className="bg-primary text-on-primary px-12 py-5 rounded-full font-label-sm text-label-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all" target="_blank" rel="noreferrer">
            Chat WhatsApp Sekarang
          </a>
          <Link to="/katalog" className="bg-surface-container-lowest text-primary border border-primary px-12 py-5 rounded-full font-label-sm text-label-sm uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all">
            Lihat Layanan
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ClosingCTASection;
