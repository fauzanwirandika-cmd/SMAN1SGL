import React, { useState } from 'react';
import { CustomPage } from '../../types';
import {
  Monitor,
  Smartphone,
  Save,
  FileCode,
  Eye,
  CheckCircle,
  ExternalLink,
  Layers,
  ArrowRight,
  GraduationCap
} from 'lucide-react';

interface PageEditorProps {
  pages: CustomPage[];
  onSavePage: (page: CustomPage) => void;
}

export const PageEditor: React.FC<PageEditorProps> = ({ pages, onSavePage }) => {
  const [selectedPageId, setSelectedPageId] = useState<string>(pages[0]?.id || 'page-home');

  // Form state
  const selectedPage = pages.find((p) => p.id === selectedPageId) || pages[0];
  const [title, setTitle] = useState(selectedPage?.title || '');
  const [slug, setSlug] = useState(selectedPage?.slug || '');
  const [status, setStatus] = useState<'published' | 'draft'>(selectedPage?.status || 'published');
  const [heroSubtitle, setHeroSubtitle] = useState(selectedPage?.heroSubtitle || '');
  const [contentHtml, setContentHtml] = useState(selectedPage?.contentHtml || '');
  const [ctaText, setCtaText] = useState(selectedPage?.ctaText || '');
  const [ctaLink, setCtaLink] = useState(selectedPage?.ctaLink || '');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // When changing page selector
  const handleSelectPage = (id: string) => {
    const p = pages.find((page) => page.id === id);
    if (p) {
      setSelectedPageId(id);
      setTitle(p.title);
      setSlug(p.slug);
      setStatus(p.status);
      setHeroSubtitle(p.heroSubtitle);
      setContentHtml(p.contentHtml);
      setCtaText(p.ctaText || '');
      setCtaLink(p.ctaLink || '');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: CustomPage = {
      ...selectedPage,
      title,
      slug,
      status,
      heroSubtitle,
      contentHtml,
      ctaText,
      ctaLink,
      lastModified: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    onSavePage(updated);
    setToastMessage(`Perubahan halaman "${title}" berhasil disimpan.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#0A2540]">
            Editor Halaman & Pratinjau Berdampingan
          </h2>
          <p className="text-xs text-slate-500">
            Sunting isi halaman secara visual dengan Live Preview langsung di viewport Desktop dan Ponsel (Mobile).
          </p>
        </div>

        {/* Page Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectPage(p.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedPageId === p.id
                  ? 'bg-white text-[#0A2540] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-emerald-700 hover:text-emerald-900">
            ✕
          </button>
        </div>
      )}

      {/* Main Grid: Left is Form, Right is Dual Preview (Desktop + Mobile) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Visual Form Editor (5 Cols) */}
        <div className="xl:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-[#0A2540] uppercase tracking-wider">
                Parameter Halaman
              </span>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-[#0A2540] hover:bg-[#0066CC] rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Save className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>Simpan Perubahan</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Judul Halaman *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Status Publikasi
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] bg-white"
                >
                  <option value="published">Dipublikasikan</option>
                  <option value="draft">Draf Internal</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sub-Tajuk / Tagline Hero *
              </label>
              <textarea
                rows={2}
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Konten Teks / HTML *
              </label>
              <textarea
                rows={6}
                value={contentHtml}
                onChange={(e) => setContentHtml(e.target.value)}
                placeholder="Isi teks atau artikel halaman..."
                className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] leading-relaxed"
                required
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Perubahan langsung diperbarui pada pratinjau desktop & ponsel di sebelah kanan.
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Label Tombol Aksi (CTA)
                </label>
                <input
                  type="text"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                  placeholder="Contoh: Unduh Brosur"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tautan Aksi (CTA Link)
                </label>
                <input
                  type="text"
                  value={ctaLink}
                  onChange={(e) => setCtaLink(e.target.value)}
                  placeholder="Contoh: #dokumen"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                />
              </div>
            </div>

          </form>
        </div>

        {/* Live Preview Side-by-Side (7 Cols) */}
        <div className="xl:col-span-7 space-y-6">
          
          {/* 1. Desktop Live Preview Frame */}
          <div className="bg-slate-900 rounded-2xl p-3 shadow-lg border border-slate-800">
            <div className="flex items-center justify-between px-3 py-1.5 text-xs text-slate-400 border-b border-slate-800 mb-2">
              <div className="flex items-center gap-2">
                <Monitor className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-semibold text-white">Pratinjau Desktop (1440px Scaled)</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Live Rendering</span>
              </div>
            </div>

            {/* Desktop Scaled Viewport Container */}
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 text-slate-800 text-left">
              {/* Mini Topbar */}
              <div className="bg-[#0A2540] text-white px-4 py-2.5 flex items-center justify-between text-xs border-b border-white/10">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#FFB800]" />
                  <span className="font-bold">SMAN 1 SGL</span>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-slate-300">
                  <span className="hover:text-white">Beranda</span>
                  <span className="hover:text-white">Pengumuman</span>
                  <span className="hover:text-white">Dokumen</span>
                </div>
              </div>

              {/* Mini Hero */}
              <div className="bg-[#0A2540] text-white p-5 border-b border-slate-200/20">
                <span className="text-[10px] uppercase font-semibold text-[#FFB800] tracking-wider block mb-1">
                  {status === 'published' ? '● Terbit Resmi' : '○ Draf Internal'}
                </span>
                <h3 className="text-base font-extrabold text-white leading-snug">
                  {title || 'Judul Halaman'}
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-lg leading-relaxed">
                  {heroSubtitle || 'Sub-tajuk halaman...'}
                </p>
                {ctaText && (
                  <button className="mt-3 px-3 py-1.5 bg-[#FFB800] text-[#0A2540] font-bold text-[11px] rounded-lg shadow-sm">
                    {ctaText}
                  </button>
                )}
              </div>

              {/* Mini Content */}
              <div className="p-5 text-xs text-slate-700 leading-relaxed bg-[#F4F6F8]">
                <div className="bg-white p-4 rounded-xl border border-slate-200 whitespace-pre-line">
                  {contentHtml || 'Konten halaman akan muncul di sini...'}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Mobile Smartphone Live Preview Frame */}
          <div className="bg-slate-900 rounded-2xl p-3 shadow-lg border border-slate-800">
            <div className="flex items-center justify-between px-3 py-1.5 text-xs text-slate-400 border-b border-slate-800 mb-2">
              <div className="flex items-center gap-2">
                <Smartphone className="w-3.5 h-3.5 text-[#FFB800]" />
                <span className="font-semibold text-white">Pratinjau Ponsel (Mobile Viewport 375px)</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Resposif & Zero Horizontal Scroll</span>
            </div>

            {/* Mobile Device Mockup */}
            <div className="max-w-[340px] mx-auto bg-white rounded-2xl overflow-hidden border-4 border-slate-700 shadow-xl text-left">
              {/* Phone Status bar */}
              <div className="bg-[#0A2540] px-4 py-1.5 text-[10px] text-slate-300 flex justify-between items-center border-b border-white/10 font-mono">
                <span>09:41</span>
                <span>4G · 100%</span>
              </div>

              {/* Mobile Header */}
              <div className="bg-[#0A2540] px-4 py-2.5 text-white flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#FFB800]" />
                  <span className="font-bold text-xs">SMAN 1 SGL</span>
                </div>
                <div className="text-[10px] bg-white/10 px-2 py-0.5 rounded">
                  Menu ☰
                </div>
              </div>

              {/* Mobile Hero */}
              <div className="bg-[#0A2540] text-white p-4 space-y-2">
                <h4 className="text-sm font-bold leading-snug">
                  {title || 'Judul Halaman'}
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {heroSubtitle || 'Sub-tajuk...'}
                </p>
                {ctaText && (
                  <button className="w-full py-2 bg-[#FFB800] text-[#0A2540] font-bold text-xs rounded-lg text-center mt-2">
                    {ctaText}
                  </button>
                )}
              </div>

              {/* Mobile Content */}
              <div className="p-3 text-[11px] text-slate-700 bg-[#F4F6F8]">
                <div className="bg-white p-3 rounded-lg border border-slate-200 leading-relaxed whitespace-pre-line">
                  {contentHtml || 'Konten halaman...'}
                </div>
              </div>

              {/* Mobile Copyright */}
              <div className="p-3 bg-[#0A2540] text-center text-[9px] text-slate-400 border-t border-slate-800">
                © Fauzandeliwirandika — SMAN1SGL
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
