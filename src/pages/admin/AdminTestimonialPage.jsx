import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import testimonialService from '../../services/testimonialService';

const emptyForm = {
  name: '',
  message: '',
  rating: 5,
  is_active: true,
};

const AdminTestimonialPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [meta, setMeta] = useState({ total: 0, current_page: 1, last_page: 1 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await testimonialService.getAll();
      const payload = response.data;

      setTestimonials(Array.isArray(payload?.data) ? payload.data : []);
      setMeta({
        total: payload?.total || 0,
        current_page: payload?.current_page || 1,
        last_page: payload?.last_page || 1,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memuat testimoni.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const filteredTestimonials = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return testimonials.filter((testimonial) => {
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && testimonial.is_active) ||
        (statusFilter === 'inactive' && !testimonial.is_active);
      const matchesSearch =
        !keyword ||
        testimonial.name?.toLowerCase().includes(keyword) ||
        testimonial.message?.toLowerCase().includes(keyword);

      return matchesStatus && matchesSearch;
    });
  }, [testimonials, search, statusFilter]);

  const counts = useMemo(() => ({
    active: testimonials.filter((testimonial) => testimonial.is_active).length,
    hidden: testimonials.filter((testimonial) => !testimonial.is_active).length,
    average: testimonials.length
      ? (testimonials.reduce((sum, testimonial) => sum + Number(testimonial.rating || 0), 0) / testimonials.length).toFixed(1)
      : '0.0',
  }), [testimonials]);

  const openCreateModal = () => {
    setEditingTestimonial(null);
    setForm(emptyForm);
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (testimonial) => {
    setEditingTestimonial(testimonial);
    setForm({
      name: testimonial.name || '',
      message: testimonial.message || '',
      rating: testimonial.rating || 5,
      is_active: Boolean(testimonial.is_active),
    });
    setError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.message.trim()) {
      setError('Nama dan testimoni wajib diisi.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      const payload = {
        name: form.name.trim(),
        message: form.message.trim(),
        rating: Number(form.rating),
        is_active: form.is_active,
      };

      if (editingTestimonial) {
        await testimonialService.update(editingTestimonial.id, payload);
      } else {
        await testimonialService.create(payload);
      }

      closeModal();
      await fetchTestimonials();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan testimoni.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (testimonial) => {
    const confirmed = window.confirm(`Hapus testimoni dari "${testimonial.name}"?`);
    if (!confirmed) return;

    try {
      setError('');
      await testimonialService.delete(testimonial.id);
      await fetchTestimonials();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menghapus testimoni.');
    }
  };

  const renderStars = (rating) => (
    <div className="flex text-yellow-500">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="material-symbols-outlined text-sm"
          style={{ fontVariationSettings: `'FILL' ${star <= Number(rating) ? 1 : 0}` }}
        >
          star
        </span>
      ))}
    </div>
  );

  return (
    <div className="p-10 max-w-[1440px] mx-auto w-full space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <nav className="flex gap-2 text-gray-500 text-xs mb-2">
            <Link to="/admin/dashboard" className="hover:underline cursor-pointer">Dashboard</Link>
            <span>/</span>
            <span className="font-semibold text-[#3B2A23]">Testimonials</span>
          </nav>
          <h1 className="text-4xl font-bold text-[#3B2A23] tracking-tight font-headline">Testimonial Management</h1>
          <p className="text-gray-500 mt-2 max-w-xl font-body">Manage client stories displayed on the public site.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-[#3B2A23] text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-[#2A1F18] transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined">add</span>
          <span>Add Testimonial</span>
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">Total Reviews</p>
          <p className="text-3xl font-bold text-[#3B2A23] mt-2">{meta.total}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">Average Rating</p>
          <p className="text-3xl font-bold text-[#3B2A23] mt-2">{counts.average} <span className="text-sm text-gray-500">/ 5</span></p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">Published</p>
          <p className="text-3xl font-bold text-[#3B2A23] mt-2">{counts.active}</p>
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
              placeholder="Search testimonials..."
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
          Showing <span className="font-bold text-[#3B2A23]">{filteredTestimonials.length}</span> testimonials on page{' '}
          <span className="font-bold text-[#3B2A23]">{meta.current_page}</span> of {meta.last_page}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#F5F0EA] text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                <th className="px-8 py-4 w-1/4">Client</th>
                <th className="px-8 py-4 w-1/6">Rating</th>
                <th className="px-8 py-4">Testimonial</th>
                <th className="px-8 py-4 w-32 text-center">Status</th>
                <th className="px-8 py-4 w-40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td className="px-8 py-10 text-center text-gray-500" colSpan="5">Loading testimonials...</td>
                </tr>
              ) : filteredTestimonials.length === 0 ? (
                <tr>
                  <td className="px-8 py-10 text-center text-gray-500" colSpan="5">No testimonials found.</td>
                </tr>
              ) : (
                filteredTestimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-8 py-6">
                      <p className="font-bold text-[#3B2A23]">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">
                        {testimonial.created_at ? new Date(testimonial.created_at).toLocaleDateString('id-ID') : '-'}
                      </p>
                    </td>
                    <td className="px-8 py-6">{renderStars(testimonial.rating)}</td>
                    <td className="px-8 py-6">
                      <p className="text-sm text-gray-500 line-clamp-2 italic leading-relaxed">"{testimonial.message}"</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center">
                        <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                          testimonial.is_active
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            : 'bg-gray-100 text-gray-500 border border-gray-200'
                        }`}>
                          {testimonial.is_active ? 'Published' : 'Hidden'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button onClick={() => openEditModal(testimonial)} className="p-2 text-gray-500 hover:text-[#C6A77D] hover:bg-gray-100 rounded-lg transition-all" title="Edit">
                        <span className="material-symbols-outlined text-xl">edit</span>
                      </button>
                      <button onClick={() => handleDelete(testimonial)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-6 bg-white border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-[#3B2A23] font-headline">{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
                <p className="text-sm text-gray-500 mt-1">Create or update a client review.</p>
              </div>
              <button type="button" onClick={closeModal} className="p-2 text-gray-400 transition-colors rounded-full hover:bg-gray-100 hover:text-[#3B2A23]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <label className="block mb-2 text-sm font-bold text-[#3B2A23]">Client Name</label>
                <input
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  type="text"
                  className="w-full px-4 py-3 transition-colors border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C6A77D] focus:border-[#C6A77D] outline-none text-[#3B2A23]"
                  placeholder="e.g. Aditya Pratama"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-bold text-[#3B2A23]">Testimonial</label>
                <textarea
                  value={form.message}
                  onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                  rows="6"
                  className="w-full px-4 py-3 transition-colors border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C6A77D] focus:border-[#C6A77D] outline-none text-[#3B2A23] resize-none"
                  placeholder="Enter client testimonial..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-bold text-[#3B2A23]">Rating</label>
                  <select
                    value={form.rating}
                    onChange={(event) => setForm((current) => ({ ...current, rating: Number(event.target.value) }))}
                    className="w-full px-4 py-3 transition-colors border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C6A77D] focus:border-[#C6A77D] outline-none text-[#3B2A23] bg-white"
                  >
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <option key={rating} value={rating}>{rating} Stars</option>
                    ))}
                  </select>
                </div>
                <label className="flex items-center justify-between p-4 bg-[#F5F0EA] rounded-xl border border-[#C6A77D]/20 cursor-pointer">
                  <div>
                    <span className="text-body-sm font-bold text-[#3B2A23]">Published</span>
                    <p className="text-xs text-gray-500">Show this testimonial publicly.</p>
                  </div>
                  <input
                    checked={form.is_active}
                    onChange={(event) => setForm((current) => ({ ...current, is_active: event.target.checked }))}
                    className="w-5 h-5 accent-[#3B2A23]"
                    type="checkbox"
                  />
                </label>
              </div>
            </div>

            <div className="sticky bottom-0 z-10 flex items-center justify-end px-8 py-6 space-x-4 bg-gray-50 border-t border-gray-100 rounded-b-2xl">
              <button type="button" onClick={closeModal} className="px-6 py-3 text-sm font-bold text-gray-600 transition-colors bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="px-6 py-3 text-sm font-bold text-white transition-all shadow-md bg-[#3B2A23] rounded-xl hover:bg-[#2A1F18] hover:shadow-lg disabled:opacity-60">
                {submitting ? 'Saving...' : 'Save Testimonial'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonialPage;
