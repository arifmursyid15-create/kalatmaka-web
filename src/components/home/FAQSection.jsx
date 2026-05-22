import React from 'react';

const faqs = [
  ['Apakah bisa konsultasi dulu?', 'Bisa. Anda dapat berkonsultasi melalui WhatsApp untuk menyesuaikan kebutuhan, model, material, dan estimasi budget.'],
  ['Apakah harga sudah termasuk bahan dan pemasangan?', 'Untuk paket tertentu, harga sudah termasuk material dan pemasangan. Detail harga akan disesuaikan dengan jenis bahan, luas area, model, dan kondisi lapangan.'],
  ['Apakah ada garansi?', 'Ada garansi pemasangan hingga 6 bulan dengan syarat dan ketentuan berlaku.'],
  ['Apakah harus pindah rumah saat pemasangan?', 'Tidak selalu. Untuk pekerjaan tertentu seperti plafon UPVC, wallpanel, SPC flooring, dan gorden, proses pemasangan dapat dilakukan lebih praktis dengan area kerja yang dijaga tetap rapi.'],
  ['Apakah bisa request model?', 'Bisa. Anda bisa mengirimkan referensi model atau berkonsultasi terlebih dahulu untuk menyesuaikan pilihan material dan tampilan ruangan.'],
  ['Area layanan Kalatmaka di mana?', 'Kalatmaka melayani area Sidoarjo, Surabaya, dan sekitarnya. Untuk area di luar itu, silakan konsultasikan terlebih dahulu melalui WhatsApp.'],
];

const FAQSection = () => {
  return (
    <section className="py-section-gap px-margin-desktop bg-surface-container-low">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-primary font-label-sm text-label-sm tracking-widest uppercase mb-4 block">FAQ</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Pertanyaan yang Sering Diajukan</h2>
        </div>
        <div className="space-y-4">
          {faqs.map(([question, answer]) => (
            <details className="bg-surface-container-lowest rounded-2xl border border-surface-variant/30 p-6 group" key={question}>
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-headline-md text-xl text-on-surface">
                {question}
                <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="text-on-surface-variant leading-relaxed mt-4">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
