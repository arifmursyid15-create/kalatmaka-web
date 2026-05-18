import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import portfolioService from '../../services/portfolioService';
import katalogService from '../../services/katalogService';
import blogService from '../../services/blogService';
import testimonialService from '../../services/testimonialService';
import categoryService from '../../services/categoryService';
import bannerService from '../../services/bannerService';

const emptyDashboard = {
  portfolio: [],
  katalog: [],
  blog: [],
  testimonials: [],
  categories: [],
  banners: [],
  totals: {
    portfolio: 0,
    katalog: 0,
    blog: 0,
    testimonials: 0,
    categories: 0,
    banners: 0,
  },
};

const getPayloadItems = (payload) => {
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload)) return payload;
  return [];
};

const getPayloadTotal = (payload) => {
  if (typeof payload?.total === 'number') return payload.total;
  if (Array.isArray(payload)) return payload.length;
  if (Array.isArray(payload?.data)) return payload.data.length;
  return 0;
};

const AdminDashboardPage = () => {
  const [dashboard, setDashboard] = useState(emptyDashboard);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError('');

      const [
        portfolioResponse,
        katalogResponse,
        blogResponse,
        testimonialResponse,
        categoryResponse,
        bannerResponse,
      ] = await Promise.all([
        portfolioService.getAll(),
        katalogService.getAll(),
        blogService.getAll(),
        testimonialService.getAll(),
        categoryService.getAll(),
        bannerService.getAll(),
      ]);

      const portfolioPayload = portfolioResponse.data;
      const katalogPayload = katalogResponse.data;
      const blogPayload = blogResponse.data;
      const testimonialPayload = testimonialResponse.data;
      const categoryPayload = categoryResponse.data;
      const bannerPayload = bannerResponse.data;

      setDashboard({
        portfolio: getPayloadItems(portfolioPayload),
        katalog: getPayloadItems(katalogPayload),
        blog: getPayloadItems(blogPayload),
        testimonials: getPayloadItems(testimonialPayload),
        categories: getPayloadItems(categoryPayload),
        banners: getPayloadItems(bannerPayload),
        totals: {
          portfolio: getPayloadTotal(portfolioPayload),
          katalog: getPayloadTotal(katalogPayload),
          blog: getPayloadTotal(blogPayload),
          testimonials: getPayloadTotal(testimonialPayload),
          categories: getPayloadTotal(categoryPayload),
          banners: getPayloadTotal(bannerPayload),
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memuat dashboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const activeCounts = useMemo(() => ({
    portfolio: dashboard.portfolio.filter((item) => item.is_active).length,
    katalog: dashboard.katalog.filter((item) => item.is_active).length,
    blog: dashboard.blog.filter((item) => item.is_active).length,
    testimonials: dashboard.testimonials.filter((item) => item.is_active).length,
    banners: dashboard.banners.filter((item) => item.is_active).length,
  }), [dashboard]);

  const latestActivity = useMemo(() => {
    const rows = [
      ...dashboard.portfolio.map((item) => ({ type: 'Portfolio', title: item.title, date: item.created_at, icon: 'architecture' })),
      ...dashboard.katalog.map((item) => ({ type: 'Catalog', title: item.title, date: item.created_at, icon: 'menu_book' })),
      ...dashboard.blog.map((item) => ({ type: 'Blog', title: item.title, date: item.created_at, icon: 'article' })),
      ...dashboard.testimonials.map((item) => ({ type: 'Testimonial', title: item.name, date: item.created_at, icon: 'reviews' })),
      ...dashboard.banners.map((item) => ({ type: 'Banner', title: item.title, date: item.created_at, icon: 'view_carousel' })),
    ];

    return rows
      .filter((row) => row.date)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 6);
  }, [dashboard]);

  const latestBlog = dashboard.blog.slice(0, 2);
  const latestProducts = dashboard.katalog.slice(0, 4);

  return (
    <div className="p-10 max-w-[1440px] mx-auto w-full space-y-8">
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-headline-md text-[#3B2A23]">Dashboard Overview</h2>
          <p className="font-body-md text-gray-500">A live summary from your current backend content.</p>
        </div>
        <button
          onClick={fetchDashboard}
          className="bg-[#3B2A23] text-white font-body-md font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#2A1F18] transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined">refresh</span>
          Refresh
        </button>
      </section>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <span className="font-label-caps text-gray-500">Total Portfolio</span>
            <span className="material-symbols-outlined text-gray-400">architecture</span>
          </div>
          <div>
            <p className="font-headline-sm text-[#3B2A23]">{loading ? '...' : dashboard.totals.portfolio}</p>
            <p className="text-xs text-gray-500 font-semibold">{activeCounts.portfolio} published on site</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <span className="font-label-caps text-gray-500">Total Products</span>
            <span className="material-symbols-outlined text-gray-400">shopping_bag</span>
          </div>
          <div>
            <p className="font-headline-sm text-[#3B2A23]">{loading ? '...' : dashboard.totals.katalog}</p>
            <p className="text-xs text-gray-500 font-semibold">{activeCounts.katalog} visible catalog items</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <span className="font-label-caps text-gray-500">Total Articles</span>
            <span className="material-symbols-outlined text-gray-400">history_edu</span>
          </div>
          <div>
            <p className="font-headline-sm text-[#3B2A23]">{loading ? '...' : dashboard.totals.blog}</p>
            <p className="text-xs text-gray-500 font-semibold">{activeCounts.blog} published articles</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <span className="font-label-caps text-gray-500">Testimonials</span>
            <span className="material-symbols-outlined text-[#C6A77D]">star</span>
          </div>
          <div>
            <p className="font-headline-sm text-[#3B2A23]">{loading ? '...' : dashboard.totals.testimonials}</p>
            <p className="text-xs text-gray-500 font-semibold">{activeCounts.testimonials} visible reviews</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="font-label-caps text-gray-500 uppercase">Categories</p>
          <p className="text-3xl font-bold text-[#3B2A23] mt-2">{dashboard.totals.categories}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="font-label-caps text-gray-500 uppercase">Homepage Banners</p>
          <p className="text-3xl font-bold text-[#3B2A23] mt-2">{dashboard.totals.banners}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="font-label-caps text-gray-500 uppercase">Active Banners</p>
          <p className="text-3xl font-bold text-[#3B2A23] mt-2">{activeCounts.banners}</p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline-sm text-[#3B2A23]">Latest Articles</h3>
            <Link className="font-label-caps text-[#C6A77D] hover:underline" to="/admin/blog">View All</Link>
          </div>
          {latestBlog.length === 0 ? (
            <p className="text-sm text-gray-500">No blog articles yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latestBlog.map((blog) => (
                <article key={blog.id} className="border border-gray-100 rounded-2xl overflow-hidden">
                  <div className="h-40 bg-gray-100">
                    {blog.thumbnail && <img className="w-full h-full object-cover" alt={blog.title} src={blog.thumbnail} />}
                  </div>
                  <div className="p-5">
                    <span className="font-label-caps text-[10px] text-[#C6A77D]">{blog.category?.name || 'Uncategorized'}</span>
                    <h4 className="font-title-lg text-[#3B2A23] text-sm mt-2 line-clamp-2">{blog.title}</h4>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm">
          <h3 className="font-headline-sm text-[#3B2A23] mb-6">Recent Activity</h3>
          {latestActivity.length === 0 ? (
            <p className="text-sm text-gray-500">No recent content activity.</p>
          ) : (
            <div className="space-y-6">
              {latestActivity.map((activity, index) => (
                <div key={`${activity.type}-${activity.title}-${index}`} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F5F0EA] flex items-center justify-center text-[#C6A77D] shrink-0">
                    <span className="material-symbols-outlined text-[20px]">{activity.icon}</span>
                  </div>
                  <div>
                    <p className="font-body-md text-sm font-semibold text-[#3B2A23]">{activity.type}</p>
                    <p className="font-body-sm text-xs text-gray-500">{activity.title}</p>
                    <p className="font-label-caps text-[10px] text-gray-400 mt-1">
                      {new Date(activity.date).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <h3 className="font-headline-sm text-[#3B2A23]">Latest Catalog Products</h3>
          <Link className="font-label-caps text-[#C6A77D] hover:underline" to="/admin/catalog">Manage Catalog</Link>
        </div>
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead className="bg-[#F5F0EA] border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-label-caps text-xs text-gray-500">Product</th>
              <th className="px-6 py-4 font-label-caps text-xs text-gray-500">Category</th>
              <th className="px-6 py-4 font-label-caps text-xs text-gray-500">Price</th>
              <th className="px-6 py-4 font-label-caps text-xs text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-[#3B2A23]">
            {latestProducts.length === 0 ? (
              <tr>
                <td className="px-6 py-8 text-center text-sm text-gray-500" colSpan="4">No catalog products yet.</td>
              </tr>
            ) : (
              latestProducts.map((product) => (
                <tr key={product.id} className="hover:bg-[#F5F0EA]/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                      {product.thumbnail && <img className="w-full h-full object-cover" alt={product.title} src={product.thumbnail} />}
                    </div>
                    <span className="font-body-md text-sm font-semibold truncate max-w-[220px]">{product.title}</span>
                  </td>
                  <td className="px-6 py-4 font-body-sm text-sm text-gray-500">{product.category?.name || '-'}</td>
                  <td className="px-6 py-4 font-body-sm text-sm text-gray-500">Rp {Number(product.price || 0).toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-[10px] font-label-caps rounded-full ${
                      product.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {product.is_active ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboardPage;
