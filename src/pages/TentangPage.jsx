import React from 'react';

const TentangPage = () => {
  return (
    <>
      <main className="pb-section-gap">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface z-10"></div>
          <div className="absolute inset-0 opacity-60">
            <img 
              alt="Minimalist Luxury Interior" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMryWHS0zwO9HjTw1XiH_2_FUG1LjQQdzGWM1CpThgRUs6aAlaX9XRXzcO5ojdfNdva4YcrDmJx7un9670-hzQtjUhdk6u8ZmcR0p5TUC9YFjYsNKWIrHsapYesaRWxNrbU7oCepzlKYj0OA9ntB_dAb7T4HqSqREs1D6aDz8TsRZLjxGNqY0SZIxmpGkbF_2JHEV2aeenDhBXf71XxBuSqNQ0boWUaN5K7QvRevJxCVJPxyGnEdY-mVFTkr0UgcqOAuzZYXomQL95"
            />
          </div>
          <div className="relative z-20 text-center px-6 max-w-4xl mx-auto pt-20">
            <span className="font-label-sm text-primary tracking-[0.3em] text-sm mb-6 block uppercase">About Kalatmaka</span>
            <h2 className="font-display-lg text-6xl md:text-8xl text-on-surface font-semibold mb-8 leading-tight">The Soul of Art</h2>
            <p className="font-body-lg text-xl md:text-2xl text-on-surface-variant leading-relaxed font-light">
              Where centuries-old Indonesian craftsmanship meets the whispering elegance of modern minimalism. We don't just design spaces; we curate living narratives.
            </p>
          </div>
        </section>

        {/* Our Journey Section */}
        <section className="py-24 md:py-32 px-8 md:px-[64px] max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div>
              <span className="font-label-sm text-primary tracking-[0.2em] text-sm mb-4 block">OUR JOURNEY</span>
              <h3 className="font-headline-lg text-4xl md:text-5xl mb-8 leading-snug">From Heritage Workshop to Global Studio</h3>
              <div className="space-y-12">
                <div className="flex gap-8 border-l border-outline-variant pl-8 relative">
                  <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(228,190,178,0.5)]"></div>
                  <div>
                    <span className="text-primary font-headline-md text-2xl font-semibold">1994</span>
                    <p className="text-on-surface-variant mt-2 text-lg">Founded as a boutique teak carving workshop in Central Java, dedicated to preserving traditional Indonesian artistry.</p>
                  </div>
                </div>
                <div className="flex gap-8 border-l border-outline-variant pl-8 relative">
                  <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-outline-variant"></div>
                  <div>
                    <span className="text-on-surface text-2xl font-headline-md font-semibold">2008</span>
                    <p className="text-on-surface-variant mt-2 text-lg">Expanded to Jakarta, introducing contemporary design principles while maintaining our core artisanal soul.</p>
                  </div>
                </div>
                <div className="flex gap-8 border-l border-outline-variant pl-8 relative">
                  <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-outline-variant"></div>
                  <div>
                    <span className="text-on-surface text-2xl font-headline-md font-semibold">Today</span>
                    <p className="text-on-surface-variant mt-2 text-lg">A global heritage brand crafting bespoke sanctuaries for discerning clients across three continents.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img 
                  alt="Artisan at work" 
                  className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkFgccSpLie477TE2pZes-xjuX0Kr_DDMj3orH07SNIrLW7OKH5oiUaEBlCC2iD9pb67YxGT9ZnuaKCr45JnquszAjRe1O-WhZExMA0tRFzKfd5ANzJrSj7cAzhyDPf0LcWu-9_7JhFtGF5Cpda7KbL9ND1R8fdOWHW_HYcZJkHfZsnxCEm5jJycsQ00Phxh_oVVr-q_0th5eocyn2avFYnC00jgm4F1UQ89hAHGgWn0wxzVpr8RrY1qLUh07e3Xn6o1ry-pPfVbXu"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-surface-container p-8 rounded-xl border border-outline-variant/30 hidden lg:block">
                <p className="font-headline-lg text-4xl text-primary font-bold">30+</p>
                <p className="text-on-surface-variant text-sm font-label-sm mt-1 uppercase tracking-wider">Years of Excellence</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Philosophy (Quote Section) */}
        <section className="bg-surface-container-low py-24 md:py-32 px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="material-symbols-outlined text-primary text-5xl mb-8">format_quote</span>
            <blockquote className="font-headline-lg text-3xl md:text-5xl italic text-on-surface leading-tight mb-12">
              "Space is the breath of the soul. We believe an interior should not merely be seen, but felt—a silent partner to the human spirit."
            </blockquote>
            <cite className="text-primary font-label-sm tracking-widest uppercase not-italic">— Arya Wisesa, Founder</cite>
          </div>
        </section>

        {/* The Process Section */}
        <section className="py-24 md:py-32 px-8 md:px-[64px] max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <span className="font-label-sm text-primary tracking-[0.2em] text-sm mb-4 block">THE ALCHEMY</span>
            <h3 className="font-headline-lg text-4xl md:text-5xl">Crafting the Bespoke</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-surface-container-lowest p-10 rounded-xl border border-surface-variant/20 hover:border-primary/50 transition-all duration-300">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">edit_note</span>
              <h4 className="font-headline-md text-2xl mb-4">Bespoke Design Narrative</h4>
              <p className="text-on-surface-variant leading-relaxed">Every project begins with a story. We listen to the unspoken desires of our clients to create a visual language unique to their journey.</p>
            </div>
            <div className="group bg-surface-container-lowest p-10 rounded-xl border border-surface-variant/20 hover:border-primary/50 transition-all duration-300">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">forest</span>
              <h4 className="font-headline-md text-2xl mb-4">Sustainable Sourcing</h4>
              <p className="text-on-surface-variant leading-relaxed">We source rare, ethically harvested materials—from ancient Indonesian teak to fine Italian marble—ensuring luxury with a conscience.</p>
            </div>
            <div className="group bg-surface-container-lowest p-10 rounded-xl border border-surface-variant/20 hover:border-primary/50 transition-all duration-300">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">construction</span>
              <h4 className="font-headline-md text-2xl mb-4">Artisan Execution</h4>
              <p className="text-on-surface-variant leading-relaxed">Our master craftsmen bring decades of experience to every joint and finish, blending traditional techniques with modern precision.</p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 md:py-32 px-8 md:px-[64px] max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="font-label-sm text-primary tracking-[0.2em] text-sm mb-4 block">LEADERSHIP</span>
              <h3 className="font-headline-lg text-4xl md:text-5xl">The Visionaries</h3>
            </div>
            <p className="text-on-surface-variant max-w-sm">A collective of architects, designers, and artisans dedicated to the Kalatmaka philosophy.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group">
              <div className="aspect-[3/4] rounded-xl overflow-hidden mb-6 grayscale hover:grayscale-0 transition-all duration-500">
                <img 
                  alt="Arya Wisesa" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzK2jBAknJ2CbU2cOXsnBixo1y1xiZUkATxBaBlaEqHLB9We7I-RquPgAJ2t-BR9OpLl45dbjJnHtkUICJlnZasrRrSTDV2I_txjfV31KPWXSubL3r9XBjvVO8DHRR3hmxVRq9lOz4ZtOtCb5y3hfX6d-j2B9jxRl2CJygt0mUdhfB7HYzRnSoChqh3zWuzbmU5hZeuNieHwv_wfw0I3FdajiYj7B1xsJBoyRNN1SBXF0USPvvWvb4Uy1z6pdbYyCFkXi267YmOcsm"
                />
              </div>
              <h5 className="font-headline-md text-2xl">Arya Wisesa</h5>
              <p className="text-primary font-label-sm text-xs tracking-widest mt-1">FOUNDER & PRINCIPAL</p>
            </div>
            <div className="group">
              <div className="aspect-[3/4] rounded-xl overflow-hidden mb-6 grayscale hover:grayscale-0 transition-all duration-500">
                <img 
                  alt="Maya Sari" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC17dEM8XvRhBusvYtpLgv7aKmWdb8lrBKA04a2pp4-gZrVC4zYuIq1Hqnt19-5poFEylZe8oKFtjQJhq9Glg2nWLyvNLI3oInb2B7ttFwgYRO-ATLH8V61BWwB1H7-J-8Zye_A36ZWwFlOHhgGODoxrUm7fFUYpHMqotQ6cQ8hxgaK3xGO9cvJm0d3LV9oI8tcd73JGGhmgJB1YTGaxiDu97_161whIzOsYr4bdNAtDLT6CATE5Grr_JkSeL4EhqDk13EZbLWnpTCv"
                />
              </div>
              <h5 className="font-headline-md text-2xl">Maya Sari</h5>
              <p className="text-primary font-label-sm text-xs tracking-widest mt-1">HEAD OF DESIGN</p>
            </div>
            <div className="group">
              <div className="aspect-[3/4] rounded-xl overflow-hidden mb-6 grayscale hover:grayscale-0 transition-all duration-500">
                <img 
                  alt="Budi Hartono" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwHW5TpLSDFMb1BdT_YbWJ0WZHrjfGIIilImw-pVXez67bimXYEXl4MneeJcwcDQAEEqOEqmCf5vGWcTgd5jpKrvHQ5Ilt5a3yrORM0v-gXuZxbXjmMy2GaE0WCM6uH0_K4oHrrqK652OCgIyj8kIolyvrNKI-QSwhRbQep_ZnbsJQK1BLefEYChvFxaWbFxKuJNt3HjRoeoIV7DnUgaKAvI-EEEPYg_KsDzu7WHunnqhlo7qYHu9edMcz61XrhnrrQjue7wgvmsKi"
                />
              </div>
              <h5 className="font-headline-md text-2xl">Budi Hartono</h5>
              <p className="text-primary font-label-sm text-xs tracking-widest mt-1">MASTER ARTISAN</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default TentangPage;
