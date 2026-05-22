import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import publicContentService, { getItems } from '../services/publicContentService';
import { fallbackBlogs } from '../data/fallbackContent';

const formatDate = (date) => {
  if (!date) return 'Journal';
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
};

const BlogPage = () => {
  const [articles, setArticles] = useState(fallbackBlogs);
  const [activeCategory, setActiveCategory] = useState('Semua Artikel');
  const [search, setSearch] = useState('');

  useEffect(() => {
    let mounted = true;

    publicContentService.getBlog()
      .then((response) => {
        const items = getItems(response.data);
        if (mounted) setArticles(items.length ? items : fallbackBlogs);
      })
      .catch(() => {
        if (mounted) setArticles(fallbackBlogs);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const names = articles.map((item) => item.category?.name).filter(Boolean);
    return ['Semua Artikel', ...new Set(names)];
  }, [articles]);

  const filtered = articles.filter((article) => {
    const categoryMatch = activeCategory === 'Semua Artikel' || article.category?.name === activeCategory;
    const keyword = search.trim().toLowerCase();
    const searchMatch = !keyword || article.title?.toLowerCase().includes(keyword) || article.content?.toLowerCase().includes(keyword);
    return categoryMatch && searchMatch;
  });

  const featured = filtered[0] || articles[0];
  const remaining = filtered.filter((item) => item.id !== featured?.id);
  const topCards = remaining.slice(0, 3);
  const moreArticles = remaining.slice(3);

  return (
    <main className="pt-12 pb-section-gap">
      {featured && (
        <section className="px-margin-desktop max-w-7xl mx-auto mb-section-gap">
          <Link to={`/blog/${featured.slug}`} className="relative rounded-3xl overflow-hidden aspect-[21/9] min-h-[360px] shadow-lg group block">
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt={featured.title}
              src={featured.thumbnail}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-primary-fixed/80 via-transparent to-transparent flex flex-col justify-end p-6 md:p-12">
              <div className="max-w-2xl">
                <span className="bg-primary/20 backdrop-blur-md text-white border border-white/20 px-4 py-1 rounded-full font-label-sm text-label-sm mb-4 inline-block">{featured.category?.name || 'Journal'}</span>
                <h1 className="font-display-lg text-4xl md:text-display-lg text-white mb-6">{featured.title}</h1>
                <div className="flex items-center gap-4 text-white/90 font-body-md text-body-md">
                  <span>{formatDate(featured.created_at)}</span>
                  <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                  <span>Baca artikel</span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      <section className="px-margin-desktop max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-wrap gap-4 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
          {categories.map((category) => (
            <button
              className={`px-6 py-2 rounded-full font-body-md text-body-md transition-all whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-primary text-on-primary'
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
        <div className="relative w-full md:w-72">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-full focus:ring-2 focus:ring-primary/20 text-body-md placeholder:text-on-surface-variant/50"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari artikel..."
            type="text"
            value={search}
          />
        </div>
      </section>

      <section className="px-margin-desktop max-w-7xl mx-auto mb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {topCards[0] && (
            <article className="md:col-span-8 group">
              <Link to={`/blog/${topCards[0].slug}`} className="rounded-3xl overflow-hidden bg-surface-container-lowest shadow-[0_8px_32px_0_rgba(141,110,99,0.08)] transition-all duration-300 hover:scale-[1.01] h-full flex flex-col">
                <div className="aspect-[16/9] overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={topCards[0].title} src={topCards[0].thumbnail} />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-primary font-label-sm text-label-sm uppercase tracking-widest">{topCards[0].category?.name || 'Journal'}</span>
                    <span className="text-on-surface-variant/40 font-label-sm text-label-sm">{formatDate(topCards[0].created_at)}</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4 group-hover:text-primary transition-colors">{topCards[0].title}</h2>
                  <p className="text-on-surface-variant font-body-md text-body-md line-clamp-3 mb-6">{topCards[0].meta_description || topCards[0].content}</p>
                  <span className="font-label-sm text-primary mt-auto uppercase tracking-widest">Baca Selengkapnya</span>
                </div>
              </Link>
            </article>
          )}

          <div className="md:col-span-4 flex flex-col gap-8">
            {topCards.slice(1, 3).map((article) => (
              <article className="group" key={article.id}>
                <Link to={`/blog/${article.slug}`} className="rounded-2xl overflow-hidden bg-surface-container-lowest shadow-md transition-all hover:shadow-lg flex flex-col h-full">
                  <div className="aspect-[4/3] md:aspect-square overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={article.title} src={article.thumbnail} />
                  </div>
                  <div className="p-6 flex-grow">
                    <span className="text-primary font-label-sm text-label-sm uppercase tracking-widest mb-2 block">{article.category?.name || 'Journal'}</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">{article.title}</h3>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-container/20 py-24 mb-section-gap">
        <div className="px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto text-center">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Butuh Rekomendasi Material?</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">Konsultasikan kebutuhan plafon UPVC, wallpanel, SPC flooring, atau gorden custom langsung melalui WhatsApp.</p>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(event) => event.preventDefault()}>
            <input className="flex-grow px-8 py-4 rounded-full bg-surface border-none focus:ring-2 focus:ring-primary/20 text-body-md" placeholder="Tulis kebutuhan ruangan Anda" type="text" />
            <a className="bg-primary text-on-primary px-10 py-4 rounded-full font-body-md text-body-md font-semibold hover:scale-105 active:scale-95 transition-all" href="https://wa.me/6285128025154" target="_blank" rel="noreferrer">Chat WhatsApp</a>
          </form>
        </div>
      </section>

      {moreArticles.length > 0 && (
        <section className="px-margin-desktop max-w-7xl mx-auto mb-section-gap">
          <h2 className="font-headline-lg text-headline-lg mb-12">Artikel Lainnya</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {moreArticles.map((article) => (
              <Link className="group" key={article.id} to={`/blog/${article.slug}`}>
                <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-6 shadow-md">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={article.title} src={article.thumbnail} />
                </div>
                <span className="text-primary font-label-sm text-label-sm uppercase tracking-widest mb-2 block">{article.category?.name || 'Journal'}</span>
                <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors mb-3">{article.title}</h3>
                <p className="text-on-surface-variant font-body-md text-body-md line-clamp-2">{article.meta_description || article.content}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default BlogPage;
