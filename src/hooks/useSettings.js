import { useEffect, useState } from 'react';
import api from '../api/axios';

const fallbackSettings = {
  studio_name: 'Kalatmaka Interior',
  contact_email: 'kalatmaka.id@gmail.com',
  whatsapp_number: '085128025154',
  business_hours: 'Senin - Sabtu, 08.00 - 17.00 WIB',
  address: 'Perumtas 3 Blok M6-24, RT 33 RW 08, Desa Kepuh Kemiri, Tulangan, Sidoarjo.',
  whatsapp_link: 'https://wa.me/6285128025154',
  consult_link: '/kontak',
  instagram_url: 'https://instagram.com/Kalatmaka.id',
  tiktok_url: 'https://www.tiktok.com/@kalatmaka.id',
  linkedin_url: '',
  pinterest_url: '',
  dark_logo_url: '',
  light_logo_url: '',
  favicon_url: '',
  meta_title: 'Kalatmaka Interior | Jasa Plafon UPVC, Wallpanel, SPC Flooring & Gorden',
  meta_description: 'Jasa interior rumahan untuk plafon UPVC, wallpanel PVC/WPC, SPC flooring, dan gorden custom di Sidoarjo, Surabaya, dan sekitarnya. Pengerjaan rapi, material resmi, dan bergaransi.',
  maintenance_mode: false,
};

const officialSettings = {
  studio_name: fallbackSettings.studio_name,
  contact_email: fallbackSettings.contact_email,
  whatsapp_number: fallbackSettings.whatsapp_number,
  address: fallbackSettings.address,
  whatsapp_link: fallbackSettings.whatsapp_link,
  instagram_url: fallbackSettings.instagram_url,
  tiktok_url: fallbackSettings.tiktok_url,
  meta_title: fallbackSettings.meta_title,
  meta_description: fallbackSettings.meta_description,
};

const useSettings = () => {
  const [settings, setSettings] = useState(fallbackSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    api.get('/settings')
      .then((response) => {
        if (isMounted) {
          setSettings({ ...fallbackSettings, ...response.data, ...officialSettings });
        }
      })
      .catch(() => {
        if (isMounted) {
          setSettings(fallbackSettings);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { settings, loading };
};

export default useSettings;
