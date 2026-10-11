import React, { useState, useMemo } from 'react';
import { PIPStudentRecipient, SchoolAnnouncement } from '../../types';
import {
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  Filter,
  FileSpreadsheet,
  Building2,
  Users,
  Wallet,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface PIPSectionProps {
  recipients: PIPStudentRecipient[];
  announcements: SchoolAnnouncement[];
}

export const PIPSection: React.FC<PIPSectionProps> = ({ recipients, announcements }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [classFilter, setClassFilter] = useState('Semua');
  const [selectedRecipientModal, setSelectedRecipientModal] = useState<PIPStudentRecipient | null>(null);

  // Filtered recipients
  const filteredRecipients = useMemo(() => {
    return recipients.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nisn.includes(searchQuery) ||
        item.classGrade.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'Semua' || item.status === statusFilter;
      const matchClass =
        classFilter === 'Semua' ||
        (classFilter === 'Kelas X' && item.classGrade.includes('X')) ||
        (classFilter === 'Kelas XI' && item.classGrade.includes('XI')) ||
        (classFilter === 'Kelas XII' && item.classGrade.includes('XII'));

      return matchSearch && matchStatus && matchClass;
    });
  }, [recipients, searchQuery, statusFilter, classFilter]);

  // PIP-specific announcements
  const pipAnnouncements = useMemo(() => {
    return announcements.filter((a) => a.category === 'PIP');
  }, [announcements]);

  const getStatusBadge = (status: PIPStudentRecipient['status']) => {
    switch (status) {
      case 'Siap Cair':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Rekening Aktif':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Telah Dicairkan':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Dalam Proses':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <section id="pip" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0066CC] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-[#FFB800]" />
              <span>Kemendikdasmen RI · Beasiswa Afirmasi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] tracking-tight">
              PIP (Program Indonesia Pintar)
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Daftar resmi nama-nama siswa penerima bantuan PIP SMAN 1 SGL yang diunggah dan diverifikasi oleh pihak sekolah, dilengkapi informasi aktivasi rekening SimPel BNI.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-[#0A2540] shadow-xs">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Data Sinkronisasi Excel</span>
            </div>
          </div>
        </div>

        {/* Quick Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-[11px] font-semibold text-slate-500 uppercase">Penerima Terdaftar</div>
            <div className="text-2xl font-extrabold text-[#0A2540] mt-1 font-mono tabular-nums">
              {recipients.length} Siswa
            </div>
            <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Diverifikasi Tim Kesiswaan</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-[11px] font-semibold text-slate-500 uppercase">Besaran Bantuan SMA</div>
            <div className="text-2xl font-extrabold text-[#0066CC] mt-1 font-mono tabular-nums">
              Rp 1.800.000
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">Per Siswa / Tahun Anggaran</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-[11px] font-semibold text-slate-500 uppercase">Bank Penyalur Resmi</div>
            <div className="text-2xl font-extrabold text-slate-800 mt-1 font-mono">
              BNI SimPel
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">Bebas Biaya Administrasi</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-[11px] font-semibold text-slate-500 uppercase">Penyaluran Aktif</div>
            <div className="text-2xl font-extrabold text-[#FFB800] mt-1 font-mono">
              Termin 2 / 2026
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">SK Pemberian Resmi</div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mb-6 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berdasarkan Nama Siswa, NISN, atau Kelas..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:bg-white text-slate-800 placeholder-slate-400 font-medium transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Status & Kelas */}
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066CC] text-slate-700 font-medium"
              >
                <option value="Semua">Semua Status</option>
                <option value="Siap Cair">Siap Cair</option>
                <option value="Rekening Aktif">Rekening Aktif</option>
                <option value="Dalam Proses">Dalam Proses</option>
                <option value="Telah Dicairkan">Telah Dicairkan</option>
              </select>

              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066CC] text-slate-700 font-medium"
              >
                <option value="Semua">Semua Tingkat</option>
                <option value="Kelas X">Kelas X (Fase E)</option>
                <option value="Kelas XI">Kelas XI (Fase F)</option>
                <option value="Kelas XII">Kelas XII</option>
              </select>
            </div>

          </div>

          {searchQuery && (
            <div className="text-xs text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
              <span>
                Menampilkan hasil pencarian untuk: <strong>"{searchQuery}"</strong> ({filteredRecipients.length} siswa ditemukan)
              </span>
              <button
                onClick={() => { setSearchQuery(''); setStatusFilter('Semua'); setClassFilter('Semua'); }}
                className="text-[#0066CC] hover:underline font-semibold"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>

        {/* TABEL DAFTAR NAMA SISWA PENERIMA BANTUAN PIP */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-10">
          <div className="p-4 sm:p-5 border-b border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-[#0A2540]">
                Tabel Resmi Siswa Penerima Dana PIP SMAN1SGL
              </h3>
              <p className="text-xs text-slate-500">
                Data terunggah oleh Admin Kesiswaan & Sinkron Dapodik Kemendikdasmen
              </p>
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Total: {filteredRecipients.length} dari {recipients.length} Data
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <th className="py-3 px-4 w-12 text-center">No</th>
                  <th className="py-3 px-4">Nama Siswa</th>
                  <th className="py-3 px-4">NISN</th>
                  <th className="py-3 px-4">Kelas / Fase</th>
                  <th className="py-3 px-4">Nominal Bantuan</th>
                  <th className="py-3 px-4">Status Pencairan</th>
                  <th className="py-3 px-4">Rekening Bank</th>
                  <th className="py-3 px-4">Termin</th>
                  <th className="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecipients.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 px-4 text-center text-slate-400">
                      <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="font-semibold text-slate-600">Tidak ada nama siswa yang cocok dengan kriteria pencarian.</p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Pastikan ejaan nama atau nomor NISN sudah benar. Untuk konfirmasi data, hubungi Bagian Kesiswaan SMAN 1 SGL.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredRecipients.map((item, idx) => (
                    <tr
                      key={item.id}
                      className="hover:bg-blue-50/40 transition-colors"
                    >
                      <td className="py-3.5 px-4 text-center font-mono text-slate-400">
                        {idx + 1}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#0A2540]">
                        {item.name}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-medium text-slate-600">
                        {item.nisn}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        {item.classGrade}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[#0066CC]">
                        {item.nominal}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {item.bank}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                        {item.termin}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => setSelectedRecipientModal(item)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-[#0066CC] hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          Rincian
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50/70 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <span>
              Keterangan: Data di atas bersumber dari Surat Keputusan (SK) Pemberian & Nominasi PIP Kemendikdasmen RI.
            </span>
            <span className="font-mono">
              Terakhir diperbarui: {recipients[0]?.dateUpdated || 'Oktober 2026'}
            </span>
          </div>
        </div>

        {/* Prosedur Pencairan & Informasi Tambahan */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* 4 Langkah Pencairan */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#0A2540] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Tata Cara & Syarat Pencairan Bantuan PIP di Bank BNI</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bagi siswa yang berstatus <strong>"Siap Cair"</strong> atau <strong>"Rekening Aktif"</strong>, silakan ikuti petunjuk pencairan berikut:
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3 bg-slate-50 rounded-xl flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0A2540] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Ambil Surat Keterangan Kepala Sekolah</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    Kunjungi Ruang Tata Usaha (Kesiswaan) SMAN 1 SGL pada jam kerja untuk meminta surat keterangan aktif sebagai penerima PIP (gratis tanpa biaya).
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0A2540] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Siapkan Dokumen Kependudukan</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    Bawa fotokopi Kartu Keluarga (KK), fotokopi KTP Orang Tua/Wali, dan Kartu Tanda Siswa/NISN asli.
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0A2540] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Kunjungi Kantor Cabang Bank BNI Terdekat</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    Bawa Buku Tabungan SimPel BNI dan lakukan aktivasi atau penarikan langsung melalui teller bank penyalur.
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0A2540] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Konfirmasi Penarikan ke Sekolah</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    Laporkan fotokopi bukti penarikan ke staf kesiswaan agar status pada sistem berubah menjadi "Telah Dicairkan".
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Warta & Pengumuman PIP Terkini */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-[#0A2540] flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-[#FFB800]" />
                <span>Edaran & Pengumuman Resmi PIP</span>
              </h3>

              <div className="space-y-3">
                {pipAnnouncements.map((ann) => (
                  <article key={ann.id} className="p-4 bg-slate-50 hover:bg-blue-50/50 rounded-xl border border-slate-200/80 transition-colors">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1.5">
                      <span className="font-semibold text-[#0066CC]">{ann.category}</span>
                      <span>·</span>
                      <span>{ann.date}</span>
                    </div>
                    <h4 className="text-xs font-bold text-[#0A2540] leading-snug mb-1">
                      {ann.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {ann.summary}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Layanan Informasi: Tata Usaha</span>
              <span className="font-mono font-bold text-[#0A2540]">(0761) 849201</span>
            </div>
          </div>

        </div>

      </div>

      {/* Recipient Detail Modal */}
      {selectedRecipientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-[#0A2540] text-white flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold">Kartu Rincian Penerima PIP</h4>
                <p className="text-xs text-slate-300">SMAN 1 SGL · TA 2026/2027</p>
              </div>
              <button
                onClick={() => setSelectedRecipientModal(null)}
                className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl">
                <div className="text-[11px] text-slate-500">Nama Peserta Didik</div>
                <div className="text-sm font-bold text-[#0A2540]">{selectedRecipientModal.name}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="text-[11px] text-slate-500">Nomor Induk Siswa Nasional (NISN)</div>
                  <div className="font-mono font-bold text-slate-900">{selectedRecipientModal.nisn}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="text-[11px] text-slate-500">Kelas / Rombongan Belajar</div>
                  <div className="font-bold text-slate-900">{selectedRecipientModal.classGrade}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="text-[11px] text-slate-500">Alokasi Dana Bantuan</div>
                  <div className="font-mono font-bold text-emerald-700">{selectedRecipientModal.nominal}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="text-[11px] text-slate-500">Status Pencairan</div>
                  <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-full font-bold text-[10px] border ${getStatusBadge(selectedRecipientModal.status)}`}>
                    {selectedRecipientModal.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="text-[11px] text-slate-500">Bank Penyalur</div>
                  <div className="font-medium text-slate-800">{selectedRecipientModal.bank}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="text-[11px] text-slate-500">Termin Penyaluran</div>
                  <div className="font-medium text-slate-800">{selectedRecipientModal.termin}</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedRecipientModal(null)}
                  className="w-full py-2.5 bg-[#0A2540] hover:bg-[#0066CC] text-white font-semibold rounded-xl transition-colors"
                >
                  Tutup Rincian
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
