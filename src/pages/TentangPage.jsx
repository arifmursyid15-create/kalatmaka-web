import React from 'react';

const values = [
  ['Tukang Berpengalaman', 'Tim terbiasa menangani pemasangan plafon UPVC, wallpanel, SPC flooring, dan gorden custom untuk kebutuhan rumah maupun area komersial kecil.'],
  ['Material Distributor Resmi', 'Material dipilih dari sumber resmi agar kualitas bahan lebih terjaga dan sesuai kebutuhan ruangan.'],
  ['Pengerjaan Bersih & Rapi', 'Kami memperhatikan detail finishing, kerapian sambungan, dan kebersihan area kerja selama proses pemasangan.'],
];

const TentangPage = () => {
  return (
    <main className="pb-section-gap">
      <section className="relative min-h-[720px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface z-10"></div>
        <div className="absolute inset-0 opacity-60">
          <img
            alt="Renovasi interior rumah"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMryWHS0zwO9HjTw1XiH_2_FUG1LjQQdzGWM1CpThgRUs6aAlaX9XRXzcO5ojdfNdva4YcrDmJx7un9670-hzQtjUhdk6u8ZmcR0p5TUC9YFjYsNKWIrHsapYesaRWxNrbU7oCepzlKYj0OA9ntB_dAb7T4HqSqREs1D6aDz8TsRZLjxGNqY0SZIxmpGkbF_2JHEV2aeenDhBXf71XxBuSqNQ0boWUaN5K7QvRevJxCVJPxyGnEdY-mVFTkr0UgcqOAuzZYXomQL95"
          />
        </div>
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto pt-20">
          <span className="font-label-sm text-primary tracking-[0.3em] text-sm mb-6 block uppercase">Tentang Kalatmaka</span>
          <h1 className="font-display-lg text-5xl md:text-7xl text-on-surface font-semibold mb-8 leading-tight">Renovasi Interior yang Lebih Praktis dan Terarah</h1>
          <p className="font-body-lg text-xl md:text-2xl text-on-surface-variant leading-relaxed font-light">
            Kalatmaka Interior membantu pemilik rumah memperbarui tampilan ruangan melalui layanan plafon UPVC, wallpanel PVC/WPC, SPC flooring, dan gorden custom.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32 px-8 md:px-[64px] max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-label-sm text-primary tracking-[0.2em] text-sm mb-4 block">Fokus Kami</span>
            <h2 className="font-headline-lg text-4xl md:text-5xl mb-8 leading-snug">Membantu Renovasi Tanpa Harus Repot Mengurus Semuanya Sendiri</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
              Banyak pelanggan ingin rumahnya terlihat lebih rapi dan nyaman, tetapi terkendala mencari tukang yang bisa dipercaya, memilih bahan, membandingkan harga, dan mengatur jadwal pemasangan.
            </p>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              Kalatmaka hadir untuk menyederhanakan proses tersebut, mulai dari konsultasi kebutuhan, rekomendasi material, survey, penawaran harga, pemasangan, hingga pengecekan akhir.
            </p>
          </div>
          <div className="bg-surface-container-low rounded-3xl p-10">
            <h3 className="font-headline-md text-3xl text-on-surface mb-8">Nilai yang Kami Jaga</h3>
            <div className="space-y-8">
              {values.map(([title, description]) => (
                <div key={title}>
                  <h4 className="font-headline-md text-xl text-primary mb-2">{title}</h4>
                  <p className="text-on-surface-variant leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-24 md:py-32 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="material-symbols-outlined text-primary text-5xl mb-8">format_quote</span>
          <blockquote className="font-headline-lg text-3xl md:text-5xl italic text-on-surface leading-tight mb-12">
            "Renovasi yang baik bukan hanya soal tampilan akhir, tetapi juga proses yang jelas, rapi, dan membuat pelanggan merasa tenang."
          </blockquote>
          <cite className="text-primary font-label-sm tracking-widest uppercase not-italic">Kalatmaka Interior</cite>
        </div>
      </section>
    </main>
  );
};

export default TentangPage;
