import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import settingService from '../../services/settingService';
import uploadService from '../../services/uploadService';

const fallbackSettings = {
  studio_name: '',
  contact_email: '',
  whatsapp_number: '',
  business_hours: '',
  address: '',
  whatsapp_link: '',
  consult_link: '',
  instagram_url: '',
  linkedin_url: '',
  pinterest_url: '',
  dark_logo_url: '',
  light_logo_url: '',
  favicon_url: '',
  primary_color: '#3B2A23',
  accent_color: '#C6A77D',
  background_color: '#F5F0EA',
  headline_font: '',
  body_font: '',
  meta_title: '',
  meta_description: '',
  maintenance_mode: false,
};

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState(fallbackSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await settingService.getAll();
      setSettings({ ...fallbackSettings, ...response.data });
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memuat settings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateField = (key, value) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const handleUpload = async (key, file) => {
    if (!file) return;

    try {
      setUploadingKey(key);
      setError('');
      const response = await uploadService.upload(file);
      updateField(key, response.data.url);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal upload file.');
    } finally {
      setUploadingKey('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError('');
      setSuccess('');
      const response = await settingService.update(settings);
      setSettings({ ...fallbackSettings, ...response.data });
      setSuccess('Settings berhasil disimpan.');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan settings.');
    } finally {
      setSaving(false);
    }
  };

  const inputClass = 'w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C6A77D] focus:border-[#C6A77D] px-4 py-2.5 outline-none text-[#3B2A23] bg-white';

  return (
    <form onSubmit={handleSubmit} className="p-10 max-w-[1440px] mx-auto w-full space-y-8">
      <header>
        <nav className="flex gap-2 text-gray-500 text-xs mb-2">
          <Link to="/admin/dashboard" className="hover:underline cursor-pointer">Dashboard</Link>
          <span>/</span>
          <span className="font-semibold text-[#3B2A23]">Settings</span>
        </nav>
        <h2 className="text-4xl font-bold text-[#3B2A23] tracking-tight font-headline mb-2">System Settings</h2>
        <p className="text-gray-500 mt-2">Manage global studio information, contact details, branding, and SEO.</p>
      </header>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
          {success}
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-500">
          Loading settings...
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-[#3B2A23] mb-6">Studio Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Studio Name</label>
                  <input className={inputClass} value={settings.studio_name} onChange={(e) => updateField('studio_name', e.target.value)} type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Contact Email</label>
                  <input className={inputClass} value={settings.contact_email} onChange={(e) => updateField('contact_email', e.target.value)} type="email" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone / WhatsApp</label>
                  <input className={inputClass} value={settings.whatsapp_number} onChange={(e) => updateField('whatsapp_number', e.target.value)} type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Business Hours</label>
                  <input className={inputClass} value={settings.business_hours} onChange={(e) => updateField('business_hours', e.target.value)} type="text" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Physical Address</label>
                  <textarea className={inputClass} value={settings.address} onChange={(e) => updateField('address', e.target.value)} rows="3" />
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-[#3B2A23] mb-6">Action Buttons & Social Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">WhatsApp Button Link</label>
                  <input className={inputClass} value={settings.whatsapp_link} onChange={(e) => updateField('whatsapp_link', e.target.value)} type="url" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Consult Button Link</label>
                  <input className={inputClass} value={settings.consult_link} onChange={(e) => updateField('consult_link', e.target.value)} type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Instagram URL</label>
                  <input className={inputClass} value={settings.instagram_url} onChange={(e) => updateField('instagram_url', e.target.value)} type="url" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">LinkedIn URL</label>
                  <input className={inputClass} value={settings.linkedin_url} onChange={(e) => updateField('linkedin_url', e.target.value)} type="url" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pinterest URL</label>
                  <input className={inputClass} value={settings.pinterest_url} onChange={(e) => updateField('pinterest_url', e.target.value)} type="url" />
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-[#3B2A23] mb-6">SEO</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Meta Title</label>
                  <input className={inputClass} value={settings.meta_title} onChange={(e) => updateField('meta_title', e.target.value)} type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Meta Description</label>
                  <textarea className={inputClass} value={settings.meta_description} onChange={(e) => updateField('meta_description', e.target.value)} rows="3" />
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-[#3B2A23] mb-6">System</h3>
              <label className="flex items-center justify-between p-4 bg-[#F5F0EA] rounded-xl border border-[#C6A77D]/20 cursor-pointer">
                <div>
                  <p className="font-bold text-[#3B2A23]">Maintenance Mode</p>
                  <p className="text-xs text-gray-600">Store this setting for public access handling.</p>
                </div>
                <input
                  checked={Boolean(settings.maintenance_mode)}
                  onChange={(e) => updateField('maintenance_mode', e.target.checked)}
                  className="w-5 h-5 accent-[#3B2A23]"
                  type="checkbox"
                />
              </label>
            </section>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-8">
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-[#3B2A23] mb-6">Logo Management</h3>
              <div className="space-y-6">
                {[
                  ['dark_logo_url', 'Logo Dark'],
                  ['light_logo_url', 'Logo Light'],
                  ['favicon_url', 'Favicon'],
                ].map(([key, label]) => (
                  <div key={key} className="space-y-2">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</p>
                    <div className="rounded-xl border border-gray-200 p-4 space-y-3">
                      {settings[key] ? (
                        <img className="h-16 max-w-full object-contain rounded-lg bg-[#F5F0EA] p-2" src={settings[key]} alt={label} />
                      ) : (
                        <div className="h-16 rounded-lg bg-[#F5F0EA] flex items-center justify-center text-gray-400">
                          <span className="material-symbols-outlined">image</span>
                        </div>
                      )}
                      <input className={inputClass} value={settings[key]} onChange={(e) => updateField(key, e.target.value)} placeholder="https://..." type="text" />
                      <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-bold text-[#3B2A23] hover:bg-gray-50 cursor-pointer">
                        <span className="material-symbols-outlined text-base">upload</span>
                        {uploadingKey === key ? 'Uploading...' : 'Upload'}
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(key, e.target.files?.[0])} disabled={Boolean(uploadingKey)} />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-[#3B2A23] mb-6">Visual Identity</h3>
              <div className="space-y-5">
                {[
                  ['primary_color', 'Primary Color'],
                  ['accent_color', 'Accent Color'],
                  ['background_color', 'Background Color'],
                ].map(([key, label]) => (
                  <div key={key} className="flex items-center gap-3">
                    <input value={settings[key]} onChange={(e) => updateField(key, e.target.value)} type="color" className="w-12 h-10 rounded border border-gray-200 bg-white" />
                    <div className="flex-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
                      <input className={inputClass} value={settings[key]} onChange={(e) => updateField(key, e.target.value)} type="text" />
                    </div>
                  </div>
                ))}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Headline Font</label>
                  <input className={inputClass} value={settings.headline_font} onChange={(e) => updateField('headline_font', e.target.value)} type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Body Font</label>
                  <input className={inputClass} value={settings.body_font} onChange={(e) => updateField('body_font', e.target.value)} type="text" />
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      <div className="pt-6 border-t border-gray-200 flex items-center justify-end space-x-4">
        <button type="button" onClick={fetchSettings} className="px-8 py-3 text-sm font-bold text-gray-500 hover:text-[#3B2A23] transition-all">
          Discard Changes
        </button>
        <button type="submit" disabled={saving || loading} className="px-10 py-3 bg-[#3B2A23] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#2A1F18] hover:shadow-lg transition-all disabled:opacity-60">
          {saving ? 'Saving...' : 'Save Configurations'}
        </button>
      </div>
    </form>
  );
};

export default AdminSettingsPage;
