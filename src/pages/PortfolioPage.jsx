import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import publicContentService, { getItems } from '../services/publicContentService';
import { fallbackPortfolios } from '../data/fallbackContent';

const PortfolioPage = () => {
  const [portfolios, setPortfolios] = useState(fallbackPortfolios);
  const [activeLocation, setActiveLocation] = useState('All Works');

  useEffect(() => {
    let mounted = true;

    publicContentService.getPortfolio()
      .then((response) => {
        const items = getItems(response.data);
        if (mounted) setPortfolios(items.length ? items : fallbackPortfolios);
      })
      .catch(() => {
        if (mounted) setPortfolios(fallbackPortfolios);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const locations = useMemo(() => {
    const names = portfolios.map((item) => item.location).filter(Boolean);
    return ['All Works', ...new Set(names)];
  }, [portfolios]);

  const filtered = activeLocation === 'All Works'
    ? portfolios
    : portfolios.filter((item) => item.location === activeLocation);

  return (
    <>
      <header className="pt-12 pb-20 px-margin-desktop max-w-7xl mx-auto text-center">
        <h1 className="font-display text-display-lg text-primary mb-6">Curated Narratives</h1>
        <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Exploring the intersection of soul and space. Our portfolio is a testament to bespoke Indonesian luxury, where traditional warmth meets contemporary architectural precision.
        </p>
      </header>

      <div className="sticky top-28 z-40 flex justify-center mb-16 px-4">
        <div className="flex gap-2 bg-surface-container-low/40 backdrop-blur-lg p-1.5 rounded-full shadow-sm border border-surface-variant/10 overflow-x-auto no-scrollbar">
          {locations.map((location) => (
            <button
              className={`px-6 py-2 rounded-full font-label text-sm whitespace-nowrap transition-all ${
                activeLocation === location
                  ? 'bg-primary text-on-primary'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
              key={location}
              onClick={() => setActiveLocation(location)}
              type="button"
            >
              {location}
            </button>
          ))}
        </div>
      </div>

      <main className="px-margin-desktop max-w-7xl mx-auto mb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <Link
              className="group relative overflow-hidden rounded-xl bg-surface-container shadow-[0_8px_32px_0_rgba(141,110,99,0.08)] cursor-pointer aspect-[3/4]"
              key={project.id}
              to={`/portfolio/${project.slug}`}
            >
              <img alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" src={project.thumbnail} />
              <div className="absolute inset-0 bg-primary-container/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-center px-6 backdrop-blur-[2px]">
                <span className="text-on-primary-container font-display text-2xl mb-2">{project.title}</span>
                {project.location && <span className="text-on-primary-container/80 font-body text-sm mb-4">{project.location}</span>}
                <span className="text-on-primary-container font-label text-xs border border-on-primary-container/30 px-5 py-1.5 rounded-full tracking-widest uppercase">View Project</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export default PortfolioPage;
