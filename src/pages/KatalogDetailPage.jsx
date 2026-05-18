import React, { useEffect, useMemo, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import publicContentService from '../services/publicContentService';
import { fallbackKatalog } from '../data/fallbackContent';

const formatPrice = (price) => {
  if (!price) return 'Harga konsultasi';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(price));
};

const KatalogDetailPage = () => {
  const { slug } = useParams();
  const { settings } = useOutletContext() || {};
  const fallback = useMemo(() => fallbackKatalog.find((item) => item.slug === slug) || fallbackKatalog[0], [slug]);
  const [product, setProduct] = useState(fallback);

  useEffect(() => {
    let mounted = true;

    publicContentService.getKatalogDetail(slug)
      .then((response) => {
        if (mounted) setProduct(response.data || fallback);
      })
      .catch(() => {
        if (mounted) setProduct(fallback);
      });

    return () => {
      mounted = false;
    };
  }, [fallback, slug]);

  const images = [product.thumbnail, ...(product.images || [])].filter(Boolean);
  const consultLink = settings?.whatsapp_link || settings?.consult_link || '/kontak';

  return (
    <main className="pb-section-gap">
      <section className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto pt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-surface-container">
            <img className="w-full h-full object-cover" alt={product.title} src={product.thumbnail} />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-3 gap-4">
              {images.slice(1, 4).map((image, index) => (
                <div className="aspect-square rounded-2xl overflow-hidden bg-surface-container" key={`${image}-${index}`}>
                  <img className="w-full h-full object-cover" alt={`${product.title} ${index + 2}`} src={image} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-32">
          <Link className="font-label-sm uppercase tracking-widest text-primary hover:underline" to="/katalog">Back to Catalog</Link>
          <p className="text-primary font-label-sm tracking-widest uppercase mt-8 mb-4">{product.category?.name || 'Interior Material'}</p>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-6">{product.title}</h1>
          <p className="font-headline-md text-primary font-bold mb-8">{formatPrice(product.price)}</p>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-10">{product.description}</p>
          {product.spesifikasi && (
            <div className="bg-surface-container-low rounded-3xl p-8 mb-10">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Specification</h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed whitespace-pre-line">{product.spesifikasi}</p>
            </div>
          )}
          <a className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-full font-label-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all" href={consultLink} rel="noreferrer" target={consultLink.startsWith('http') ? '_blank' : undefined}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
            Ask via WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
};

export default KatalogDetailPage;
