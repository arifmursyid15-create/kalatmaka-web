import React from 'react';

const packages = [
  { name: 'Essential', model: 'Plafon Polos', price: 'mulai Rp 200.000/m2' },
  { name: 'Signature', model: 'Variasi 1 Level', price: 'mulai Rp 250.000/m2' },
  { name: 'Prestige', model: 'Full Variasi 1-2 Level', price: 'mulai Rp 300.000/m2' },
];

const PricingSection = () => {
  return (
    <section className="py-section-gap px-margin-desktop bg-surface-container-low">
      <div className="max-w-container-max mx-auto">
        <div className="max-w-3xl mb-14">
          <span className="text-primary font-label-sm text-label-sm tracking-widest uppercase mb-4 block">Estimasi Biaya</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">Pilihan Paket & Estimasi Harga</h2>
          <p className="text-on-surface-variant font-body-lg text-body-lg">
            Harga menyesuaikan jenis material, model, luas area, dan kondisi lapangan. Konsultasikan kebutuhan Anda untuk mendapatkan estimasi yang lebih akurat.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {packages.map((item) => (
            <div className="bg-surface-container-lowest rounded-2xl border border-surface-variant/30 p-8" key={item.name}>
              <p className="text-primary font-label-sm uppercase tracking-widest mb-4">{item.name}</p>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-3">{item.model}</h3>
              <p className="font-headline-md text-primary font-bold">{item.price}</p>
            </div>
          ))}
        </div>
        <p className="text-on-surface-variant mb-8">
          Harga dapat berubah sesuai kondisi lapangan, pilihan material, tingkat variasi, dan luas area pemasangan.
        </p>
        <a className="inline-flex bg-primary text-on-primary px-10 py-4 rounded-full font-label-sm uppercase tracking-widest hover:scale-105 transition-all" href="https://wa.me/6285128025154" target="_blank" rel="noreferrer">
          Minta Estimasi Harga via WhatsApp
        </a>
      </div>
    </section>
  );
};

export default PricingSection;
