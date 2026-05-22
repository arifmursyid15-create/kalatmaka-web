import React from 'react';

const ProblemSection = () => {
  return (
    <section className="py-section-gap px-margin-desktop bg-surface-container-low">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <span className="text-primary font-label-sm text-label-sm tracking-widest uppercase mb-4 block">Renovasi Lebih Praktis</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">Renovasi Rumah Sering Terasa Merepotkan?</h2>
        </div>
        <div className="lg:col-span-7">
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Mulai dari mencari tukang, memilih bahan, membandingkan harga, hingga memastikan hasil pemasangan rapi - semuanya bisa menyita waktu dan tenaga. Kalatmaka hadir untuk menyederhanakan proses renovasi interior rumah Anda, mulai dari konsultasi kebutuhan, rekomendasi material, hingga pemasangan yang bersih dan profesional.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
