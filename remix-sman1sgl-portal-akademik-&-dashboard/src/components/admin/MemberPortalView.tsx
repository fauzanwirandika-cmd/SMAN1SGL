import React, { useState } from 'react';
import { User, SchoolDocument } from '../../types';
import {
  BookOpen,
  Award,
  FileCheck,
  Download,
  Send,
  CheckCircle,
  HelpCircle,
  GraduationCap,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface MemberPortalViewProps {
  currentUser: User;
  documents: SchoolDocument[];
}

export const MemberPortalView: React.FC<MemberPortalViewProps> = ({
  currentUser,
  documents
}) => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Akademik & Nilai');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;
    setTicketSent(true);
    setTicketSubject('');
    setTicketMessage('');
    setTimeout(() => setTicketSent(false), 5000);
  };

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-[#0A2540] text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#FFB800]">
            <GraduationCap className="w-4 h-4" />
            <span>Zona Mandiri Siswa & Civitas Akademika</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Selamat Datang, {currentUser.name}
          </h2>
          <p className="text-xs text-slate-300 max-w-xl">
            {currentUser.nisnNip || 'NISN 0078129384'} · Status: Terdaftar Aktif Semester Ganjil TA 2026/2027
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-xs space-y-1 self-start md:self-auto">
          <div className="text-slate-300">Presensi Kehadiran Semester Ini:</div>
          <div className="text-lg font-bold text-[#FFB800] font-mono tabular-nums">98.5% (Disiplin Tinggi)</div>
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Repositori Dokumen Akademik Siswa (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0A2540] uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-[#0066CC]" />
              <span>Dokumen Akademik & Kartu Ujian</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">Tersedia untuk Unduh</span>
          </div>

          <div className="space-y-3">
            {/* Kartu Ujian */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#0066CC] flex items-center justify-center font-bold">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Kartu Peserta Asesmen Sumatif (ASTS) Ganjil 2026/2027
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    Ruang Lab CBT-02 · Sesi 1 (Pukul 07.30 WIB)
                  </div>
                </div>
              </div>
              <button
                onClick={() => alert('Mengunduh Kartu Peserta Ujian PDF...')}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0A2540] hover:bg-[#0066CC] rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>Cetak Kartu</span>
              </button>
            </div>

            {/* Kalender & Silabus */}
            {documents.slice(0, 3).map((doc) => (
              <div key={doc.id} className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200 flex items-center justify-between hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-900">{doc.title}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{doc.category} · {doc.size}</div>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Mengunduh berkas ${doc.title}...`)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Layanan Bantuan Siswa (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-xs font-bold text-[#0A2540] uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-[#0066CC]" />
            <span>Pengajuan Layanan / Tiket Bantuan</span>
          </div>

          {ticketSent ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-2 text-center py-6">
              <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
              <div className="font-bold">Permohonan Berhasil Dikirimkan</div>
              <p className="text-[11px] text-emerald-700">
                Tiket bantuan Anda telah diteruskan ke staf Tata Usaha & Bimbingan Konseling SMAN1SGL. Tanggapan akan dikirimkan ke email terdaftar.
              </p>
            </div>
          ) : (
            <form onSubmit={handleTicketSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kategori Layanan
                </label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] bg-white"
                >
                  <option value="Akademik & Nilai">Koreksi Nilai & Raport</option>
                  <option value="Surat Keterangan Siswa">Permohonan Surat Aktif Belajar</option>
                  <option value="Legalisir Dokumen">Legalisir Dokumen & Sertifikat</option>
                  <option value="Konseling & Siswa">Bimbingan Karir & Konseling</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Perihal / Subjek Permohonan *
                </label>
                <input
                  type="text"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="Contoh: Permohonan Surat Keterangan Aktif Belajar"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Rincian Keterangan *
                </label>
                <textarea
                  rows={3}
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Tuliskan keperluan dan rincian permohonan Anda..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-semibold text-white bg-[#0A2540] hover:bg-[#0066CC] rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>Kirimkan Permohonan</span>
              </button>
            </form>
          )}

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>Layanan diproses pada hari kerja (Senin - Jumat, 08.00 - 15.00 WIB).</span>
          </div>
        </div>

      </div>

    </div>
  );
};
