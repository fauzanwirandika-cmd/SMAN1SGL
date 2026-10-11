import React from 'react';
import { CheckCircle2, Calendar, FileText, ArrowRight, UserPlus, HelpCircle } from 'lucide-react';

interface PPDBSectionProps {
  onRegisterClick?: () => void;
  onDownloadGuideClick: () => void;
}

export const PPDBSection: React.FC<PPDBSectionProps> = ({
  onDownloadGuideClick
}) => {
  const tracks = [
    {
      title: 'Jalur Zonasi Domisili',
      quota: '50% Kuota',
      desc: 'Diperuntukkan bagi calon peserta didik yang berdomisili di dalam wilayah zonasi yang ditetapkan pemerintah daerah.',
      features: ['Berdasarkan jarak tempat tinggal', 'KK diterbitkan minimal 1 tahun', 'Memenuhi syarat usia SMA']
    },
    {
      title: 'Jalur Prestasi Akademik & Bakat',
      quota: '25% Kuota',
      desc: 'Bagi siswa berprestasi di bidang sains, olimpiade riset, seni, keagamaan, serta rekam jejak nilai rapor unggulan.',
      features: ['Sertifikat juara minimal tk. Kabupaten/Kota', 'Rata-rata nilai rapor smt 1-5', 'Portofolio bakat khusus']
    },
    {
      title: 'Jalur Afirmasi & Mutasi Orang Tua',
      quota: '25% Kuota',
      desc: 'Mendukung pemerataan pendidikan bagi keluarga prasejahtera serta perpindahan tugas kedinasan orang tua/wali.',
      features: ['Bukti kepesertaan KIP / PKH aktif', 'Surat penugasan resmi instansi', 'Dukungan fasilitas bimbingan']
    }
  ];

  const timeline = [
    { date: '15 - 25 Okt 2026', step: 'Pendaftaran Akun Digital & Unggah Dokumen' },
    { date: '26 - 28 Okt 2026', step: 'Verifikasi & Validasi Berkas Administrasi' },
    { date: '30 Okt 2026', step: 'Pengumuman Hasil Seleksi Resmi' },
    { date: '02 - 05 Nov 2026', step: 'Daftar Ulang & Orientasi Calon Siswa Baru' }
  ];

  return (
    <section id="ppdb" className="py-16 sm:py-20 bg-[#F4F6F8] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-[#0066CC] uppercase tracking-wider mb-2">
            Penerimaan Peserta Didik Baru
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] tracking-tight">
            PPDB SMAN1SGL Tahun Ajaran 2026/2027
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Proses seleksi transparan, akuntabel, dan terintegrasi digital untuk menjaring putra-putri terbaik bangsa.
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {tracks.map((track, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#0066CC] uppercase tracking-wider">
                    {track.quota}
                  </span>
                  <span className="text-xs font-mono text-slate-400">Jalur 0{i + 1}</span>
                </div>
                <h3 className="text-base font-bold text-[#0A2540] mb-2">
                  {track.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {track.desc}
                </p>

                <ul className="space-y-2 border-t border-slate-100 pt-3">
                  {track.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline & CTA Strip */}
        <div className="bg-[#0A2540] text-white rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Timeline Left (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#FFB800] uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>Jadwal Penting PPDB 2026/2027</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Alur & Linimasa Seleksi Calon Siswa Baru
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {timeline.map((item, idx) => (
                  <div key={idx} className="bg-white/10 rounded-xl p-3 border border-white/10">
                    <div className="text-[11px] font-mono text-[#FFB800] font-bold">{item.date}</div>
                    <div className="text-xs text-slate-200 mt-0.5">{item.step}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Box Right (5 cols) */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-xl p-6 shadow-md space-y-4">
              <div>
                <h4 className="text-sm font-bold text-[#0A2540]">
                  Layanan Pendaftaran Calon Siswa
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Pendaftaran dan aktivasi akun peserta didik baru dilayani langsung oleh Panitia PPDB & Tata Usaha SMAN 1 SGL.
                </p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={onDownloadGuideClick}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#0A2540] hover:bg-[#0066CC] rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-[#FFB800]" />
                  <span>Unduh Panduan Juknis PPDB 2026/2027</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-400 text-center font-mono">
                Pusat Bantuan PPDB: (0761) 849201 · Bebas Biaya Pendaftaran
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
