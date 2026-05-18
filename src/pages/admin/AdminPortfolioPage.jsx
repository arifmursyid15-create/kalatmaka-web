import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import portfolioService from '../../services/portfolioService';
import uploadService from '../../services/uploadService';

const emptyForm = {
  title: '',
  thumbnail: '',
  description: '',
  location: '',
  imagesText: '',
  is_active: true,
};

const AdminPortfolioPage = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [meta, setMeta] = useState({ total: 0, current_page: 1, last_page: 1 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await portfolioService.getAll();
      const payload = response.data;

      setPortfolios(Array.isArray(payload?.data) ? payload.data : []);
      setMeta({
        total: payload?.total || 0,
        current_page: payload?.current_page || 1,
        last_page: payload?.last_page || 1,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memuat portfolio.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const filteredPortfolios = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return portfolios.filter((portfolio) => {
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && portfolio.is_active) ||
        (statusFilter === 'inactive' && !portfolio.is_active);
      const matchesSearch =
        !keyword ||
        portfolio.title?.toLowerCase().includes(keyword) ||
        portfolio.slug?.toLowerCase().includes(keyword) ||
        portfolio.location?.toLowerCase().includes(keyword);

      return matchesStatus && matchesSearch;
    });
  }, [portfolios, search, statusFilter]);

  const counts = useMemo(() => ({
    active: portfolios.filter((portfolio) => portfolio.is_active).length,
    inactive: portfolios.filter((portfolio) => !portfolio.is_active).length,
  }), [portfolios]);

  const openCreateModal = () => {
    setEditingPortfolio(null);
    setForm(emptyForm);
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (portfolio) => {
    setEditingPortfolio(portfolio);
    setForm({
      title: portfolio.title || '',
      thumbnail: portfolio.thumbnail || '',
      description: portfolio.description || '',
      location: portfolio.location || '',
      imagesText: Array.isArray(portfolio.images) ? portfolio.images.join('\n') : '',
      is_active: Boolean(portfolio.is_active),
    });
    setError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPortfolio(null);
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
    title: form.title.trim(),
    thumbnail: form.thumbnail.trim(),
    description: form.description.trim() || null,
    location: form.location.trim() || null,
    images: form.imagesText
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean),
    is_active: form.is_active,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.thumbnail.trim()) {
      setError('Judul dan thumbnail wajib diisi.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      const payload = buildPayload();

      if (editingPortfolio) {
        await portfolioService.update(editingPortfolio.id, payload);
      } else {
        await portfolioService.create(payload);
      }

      closeModal();
      await fetchPortfolios();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan portfolio.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (portfolio) => {
    const confirmed = window.confirm(`Hapus portfolio "${portfolio.title}"?`);
    if (!confirmed) return;

    try {
      setError('');
      await portfolioService.delete(portfolio.id);
      await fetchPortfolios();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menghapus portfolio.');
    }
  };

  return (
    <div className="p-10 max-w-[1440px] mx-auto w-full space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <nav className="flex gap-2 text-gray-500 font-label-caps text-[10px] mb-2">
            <Link className="hover:text-[#3B2A23] transition-colors" to="/admin/dashboard">DASHBOARD</Link>
            <span>/</span>
            <span className="text-[#3B2A23] font-bold">PORTFOLIO</span>
          </nav>
          <h2 className="font-headline-md text-[#3B2A23]">Portfolio Management</h2>
          <p className="text-gray-500 mt-1">Manage interior design case studies shown on the public portfolio page.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-[#3B2A23] text-white px-8 py-3 rounded-xl flex items-center justify-center font-bold hover:bg-[#2A1F18] transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined mr-2">add_circle</span>
          Add Project
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Total Projects</p>
          <h3 className="text-3xl font-headline mt-2 font-bold text-[#3B2A23]">{meta.total}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Active On Site</p>
          <h3 className="text-3xl font-headline mt-2 font-bold text-[#3B2A23]">{counts.active}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Draft / Hidden</p>
          <h3 className="text-3xl font-headline mt-2 font-bold text-[#3B2A23]">{counts.inactive}</h3>
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
              placeholder="Search portfolio..."
              type="text"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-[#3B2A23] outline-none bg-white"
          >
            <option value="all">All Status</option>
            <option value="active">Published</option>
            <option value="inactive">Hidden</option>
          </select>
        </div>
        <p className="text-sm text-gray-500">
          Showing <span className="font-bold text-[#3B2A23]">{filteredPortfolios.length}</span> projects on page{' '}
          <span className="font-bold text-[#3B2A23]">{meta.current_page}</span> of {meta.last_page}
        </p>
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[860px]">
            <thead className="bg-[#F5F0EA] border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 font-label-caps text-[12px] text-gray-500 tracking-wider uppercase">Thumbnail</th>
                <th className="px-6 py-5 font-label-caps text-[12px] text-gray-500 tracking-wider uppercase">Title</th>
                <th className="px-6 py-5 font-label-caps text-[12px] text-gray-500 tracking-wider uppercase">Location</th>
                <th className="px-6 py-5 font-label-caps text-[12px] text-gray-500 tracking-wider uppercase">Slug</th>
                <th className="px-6 py-5 font-label-caps text-[12px] text-gray-500 tracking-wider uppercase">Status</th>
                <th className="px-8 py-5 font-label-caps text-[12px] text-gray-500 tracking-wider uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td className="px-8 py-10 text-center text-gray-500" colSpan="6">Loading portfolio...</td>
                </tr>
              ) : filteredPortfolios.length === 0 ? (
                <tr>
                  <td className="px-8 py-10 text-center text-gray-500" colSpan="6">No portfolio projects found.</td>
                </tr>
              ) : (
                filteredPortfolios.map((portfolio) => (
                  <tr key={portfolio.id} className="hover:bg-[#F5F0EA]/50 transition-colors group">
                    <td className="px-8 py-4">
                      <div className="w-20 h-14 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        {portfolio.thumbnail ? (
                          <img className="w-full h-full object-cover" alt={portfolio.title} src={portfolio.thumbnail} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <span className="material-symbols-outlined">image</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-title-lg text-sm text-[#3B2A23]">{portfolio.title}</p>
                      <p className="text-body-sm text-gray-500 text-xs line-clamp-1">{portfolio.description || 'No description'}</p>
                    </td>
                    <td className="px-6 py-4 text-body-sm text-gray-500">{portfolio.location || '-'}</td>
                    <td className="px-6 py-4 text-body-sm font-mono text-xs opacity-60 text-gray-500">{portfolio.slug}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        portfolio.is_active
                          ? 'bg-[#f0f4f1] text-[#2e4a31] border-[#dce6dd]'
                          : 'bg-[#fff8e1] text-[#856404] border-[#ffeeba]'
                      }`}>
                        {portfolio.is_active ? 'Published' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(portfolio)}
                          className="p-2 text-gray-500 hover:text-[#C6A77D] hover:bg-gray-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-xl">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(portfolio)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-xl">delete</span>
                        </button>
                      </div>
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
          <button
            aria-label="Close portfolio modal"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
            type="button"
          />
          <form
            onSubmit={handleSubmit}
            className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-headline-sm text-[#3B2A23]">
                {editingPortfolio ? 'Edit Project' : 'Add Project'}
              </h2>
              <button type="button" className="text-gray-500 hover:text-[#3B2A23]" onClick={closeModal}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Project Title</label>
                  <input
                    value={form.title}
                    onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                    className="w-full bg-[#F5F0EA] border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#C6A77D] focus:border-transparent outline-none text-[#3B2A23]"
                    placeholder="e.g. The Amber Residence"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Location</label>
                  <input
                    value={form.location}
                    onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))}
                    className="w-full bg-[#F5F0EA] border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#C6A77D] focus:border-transparent outline-none text-[#3B2A23]"
                    placeholder="e.g. Jakarta Selatan"
                    type="text"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Thumbnail URL</label>
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
                  {form.thumbnail && (
                    <img className="w-16 h-12 object-cover rounded-lg border border-gray-200" alt="Thumbnail preview" src={form.thumbnail} />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description</label>
                <textarea
                  value={form.description}
                  onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                  className="w-full bg-[#F5F0EA] border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#C6A77D] focus:border-transparent outline-none text-[#3B2A23] resize-none"
                  placeholder="Project description..."
                  rows="4"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Gallery Image URLs</label>
                <textarea
                  value={form.imagesText}
                  onChange={(event) => setForm((current) => ({ ...current, imagesText: event.target.value }))}
                  className="w-full bg-[#F5F0EA] border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#C6A77D] focus:border-transparent outline-none text-[#3B2A23] resize-none font-mono text-xs"
                  placeholder="One image URL per line"
                  rows="4"
                />
              </div>

              <label className="flex items-center justify-between p-4 bg-[#F5F0EA] rounded-xl border border-[#C6A77D]/20 cursor-pointer">
                <div>
                  <span className="text-body-sm font-bold text-[#3B2A23]">Published</span>
                  <p className="text-xs text-gray-500">Show this project on the public portfolio page.</p>
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
              <button
                type="button"
                onClick={closeModal}
                className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || uploading}
                className="px-8 py-2.5 bg-[#3B2A23] text-white rounded-xl font-bold hover:bg-[#2A1F18] transition-colors shadow-sm text-sm disabled:opacity-60"
              >
                {submitting ? 'Saving...' : 'Save Project'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPortfolioPage;
