import React, { useState, useMemo } from 'react';
import { SchoolDocument } from '../../types';
import { Download, FileText, Search, HardDrive, Check, ExternalLink, Cloud } from 'lucide-react';

interface DocumentsSectionProps {
  documents: SchoolDocument[];
}

export const DocumentsSection: React.FC<DocumentsSectionProps> = ({ documents }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const publicDocs = useMemo(() => {
    return documents.filter(
      (doc) =>
        doc.isPublic &&
        (doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [documents, searchQuery]);

  const handleDownload = (doc: SchoolDocument) => {
    setDownloadingId(doc.id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadToast(`Berkas "${doc.title}" berhasil diunduh.`);
      setTimeout(() => setDownloadToast(null), 4000);
    }, 700);
  };

  return (
    <section id="dokumen" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Toast Alert */}
        {downloadToast && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{downloadToast}</span>
            </div>
            <button onClick={() => setDownloadToast(null)} className="text-emerald-700 hover:text-emerald-900 text-xs">
              Tutup
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold text-[#0066CC] uppercase tracking-wider mb-2">
              Repositori & Unduhan
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] tracking-tight">
              Dokumen Publik & Panduan Akademik
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Akses terbuka untuk silabus kurikulum, formulir resmi, pedoman asesmen, dan juknis penerimaan peserta didik baru SMAN1SGL.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berkas dokumen..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:bg-white text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Nama Dokumen</th>
                  <th className="py-3.5 px-4 hidden sm:table-cell">Kategori</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Sumber & Ukuran</th>
                  <th className="py-3.5 px-4 hidden lg:table-cell text-right">Diperbarui</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Aksi Unduh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {publicDocs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      Tidak ada dokumen yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  publicDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066CC] flex items-center justify-center shrink-0 mt-0.5">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 leading-snug">
                              {doc.title}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5 flex sm:hidden items-center gap-2">
                              <span>{doc.category}</span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono tabular-nums">{doc.size}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 hidden sm:table-cell text-slate-600 font-medium">
                        {doc.category}
                      </td>

                      <td className="py-4 px-4 hidden md:table-cell text-slate-500">
                        <div className="flex items-center gap-1.5 font-mono tabular-nums">
                          {doc.source === 'gdrive' ? (
                            <span className="flex items-center gap-1 text-slate-700">
                              <Cloud className="w-3.5 h-3.5 text-blue-600" />
                              <span>Google Drive</span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-slate-700">
                              <HardDrive className="w-3.5 h-3.5 text-slate-500" />
                              <span>Server Lokal</span>
                            </span>
                          )}
                          <span aria-hidden="true">·</span>
                          <span>{doc.size}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4 hidden lg:table-cell text-right text-slate-500 font-mono tabular-nums">
                        {doc.updatedAt}
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-right">
                        <button
                          onClick={() => handleDownload(doc)}
                          disabled={downloadingId === doc.id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0A2540] bg-slate-100 hover:bg-[#0066CC] hover:text-white rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
                        >
                          {downloadingId === doc.id ? (
                            <span>Mengunduh...</span>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5" />
                              <span>Unduh Berkas</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
