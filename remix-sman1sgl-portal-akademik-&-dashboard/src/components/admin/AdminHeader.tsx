import React from 'react';
import { User } from '../../types';
import { ExternalLink, Shield, Bell, ChevronRight, Menu } from 'lucide-react';

interface AdminHeaderProps {
  currentTab: string;
  currentUser: User;
  onBackToPublic: () => void;
  onOpenMobileSidebar?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentTab,
  currentUser,
  onBackToPublic,
  onOpenMobileSidebar
}) => {
  const tabTitles: Record<string, string> = {
    overview: 'Ringkasan & Statistik Sistem',
    members: 'Pengelolaan Member & Antrean Verifikasi',
    pip: 'Manajemen Program Indonesia Pintar (PIP 2026)',
    files: 'Pusat File & Dokumen Surat',
    pages: 'Editor Halaman (Pratinjau Desktop & Ponsel)',
    identity: 'Pengaturan Nama & Foto Profil Sekolah',
    'menu-builder': 'Menu Builder Navigasi Publik',
    'gemini-search': 'Google Gemini AI Assistant & Search',
    security: 'Keamanan, Audit Log & Matriks Peran',
    'my-docs': 'Repositori Dokumen Akademik Saya',
    support: 'Pusat Bantuan & Layanan Siswa'
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30">
      
      {/* Breadcrumb Left */}
      <div className="flex items-center gap-3">
        {onOpenMobileSidebar && (
          <button
            onClick={onOpenMobileSidebar}
            className="md:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold text-[#0A2540]">Zona Privat</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#0066CC] font-medium truncate max-w-[200px] sm:max-w-none">
            {tabTitles[currentTab] || 'Dashboard'}
          </span>
        </div>
      </div>

      {/* Actions Right */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="capitalize">{currentUser.role.replace('_', ' ')}</span>
        </div>

        <button
          onClick={onBackToPublic}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#0A2540] hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
        >
          <span>Buka Portal Publik</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

    </header>
  );
};
