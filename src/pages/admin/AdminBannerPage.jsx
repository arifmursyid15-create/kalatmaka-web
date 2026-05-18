import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bannerService from '../../services/bannerService';
import uploadService from '../../services/uploadService';

const AdminBannerPage = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '', subtitle: '', image: '',
    button_text: '', button_link: '', is_active: true, order: 0,
  });

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await bannerService.getAll();
      setBanners(res.data);
    } catch {
      setError('Gagal memuat banner.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBanners(); }, []);

  const openAdd = () => {
    setEditingBanner(null);
    setForm({ title: '', subtitle: '', image: '', button_text: '', button_link: '', is_active: true, order: 0 });
    setIsModalOpen(true);
  };

  const openEdit = (banner) => {
    setEditingBanner(banner);
    setForm({
      title: banner.title || '',
      subtitle: banner.subtitle || '',
      image: banner.image || '',
      button_text: banner.button_text || '',
      button_link: banner.button_link || '',
      is_active: banner.is_active ?? true,
      order: banner.order ?? 0,
    });
    setIsModalOpen(true);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const res = await uploadService.upload(file);
      setForm(f => ({ ...f, image: res.data.url }));
    } catch {
      alert('Upload gagal.');
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.image) {
      alert('Title dan image wajib diisi.');
      return;
    }
    setSubmitting(true);
    try {
      if (editingBanner) {
        await bannerService.update(editingBanner.id, form);
      } else {
        await bannerService.create(form);
      }
      setIsModalOpen(false);
      fetchBanners();
    } catch {
      alert('Gagal menyimpan banner.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus banner ini?')) return;
    try {
      await bannerService.delete(id);
      fetchBanners();
    } catch {
      alert('Gagal menghapus banner.');
    }
  };

  return (
    <div className="p-10 max-w-[1440px] mx-auto w-full space-y-10">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <nav className="flex gap-2 text-gray-500 text-xs mb-2">
            <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link>
            <span>/</span>
            <span className="font-semibold text-[#3B2A23]">Banners</span>
          </nav>
          <h2 className="text-3xl font-bold tracking-tight text-[#3B2A23]">Banners & Campaigns</h2>
          <p className="text-gray-500 mt-1">Manage visual banners untuk halaman depan.</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-[#3B2A23] text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-[#2A1F18] transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          New Banner
        </button>
      </div>

      {/* Error */}
      {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm">{error}</div>}

      {/* Banner List */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <span className="material-symbols-outlined animate-spin text-4xl text-[#C6A77D]">progress_activity</span>
        </div>
      ) : banners.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-gray-400">
          <span className="material-symbols-outlined text-5xl mb-2">image_not_supported</span>
          <p>Belum ada banner. Tambahkan yang pertama!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {banners.map((banner) => (
            <div key={banner.id} className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-full sm:w-48 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                {banner.image ? (
                  <img className="w-full h-full object-cover" src={banner.image} alt={banner.title} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <span className="material-symbols-outlined text-4xl">image</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${banner.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {banner.is_active ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-xs text-gray-500">Order: {banner.order}</span>
                </div>
                <h3 className="text-lg font-bold text-[#3B2A23] truncate">{banner.title}</h3>
                {banner.subtitle && <p className="text-sm text-gray-500 truncate">{banner.subtitle}</p>}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEdit(banner)}
                  className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-[#C6A77D] transition-all"
                >
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button
                  onClick={() => handleDelete(banner.id)}
                  className="p-2 rounded-xl hover:bg-red-50 text-gray-500 hover:text-red-600 transition-all"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#3B2A23]">
                {editingBanner ? 'Edit Banner' : 'Add New Banner'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Image</label>
                {form.image ? (
                  <div className="relative h-40 rounded-xl overflow-hidden">
                    <img src={form.image} alt="preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setForm(f => ({ ...f, image: '' }))}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-gray-300 rounded-xl h-40 bg-[#F5F0EA] hover:border-[#C6A77D] transition-all flex flex-col items-center justify-center cursor-pointer">
                    <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">cloud_upload</span>
                    <p className="text-sm font-bold text-[#3B2A23]">Upload Image</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP</p>
                    <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                  </label>
                )}
              </div>

              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Title *</label>
                <input
                  className="w-full border border-gray-200 bg-[#F5F0EA] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#C6A77D] text-[#3B2A23]"
                  placeholder="Banner title"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                />
              </div>

              {/* Subtitle */}
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Subtitle</label>
                <textarea
                  className="w-full border border-gray-200 bg-[#F5F0EA] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#C6A77D] text-[#3B2A23] resize-none"
                  placeholder="Subtitle atau deskripsi singkat"
                  rows="2"
                  value={form.subtitle}
                  onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))}
                />
              </div>

              {/* Button Text & Link */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Button Text</label>
                  <input
                    className="w-full border border-gray-200 bg-[#F5F0EA] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#C6A77D] text-[#3B2A23]"
                    placeholder="Explore More"
                    value={form.button_text}
                    onChange={e => setForm(f => ({ ...f, button_text: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Button Link</label>
                  <input
                    className="w-full border border-gray-200 bg-[#F5F0EA] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#C6A77D] text-[#3B2A23]"
                    placeholder="/katalog"
                    value={form.button_link}
                    onChange={e => setForm(f => ({ ...f, button_link: e.target.value }))}
                  />
                </div>
              </div>

              {/* Order & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Order</label>
                  <input
                    type="number"
                    className="w-full border border-gray-200 bg-[#F5F0EA] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#C6A77D] text-[#3B2A23]"
                    value={form.order}
                    onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Status</label>
                  <select
                    className="w-full border border-gray-200 bg-[#F5F0EA] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#C6A77D] text-[#3B2A23]"
                    value={form.is_active ? '1' : '0'}
                    onChange={e => setForm(f => ({ ...f, is_active: e.target.value === '1' }))}
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-6 border-t border-gray-100 flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 rounded-xl font-bold text-[#3B2A23] border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-8 py-3 rounded-xl font-bold bg-[#3B2A23] text-white hover:bg-[#2A1F18] transition-all flex items-center gap-2 disabled:opacity-60"
              >
                {submitting ? (
                  <><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> Menyimpan...</>
                ) : (
                  <><span className="material-symbols-outlined text-sm">save</span> Simpan</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBannerPage;