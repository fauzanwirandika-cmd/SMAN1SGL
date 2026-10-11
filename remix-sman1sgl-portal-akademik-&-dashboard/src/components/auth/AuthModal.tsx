import React, { useState } from 'react';
import { User } from '../../types';
import {
  X,
  Lock,
  Mail,
  User as UserIcon,
  Shield,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Info
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'forgot-password';
  onLoginSuccess: (user: User) => void;
  existingUsers: User[];
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess,
  existingUsers
}) => {
  const [mode, setMode] = useState<'login' | 'forgot-password'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');

  // Status & Validation
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validateEmail = (val: string) => /\S+@\S+\.\S+/.test(val);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const identifier = usernameOrEmail.trim().toLowerCase();

    if (!identifier || !password) {
      setErrorMessage('Harap masukkan Username/Email dan Kata Sandi.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      // Dedicated Admin Credentials Check: adminsmansas1 & supersmansa1@@
      if (identifier === 'adminsmansas1' && password === 'supersmansa1@@') {
        const superAdmin = existingUsers.find((u) => u.role === 'super_admin') || {
          id: 'usr-1',
          name: 'Fauzandeliwirandika',
          username: 'adminsmansas1',
          email: 'fauzanwirandika@gmail.com',
          password: 'supersmansa1@@',
          role: 'super_admin' as const,
          status: 'active' as const,
          emailVerified: true,
          registeredAt: '2026-01-10',
          lastLogin: new Date().toISOString().replace('T', ' ').slice(0, 16),
          avatarUrl: '/src/assets/images/principal_avatar_1791715068611.jpg',
          nisnNip: '19840512 200801 1 004'
        };
        onLoginSuccess(superAdmin);
        onClose();
        return;
      }

      // Check other registered users
      const found = existingUsers.find(
        (u) =>
          (u.username && u.username.toLowerCase() === identifier) ||
          (u.email.toLowerCase() === identifier)
      );

      if (!found) {
        setErrorMessage('Username/Email atau kata sandi tidak cocok.');
        return;
      }

      if (found.password && found.password !== password) {
        setErrorMessage('Kata sandi yang Anda masukkan salah. Silakan coba kembali.');
        return;
      }

      if (found.status === 'suspended') {
        setErrorMessage('Akses akun ini sedang ditangguhkan. Silakan hubungi admin IT.');
        return;
      }

      // Login success
      onLoginSuccess(found);
      onClose();
    }, 500);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!forgotEmail || !validateEmail(forgotEmail)) {
      setErrorMessage('Masukkan alamat email yang valid.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage('Jika alamat email tersebut terdaftar dalam sistem SMAN1SGL, instruksi pemulihan telah dikirimkan.');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header Modal */}
        <div className="p-5 bg-[#0A2540] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shadow-xs">
              <Shield className="w-5 h-5 text-[#FFB800]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                Portal Autentikasi SMAN1SGL
              </h3>
              <p className="text-[11px] text-slate-300">
                Akses Masuk Terproteksi Civitas Akademika
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher: Only Masuk and Lupa Sandi */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => { setMode('login'); setErrorMessage(null); setSuccessMessage(null); }}
            className={`flex-1 py-3 text-xs font-semibold text-center transition-colors border-b-2 ${
              mode === 'login'
                ? 'border-[#0066CC] text-[#0066CC] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Masuk Akun
          </button>
          <button
            onClick={() => { setMode('forgot-password'); setErrorMessage(null); setSuccessMessage(null); }}
            className={`flex-1 py-3 text-xs font-semibold text-center transition-colors border-b-2 ${
              mode === 'forgot-password'
                ? 'border-[#0066CC] text-[#0066CC] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Lupa Sandi
          </button>
        </div>

        {/* Body content */}
        <div className="p-6">
          
          {/* Alerts */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {mode === 'login' ? (
            /* Clean Login Form: Only Username and Password inputs */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Username atau Email
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    placeholder="Masukkan username atau email"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent font-medium"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Kata Sandi
                  </label>
                  <button
                    type="button"
                    onClick={() => setMode('forgot-password')}
                    className="text-[11px] text-[#0066CC] hover:underline"
                  >
                    Lupa sandi?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi"
                    className="w-full pl-9 pr-10 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent font-mono"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 text-xs font-semibold text-white bg-[#0A2540] hover:bg-[#0066CC] rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Memverifikasi...' : 'Masuk ke Sistem'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Informational notice: Account creation is centralized by school admin */}
              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2 leading-relaxed">
                <Info className="w-4 h-4 text-[#0066CC] shrink-0 mt-0.5" />
                <span>
                  <strong>Informasi Member:</strong> Pendaftaran akun baru dilakukan terpusat oleh Administrator Sekolah. Jika Anda siswa/guru dan belum memiliki akun, silakan hubungi bagian Tata Usaha SMAN 1 SGL.
                </span>
              </div>
            </form>
          ) : (
            /* Forgot Password Form */
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Masukkan alamat email yang terdaftar pada sistem SMAN1SGL. Kami akan memproses verifikasi dan mengirimkan tautan pemulihan.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Alamat Email Terdaftar
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="email@sman1sgl.sch.id"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 text-xs font-semibold text-white bg-[#0A2540] hover:bg-[#0066CC] rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Mengirim...' : 'Kirim Tautan Pemulihan'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setMode('login')}
                className="w-full py-2 text-xs text-slate-600 hover:text-slate-900 text-center font-medium"
              >
                Kembali ke Halaman Masuk
              </button>
            </form>
          )}

        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Keamanan Berlapis SMAN1SGL</span>
          <span>© Fauzandeliwirandika</span>
        </div>

      </div>
    </div>
  );
};
