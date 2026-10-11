import React, { useState, useMemo } from 'react';
import { SchoolAnnouncement } from '../../types';
import { Search, Pin, Calendar, User, Eye, X, ArrowUpRight } from 'lucide-react';

interface AnnouncementsSectionProps {
  announcements: SchoolAnnouncement[];
}

export const AnnouncementsSection: React.FC<AnnouncementsSectionProps> = ({ announcements }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalAnnouncement, setActiveModalAnnouncement] = useState<SchoolAnnouncement | null>(null);

  const categories = ['Semua', 'PIP', 'Akademik', 'Kesiswaan', 'Prestasi', 'Agenda'];

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((item) => {
      const matchCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
      const matchQuery =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [announcements, selectedCategory, searchQuery]);

  return (
    <section id="pengumuman" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold text-[#0066CC] uppercase tracking-wider mb-2">
              Warta & Agenda Resmi
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] tracking-tight">
              Pengumuman & Berita Sekolah
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Informasi terverifikasi mengenai kalender akademik, capaian prestasi, kegiatan kesiswaan, dan edaran kedinasan.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pengumuman..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:bg-white text-slate-800 placeholder-slate-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filters (interactive buttons/segmented controls) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#0A2540] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Announcements List */}
        {filteredAnnouncements.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-12 text-center text-slate-500">
            <p className="text-sm font-medium">Tidak ada pengumuman yang sesuai dengan kriteria pencarian.</p>
            <button
              onClick={() => { setSelectedCategory('Semua'); setSearchQuery(''); }}
              className="mt-3 text-xs font-semibold text-[#0066CC] hover:underline"
            >
              Reset Filter Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAnnouncements.map((item) => (
              <article
                key={item.id}
                onClick={() => setActiveModalAnnouncement(item)}
                className="group relative bg-[#F4F6F8] hover:bg-white border border-slate-200 hover:border-[#0066CC]/40 rounded-xl p-6 transition-all shadow-none hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Clean unboxed metadata with dot separators */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    {item.isPinned && (
                      <span className="flex items-center gap-1 text-[#0066CC] font-semibold">
                        <Pin className="w-3.5 h-3.5 fill-current" />
                        <span>Sematkan</span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                      </span>
                    )}
                    <span className="font-medium text-slate-700">{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{item.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{item.readsCount} dibaca</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#0A2540] group-hover:text-[#0066CC] transition-colors leading-snug mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Oleh: {item.author}</span>
                  <span className="font-semibold text-[#0066CC] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Baca Lengkap</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>

      {/* Detail Modal */}
      {activeModalAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-[#0066CC]">{activeModalAnnouncement.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{activeModalAnnouncement.date}</span>
                <span aria-hidden="true">·</span>
                <span>Oleh {activeModalAnnouncement.author}</span>
              </div>
              <button
                onClick={() => setActiveModalAnnouncement(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[#0A2540] mb-4 leading-snug">
              {activeModalAnnouncement.title}
            </h2>

            <div className="prose prose-sm text-slate-700 leading-relaxed whitespace-pre-line border-t border-slate-100 pt-4">
              {activeModalAnnouncement.content}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-mono tabular-nums">
                <Eye className="w-4 h-4 text-slate-400" />
                <span>{activeModalAnnouncement.readsCount} total tayangan</span>
              </div>
              <button
                onClick={() => setActiveModalAnnouncement(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0A2540] hover:bg-[#0066CC] rounded-lg transition-colors"
              >
                Tutup Pengumuman
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
