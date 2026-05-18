import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import publicContentService, { getItems } from '../services/publicContentService';
import { fallbackKatalog } from '../data/fallbackContent';

const formatPrice = (price) => {
  if (!price) return 'Harga konsultasi';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(price));
};

const badgeLabel = {
  best_seller: 'Best Seller',
  promo: 'Promo',
  new: 'New',
};

const KatalogPage = () => {
  const [products, setProducts] = useState(fallbackKatalog);
  const [activeCategory, setActiveCategory] = useState('All Collections');

  useEffect(() => {
    let mounted = true;

    publicContentService.getKatalog()
      .then((response) => {
        const items = getItems(response.data);
        if (mounted) setProducts(items.length ? items : fallbackKatalog);
      })
      .catch(() => {
        if (mounted) setProducts(fallbackKatalog);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const names = products.map((item) => item.category?.name).filter(Boolean);
    return ['All Collections', ...new Set(names)];
  }, [products]);

  const filtered = activeCategory === 'All Collections'
    ? products
    : products.filter((item) => item.category?.name === activeCategory);

  return (
    <main className="pt-12 pb-section-gap">
      <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-primary font-label-sm tracking-widest uppercase mb-4 block">Curated Materials</span>
            <h1 className="font-display-lg text-display-lg text-on-surface mb-6 leading-tight">The Soul of <br /><span className="italic font-normal">Interior Artistry</span></h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Explore our exquisite collection of architectural surfaces, from handcrafted wallpanels to sustainable premium flooring, designed for the modern Indonesian home.</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop mb-12 overflow-x-auto pb-4 no-scrollbar">
        <div className="flex items-center gap-4 min-w-max">
          {categories.map((category) => (
            <button
              className={`px-8 py-3 rounded-full font-label-sm transition-all ${
                activeCategory === category
                  ? 'bg-primary text-on-primary shadow-md'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
              }`}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((product) => (
            <Link
              className="group bg-surface-container-lowest rounded-[24px] overflow-hidden shadow-[0_8px_32px_0_rgba(141,110,99,0.05)] border border-surface-variant/20 hover:scale-[1.02] transition-all duration-300 flex flex-col"
              key={product.id}
              to={`/katalog/${product.slug}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={product.thumbnail} />
                {badgeLabel[product.badge] && (
                  <span className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">{badgeLabel[product.badge]}</span>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2 gap-3">
                  <h3 className="font-headline-md text-headline-md text-on-surface leading-tight">{product.title}</h3>
                  <span className="material-symbols-outlined text-primary">arrow_forward</span>
                </div>
                <p className="font-body-md text-on-surface-variant mb-4">{product.category?.name || 'Interior Material'}</p>
                <div className="flex items-center justify-between mt-auto">
                  <p className="font-headline-md text-primary font-bold">{formatPrice(product.price)}</p>
                  <span className="flex items-center justify-center bg-[#25D366] text-white p-3 rounded-full">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default KatalogPage;
