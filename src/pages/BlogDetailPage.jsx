import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import publicContentService from '../services/publicContentService';
import { fallbackBlogs } from '../data/fallbackContent';

const formatDate = (date) => {
  if (!date) return 'Journal';
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
};

const BlogDetailPage = () => {
  const { slug } = useParams();
  const fallback = useMemo(() => fallbackBlogs.find((item) => item.slug === slug) || fallbackBlogs[0], [slug]);
  const [article, setArticle] = useState(fallback);
  const [related, setRelated] = useState(fallbackBlogs.filter((item) => item.slug !== fallback.slug).slice(0, 3));

  useEffect(() => {
    let mounted = true;

    publicContentService.getBlogDetail(slug)
      .then((response) => {
        if (!mounted) return;
        setArticle(response.data?.blog || fallback);
        setRelated(response.data?.related?.length ? response.data.related : fallbackBlogs.filter((item) => item.slug !== slug).slice(0, 3));
      })
      .catch(() => {
        if (!mounted) return;
        setArticle(fallback);
        setRelated(fallbackBlogs.filter((item) => item.slug !== fallback.slug).slice(0, 3));
      });

    return () => {
      mounted = false;
    };
  }, [fallback, slug]);

  return (
    <main className="pb-section-gap">
      <article>
        <header className="px-margin-mobile md:px-margin-desktop max-w-5xl mx-auto pt-12 pb-12 text-center">
          <Link className="font-label-sm uppercase tracking-widest text-primary hover:underline" to="/blog">Back to Journal</Link>
          <p className="text-primary font-label-sm tracking-widest uppercase mt-8 mb-4">{article.category?.name || 'Journal'}</p>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-6">{article.title}</h1>
          <p className="font-body-md text-on-surface-variant">{formatDate(article.created_at)}</p>
        </header>

        <div className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto mb-16">
          <div className="aspect-[21/9] min-h-[320px] rounded-3xl overflow-hidden bg-surface-container">
            <img className="w-full h-full object-cover" alt={article.title} src={article.thumbnail} />
          </div>
        </div>

        <div className="px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto">
          {(article.content || '').split(/\n+/).filter(Boolean).map((paragraph, index) => (
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-7" key={`${paragraph}-${index}`}>{paragraph}</p>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <section className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto mt-section-gap">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-10">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((item) => (
              <Link className="group" key={item.id} to={`/blog/${item.slug}`}>
                <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-surface-container">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} src={item.thumbnail} />
                </div>
                <span className="text-primary font-label-sm text-label-sm uppercase tracking-widest mb-2 block">{item.category?.name || 'Journal'}</span>
                <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">{item.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default BlogDetailPage;
