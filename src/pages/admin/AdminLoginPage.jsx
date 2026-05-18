import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const AdminLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authService.login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark-brown text-on-background font-body-md selection:bg-secondary-container selection:text-on-secondary-container min-h-screen">
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-6">
        {/* Background Artistic Elements */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary-fixed-dim/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary-fixed/10 rounded-full blur-[100px]"></div>

        {/* Main Login Card */}
        <main className="relative z-10 w-full max-w-[480px]">
          <div className="bg-white border border-outline-variant/30 rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.1)] p-10 md:p-12">
            {/* Brand Header */}
            <div className="flex flex-col items-center mb-10">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://lh3.googleusercontent.com/aida/ADBb0ugy9bXXWWqqqLlJ5fxqTWWJn2Ci1wIztPxAgO9s8D9UMrtCRRdvyG2HQWhmiEh5YGvuAEPR-dWzDbFF5s4IDmCWRfOfLLMQTjPC6dgZRA9sUShtqWJYnhYk4WsUybKGqArQK3g_RTgvbrEz3pFOH3eUMPoX44fL_jz-nrZpiMSWMJ7s5KRSw7RNR_otRNV3omFu_9pvEXIY4D4iVbohsb6pE4HDbjywANYGNUujgsZyzFYNTeLN1T-U0kw-pAbvZgKJ1JZt0JzxuhY"
                  alt="Kalatmaka Logo"
                  className="w-auto object-contain h-10"
                />
              </div>
              <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-[0.2em]">Administrative Portal</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error}
              </div>
            )}

            {/* Form Section */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant ml-1" htmlFor="email">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <input
                    className="w-full bg-surface border border-outline-variant rounded-lg py-3.5 pl-11 pr-4 text-on-surface font-body-md focus:ring-1 focus:ring-secondary focus:border-secondary transition-all outline-none"
                    id="email"
                    name="email"
                    placeholder="name@kalatmaka.com"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="password">Password</label>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                  <input
                    className="w-full bg-surface border border-outline-variant rounded-lg py-3.5 pl-11 pr-12 text-on-surface font-body-md focus:ring-1 focus:ring-secondary focus:border-secondary transition-all outline-none"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-secondary transition-colors"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                className="w-full bg-primary-container text-on-primary py-4 rounded-lg font-title-lg text-body-md hover:shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <span>Secure Login</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            {/* Support Footer */}
            <div className="mt-10 pt-8 border-t border-outline-variant/30 flex flex-col items-center gap-4">
              <p className="text-body-sm text-on-surface-variant">Authorized personnel only</p>
            </div>
          </div>

          {/* Branding Accent */}
          <div className="mt-12 overflow-hidden rounded-2xl h-[120px] shadow-sm relative group">
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <p className="font-display-lg text-body-sm text-white tracking-widest opacity-80 uppercase">Atelier CMS v4.0</p>
            </div>
          </div>
        </main>

        {/* Fixed Footer Copyright */}
        <footer className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-label-caps text-white/60 tracking-widest">© {new Date().getFullYear()} KALATMAKA DESIGN GROUP. ALL RIGHTS RESERVED.</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminLoginPage;