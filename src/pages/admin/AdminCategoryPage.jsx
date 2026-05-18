import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import categoryService from '../../services/categoryService';

const emptyForm = {
  name: '',
  type: 'katalog',
};

const typeLabels = {
  katalog: 'Catalog',
  blog: 'Blog',
};

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await categoryService.getAll();
      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memuat kategori.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return categories.filter((category) => {
      const matchesType = typeFilter === 'all' || category.type === typeFilter;
      const matchesSearch =
        !keyword ||
        category.name?.toLowerCase().includes(keyword) ||
        category.slug?.toLowerCase().includes(keyword);

      return matchesType && matchesSearch;
    });
  }, [categories, search, typeFilter]);

  const counts = useMemo(() => ({
    total: categories.length,
    katalog: categories.filter((category) => category.type === 'katalog').length,
    blog: categories.filter((category) => category.type === 'blog').length,
  }), [categories]);

  const openCreateModal = () => {
    setEditingCategory(null);
    setForm(emptyForm);
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setForm({
      name: category.name || '',
      type: category.type || 'katalog',
    });
    setError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setError('Nama kategori wajib diisi.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      if (editingCategory) {
        await categoryService.update(editingCategory.id, form);
      } else {
        await categoryService.create(form);
      }

      closeModal();
      await fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan kategori.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (category) => {
    const confirmed = window.confirm(`Hapus kategori "${category.name}"?`);
    if (!confirmed) return;

    try {
      setError('');
      await categoryService.delete(category.id);
      await fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menghapus kategori.');
    }
  };

  return (
    <div className="p-10 max-w-[1440px] mx-auto w-full space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <nav className="flex gap-2 text-gray-500 text-xs mb-2">
            <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link>
            <span>/</span>
            <span className="font-semibold text-[#3B2A23]">Categories</span>
          </nav>
          <h2 className="text-4xl font-headline text-[#3B2A23] mb-2 font-bold">Category Management</h2>
          <p className="text-gray-500 text-lg">Manage categories used by catalog and blog content.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-[#3B2A23] text-white px-6 py-3 rounded-xl inline-flex items-center justify-center shadow-md hover:bg-[#2A1F18] transition-colors"
        >
          <span className="material-symbols-outlined mr-2">add</span>
          <span className="font-medium">Add Category</span>
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Total Categories</p>
          <h3 className="text-3xl font-headline mt-2 font-bold text-[#3B2A23]">{counts.total}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Catalog Categories</p>
          <h3 className="text-3xl font-headline mt-2 font-bold text-[#3B2A23]">{counts.katalog}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Blog Categories</p>
          <h3 className="text-3xl font-headline mt-2 font-bold text-[#3B2A23]">{counts.blog}</h3>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-80">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#C6A77D] text-sm outline-none text-[#3B2A23]"
                placeholder="Search categories..."
                type="text"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-[#3B2A23] outline-none bg-white"
            >
              <option value="all">All Types</option>
              <option value="katalog">Catalog</option>
              <option value="blog">Blog</option>
            </select>
          </div>
          <p className="text-sm text-gray-500">
            Showing <span className="font-bold text-[#3B2A23]">{filteredCategories.length}</span> of{' '}
            <span className="font-bold text-[#3B2A23]">{categories.length}</span> categories
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Name</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Slug</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Type</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Created</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td className="px-8 py-10 text-center text-gray-500" colSpan="5">Loading categories...</td>
                </tr>
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td className="px-8 py-10 text-center text-gray-500" colSpan="5">No categories found.</td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-5">
                      <p className="font-bold text-[#3B2A23]">{category.name}</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className="font-mono text-xs text-gray-500">{category.slug}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        category.type === 'katalog'
                          ? 'bg-[#E8D5C4] text-[#3B2A23]'
                          : 'bg-[#3B2A23] text-white'
                      }`}>
                        {typeLabels[category.type] || category.type}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm text-gray-500">
                      {category.created_at ? new Date(category.created_at).toLocaleDateString('id-ID') : '-'}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(category)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-[#C6A77D]"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(category)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-gray-500 hover:text-red-600"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined">delete</span>
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
            aria-label="Close category modal"
            className="absolute inset-0 bg-black/50"
            onClick={closeModal}
            type="button"
          />
          <form
            onSubmit={handleSubmit}
            className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-headline-sm text-[#3B2A23]">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h2>
              <button type="button" className="text-gray-500 hover:text-[#3B2A23]" onClick={closeModal}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category Name</label>
                <input
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  className="w-full bg-[#F5F0EA] border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#C6A77D] focus:border-transparent outline-none text-[#3B2A23]"
                  placeholder="e.g. Interior Tips"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Type</label>
                <select
                  value={form.type}
                  onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))}
                  className="w-full bg-[#F5F0EA] border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#C6A77D] focus:border-transparent outline-none text-[#3B2A23]"
                >
                  <option value="katalog">Catalog</option>
                  <option value="blog">Blog</option>
                </select>
              </div>
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
                disabled={submitting}
                className="px-8 py-2.5 bg-[#3B2A23] text-white rounded-xl font-bold hover:bg-[#2A1F18] transition-colors shadow-sm text-sm disabled:opacity-60"
              >
                {submitting ? 'Saving...' : 'Save Category'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminCategoryPage;
