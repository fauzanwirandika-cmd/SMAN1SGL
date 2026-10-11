import React, { useState } from 'react';
import { SchoolIdentity } from '../../types';
import { Save, Image as ImageIcon, School, Check, User, Upload, RefreshCw } from 'lucide-react';

interface SchoolIdentityEditorProps {
  identity: SchoolIdentity;
  onSaveIdentity: (updated: SchoolIdentity) => void;
}

export const SchoolIdentityEditor: React.FC<SchoolIdentityEditorProps> = ({
  identity,
  onSaveIdentity
}) => {
  const [form, setForm] = useState<SchoolIdentity>({ ...identity });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const availableLogos = [
    { label: 'Logo Lambang Garuda / Obor Emas', url: '' },
    { label: 'Foto Kepala Sekolah Resmi', url: '/src/assets/images/principal_avatar_1791715068611.jpg' }
  ];

  const availableBanners = [
    { label: 'Gedung Kampus Utama & Halaman', url: '/src/assets/images/hero_sman1sgl_campus_1791715014925.jpg' },
    { label: 'Laboratorium Sains & Digital', url: '/src/assets/images/school_activity_classroom_1791715036198.jpg' },
    { label: 'Auditorium Apresiasi Prestasi', url: '/src/assets/images/school_ceremony_achievement_1791715056383.jpg' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveIdentity(form);
    setToastMessage('Identitas dan profil sekolah berhasil diperbarui.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast */}
      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-emerald-700 hover:text-emerald-900">
            ✕
          </button>
        </div>
      )}

      <div>
        <h2 className="text-lg font-bold text-[#0A2540]">
          Pengaturan Identitas & Foto Profil Sekolah
        </h2>
        <p className="text-xs text-slate-500">
          Ubah nama institusi, tagline, foto profil/logo resmi, dan banner sekolah yang ditampilkan di portal publik.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        
        {/* Identitas Teks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Resmi Sekolah *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Contoh: SMAN 1 SGL"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] font-bold text-[#0A2540]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tagline / Sub-Tajuk Web *
            </label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              placeholder="Contoh: Portal Akademik & Informasi Resmi"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
              required
            />
          </div>
        </div>

        {/* Kepala Sekolah */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Kepala Sekolah *
            </label>
            <input
              type="text"
              value={form.principalName}
              onChange={(e) => setForm({ ...form, principalName: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              NIP Kepala Sekolah
            </label>
            <input
              type="text"
              value={form.principalNip}
              onChange={(e) => setForm({ ...form, principalNip: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] font-mono"
            />
          </div>
        </div>

        {/* Foto Profil & Banner */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Pilih Foto Profil Kepala Sekolah:
            </label>
            <div className="flex items-center gap-4">
              <img
                src={form.principalAvatarUrl || '/src/assets/images/principal_avatar_1791715068611.jpg'}
                alt="Foto Profil"
                className="w-16 h-16 rounded-xl object-cover border-2 border-slate-200 shadow-sm"
              />
              <div className="flex-1 space-y-1.5">
                <input
                  type="text"
                  value={form.principalAvatarUrl}
                  onChange={(e) => setForm({ ...form, principalAvatarUrl: e.target.value })}
                  placeholder="URL atau path foto profil..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] font-mono"
                />
                <div className="text-[11px] text-slate-400">
                  Gunakan path asset gambar lokal atau URL beresolusi tinggi.
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Pilih Banner Utama Sekolah (Hero Section):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {availableBanners.map((b, i) => (
                <div
                  key={i}
                  onClick={() => setForm({ ...form, heroBannerUrl: b.url })}
                  className={`border-2 rounded-xl overflow-hidden cursor-pointer p-1.5 transition-all ${
                    form.heroBannerUrl === b.url
                      ? 'border-[#0066CC] bg-blue-50/50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={b.url} alt={b.label} className="w-full h-24 object-cover rounded-lg" />
                  <div className="text-[11px] font-semibold text-slate-700 mt-1 truncate">
                    {b.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0A2540] hover:bg-[#0066CC] rounded-xl shadow-sm transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-[#FFB800]" />
            <span>Simpan Perubahan Profil</span>
          </button>
        </div>

      </form>
    </div>
  );
};
