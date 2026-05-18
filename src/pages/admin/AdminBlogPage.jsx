import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import blogService from '../../services/blogService';
import categoryService from '../../services/categoryService';
import uploadService from '../../services/uploadService';

const emptyForm = {
  category_id: '',
  title: '',
  thumbnail: '',
  content: '',
  meta_title: '',
  meta_description: '',
  is_active: true,
};

const AdminBlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState({ total: 0, current_page: 1, last_page: 1 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError('');
      const [blogResponse, categoryResponse] = await Promise.all([
        blogService.getAll(),
        categoryService.getAll(),
      ]);

      const blogPayload = blogResponse.data;
      const categoryPayload = Array.isArray(categoryResponse.data) ? categoryResponse.data : [];

      setBlogs(Array.isArray(blogPayload?.data) ? blogPayload.data : []);
      setCategories(categoryPayload.filter((category) => category.type === 'blog'));
      setMeta({
        total: blogPayload?.total || 0,
        current_page: blogPayload?.current_page || 1,
        last_page: blogPayload?.last_page || 1,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memuat blog.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return blogs.filter((blog) => {
      const matchesCategory = categoryFilter === 'all' || String(blog.category_id) === categoryFilter;
      const matchesSearch =
        !keyword ||
        blog.title?.toLowerCase().includes(keyword) ||
        blog.slug?.toLowerCase().includes(keyword) ||
        blog.category?.name?.toLowerCase().includes(keyword);

      return matchesCategory && matchesSearch;
    });
  }, [blogs, search, categoryFilter]);

  const counts = useMemo(() => ({
    active: blogs.filter((blog) => blog.is_active).length,
    hidden: blogs.filter((blog) => !blog.is_active).length,
  }), [blogs]);

  const openCreateModal = () => {
    setEditingBlog(null);
    setForm({
      ...emptyForm,
      category_id: categories[0]?.id ? String(categories[0].id) : '',
    });
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (blog) => {
    setEditingBlog(blog);
    setForm({
      category_id: blog.category_id ? String(blog.category_id) : '',
      title: blog.title || '',
      thumbnail: blog.thumbnail || '',
      content: blog.content || '',
      meta_title: blog.meta_title || '',
      meta_description: blog.meta_description || '',
      is_active: Boolean(blog.is_active),
    });
    setError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
    setForm(emptyForm);
  };

  const handleThumbnailUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setError('');
      const response = await uploadService.upload(file);
      setForm((current) => ({ ...current, thumbnail: response.data.url }));
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal upload gambar.');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const buildPayload = () => ({
    category_id: Number(form.category_id),
    title: form.title.trim(),
    thumbnail: form.thumbnail.trim(),
    content: form.content.trim(),
    meta_title: form.meta_title.trim() || form.title.trim(),
    meta_description: form.meta_description.trim() || null,
    is_active: form.is_active,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.category_id || !form.title.trim() || !form.thumbnail.trim() || !form.content.trim()) {
      setError('Kategori, judul, thumbnail, dan konten wajib diisi.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      const payload = buildPayload();

      if (editingBlog) {
        await blogService.update(editingBlog.id, payload);
      } else {
        await blogService.create(payload);
      }

      closeModal();
      await fetchBlogs();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan blog.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (blog) => {
    const confirmed = window.confirm(`Hapus artikel "${blog.title}"?`);
    if (!confirmed) return;

    try {
      setError('');
      await blogService.delete(blog.id);
      await fetchBlogs();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menghapus blog.');
    }
  };

  return (
    <div className="p-10 max-w-[1440px] mx-auto w-full space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <nav className="flex gap-2 text-gray-500 text-xs mb-2">
            <Link to="/admin/dashboard" className="hover:underline cursor-pointer">Dashboard</Link>
            <span>/</span>
            <span className="font-semibold text-[#3B2A23]">Blog</span>
          </nav>
          <h2 className="font-display-lg text-[40px] text-[#3B2A23]">Blog Management</h2>
          <p className="text-gray-500">Create and publish journal articles for the public blog.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-8 py-3 rounded-xl bg-[#3B2A23] text-white font-semibold hover:bg-[#2A1F18] transition-all shadow-sm"
        >
          Add Article
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="font-label-caps text-gray-500 uppercase">Total Articles</p>
          <h3 className="text-4xl font-bold text-[#3B2A23] mt-3">{meta.total}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="font-label-caps text-gray-500 uppercase">Published</p>
          <h3 className="text-4xl font-bold text-[#3B2A23] mt-3">{counts.active}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="font-label-caps text-gray-500 uppercase">Draft / Hidden</p>
          <h3 className="text-4xl font-bold text-[#3B2A23] mt-3">{counts.hidden}</h3>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#C6A77D] text-sm outline-none text-[#3B2A23]"
              placeholder="Search blog..."
              type="text"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-[#3B2A23] outline-none bg-white"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <p className="text-sm text-gray-500">
          Showing <span className="font-bold text-[#3B2A23]">{filteredBlogs.length}</span> articles on page{' '}
          <span className="font-bold text-[#3B2A23]">{meta.current_page}</span> of {meta.last_page}
        </p>
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[860px]">
            <thead className="bg-[#F5F0EA] border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 font-label-caps text-[12px] text-gray-500 uppercase">Thumbnail</th>
                <th className="px-6 py-5 font-label-caps text-[12px] text-gray-500 uppercase">Title</th>
                <th className="px-6 py-5 font-label-caps text-[12px] text-gray-500 uppercase">Category</th>
                <th className="px-6 py-5 font-label-caps text-[12px] text-gray-500 uppercase">Status</th>
                <th className="px-6 py-5 font-label-caps text-[12px] text-gray-500 uppercase">Updated</th>
                <th className="px-8 py-5 font-label-caps text-[12px] text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td className="px-8 py-10 text-center text-gray-500" colSpan="6">Loading blog...</td>
                </tr>
              ) : filteredBlogs.length === 0 ? (
                <tr>
                  <td className="px-8 py-10 text-center text-gray-500" colSpan="6">No blog articles found.</td>
                </tr>
              ) : (
                filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-[#F5F0EA]/50 transition-colors">
                    <td className="px-8 py-4">
                      <div className="w-20 h-14 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        {blog.thumbnail ? (
                          <img className="w-full h-full object-cover" alt={blog.title} src={blog.thumbnail} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <span className="material-symbols-outlined">image</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-title-lg text-sm text-[#3B2A23]">{blog.title}</p>
                      <p className="text-body-sm text-gray-500 text-xs">{blog.slug}</p>
                    </td>
                    <td className="px-6 py-4 text-body-sm text-gray-500">{blog.category?.name || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        blog.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {blog.is_active ? 'Published' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {blog.updated_at ? new Date(blog.updated_at).toLocaleDateString('id-ID') : '-'}
                    </td>
                    <td className="px-8 py-4 text-right">
                      <button onClick={() => openEditModal(blog)} className="p-2 text-gray-500 hover:text-[#C6A77D] hover:bg-gray-50 rounded-lg transition-all" title="Edit">
                        <span className="material-symbols-outlined text-xl">edit</span>
                      </button>
                      <button onClick={() => handleDelete(blog)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} type="button" aria-label="Close blog modal" />
          <form onSubmit={handleSubmit} className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-headline-sm text-[#3B2A23]">{editingBlog ? 'Edit Article' : 'Add Article'}</h2>
              <button type="button" className="text-gray-500 hover:text-[#3B2A23]" onClick={closeModal}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              {categories.length === 0 && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-800">
                  Belum ada kategori Blog. Buat kategori bertipe Blog di menu Categories dulu.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-caps text-[11px] text-gray-500">Article Title</label>
                  <input
                    value={form.title}
                    onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                    className="w-full bg-[#F5F0EA] border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#C6A77D] focus:border-transparent outline-none text-[#3B2A23]"
                    placeholder="Enter article title..."
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-caps text-[11px] text-gray-500">Category</label>
                  <select
                    value={form.category_id}
                    onChange={(event) => setForm((current) => ({ ...current, category_id: event.target.value }))}
                    className="w-full bg-[#F5F0EA] border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#C6A77D] focus:border-transparent outline-none text-[#3B2A23]"
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label-caps text-[11px] text-gray-500">Thumbnail URL</label>
                <input
                  value={form.thumbnail}
                  onChange={(event) => setForm((current) => ({ ...current, thumbnail: event.target.value }))}
                  className="w-full bg-[#F5F0EA] border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#C6A77D] focus:border-transparent outline-none text-[#3B2A23]"
                  placeholder="https://..."
                  type="text"
                />
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-bold text-[#3B2A23] hover:bg-gray-50 cursor-pointer">
                    <span className="material-symbols-outlined text-base">upload</span>
                    {uploading ? 'Uploading...' : 'Upload Thumbnail'}
                    <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailUpload} disabled={uploading} />
                  </label>
                  {form.thumbnail && <img className="w-16 h-12 object-cover rounded-lg border border-gray-200" alt="Thumbnail preview" src={form.thumbnail} />}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label-caps text-[11px] text-gray-500">Content</label>
                <textarea
                  value={form.content}
                  onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
                  className="w-full bg-[#F5F0EA] border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#C6A77D] focus:border-transparent outline-none text-[#3B2A23] resize-none"
                  placeholder="Write article content..."
                  rows="8"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-caps text-[11px] text-gray-500">Meta Title</label>
                  <input
                    value={form.meta_title}
                    onChange={(event) => setForm((current) => ({ ...current, meta_title: event.target.value }))}
                    className="w-full bg-[#F5F0EA] border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#C6A77D] focus:border-transparent outline-none text-[#3B2A23]"
                    placeholder="SEO title..."
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-caps text-[11px] text-gray-500">Meta Description</label>
                  <textarea
                    value={form.meta_description}
                    onChange={(event) => setForm((current) => ({ ...current, meta_description: event.target.value }))}
                    className="w-full bg-[#F5F0EA] border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#C6A77D] focus:border-transparent outline-none text-[#3B2A23] resize-none"
                    placeholder="SEO description..."
                    rows="3"
                  />
                </div>
              </div>

              <label className="flex items-center justify-between p-4 bg-[#F5F0EA] rounded-xl border border-[#C6A77D]/20 cursor-pointer">
                <div>
                  <span className="text-body-sm font-bold text-[#3B2A23]">Published</span>
                  <p className="text-xs text-gray-500">Show this article on the public blog page.</p>
                </div>
                <input
                  checked={form.is_active}
                  onChange={(event) => setForm((current) => ({ ...current, is_active: event.target.checked }))}
                  className="w-5 h-5 accent-[#3B2A23]"
                  type="checkbox"
                />
              </label>
            </div>

            <div className="px-8 py-6 bg-[#F5F0EA] border-t border-gray-100 flex justify-end gap-3">
              <button type="button" onClick={closeModal} className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors text-sm">
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || uploading || categories.length === 0}
                className="px-8 py-2.5 bg-[#3B2A23] text-white rounded-xl font-bold hover:bg-[#2A1F18] transition-colors shadow-sm text-sm disabled:opacity-60"
              >
                {submitting ? 'Saving...' : 'Save Article'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminBlogPage;
