import React from 'react';
import { AuditLog } from '../../types';
import { ShieldCheck, ShieldAlert, Lock, Check, AlertTriangle, Key } from 'lucide-react';

interface SecurityAuditProps {
  logs: AuditLog[];
}

export const SecurityAudit: React.FC<SecurityAuditProps> = ({ logs }) => {
  const rbacMatrix = [
    {
      feature: 'Dashboard & Statistik Cepat',
      superAdmin: true,
      admin: true,
      editor: true,
      member: true
    },
    {
      feature: 'Kelola Member & Antrean Approval',
      superAdmin: true,
      admin: true,
      editor: false,
      member: false
    },
    {
      feature: 'Pusat File (Upload & Google Drive Picker)',
      superAdmin: true,
      admin: true,
      editor: true,
      member: false
    },
    {
      feature: 'Editor Halaman (Live Desktop/Mobile)',
      superAdmin: true,
      admin: true,
      editor: true,
      member: false
    },
    {
      feature: 'Menu Builder Publik',
      superAdmin: true,
      admin: false,
      editor: false,
      member: false
    },
    {
      feature: 'Audit Log & Konfigurasi Keamanan',
      superAdmin: true,
      admin: false,
      editor: false,
      member: false
    },
    {
      feature: 'Unduh Dokumen & Repositori Siswa',
      superAdmin: true,
      admin: true,
      editor: true,
      member: true
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-[#0A2540]">
          Pusat Keamanan & Log Audit Sistem
        </h2>
        <p className="text-xs text-slate-500">
          Pemantauan integritas akses pengguna, pencegahan intrusi, dan matriks hak akses Role-Based Access Control (RBAC).
        </p>
      </div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Enkripsi Transport TLS 1.3</div>
            <div className="text-[11px] text-slate-500 mt-0.5 font-mono">Sertifikat Valid s/d Okt 2027</div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0066CC] flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Proteksi Autentikasi</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Rate Limit & Safe Error Handling</div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Validasi Server & RBAC</div>
            <div className="text-[11px] text-slate-500 mt-0.5">4 Tingkat Otorisasi Terpisah</div>
          </div>
        </div>
      </div>

      {/* RBAC Matrix */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-[#0A2540] uppercase tracking-wider">
          Matriks Izin Peran (Role-Based Access Control)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                <th className="py-2.5 px-3">Fitur / Modul</th>
                <th className="py-2.5 px-3 text-center">Super Admin</th>
                <th className="py-2.5 px-3 text-center">Admin</th>
                <th className="py-2.5 px-3 text-center">Editor</th>
                <th className="py-2.5 px-3 text-center">Member (Siswa/Guru)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rbacMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 font-medium text-slate-800">{item.feature}</td>
                  <td className="py-2.5 px-3 text-center">
                    {item.superAdmin ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-slate-300">-</span>}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {item.admin ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-slate-300">-</span>}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {item.editor ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-slate-300">-</span>}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {item.member ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-slate-300">-</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#0A2540] uppercase tracking-wider">
            Log Aktivitas & Audit Keamanan Real-Time
          </h3>
          <span className="text-[11px] font-mono text-slate-400">Total {logs.length} Log</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="py-2.5 px-4">Waktu (WIB)</th>
                <th className="py-2.5 px-4">Aktor / Sistem</th>
                <th className="py-2.5 px-4">Aktivitas</th>
                <th className="py-2.5 px-4">Alamat IP</th>
                <th className="py-2.5 px-4 text-right">Tingkat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 text-slate-500 tabular-nums">{log.timestamp}</td>
                  <td className="py-3 px-4 text-slate-800 font-sans font-semibold">{log.actor}</td>
                  <td className="py-3 px-4 font-sans text-slate-700">{log.action}</td>
                  <td className="py-3 px-4 text-slate-500 tabular-nums">{log.ipAddress}</td>
                  <td className="py-3 px-4 text-right">
                    {log.severity === 'security' ? (
                      <span className="text-red-600 font-bold font-sans">SECURITY</span>
                    ) : log.severity === 'warning' ? (
                      <span className="text-amber-600 font-bold font-sans">WARNING</span>
                    ) : (
                      <span className="text-emerald-600 font-bold font-sans">INFO</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
