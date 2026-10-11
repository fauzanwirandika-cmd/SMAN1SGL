import React from 'react';
import { Users, HardDrive, MailCheck, ShieldCheck, Clock, Cloud } from 'lucide-react';
import { User, SchoolDocument } from '../../types';

interface StatCardsProps {
  users: User[];
  documents: SchoolDocument[];
  onNavigateToMembers: () => void;
  onNavigateToFiles: () => void;
}

export const StatCards: React.FC<StatCardsProps> = ({
  users,
  documents,
  onNavigateToMembers,
  onNavigateToFiles
}) => {
  const activeUsers = users.filter((u) => u.status === 'active');
  const pendingUsers = users.filter((u) => u.status === 'pending');
  const verifiedUsers = users.filter((u) => u.emailVerified);

  const localDocs = documents.filter((d) => d.source === 'local');
  const gdriveDocs = documents.filter((d) => d.source === 'gdrive');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      
      {/* Card 1: Member Aktif */}
      <div 
        onClick={onNavigateToMembers}
        className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-[#0066CC]/50 transition-colors cursor-pointer"
      >
        <div className="flex items-center justify-between text-slate-500 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Member Aktif
          </span>
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066CC] flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="text-3xl font-extrabold text-[#0A2540] font-mono tabular-nums">
          {activeUsers.length}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
          <span className="font-mono tabular-nums text-emerald-600 font-semibold">
            {verifiedUsers.length} Terverifikasi
          </span>
          <span aria-hidden="true">·</span>
          <span>Total {users.length} terdaftar</span>
        </div>
      </div>

      {/* Card 2: File Tersimpan */}
      <div 
        onClick={onNavigateToFiles}
        className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-[#0066CC]/50 transition-colors cursor-pointer"
      >
        <div className="flex items-center justify-between text-slate-500 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            File Tersimpan
          </span>
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#FFB800] flex items-center justify-center">
            <HardDrive className="w-4 h-4 text-amber-600" />
          </div>
        </div>
        <div className="text-3xl font-extrabold text-[#0A2540] font-mono tabular-nums">
          {documents.length}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
          <span className="font-mono tabular-nums text-slate-700">
            {localDocs.length} Lokal
          </span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums text-blue-600 font-semibold">
            {gdriveDocs.length} Google Drive
          </span>
        </div>
      </div>

      {/* Card 3: Antrean Verifikasi Member */}
      <div 
        onClick={onNavigateToMembers}
        className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-[#0066CC]/50 transition-colors cursor-pointer"
      >
        <div className="flex items-center justify-between text-slate-500 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Antrean Approval
          </span>
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="text-3xl font-extrabold text-[#0A2540] font-mono tabular-nums">
          {pendingUsers.length}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
          {pendingUsers.length > 0 ? (
            <span className="text-amber-600 font-semibold">
              Menunggu persetujuan admin
            </span>
          ) : (
            <span className="text-emerald-600 font-medium">
              Semua pendaftaran diproses
            </span>
          )}
        </div>
      </div>

      {/* Card 4: Status Keamanan & Audit */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between text-slate-500 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Status Keamanan
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-emerald-700">
          Aman & Terenkripsi
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
          <span>TLS 1.3 Aktif</span>
          <span aria-hidden="true">·</span>
          <span>Audit Log Realtime</span>
        </div>
      </div>

    </div>
  );
};
