import React from 'react';

const ServicesSection = () => {
  return (
    <section className="py-section-gap px-margin-desktop max-w-container-max mx-auto">
      <div className="text-center mb-20">
        <span className="text-primary font-label-sm text-label-sm tracking-widest uppercase mb-4 block">Layanan Kami</span>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Layanan Interior Kalatmaka</h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto font-body-lg">
          Kami menyediakan layanan interior praktis untuk membantu rumah Anda tampil lebih rapi, modern, dan nyaman digunakan.
        </p>
        <div className="w-20 h-1 bg-primary mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {/* Service 1 */}
        <div className="group bg-surface-container-lowest p-8 rounded-xl border border-surface-variant/30 hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">wall_art</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-primary mb-4">Plafon UPVC / PVC</h3>
          <p className="text-on-surface-variant mb-6 font-body-md text-body-md">Solusi plafon modern yang ringan, rapi, tahan lembap, dan mudah dirawat. Tersedia pilihan polos, variasi 1 level, hingga full variasi.</p>
          <a className="text-primary font-semibold flex items-center gap-2 hover:gap-4 transition-all uppercase text-label-sm tracking-wider" href="https://wa.me/6285128025154" target="_blank" rel="noreferrer">
            Chat WhatsApp <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
        
        {/* Service 2 */}
        <div className="group bg-surface-container-lowest p-8 rounded-xl border border-surface-variant/30 hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">layers</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-primary mb-4">Wallpanel PVC / WPC</h3>
          <p className="text-on-surface-variant mb-6 font-body-md text-body-md">Mempercantik dinding tanpa renovasi besar. Cocok untuk backdrop TV, ruang tamu, kamar, hingga area komersial.</p>
          <a className="text-primary font-semibold flex items-center gap-2 hover:gap-4 transition-all uppercase text-label-sm tracking-wider" href="https://wa.me/6285128025154" target="_blank" rel="noreferrer">
            Chat WhatsApp <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
        
        {/* Service 3 */}
        <div className="group bg-surface-container-lowest p-8 rounded-xl border border-surface-variant/30 hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">grid_view</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-primary mb-4">SPC Flooring</h3>
          <p className="text-on-surface-variant mb-6 font-body-md text-body-md">Lantai motif kayu yang praktis, nyaman, dan cocok untuk menciptakan suasana rumah yang lebih hangat tanpa proses pemasangan yang rumit.</p>
          <a className="text-primary font-semibold flex items-center gap-2 hover:gap-4 transition-all uppercase text-label-sm tracking-wider" href="https://wa.me/6285128025154" target="_blank" rel="noreferrer">
            Chat WhatsApp <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
        
        {/* Service 4 */}
        <div className="group bg-surface-container-lowest p-8 rounded-xl border border-surface-variant/30 hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">texture</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-primary mb-4">Gorden Custom</h3>
          <p className="text-on-surface-variant mb-6 font-body-md text-body-md">Gorden dibuat menyesuaikan ukuran, warna, dan kebutuhan ruangan agar tampilan interior lebih harmonis, rapi, dan nyaman digunakan.</p>
          <a className="text-primary font-semibold flex items-center gap-2 hover:gap-4 transition-all uppercase text-label-sm tracking-wider" href="https://wa.me/6285128025154" target="_blank" rel="noreferrer">
            Chat WhatsApp <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
