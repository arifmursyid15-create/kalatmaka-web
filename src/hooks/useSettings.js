import { useEffect, useState } from 'react';
import api from '../api/axios';

const fallbackSettings = {
  studio_name: 'Kalatmaka Interior Design',
  contact_email: 'hello@kalatmaka.design',
  whatsapp_number: '+62 812 3456 7890',
  business_hours: 'Mon-Fri, 09:00 - 18:00',
  address: 'Jl. Dharmawangsa X No. 12, Kebayoran Baru, Jakarta Selatan, 12160, Indonesia',
  whatsapp_link: 'https://wa.me/6281234567890',
  consult_link: '/kontak',
  instagram_url: 'https://instagram.com/kalatmaka.design',
  linkedin_url: 'https://linkedin.com/company/kalatmaka',
  pinterest_url: 'https://pinterest.com/kalatmaka',
  dark_logo_url: '',
  light_logo_url: '',
  favicon_url: '',
  meta_title: 'Kalatmaka Interior Design',
  meta_description: 'Luxury interior design and architectural surfaces.',
  maintenance_mode: false,
};

const useSettings = () => {
  const [settings, setSettings] = useState(fallbackSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    api.get('/settings')
      .then((response) => {
        if (isMounted) {
          setSettings({ ...fallbackSettings, ...response.data });
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
