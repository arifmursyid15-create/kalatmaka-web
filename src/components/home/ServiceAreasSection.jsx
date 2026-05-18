import React from 'react';

const ServiceAreasSection = () => {
  return (
    <section className="py-section-gap px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter">
      <div className="lg:col-span-4 space-y-12">
        <div>
          <h3 className="font-headline-md text-headline-md text-primary mb-6">Service Areas</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-on-surface-variant font-body-md">
              <span className="material-symbols-outlined text-primary">location_on</span> Jakarta Metropolitan
            </li>
            <li className="flex items-center gap-3 text-on-surface-variant font-body-md">
              <span className="material-symbols-outlined text-primary">location_on</span> Tangerang & Serpong
            </li>
            <li className="flex items-center gap-3 text-on-surface-variant font-body-md">
              <span className="material-symbols-outlined text-primary">location_on</span> Bandung Highlands
            </li>
            <li className="flex items-center gap-3 text-on-surface-variant font-body-md">
              <span className="material-symbols-outlined text-primary">location_on</span> Bali Coastal Regions
            </li>
          </ul>
        </div>
        <div className="bg-surface-container p-10 rounded-3xl border border-surface-variant/20">
          <h3 className="font-headline-md text-headline-md text-primary mb-4">Interior Journal</h3>
          <div className="space-y-8">
            <a className="group block" href="#">
              <p className="text-label-sm uppercase tracking-widest text-primary mb-2">March 2024</p>
              <h4 className="font-bold group-hover:text-primary transition-colors">The Rise of Organic Minimalism in Jakarta</h4>
            </a>
            <a className="group block" href="#">
              <p className="text-label-sm uppercase tracking-widest text-primary mb-2">February 2024</p>
              <h4 className="font-bold group-hover:text-primary transition-colors">Choosing the Right Wood Tone for Your Space</h4>
            </a>
          </div>
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl">
          <img 
            alt="Interior Design Insight" 
            className="w-full h-full object-cover min-h-[400px]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-OrFwRmpXNLSIUTDILQQ_sf31xY_u8Lw8_vr-p2eQRAmQypGjwEwCu_Z6ptOHOi5JPwhzu-UctSkdlo6gOIm4nB9mEME4TfFCOmAc8ztks4nlCKvNJNPVDD9VUqOeL8BFMAtVagznb-qwx6rwre5DmmE9ULRXZ_MIOfaHTRw8siWhOvE6Pv80rM6edgYsTthBpqdmoelC1DHAA3UA7AAqaCjiY9OT6FaWOw5Hbf0MnuWJrwX_EjcPBLE1ulODxBR_3JSE7QdrSJfM"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-12">
            <h3 className="text-white md:text-on-primary font-display-lg text-3xl md:text-5xl mb-8">Crafting Memories Through Design</h3>
            <button className="w-fit border border-on-primary text-on-primary px-8 py-3 rounded-full font-label-sm text-label-sm uppercase tracking-widest hover:bg-on-primary hover:text-primary transition-all">
              Read Full Philosophy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasSection;
