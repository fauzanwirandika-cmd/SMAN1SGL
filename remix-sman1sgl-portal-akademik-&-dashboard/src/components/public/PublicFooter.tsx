import React from 'react';
import { Shield, MapPin, Phone, Mail, Clock, GraduationCap, ExternalLink } from 'lucide-react';

interface PublicFooterProps {
  onNavigateToAdmin: () => void;
  onNavigateToAuth: () => void;
  isAuthenticated: boolean;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({
  onNavigateToAdmin,
  onNavigateToAuth,
  isAuthenticated
}) => {
  return (
    <footer className="bg-[#0A2540] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0066CC] text-white flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6 text-[#FFB800]" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">SMAN 1 SGL</span>
                <p className="text-xs text-slate-400">SMA Negeri 1 Unggulan</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mendidik generasi berkarakter, berbudaya ilmiah, dan tangguh menghadapi dinamika peradaban global berbasis nilai ketuhanan dan kebangsaan.
            </p>
            <div className="pt-2 text-xs text-slate-400 font-mono">
              NPSN: 10402891 · Akreditasi: A (Unggul)
            </div>
          </div>

          {/* Col 2: Alamat & Kontak */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Kontak & Alamat Kampus
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FFB800] shrink-0 mt-0.5" />
                <span>Jl. Pendidikan No. 1, Kompleks Kampus Pendidikan, SGL - Indonesia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FFB800] shrink-0" />
                <span className="font-mono tabular-nums">(0761) 849201 / (0761) 849202</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FFB800] shrink-0" />
                <span>info@sman1sgl.sch.id</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FFB800] shrink-0" />
                <span>Senin - Jumat: 07.00 - 16.00 WIB</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Layanan Akademik */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Layanan & Tautan Penting
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#pengumuman" className="hover:text-white transition-colors">
                  Pengumuman & Kalender Pendidikan
                </a>
              </li>
              <li>
                <a href="#dokumen" className="hover:text-white transition-colors">
                  Dokumen Kurikulum Merdeka
                </a>
              </li>
              <li>
                <a href="#galeri" className="hover:text-white transition-colors">
                  Galeri & Prestasi Siswa
                </a>
              </li>
              <li>
                <a href="#ppdb" className="hover:text-white transition-colors">
                  Pusat Bantuan PPDB Online
                </a>
              </li>
              <li>
                <span className="text-slate-400">Sistem Penjaminan Mutu Internal (SPMI)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Status Zona Privat */}
          <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <Shield className="w-4 h-4 text-[#FFB800]" />
              <span>Akses Zona Privat</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Area khusus staf pendidik, admin, dan peserta didik terverifikasi untuk pengelolaan nilai, berkas, dan sistem.
            </p>
            <div className="pt-2">
              {isAuthenticated ? (
                <button
                  onClick={onNavigateToAdmin}
                  className="w-full py-2 px-3 text-xs font-semibold text-[#0A2540] bg-[#FFB800] hover:bg-[#e6a600] rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Panel Manajemen</span>
                </button>
              ) : (
                <button
                  onClick={onNavigateToAuth}
                  className="w-full py-2 px-3 text-xs font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/20 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Masuk ke Zona Privat</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar with mandatory Copyright: © Fauzandeliwirandika — SMAN1SGL. All rights reserved. */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <span>© Fauzandeliwirandika — SMAN1SGL. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Standar Aksesibilitas WCAG 2.2 AA</span>
            <span aria-hidden="true">·</span>
            <span>Sistem Desain & Antarmuka Terpadu</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
