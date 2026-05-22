import React from 'react';

const reasons = [
  {
    icon: 'engineering',
    title: 'Tukang Berpengalaman',
    description: 'Pengerjaan dilakukan oleh tenaga yang sudah terbiasa menangani proyek interior rumah, mulai dari plafon, wallpanel, lantai, hingga gorden.',
  },
  {
    icon: 'verified',
    title: 'Material Berkualitas',
    description: 'Kami menggunakan material dari distributor resmi agar kualitas bahan lebih terjaga dan sesuai kebutuhan ruangan.',
  },
  {
    icon: 'cleaning_services',
    title: 'Pengerjaan Rapi & Bersih',
    description: 'Proses pemasangan dilakukan dengan memperhatikan kerapian finishing dan kebersihan area kerja.',
  },
  {
    icon: 'workspace_premium',
    title: 'Garansi Pemasangan',
    description: 'Setiap pemasangan mendapatkan garansi hingga 6 bulan dengan syarat dan ketentuan berlaku.',
  },
  {
    icon: 'receipt_long',
    title: 'Harga Transparan',
    description: 'Estimasi biaya disesuaikan dengan jenis material, luas area, model, dan kondisi lapangan.',
  },
  {
    icon: 'handyman',
    title: 'Renovasi Lebih Praktis',
    description: 'Anda tidak perlu repot mencari bahan dan tukang sendiri. Kalatmaka membantu proses dari konsultasi hingga pemasangan.',
  },
];

const WhyChooseSection = () => {
  return (
    <section className="py-section-gap px-margin-desktop max-w-container-max mx-auto">
      <div className="max-w-3xl mb-14">
        <span className="text-primary font-label-sm text-label-sm tracking-widest uppercase mb-4 block">Kenapa Kalatmaka</span>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Kenapa Memilih Kalatmaka?</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason) => (
          <div className="bg-surface-container-lowest border border-surface-variant/30 rounded-2xl p-8" key={reason.title}>
            <span className="material-symbols-outlined text-primary text-4xl mb-6 block">{reason.icon}</span>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-4">{reason.title}</h3>
            <p className="text-on-surface-variant leading-relaxed">{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseSection;
