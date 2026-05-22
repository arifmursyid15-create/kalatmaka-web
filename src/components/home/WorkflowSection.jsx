import React from 'react';

const steps = [
  ['Konsultasi Kebutuhan', 'Ceritakan kebutuhan ruangan, area yang ingin direnovasi, dan referensi model yang diinginkan.'],
  ['Survey & Pengukuran', 'Tim akan membantu mengecek ukuran dan kondisi area agar estimasi lebih akurat.'],
  ['Penawaran Harga', 'Kami berikan estimasi biaya berdasarkan material, model, luas area, dan tingkat kesulitan.'],
  ['DP & Jadwal Pengerjaan', 'Setelah penawaran disetujui, pelanggan melakukan DP dan jadwal pengerjaan ditentukan.'],
  ['Pemasangan', 'Tim melakukan pemasangan dengan memperhatikan kerapian, kebersihan, dan detail finishing.'],
  ['Finishing & Garansi', 'Setelah pekerjaan selesai, dilakukan pengecekan akhir dan garansi pemasangan berlaku sesuai ketentuan.'],
];

const WorkflowSection = () => {
  return (
    <section className="py-section-gap px-margin-desktop max-w-container-max mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-primary font-label-sm text-label-sm tracking-widest uppercase mb-4 block">Proses Kerja</span>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Alur Pengerjaan</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map(([title, description], index) => (
          <div className="border border-surface-variant/30 rounded-2xl p-8 bg-surface-container-lowest" key={title}>
            <span className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold mb-6">{index + 1}</span>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-4">{title}</h3>
            <p className="text-on-surface-variant leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkflowSection;
