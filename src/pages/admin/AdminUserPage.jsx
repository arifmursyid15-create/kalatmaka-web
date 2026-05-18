import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';
import authService from '../../services/authService';

const emptyForm = {
  name: '',
  email: '',
  password: '',
};

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({ total: 0, current_page: 1, last_page: 1 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const currentUser = authService.getUser();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await userService.getAll();
      const payload = response.data;

      setUsers(Array.isArray(payload?.data) ? payload.data : []);
      setMeta({
        total: payload?.total || 0,
        current_page: payload?.current_page || 1,
        last_page: payload?.last_page || 1,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memuat user.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return users;

    return users.filter((user) =>
      user.name?.toLowerCase().includes(keyword) ||
      user.email?.toLowerCase().includes(keyword)
    );
  }, [users, search]);

  const openCreateModal = () => {
    setEditingUser(null);
    setForm(emptyForm);
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setForm({
      name: user.name || '',
      email: user.email || '',
      password: '',
    });
    setError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      setError('Nama dan email wajib diisi.');
      return;
    }

    if (!editingUser && form.password.length < 8) {
      setError('Password minimal 8 karakter.');
      return;
    }

    if (editingUser && form.password && form.password.length < 8) {
      setError('Password minimal 8 karakter.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
      };

      if (form.password) {
        payload.password = form.password;
      }

      if (editingUser) {
        await userService.update(editingUser.id, payload);
      } else {
        await userService.create(payload);
      }

      closeModal();
      await fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan user.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (user) => {
    const confirmed = window.confirm(`Hapus user "${user.name}"?`);
    if (!confirmed) return;

    try {
      setError('');
      await userService.delete(user.id);
      await fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menghapus user.');
    }
  };

  return (
    <div className="p-10 max-w-[1440px] mx-auto w-full space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <nav className="flex gap-2 text-gray-500 text-xs mb-2">
            <Link to="/admin/dashboard" className="hover:underline cursor-pointer">Dashboard</Link>
            <span>/</span>
            <span className="font-semibold text-[#3B2A23]">Users</span>
          </nav>
          <h2 className="text-4xl font-headline font-bold text-[#3B2A23] tracking-tight">Team Management</h2>
          <p className="text-gray-500 mt-2 max-w-md">Manage admin accounts that can access the Kalatmaka dashboard.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center justify-center bg-[#3B2A23] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#2A1F18] transition-all shadow-md"
        >
          <span className="material-symbols-outlined mr-2">person_add</span>
          Add User
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Total Users</p>
          <p className="text-3xl font-headline font-bold text-[#3B2A23] mt-2">{meta.total}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Current User</p>
          <p className="text-xl font-headline font-bold text-[#3B2A23] mt-2 truncate">{currentUser?.name || '-'}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Page</p>
          <p className="text-3xl font-headline font-bold text-[#3B2A23] mt-2">{meta.current_page} / {meta.last_page}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full sm:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#C6A77D] text-sm outline-none text-[#3B2A23]"
            placeholder="Search users..."
            type="text"
          />
        </div>
        <p className="text-sm text-gray-500">
          Showing <span className="font-bold text-[#3B2A23]">{filteredUsers.length}</span> of{' '}
          <span className="font-bold text-[#3B2A23]">{meta.total}</span> users
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead className="bg-[#F5F0EA] text-gray-500 text-xs uppercase tracking-widest font-bold">
              <tr>
                <th className="px-8 py-5 w-1/3">Name</th>
                <th className="px-8 py-5">Email</th>
                <th className="px-8 py-5">Created</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td className="px-8 py-10 text-center text-gray-500" colSpan="4">Loading users...</td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td className="px-8 py-10 text-center text-gray-500" colSpan="4">No users found.</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-[#E8D5C4] flex items-center justify-center text-[#3B2A23] font-bold text-lg flex-shrink-0">
                          {(user.name || '?').slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-[#3B2A23]">{user.name}</p>
                          {currentUser?.id === user.id && <p className="text-xs text-[#C6A77D] font-bold">Currently logged in</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-gray-500">{user.email}</td>
                    <td className="px-8 py-5 text-sm text-gray-500">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString('id-ID') : '-'}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button onClick={() => openEditModal(user)} className="p-2 text-gray-400 hover:text-[#C6A77D] transition-colors" title="Edit User">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(user)}
                        disabled={currentUser?.id === user.id}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-30 disabled:hover:text-gray-400"
                        title="Delete User"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
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
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-8 py-6 bg-white border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-[#3B2A23] font-headline">{editingUser ? 'Edit User' : 'Add User'}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {editingUser ? 'Leave password empty to keep the current password.' : 'Create a new admin account.'}
                </p>
              </div>
              <button type="button" onClick={closeModal} className="p-2 text-gray-400 transition-colors rounded-full hover:bg-gray-100 hover:text-[#3B2A23]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <label className="block mb-2 text-sm font-bold text-[#3B2A23]">Name</label>
                <input
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  type="text"
                  className="w-full px-4 py-3 transition-colors border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C6A77D] focus:border-[#C6A77D] outline-none text-[#3B2A23]"
                  placeholder="Admin name"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-bold text-[#3B2A23]">Email</label>
                <input
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  type="email"
                  className="w-full px-4 py-3 transition-colors border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C6A77D] focus:border-[#C6A77D] outline-none text-[#3B2A23]"
                  placeholder="admin@kalatmaka.id"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-bold text-[#3B2A23]">Password</label>
                <input
                  value={form.password}
                  onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                  type="password"
                  className="w-full px-4 py-3 transition-colors border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C6A77D] focus:border-[#C6A77D] outline-none text-[#3B2A23]"
                  placeholder={editingUser ? 'Optional new password' : 'Minimum 8 characters'}
                />
              </div>
            </div>

            <div className="flex items-center justify-end px-8 py-6 space-x-4 bg-gray-50 border-t border-gray-100">
              <button type="button" onClick={closeModal} className="px-6 py-3 text-sm font-bold text-gray-600 transition-colors bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="px-6 py-3 text-sm font-bold text-white transition-all shadow-md bg-[#3B2A23] rounded-xl hover:bg-[#2A1F18] hover:shadow-lg disabled:opacity-60">
                {submitting ? 'Saving...' : 'Save User'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminUserPage;
