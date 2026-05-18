import React from 'react';
import { Link } from 'react-router-dom';

const heights = ['h-[400px]', 'h-[300px]', 'h-[732px]', 'h-[300px]', 'h-[400px]'];

const PortfolioCard = ({ item, height }) => (
  <Link to={`/portfolio/${item.slug}`} className="relative overflow-hidden rounded-2xl group shadow-lg block">
    <img
      alt={item.title}
      className={`w-full ${height} object-cover group-hover:scale-110 transition-transform duration-700`}
      src={item.thumbnail}
    />
    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8 backdrop-blur-sm">
      <span className="text-on-primary font-headline-md">{item.title}{item.location ? `, ${item.location}` : ''}</span>
    </div>
  </Link>
);

const PortfolioSection = ({ portfolios = [] }) => {
  const items = portfolios.slice(0, 5);

  return (
    <section className="bg-surface-container-low py-section-gap">
      <div className="px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-primary font-label-sm text-label-sm tracking-widest uppercase mb-4 block">Our Portfolio</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Gallery of Artistic Sanctuaries</h2>
          </div>
          <Link to="/portfolio" className="text-primary border-b-2 border-primary font-semibold pb-1 hover:pb-2 transition-all">View All Works</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-8">
            {items[0] && <PortfolioCard item={items[0]} height={heights[0]} />}
            {items[1] && <PortfolioCard item={items[1]} height={heights[1]} />}
          </div>
          <div className="space-y-8">
            {items[2] && <PortfolioCard item={items[2]} height={heights[2]} />}
          </div>
          <div className="space-y-8">
            {items[3] && <PortfolioCard item={items[3]} height={heights[3]} />}
            {items[4] && <PortfolioCard item={items[4]} height={heights[4]} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
