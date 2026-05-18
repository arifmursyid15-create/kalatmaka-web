import React from 'react';

const ServicesSection = () => {
  return (
    <section className="py-section-gap px-margin-desktop max-w-container-max mx-auto">
      <div className="text-center mb-20">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Our Curated Services</h2>
        <div className="w-20 h-1 bg-primary mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {/* Service 1 */}
        <div className="group bg-surface-container-lowest p-8 rounded-xl border border-surface-variant/30 hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">wall_art</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-primary mb-4">Wallpanel</h3>
          <p className="text-on-surface-variant mb-6 font-body-md text-body-md">Architectural wall treatments that redefine vertical spaces with texture and depth.</p>
          <a className="text-primary font-semibold flex items-center gap-2 hover:gap-4 transition-all uppercase text-label-sm tracking-wider" href="#">
            Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
        
        {/* Service 2 */}
        <div className="group bg-surface-container-lowest p-8 rounded-xl border border-surface-variant/30 hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">layers</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-primary mb-4">PVC Ceiling</h3>
          <p className="text-on-surface-variant mb-6 font-body-md text-body-md">Innovative ceiling solutions offering moisture resistance and sophisticated aesthetics.</p>
          <a className="text-primary font-semibold flex items-center gap-2 hover:gap-4 transition-all uppercase text-label-sm tracking-wider" href="#">
            Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
        
        {/* Service 3 */}
        <div className="group bg-surface-container-lowest p-8 rounded-xl border border-surface-variant/30 hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">grid_view</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-primary mb-4">SPC Flooring</h3>
          <p className="text-on-surface-variant mb-6 font-body-md text-body-md">Durable, waterproof stone polymer composite flooring for a warm, natural feel.</p>
          <a className="text-primary font-semibold flex items-center gap-2 hover:gap-4 transition-all uppercase text-label-sm tracking-wider" href="#">
            Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
        
        {/* Service 4 */}
        <div className="group bg-surface-container-lowest p-8 rounded-xl border border-surface-variant/30 hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">texture</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-primary mb-4">Curtains</h3>
          <p className="text-on-surface-variant mb-6 font-body-md text-body-md">Premium bespoke window treatments tailored to frame your view perfectly.</p>
          <a className="text-primary font-semibold flex items-center gap-2 hover:gap-4 transition-all uppercase text-label-sm tracking-wider" href="#">
            Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
