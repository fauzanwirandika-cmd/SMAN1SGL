import React from 'react';
import { User, UserRole } from '../../types';
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  FileCode2,
  MenuSquare,
  ShieldAlert,
  GraduationCap,
  ArrowLeft,
  LogOut,
  UserCheck,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface AdminSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  currentUser: User;
  onSwitchRole: (role: UserRole) => void;
  onLogout: () => void;
  onBackToPublic: () => void;
  pendingMembersCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  onSwitchRole,
  onLogout,
  onBackToPublic,
  pendingMembersCount
}) => {
  const roleLabels: Record<UserRole, { label: string; badge: string; color: string }> = {
    super_admin: { label: 'Super Admin', badge: 'Hak Akses Penuh', color: 'bg-amber-500/20 text-amber-300' },
    admin: { label: 'Admin Sekolah', badge: 'Manajemen Data', color: 'bg-blue-500/20 text-blue-300' },
    editor: { label: 'Editor Konten', badge: 'Publikasi & Arsip', color: 'bg-emerald-500/20 text-emerald-300' },
    member: { label: 'Member Civitas', badge: 'Akses Mandiri', color: 'bg-slate-500/20 text-slate-300' }
  };

  return (
    <aside className="w-64 bg-[#0A2540] text-slate-300 flex flex-col shrink-0 min-h-screen border-r border-slate-800">
      
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0066CC] text-white flex items-center justify-center font-bold shadow-sm">
            <GraduationCap className="w-5 h-5 text-[#FFB800]" />
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-tight">SMAN 1 SGL</div>
            <div className="text-[11px] text-slate-400">Panel Manajemen Terpadu</div>
          </div>
        </div>
      </div>

      {/* Role Switcher Sandbox for Evaluator */}
      <div className="p-3 mx-3 my-3 bg-white/5 rounded-xl border border-white/10">
        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Simulasi Peran (Role):</span>
          <span className="text-[#FFB800] font-mono text-[9px]">Ubah Instan</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {(['super_admin', 'admin', 'editor', 'member'] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => onSwitchRole(r)}
              className={`px-2 py-1.5 text-[11px] font-medium rounded-lg text-left transition-colors truncate ${
                currentUser.role === r
                  ? 'bg-[#0066CC] text-white font-semibold'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {r === 'super_admin' ? 'Super Admin' : r === 'admin' ? 'Admin' : r === 'editor' ? 'Editor' : 'Member'}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        
        {/* Common Dashboard */}
        <button
          onClick={() => onSelectTab('overview')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
            currentTab === 'overview'
              ? 'bg-[#0066CC] text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 shrink-0" />
          <span>Statistik & Ringkasan</span>
        </button>

        {/* Super Admin & Admin: Member Management & Email Upload */}
        {(currentUser.role === 'super_admin' || currentUser.role === 'admin') && (
          <button
            onClick={() => onSelectTab('members')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'members'
                ? 'bg-[#0066CC] text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 shrink-0" />
              <span>Kelola Member</span>
            </div>
            {pendingMembersCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFB800] text-[#0A2540] font-mono tabular-nums">
                {pendingMembersCount}
              </span>
            )}
          </button>
        )}

        {/* Super Admin, Admin, Editor: Manajemen PIP (Kemendikdasmen) */}
        {currentUser.role !== 'member' && (
          <button
            onClick={() => onSelectTab('pip')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'pip'
                ? 'bg-[#0066CC] text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#FFB800] shrink-0" />
            <span>Manajemen PIP 2026</span>
          </button>
        )}

        {/* Super Admin, Admin, Editor: Pusat File & Dokumen */}
        {currentUser.role !== 'member' && (
          <button
            onClick={() => onSelectTab('files')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'files'
                ? 'bg-[#0066CC] text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FolderOpen className="w-4 h-4 shrink-0" />
            <span>Pusat File & Surat</span>
          </button>
        )}

        {/* Super Admin & Editor: Editor Halaman (Pratinjau) */}
        {(currentUser.role === 'super_admin' || currentUser.role === 'editor') && (
          <button
            onClick={() => onSelectTab('pages')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'pages'
                ? 'bg-[#0066CC] text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileCode2 className="w-4 h-4 shrink-0" />
            <span>Editor Halaman (Pratinjau)</span>
          </button>
        )}

        {/* Super Admin & Editor: Edit Identitas & Foto Profil Sekolah */}
        {(currentUser.role === 'super_admin' || currentUser.role === 'editor') && (
          <button
            onClick={() => onSelectTab('identity')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'identity'
                ? 'bg-[#0066CC] text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-[#FFB800] shrink-0" />
            <span>Edit Nama & Foto Profil</span>
          </button>
        )}

        {/* Super Admin & Editor: Menu Builder */}
        {(currentUser.role === 'super_admin' || currentUser.role === 'editor') && (
          <button
            onClick={() => onSelectTab('menu-builder')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'menu-builder'
                ? 'bg-[#0066CC] text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <MenuSquare className="w-4 h-4 shrink-0" />
            <span>Menu Builder Publik</span>
          </button>
        )}

        {/* Super Admin & Admin: Google Gemini AI Search */}
        {(currentUser.role === 'super_admin' || currentUser.role === 'admin') && (
          <button
            onClick={() => onSelectTab('gemini-search')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'gemini-search'
                ? 'bg-[#0066CC] text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#FFB800] shrink-0" />
            <span>Gemini AI Search</span>
          </button>
        )}

        {/* Super Admin only: Security & Audit */}
        {currentUser.role === 'super_admin' && (
          <button
            onClick={() => onSelectTab('security')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
              currentTab === 'security'
                ? 'bg-[#0066CC] text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Keamanan & Audit Log</span>
          </button>
        )}

        {/* Member only views */}
        {currentUser.role === 'member' && (
          <>
            <button
              onClick={() => onSelectTab('my-docs')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                currentTab === 'my-docs'
                  ? 'bg-[#0066CC] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Dokumen Akademik Saya</span>
            </button>
            <button
              onClick={() => onSelectTab('support')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                currentTab === 'support'
                  ? 'bg-[#0066CC] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>Bantuan & Layanan Siswa</span>
            </button>
          </>
        )}

      </nav>

      {/* User Info & Actions Bottom */}
      <div className="p-4 border-t border-white/10 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-700 overflow-hidden flex items-center justify-center font-bold text-white shrink-0">
            {currentUser.avatarUrl ? (
              <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
            ) : (
              currentUser.name.charAt(0)
            )}
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
            <div className="text-[10px] text-slate-400 truncate">{currentUser.email}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={onBackToPublic}
            className="flex-1 py-1.5 px-2.5 text-[11px] font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Ke Portal Publik</span>
          </button>
          <button
            onClick={onLogout}
            title="Keluar"
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

    </aside>
  );
};
