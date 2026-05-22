import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import publicContentService from '../services/publicContentService';
import { fallbackPortfolios } from '../data/fallbackContent';

const PortfolioDetailPage = () => {
  const { slug } = useParams();
  const fallback = useMemo(() => fallbackPortfolios.find((item) => item.slug === slug) || fallbackPortfolios[0], [slug]);
  const [project, setProject] = useState(fallback);

  useEffect(() => {
    let mounted = true;

    publicContentService.getPortfolioDetail(slug)
      .then((response) => {
        if (mounted) setProject(response.data || fallback);
      })
      .catch(() => {
        if (mounted) setProject(fallback);
      });

    return () => {
      mounted = false;
    };
  }, [fallback, slug]);

  const gallery = [project.thumbnail, ...(project.images || [])].filter(Boolean);

  return (
    <main className="pb-section-gap">
      <section className="relative min-h-[560px] flex items-end overflow-hidden">
        <img className="absolute inset-0 w-full h-full object-cover" alt={project.title} src={project.thumbnail} />
        <div className="absolute inset-0 bg-gradient-to-t from-on-primary-fixed/80 via-on-primary-fixed/20 to-transparent"></div>
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto w-full pb-16 text-white">
          <Link className="font-label-sm uppercase tracking-widest text-white/80 hover:text-white" to="/portfolio">Kembali ke Portofolio</Link>
          <h1 className="font-display-lg text-display-lg mt-6 mb-4">{project.title}</h1>
          {project.location && <p className="font-body-lg text-body-lg text-white/80">{project.location}</p>}
        </div>
      </section>

      <section className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto py-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <span className="text-primary font-label-sm tracking-widest uppercase mb-4 block">Cerita Pengerjaan</span>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">{project.description || 'Dokumentasi pengerjaan Kalatmaka akan ditampilkan sebagai referensi model, material, dan finishing.'}</p>
        </div>
        <aside className="lg:col-span-5 bg-surface-container-low rounded-3xl p-8 h-fit">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Detail Pengerjaan</h2>
          <dl className="space-y-5">
            <div>
              <dt className="font-label-sm text-on-surface-variant uppercase tracking-widest">Lokasi</dt>
              <dd className="font-body-lg text-on-surface mt-1">{project.location || 'Indonesia'}</dd>
            </div>
            <div>
              <dt className="font-label-sm text-on-surface-variant uppercase tracking-widest">Lingkup</dt>
              <dd className="font-body-lg text-on-surface mt-1">Material, pemasangan, finishing</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gallery.map((image, index) => (
            <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-surface-container" key={`${image}-${index}`}>
              <img className="w-full h-full object-cover" alt={`${project.title} ${index + 1}`} src={image} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PortfolioDetailPage;
