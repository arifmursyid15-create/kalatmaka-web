import React from 'react';
import { Link } from 'react-router-dom';

const CatalogPreviewSection = ({ products = [] }) => {
  return (
    <section className="py-section-gap px-margin-desktop max-w-container-max mx-auto">
      <div className="flex items-center justify-between mb-12">
        <h2 className="font-headline-lg text-headline-lg">Signature Materials</h2>
        <div className="flex gap-4">
          <button className="w-12 h-12 rounded-full border border-outline flex items-center justify-center hover:bg-primary hover:text-white transition-all">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-12 h-12 rounded-full border border-outline flex items-center justify-center hover:bg-primary hover:text-white transition-all">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
      <div className="flex gap-gutter overflow-x-auto no-scrollbar pb-8">
        {products.map((product) => (
          <Link to={`/katalog/${product.slug}`} className="min-w-[300px] group" key={product.id}>
            <div className="aspect-square bg-surface-container rounded-3xl overflow-hidden mb-6">
              <img
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src={product.thumbnail}
              />
            </div>
            <h4 className="font-headline-md text-primary mb-1">{product.title}</h4>
            <p className="text-on-surface-variant font-label-sm tracking-wide uppercase">{product.category?.name || 'Signature Material'}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CatalogPreviewSection;
