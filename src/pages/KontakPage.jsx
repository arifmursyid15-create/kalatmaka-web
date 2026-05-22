import { useOutletContext } from 'react-router-dom';

const KontakPage = () => {
  const { settings } = useOutletContext() || {};
  const whatsappLink = settings?.whatsapp_link || 'https://wa.me/6285128025154';
  const address = settings?.address || 'Perumtas 3 Blok M6-24, RT 33 RW 08, Desa Kepuh Kemiri, Tulangan, Sidoarjo.';
  const phone = settings?.whatsapp_number || '085128025154';
  const email = settings?.contact_email || 'kalatmaka.id@gmail.com';

  return (
    <main className="pt-12 pb-section-gap px-margin-mobile md:px-margin-desktop">
      <section className="max-w-5xl mx-auto text-center mb-16">
        <span className="text-primary font-label-sm tracking-widest uppercase mb-4 block">Kontak Kalatmaka</span>
        <h1 className="font-display-lg text-display-lg text-on-surface mb-6">Konsultasi Renovasi Interior Tanpa Ribet</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto">
          Ceritakan kebutuhan plafon UPVC, wallpanel, SPC flooring, atau gorden custom Anda. Tim Kalatmaka akan membantu memberi arahan material, model, dan estimasi pengerjaan.
        </p>
      </section>

      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface-container-lowest border border-surface-variant/30 rounded-3xl p-8">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Hubungi Kami</h2>
          <div className="space-y-5 text-on-surface-variant">
            <p className="flex gap-3"><span className="material-symbols-outlined text-primary">call</span>{phone}</p>
            <p className="flex gap-3"><span className="material-symbols-outlined text-primary">mail</span>{email}</p>
            <p className="flex gap-3"><span className="material-symbols-outlined text-primary">location_on</span>{address}</p>
          </div>
          <a className="mt-8 inline-flex bg-primary text-on-primary px-8 py-4 rounded-full font-label-sm uppercase tracking-widest" href={whatsappLink} target="_blank" rel="noreferrer">
            Konsultasi Gratis via WhatsApp
          </a>
        </div>
        <div className="bg-surface-container-low rounded-3xl p-8">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Yang Bisa Dikonsultasikan</h2>
          <ul className="space-y-4 text-on-surface-variant">
            <li>Plafon UPVC / PVC untuk rumah dan area komersial kecil.</li>
            <li>Wallpanel PVC / WPC untuk ruang tamu, kamar, dan backdrop TV.</li>
            <li>SPC flooring motif kayu yang praktis dan nyaman.</li>
            <li>Gorden custom sesuai ukuran, warna, dan kebutuhan ruangan.</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default KontakPage;
