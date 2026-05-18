import React from 'react';
import { Link } from 'react-router-dom';

const fallbackLogo = 'https://lh3.googleusercontent.com/aida/ADBb0uhubavahsD-k_-FcbumH1121YjUw6OeaEDEK0zfjaWvBAV7KLb3pqOl-OqgsuHgv0W71jaM0Y4dC7wXSz70etiOrWFlYijOahyRui5YtmiZAF1Z5vsAQ7Y-w8cboIgvAASlHlXNRavhHL5NrnlZSMQA2cwQ1Dn2sFvYpCYP8Hf4aBa1kc3tJVmCR_rmceCK65-6CBADCTnQGRtOHTDA5qZv8Ey2Rg0ei142D-eyg5L9DTnLsyDYoQhoLtqeAePoHKuKazemzDiNiw';

const Footer = ({ settings }) => {
  const logo = settings?.light_logo_url || settings?.dark_logo_url || fallbackLogo;
  const studioName = settings?.studio_name || 'Kalatmaka Interior';
  const address = settings?.address || 'Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan';
  const phone = settings?.whatsapp_number || '+62 811 2345 6789';
  const email = settings?.contact_email || 'hello@kalatmaka.id';
  const hours = settings?.business_hours || 'Open Daily: 09:00 - 20:00 WIB';
  const instagramUrl = settings?.instagram_url || '#';
  const linkedinUrl = settings?.linkedin_url || '#';
  const pinterestUrl = settings?.pinterest_url || '#';
  const whatsappUrl = settings?.whatsapp_link || '#';

  return (
    <footer className="bg-dark-brown text-on-primary-container py-24 px-margin-desktop mt-section-gap border-t border-primary/10">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-1">
            <div className="font-headline-md text-primary font-bold mb-4">
              <img
                alt={`${studioName} Logo`}
                className="h-16 w-auto object-contain mb-2"
                src={logo}
              />
            </div>
            <p className="text-secondary/70 font-body-md mb-8 italic">{studioName}</p>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-300" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
                <span className="font-bold text-xs">IG</span>
              </a>
              <a className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-300" href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <span className="font-bold text-xs">LI</span>
              </a>
              <a className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-300" href={pinterestUrl} target="_blank" rel="noreferrer" aria-label="Pinterest">
                <span className="font-bold text-xs">PT</span>
              </a>
              <a className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-300" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <span className="material-symbols-outlined text-[20px]">chat</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-soft-gold uppercase tracking-widest font-label-sm mb-6">Discover</h4>
            <ul className="space-y-4">
              <li><Link className="text-on-primary-container/80 hover:text-primary transition-colors" to="/portfolio">The Gallery</Link></li>
              <li><Link className="text-on-primary-container/80 hover:text-primary transition-colors" to="/katalog">Our Services</Link></li>
              <li><Link className="text-on-primary-container/80 hover:text-primary transition-colors" to="/blog">The Journal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-soft-gold uppercase tracking-widest font-label-sm mb-6">Connect</h4>
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
            <h4 className="text-soft-gold uppercase tracking-widest font-label-sm mb-6">Studio</h4>
            <div className="rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 mb-4 h-32 bg-surface-variant/20 flex items-center justify-center">
              <a className="flex items-center gap-2 text-primary font-semibold" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noreferrer">
                <span className="material-symbols-outlined">map</span>
                View on Google Maps
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
