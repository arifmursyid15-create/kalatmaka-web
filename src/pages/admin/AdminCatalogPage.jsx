import React, { useEffect, useMemo, useState } from 'react';
import katalogService from '../../services/katalogService';
import categoryService from '../../services/categoryService';
import uploadService from '../../services/uploadService';

const emptyForm = {
  category_id: '',
  title: '',
  thumbnail: '',
  description: '',
  spesifikasi: '',
  price: '',
  badge: 'none',
  imagesText: '',
  is_active: true,
};

const badgeLabels = {
  none: 'None',
  best_seller: 'Best Seller',
  promo: 'Promo',
  new: 'New Arrival',
};

const AdminCatalogPage = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState({ total: 0, current_page: 1, last_page: 1 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchCatalog = async () => {
    try {
      setLoading(true);
      setError('');
      const [catalogResponse, categoryResponse] = await Promise.all([
        katalogService.getAll(),
        categoryService.getAll(),
      ]);

      const catalogPayload = catalogResponse.data;
      const categoryPayload = Array.isArray(categoryResponse.data) ? categoryResponse.data : [];

      setItems(Array.isArray(catalogPayload?.data) ? catalogPayload.data : []);
      setCategories(categoryPayload.filter((category) => category.type === 'katalog'));
      setMeta({
        total: catalogPayload?.total || 0,
        current_page: catalogPayload?.current_page || 1,
        last_page: catalogPayload?.last_page || 1,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memuat katalog.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  const filteredItems = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesCategory = categoryFilter === 'all' || String(item.category_id) === categoryFilter;
      const matchesSearch =
        !keyword ||
        item.title?.toLowerCase().includes(keyword) ||
        item.slug?.toLowerCase().includes(keyword) ||
        item.category?.name?.toLowerCase().includes(keyword);

      return matchesCategory && matchesSearch;
    });
  }, [items, search, categoryFilter]);

  const counts = useMemo(() => ({
    active: items.filter((item) => item.is_active).length,
    hidden: items.filter((item) => !item.is_active).length,
    promo: items.filter((item) => item.badge && item.badge !== 'none').length,
  }), [items]);

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({
      ...emptyForm,
      category_id: categories[0]?.id ? String(categories[0].id) : '',
    });
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setForm({
      category_id: item.category_id ? String(item.category_id) : '',
      title: item.title || '',
      thumbnail: item.thumbnail || '',
      description: item.description || '',
      spesifikasi: item.spesifikasi || '',
      price: item.price || '',
      badge: item.badge || 'none',
      imagesText: Array.isArray(item.images) ? item.images.join('\n') : '',
      is_active: Boolean(item.is_active),
    });
    setError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
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
    description: form.description.trim() || null,
    spesifikasi: form.spesifikasi.trim() || null,
    price: Number(form.price || 0),
    badge: form.badge,
    images: form.imagesText
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean),
    is_active: form.is_active,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.category_id || !form.title.trim() || !form.thumbnail.trim() || Number(form.price) < 0) {
      setError('Kategori, nama produk, thumbnail, dan harga wajib valid.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      const payload = buildPayload();

      if (editingItem) {
        await katalogService.update(editingItem.id, payload);
      } else {
        await katalogService.create(payload);
      }

      closeModal();
      await fetchCatalog();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan katalog.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item) => {
    const confirmed = window.confirm(`Hapus produk "${item.title}"?`);
    if (!confirmed) return;

    try {
      setError('');
      await katalogService.delete(item.id);
      await fetchCatalog();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menghapus katalog.');
    }
  };

  return (
    <div className="p-10 max-w-[1440px] mx-auto w-full space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-headline-md text-[#3B2A23] mb-2">Catalog Management</h2>
          <p className="text-gray-500">Curate and manage product entries shown on the public catalog page.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-[#3B2A23] text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#2A1F18] transition-all font-bold shadow-sm"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Add Product
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="font-label-caps text-gray-500 uppercase">Total Products</p>
          <h3 className="text-4xl font-bold text-[#3B2A23] mt-3">{meta.total}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="font-label-caps text-gray-500 uppercase">Active</p>
          <h3 className="text-4xl font-bold text-[#3B2A23] mt-3">{counts.active}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="font-label-caps text-gray-500 uppercase">Hidden</p>
          <h3 className="text-4xl font-bold text-[#3B2A23] mt-3">{counts.hidden}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="font-label-caps text-gray-500 uppercase">Badged</p>
          <h3 className="text-4xl font-bold text-[#3B2A23] mt-3">{counts.promo}</h3>
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
              placeholder="Search catalog..."
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
          Showing <span className="font-bold text-[#3B2A23]">{filteredItems.length}</span> products on page{' '}
          <span className="font-bold text-[#3B2A23]">{meta.current_page}</span> of {meta.last_page}
        </p>
      </div>

      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="bg-[#F5F0EA] border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 font-label-caps text-[12px] text-gray-500 uppercase">Preview</th>
                <th className="px-6 py-5 font-label-caps text-[12px] text-gray-500 uppercase">Product</th>
                <th className="px-6 py-5 font-label-caps text-[12px] text-gray-500 uppercase">Category</th>
                <th className="px-6 py-5 font-label-caps text-[12px] text-gray-500 uppercase">Price</th>
                <th className="px-6 py-5 font-label-caps text-[12px] text-gray-500 uppercase">Badge</th>
                <th className="px-6 py-5 font-label-caps text-[12px] text-gray-500 uppercase">Status</th>
                <th className="px-6 py-5 font-label-caps text-[12px] text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#3B2A23]">
              {loading ? (
                <tr>
                  <td className="px-8 py-10 text-center text-gray-500" colSpan="7">Loading catalog...</td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td className="px-8 py-10 text-center text-gray-500" colSpan="7">No catalog products found.</td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F5F0EA]/50 transition-colors group">
                    <td className="px-8 py-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100">
                        {item.thumbnail ? (
                          <img alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.thumbnail} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <span className="material-symbols-outlined">image</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-title-lg text-sm text-[#3B2A23] font-bold">{item.title}</p>
                      <p className="text-body-sm text-gray-500 text-xs">{item.slug}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{item.category?.name || '-'}</td>
                    <td className="px-6 py-4 font-bold text-[#3B2A23] text-sm">
                      Rp {Number(item.price || 0).toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-[#F5F0EA] text-[#C6A77D] px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase">
                        {badgeLabels[item.badge] || item.badge}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        item.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {item.is_active ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => openEditModal(item)} className="text-gray-500 hover:text-[#C6A77D] transition-colors p-2" title="Edit">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button onClick={() => handleDelete(item)} className="text-gray-500 hover:text-red-600 transition-colors p-2" title="Delete">
                        <span className="material-symbols-outlined">delete</span>
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
          <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} type="button" aria-label="Close catalog modal" />
          <form onSubmit={handleSubmit} className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-headline-sm text-[#3B2A23]">{editingItem ? 'Edit Product' : 'Add Product'}</h2>
              <button className="text-gray-500 hover:text-[#3B2A23]" type="button" onClick={closeModal}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              {categories.length === 0 && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-800">
                  Belum ada kategori Catalog. Buat kategori bertipe Catalog di menu Categories dulu.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-caps text-[11px] text-gray-500">Product Name</label>
                  <input
                    value={form.title}
                    onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                    className="w-full bg-[#F5F0EA] border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#C6A77D] focus:border-transparent outline-none text-body-sm"
                    placeholder="e.g. Teak Wall Panel"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-caps text-[11px] text-gray-500">Category</label>
                  <select
                    value={form.category_id}
                    onChange={(event) => setForm((current) => ({ ...current, category_id: event.target.value }))}
                    className="w-full bg-[#F5F0EA] border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#C6A77D] focus:border-transparent outline-none text-body-sm"
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-caps text-[11px] text-gray-500">Price</label>
                  <input
                    value={form.price}
                    onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
                    className="w-full bg-[#F5F0EA] border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#C6A77D] focus:border-transparent outline-none text-body-sm"
                    placeholder="0"
                    type="number"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-caps text-[11px] text-gray-500">Badge</label>
                  <select
                    value={form.badge}
                    onChange={(event) => setForm((current) => ({ ...current, badge: event.target.value }))}
                    className="w-full bg-[#F5F0EA] border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#C6A77D] focus:border-transparent outline-none text-body-sm"
                  >
                    {Object.entries(badgeLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label-caps text-[11px] text-gray-500">Thumbnail URL</label>
                <input
                  value={form.thumbnail}
                  onChange={(event) => setForm((current) => ({ ...current, thumbnail: event.target.value }))}
                  className="w-full bg-[#F5F0EA] border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#C6A77D] focus:border-transparent outline-none text-body-sm"
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
                <label className="font-label-caps text-[11px] text-gray-500">Description</label>
                <textarea
                  value={form.description}
                  onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                  className="w-full bg-[#F5F0EA] border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#C6A77D] focus:border-transparent outline-none text-body-sm resize-none"
                  placeholder="Describe the product..."
                  rows="3"
                />
              </div>

              <div className="space-y-2">
                <label className="font-label-caps text-[11px] text-gray-500">Specification</label>
                <textarea
                  value={form.spesifikasi}
                  onChange={(event) => setForm((current) => ({ ...current, spesifikasi: event.target.value }))}
                  className="w-full bg-[#F5F0EA] border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#C6A77D] focus:border-transparent outline-none text-body-sm resize-none"
                  placeholder="Materials, dimensions, finishing..."
                  rows="3"
                />
              </div>

              <div className="space-y-2">
                <label className="font-label-caps text-[11px] text-gray-500">Gallery Image URLs</label>
                <textarea
                  value={form.imagesText}
                  onChange={(event) => setForm((current) => ({ ...current, imagesText: event.target.value }))}
                  className="w-full bg-[#F5F0EA] border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#C6A77D] focus:border-transparent outline-none text-body-sm resize-none font-mono text-xs"
                  placeholder="One image URL per line"
                  rows="3"
                />
              </div>

              <label className="flex items-center justify-between p-4 bg-[#F5F0EA] rounded-xl border border-[#C6A77D]/20 cursor-pointer">
                <div>
                  <span className="text-body-sm font-bold text-[#3B2A23]">Visible</span>
                  <p className="text-xs text-gray-500">Show this product on the public catalog page.</p>
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
              <button type="button" onClick={closeModal} className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors text-body-sm">
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || uploading || categories.length === 0}
                className="px-8 py-2.5 bg-[#3B2A23] text-white rounded-xl font-bold hover:bg-[#2A1F18] transition-colors shadow-sm text-body-sm disabled:opacity-60"
              >
                {submitting ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminCatalogPage;
