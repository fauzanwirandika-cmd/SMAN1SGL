import React, { useState } from 'react';
import { SchoolDocument } from '../../types';
import {
  Upload,
  HardDrive,
  Cloud,
  FileText,
  Trash2,
  Download,
  Eye,
  CheckCircle,
  FolderPlus,
  RefreshCw,
  Search,
  ExternalLink,
  Lock,
  Globe
} from 'lucide-react';

interface FileCenterProps {
  documents: SchoolDocument[];
  onAddDocument: (doc: SchoolDocument) => void;
  onDeleteDocument: (id: string) => void;
}

export const FileCenter: React.FC<FileCenterProps> = ({
  documents,
  onAddDocument,
  onDeleteDocument
}) => {
  const [activeTab, setActiveTab] = useState<'local' | 'gdrive'>('local');
  const [searchFilter, setSearchFilter] = useState('');

  // Local Upload Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Pedoman Akademik');
  const [isPublic, setIsPublic] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Google Drive Simulation Picker State
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [gdriveConnected, setGdriveConnected] = useState(true);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLocalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsUploading(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          const ext = selectedFile ? selectedFile.name.split('.').pop()?.toLowerCase() : 'pdf';
          const fileType = (ext === 'eml' || ext === 'msg' ? 'eml' : ext === 'xlsx' || ext === 'xls' ? 'xls' : ext === 'txt' ? 'txt' : ext === 'doc' || ext === 'docx' ? 'doc' : 'pdf') as any;

          const newDoc: SchoolDocument = {
            id: `doc-${Date.now()}`,
            title: title.trim(),
            category,
            fileType,
            size: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.5 MB',
            downloadCount: 0,
            isPublic,
            source: 'local',
            updatedAt: new Date().toISOString().split('T')[0],
            uploadedBy: 'Fauzandeliwirandika'
          };

          onAddDocument(newDoc);
          setTitle('');
          setSelectedFile(null);
          setUploadProgress(0);
          showToast(`File "${newDoc.title}" berhasil diunggah.`);
          return 0;
        }
        return prev + 25;
      });
    }, 150);
  };

  // Google Drive Mock Files in Picker
  const gdriveFilesToPick = [
    { name: 'Surat Elektronik (Email) Dinas Pendidikan - Alokasi PIP 2026.pdf', size: '1.2 MB', driveId: '1DRV-EMAIL-DISDIK-PIP', cat: 'Surat Masuk & Email Resmi' },
    { name: 'Arsip Korespondensi Email Resmi Tata Usaha SMAN 1 SGL.eml', size: '850 KB', driveId: '1DRV-ARSIP-EMAIL-TU', cat: 'Surat Masuk & Email Resmi' },
    { name: 'Modul Ajar Informatika Kelas XI - Kurikulum Merdeka.pdf', size: '4.8 MB', driveId: '1DRV-INFO-XI-2026', cat: 'Modul Pembelajaran' },
    { name: 'Rekapitulasi Nilai Asesmen Sumatif Akhir Semester Genap.xlsx', size: '2.1 MB', driveId: '1DRV-REKAP-ASAS-2026', cat: 'Penilaian Akademik' },
    { name: 'Dokumen Verifikasi Akreditasi Perpustakaan Nasional.pdf', size: '8.4 MB', driveId: '1DRV-PERPUS-AKRED-A', cat: 'Arsip Institusi' },
    { name: 'Panduan Ekstrakurikuler Karya Ilmiah Remaja (KIR).pdf', size: '3.1 MB', driveId: '1DRV-PANDUAN-KIR-2026', cat: 'Kesiswaan' }
  ];

  const handlePickFromGDrive = (item: typeof gdriveFilesToPick[0]) => {
    const ext = item.name.split('.').pop()?.toLowerCase();
    const fileType = (ext === 'eml' || ext === 'msg' ? 'eml' : ext === 'xlsx' || ext === 'xls' ? 'xls' : ext === 'txt' ? 'txt' : 'pdf') as any;

    const newDoc: SchoolDocument = {
      id: `doc-gdrive-${Date.now()}`,
      title: item.name,
      category: item.cat,
      fileType,
      size: item.size,
      downloadCount: 0,
      isPublic: true,
      source: 'gdrive',
      driveId: item.driveId,
      updatedAt: new Date().toISOString().split('T')[0],
      uploadedBy: 'Google Workspace Sync'
    };

    onAddDocument(newDoc);
    setIsPickerOpen(false);
    showToast(`Dokumen Google Drive "${item.name}" berhasil ditautkan.`);
  };

  const handleSyncDriveFile = (id: string) => {
    setSyncingId(id);
    setTimeout(() => {
      setSyncingId(null);
      showToast('Sinkronisasi Google Drive berhasil diperbarui.');
    }, 700);
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesTab = doc.source === activeTab;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-emerald-700 hover:text-emerald-900">
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#0A2540]">
            Pusat File & Repositori Dokumen
          </h2>
          <p className="text-xs text-slate-500">
            Manajemen dokumen digital dengan dukungan penyimpanan lokal dan integrasi cloud Google Drive (Google Picker).
          </p>
        </div>
      </div>

      {/* Main Tabs: Upload Lokal vs Integrasi Google Drive */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-xl px-4 pt-2">
        <button
          onClick={() => setActiveTab('local')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'local'
              ? 'border-[#0066CC] text-[#0066CC]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <HardDrive className="w-4 h-4" />
          <span>Upload Lokal</span>
          <span className="ml-1 text-[10px] font-mono tabular-nums text-slate-400">
            ({documents.filter((d) => d.source === 'local').length})
          </span>
        </button>

        <button
          onClick={() => setActiveTab('gdrive')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'gdrive'
              ? 'border-[#0066CC] text-[#0066CC]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Cloud className="w-4 h-4 text-blue-600" />
          <span>Integrasi Google Drive</span>
          <span className="ml-1 text-[10px] font-mono tabular-nums text-slate-400">
            ({documents.filter((d) => d.source === 'gdrive').length})
          </span>
        </button>
      </div>

      {/* Tab 1 Content: Upload Lokal Form */}
      {activeTab === 'local' ? (
        <div className="bg-white p-5 rounded-b-xl border border-t-0 border-slate-200 shadow-sm space-y-5">
          <form onSubmit={handleLocalSubmit} className="space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-[#0A2540]">
              Unggah Berkas Baru ke Server Lokal
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Judul Dokumen Resmi *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Kalender Akademik 2026/2027"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kategori Dokumen
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] bg-white"
                >
                  <option value="Surat Masuk & Email Resmi">Surat Masuk & Email Resmi</option>
                  <option value="Arsip Korespondensi Digital">Arsip Korespondensi Digital</option>
                  <option value="Pedoman Akademik">Pedoman Akademik</option>
                  <option value="PPDB & Penerimaan">PPDB & Penerimaan</option>
                  <option value="Kurikulum">Kurikulum Merdeka</option>
                  <option value="Formulir">Formulir & Administrasi</option>
                  <option value="Arsip Institusi">Arsip Institusi</option>
                  <option value="Keuangan & Tata Usaha">Keuangan & Tata Usaha</option>
                </select>
              </div>
            </div>

            {/* Drag & drop / File input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pilih Berkas dari PC File Explorer (PDF, DOCX, XLSX, EML, MSG, TXT)
              </label>
              <div className="border-2 border-dashed border-slate-200 hover:border-[#0066CC] rounded-xl p-6 text-center bg-slate-50/50 transition-colors">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-600">
                  {selectedFile ? (
                    <span className="font-semibold text-[#0066CC]">{selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                  ) : (
                    <>Tarik berkas atau email ke sini atau <span className="text-[#0066CC] font-semibold underline cursor-pointer">pilih dari File Explorer komputer</span></>
                  )}
                </p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.eml,.msg,.txt,.zip"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                      if (!title) {
                        setTitle(e.target.files[0].name.replace(/\.[^/.]+$/, ''));
                      }
                    }
                  }}
                  className="hidden"
                  id="local-file-picker"
                />
                <label htmlFor="local-file-picker" className="mt-2 inline-block px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-md cursor-pointer hover:bg-slate-100">
                  Buka File Explorer PC
                </label>
              </div>
            </div>

            {/* Visibility Option */}
            <div className="flex items-center gap-4 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="rounded border-slate-300 text-[#0066CC] focus:ring-[#0066CC]"
                />
                <span className="text-slate-700">Publikasikan ke Portal Publik (Dapat diunduh umum)</span>
              </label>
            </div>

            {/* Progress bar if uploading */}
            {isUploading && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Mengunggah berkas...</span>
                  <span className="font-mono">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#0066CC] h-2 transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isUploading}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0A2540] hover:bg-[#0066CC] rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Upload className="w-4 h-4 text-[#FFB800]" />
              <span>{isUploading ? 'Memproses Berkas...' : 'Unggah Dokumen'}</span>
            </button>
          </form>
        </div>
      ) : (
        /* Tab 2 Content: Google Drive Integration */
        <div className="bg-white p-5 rounded-b-xl border border-t-0 border-slate-200 shadow-sm space-y-5">
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-blue-900">
                  Koneksi Google Workspace & Google Drive SMAN1SGL
                </h4>
                <p className="text-[11px] text-blue-700 mt-0.5">
                  Terhubung aman melalui Google Picker API dengan otentikasi akun resmi sekolah.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPickerOpen(true)}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center gap-2"
              >
                <FolderPlus className="w-4 h-4" />
                <span>Buka Google Picker</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Files List Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        
        {/* Table Filter Bar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs font-bold text-[#0A2540]">
            Daftar Berkas Terkelola ({filteredDocs.length} Dokumen)
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Cari dalam tab ini..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4 sm:px-6">Nama Dokumen</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Ukuran & Akses</th>
                <th className="py-3 px-4 hidden md:table-cell">Pengunggah</th>
                <th className="py-3 px-4 sm:px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    Belum ada berkas pada tab ini.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066CC] flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 leading-snug">
                            {doc.title}
                          </div>
                          {doc.source === 'gdrive' && doc.driveId && (
                            <div className="text-[10px] text-blue-600 font-mono flex items-center gap-1 mt-0.5">
                              <Cloud className="w-3 h-3" />
                              <span className="truncate max-w-xs">{doc.driveId}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {doc.category}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono tabular-nums text-slate-500">{doc.size}</span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        {doc.isPublic ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 text-[11px]">
                            <Globe className="w-3 h-3" />
                            <span>Publik</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-500 text-[11px]">
                            <Lock className="w-3 h-3" />
                            <span>Privat</span>
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 hidden md:table-cell text-slate-500">
                      {doc.uploadedBy}
                    </td>

                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        {doc.source === 'gdrive' && (
                          <button
                            onClick={() => handleSyncDriveFile(doc.id)}
                            title="Sinkronisasi dari Google Drive"
                            disabled={syncingId === doc.id}
                            className="p-1.5 text-slate-500 hover:text-blue-600 rounded hover:bg-blue-50"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${syncingId === doc.id ? 'animate-spin' : ''}`} />
                          </button>
                        )}
                        <button
                          onClick={() => showToast(`Mengunduh berkas ${doc.title}...`)}
                          title="Unduh"
                          className="p-1.5 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-100"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            onDeleteDocument(doc.id);
                            showToast(`Berkas ${doc.title} telah dihapus.`);
                          }}
                          title="Hapus"
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Google Picker Simulation Modal */}
      {isPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-bold">Google Picker · Google Drive SMAN1SGL</span>
              </div>
              <button onClick={() => setIsPickerOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="p-4 border-b border-slate-100 bg-slate-50 text-xs text-slate-600">
              Pilih dokumen kurikulum atau arsip dari Shared Drive resmi sekolah untuk disinkronkan ke portal:
            </div>

            <div className="p-4 divide-y divide-slate-100 max-h-80 overflow-y-auto">
              {gdriveFilesToPick.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handlePickFromGDrive(item)}
                  className="py-3 px-2 flex items-center justify-between hover:bg-blue-50 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">{item.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">{item.size} · {item.cat}</div>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    Pilih
                  </button>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-right">
              <button
                onClick={() => setIsPickerOpen(false)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg"
              >
                Tutup Picker
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
