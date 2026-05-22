import React from 'react';
import { Link } from 'react-router-dom';

const fallbackLogo = 'https://lh3.googleusercontent.com/aida/ADBb0uhubavahsD-k_-FcbumH1121YjUw6OeaEDEK0zfjaWvBAV7KLb3pqOl-OqgsuHgv0W71jaM0Y4dC7wXSz70etiOrWFlYijOahyRui5YtmiZAF1Z5vsAQ7Y-w8cboIgvAASlHlXNRavhHL5NrnlZSMQA2cwQ1Dn2sFvYpCYP8Hf4aBa1kc3tJVmCR_rmceCK65-6CBADCTnQGRtOHTDA5qZv8Ey2Rg0ei142D-eyg5L9DTnLsyDYoQhoLtqeAePoHKuKazemzDiNiw';

const Footer = ({ settings }) => {
  const logo = settings?.light_logo_url || settings?.dark_logo_url || fallbackLogo;
  const studioName = settings?.studio_name || 'Kalatmaka Interior';
  const address = settings?.address || 'Perumtas 3 Blok M6-24, RT 33 RW 08, Desa Kepuh Kemiri, Tulangan, Sidoarjo.';
  const phone = settings?.whatsapp_number || '085128025154';
  const email = settings?.contact_email || 'kalatmaka.id@gmail.com';
  const hours = settings?.business_hours || 'Senin - Sabtu, 08.00 - 17.00 WIB';
  const instagramUrl = settings?.instagram_url || 'https://instagram.com/Kalatmaka.id';
  const tiktokUrl = settings?.tiktok_url || 'https://www.tiktok.com/@kalatmaka.id';
  const whatsappUrl = settings?.whatsapp_link || 'https://wa.me/6285128025154';

  return (
    <footer className="bg-dark-brown text-on-primary-container py-24 px-margin-desktop mt-section-gap border-t border-primary/10">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-1">
            <img alt={`${studioName} Logo`} className="h-16 w-auto object-contain mb-4" src={logo} />
            <p className="text-secondary/70 font-body-md mb-8">{studioName}</p>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-300" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
                <span className="font-bold text-xs">IG</span>
              </a>
              <a className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-300" href={tiktokUrl} target="_blank" rel="noreferrer" aria-label="TikTok">
                <span className="font-bold text-xs">TT</span>
              </a>
              <a className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-300" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <span className="material-symbols-outlined text-[20px]">chat</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-soft-gold uppercase tracking-widest font-label-sm mb-6">Layanan</h4>
            <ul className="space-y-4">
              <li><Link className="text-on-primary-container/80 hover:text-primary transition-colors" to="/katalog">Plafon UPVC / PVC</Link></li>
              <li><Link className="text-on-primary-container/80 hover:text-primary transition-colors" to="/katalog">Wallpanel PVC / WPC</Link></li>
              <li><Link className="text-on-primary-container/80 hover:text-primary transition-colors" to="/katalog">SPC Flooring</Link></li>
              <li><Link className="text-on-primary-container/80 hover:text-primary transition-colors" to="/katalog">Gorden Custom</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-soft-gold uppercase tracking-widest font-label-sm mb-6">Kontak</h4>
            <ul className="space-y-4 text-on-primary-container/80">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">call</span>
                <span>{phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">mail</span>
                <span>{email}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-soft-gold uppercase tracking-widest font-label-sm mb-6">Lokasi</h4>
            <div className="rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 mb-4 h-32 bg-surface-variant/20 flex items-center justify-center">
              <a className="flex items-center gap-2 text-primary font-semibold" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noreferrer">
                <span className="material-symbols-outlined">map</span>
                Lihat di Google Maps
              </a>
            </div>
            <p className="text-label-sm text-on-primary-container/60">{hours}</p>
          </div>
        </div>

        <div className="pt-12 border-t border-primary/10 flex flex-col md:flex-row justify-center items-center gap-8">
          <p className="text-on-primary-container/40 font-body-md">© {new Date().getFullYear()} {studioName}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
