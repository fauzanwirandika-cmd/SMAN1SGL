import React from 'react';
import { ArrowRight, FileText, Bell, Award, Users, BookOpen, CheckCircle } from 'lucide-react';
import { SchoolIdentity } from '../../types';

interface HeroSectionProps {
  onNavigateToPPDB: () => void;
  onNavigateToAnnouncements: () => void;
  schoolIdentity?: SchoolIdentity;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateToPPDB,
  onNavigateToAnnouncements,
  schoolIdentity
}) => {
  return (
    <section id="beranda" className="relative overflow-hidden bg-[#0A2540] text-white pt-10 pb-20 lg:pt-14 lg:pb-24">
      {/* Background Campus Image with measured optical scrim */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity pointer-events-none">
        <img
          src={schoolIdentity?.heroBannerUrl || "/src/assets/images/hero_sman1sgl_campus_1791715014925.jpg"}
          alt="Gedung Kampus Utama SMAN1SGL"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540] via-[#0A2540]/90 to-[#0A2540]/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy (Col 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#FFB800] tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FFB800]" />
              <span>Akreditasi A Unggul · Sekolah Penggerak Nasional</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              Membangun Generasi Unggul Berkarakter & Berdaya Saing Global
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Selamat datang di portal resmi {schoolIdentity?.name || 'SMAN1SGL'}. Pusat informasi akademik terpadu, publikasi kegiatan, arsip dokumen kurikulum merdeka, bantuan PIP, dan layanan digital civitas akademika.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onNavigateToPPDB}
                className="px-6 py-3.5 text-sm font-semibold text-[#0A2540] bg-[#FFB800] hover:bg-[#e6a600] rounded-xl shadow-md transition-all flex items-center gap-2 transform active:scale-95"
              >
                <span>Informasi PPDB 2026/2027</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onNavigateToAnnouncements}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl backdrop-blur-sm transition-all flex items-center gap-2"
              >
                <Bell className="w-4 h-4 text-[#FFB800]" />
                <span>PIP</span>
              </button>
            </div>

            {/* Trust and Key School Metrics */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 text-slate-200">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">98.4%</div>
                <div className="text-xs text-slate-400 mt-1">Kelulusan PTN Favorit</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#FFB800] font-mono tabular-nums">38+</div>
                <div className="text-xs text-slate-400 mt-1">Juara Sains & Riset 2026</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">1.250+</div>
                <div className="text-xs text-slate-400 mt-1">Siswa & Pendidik Aktif</div>
              </div>
            </div>
          </div>

          {/* Sambutan Kepala Sekolah Card (Col 8-12) */}
          <div id="sambutan" className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 text-slate-800 shadow-xl border border-white/40">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative shrink-0">
                  <img
                    src={schoolIdentity?.principalAvatarUrl || "/src/assets/images/principal_avatar_1791715068611.jpg"}
                    alt="Foto Kepala Sekolah SMAN1SGL"
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover border-2 border-[#0A2540] shadow-sm"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-[#0A2540] text-[#FFB800] p-1 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0A2540] leading-snug">
                    {schoolIdentity?.principalName || 'Bapak Hidayat Nur Wahid, M.Pd'}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">
                    Kepala Sekolah {schoolIdentity?.name || 'SMAN 1 SGL'}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono tabular-nums">
                    NIP. {schoolIdentity?.principalNip || '19710315 199702 1 003'}
                  </p>
                </div>
              </div>

              <blockquote className="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 mb-5">
                "Pendidikan di SMAN1SGL bukan sekadar transfer ilmu pengetahuan, melainkan penempaan integritas, nalar kritis, dan empati sosial. Melalui ekosistem digital ini, transparansi dan kemudahan akses akademik kami dedikasikan seutuhnya bagi seluruh masyarakat dan peserta didik."
              </blockquote>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <BookOpen className="w-4 h-4 text-[#0066CC]" />
                  <span>Kurikulum Merdeka Mandiri Berbagi</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 tabular-nums">TA 2026/2027</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

