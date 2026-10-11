import React, { useState, useRef } from 'react';
import { PIPStudentRecipient, SchoolAnnouncement, UserRole } from '../../types';
import * as XLSX from 'xlsx';
import {
  Award,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Check,
  FileText,
  Upload,
  Trash2,
  Filter,
  FileSpreadsheet,
  Download,
  AlertCircle,
  Eye,
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface PIPManagerProps {
  recipients: PIPStudentRecipient[];
  userRole: UserRole;
  onAddRecipient: (item: PIPStudentRecipient) => void;
  onUpdateStatus: (id: string, status: PIPStudentRecipient['status']) => void;
  onDeleteRecipient: (id: string) => void;
  onAddAnnouncement: (ann: SchoolAnnouncement) => void;
  onSetRecipients?: (newItems: PIPStudentRecipient[]) => void;
}

export const PIPManager: React.FC<PIPManagerProps> = ({
  recipients,
  userRole,
  onAddRecipient,
  onUpdateStatus,
  onDeleteRecipient,
  onAddAnnouncement,
  onSetRecipients
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');

  // Excel Upload States
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [excelFileName, setExcelFileName] = useState<string | null>(null);
  const [parsedExcelRows, setParsedExcelRows] = useState<PIPStudentRecipient[]>([]);
  const [isProcessingExcel, setIsProcessingExcel] = useState(false);
  const [excelUploadMode, setExcelUploadMode] = useState<'append' | 'replace'>('append');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form New Recipient Manual
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [nisn, setNisn] = useState('');
  const [classGrade, setClassGrade] = useState('X-MIPA 1 (Fase E)');
  const [nominal, setNominal] = useState('Rp 1.800.000,-');
  const [status, setStatus] = useState<PIPStudentRecipient['status']>('Siap Cair');

  // Form New PIP Announcement
  const [isAnnounceModalOpen, setIsAnnounceModalOpen] = useState(false);
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filtered = recipients.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.nisn.includes(searchQuery) ||
      r.classGrade.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'Semua' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Handle Excel file selection & instant parsing to table
  const handleExcelFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setExcelFileName(file.name);
    setIsProcessingExcel(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Parse rows to JSON
        const rawRows: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        if (!rawRows || rawRows.length === 0) {
          showToast('File Excel tidak memiliki data baris.');
          setIsProcessingExcel(false);
          return;
        }

        // Map excel columns dynamically
        const parsed: PIPStudentRecipient[] = rawRows.map((row, idx) => {
          // Find field keys flexibly
          const findVal = (possibleKeys: string[]) => {
            for (const key of Object.keys(row)) {
              const lowerKey = key.toLowerCase().trim();
              if (possibleKeys.some((p) => lowerKey.includes(p))) {
                return String(row[key]).trim();
              }
            }
            return '';
          };

          const rowName = findVal(['nama', 'peserta', 'siswa']) || `Siswa Baru ${idx + 1}`;
          const rowNisn = findVal(['nisn', 'nomor induk', 'induk']) || `00${Date.now().toString().slice(-8)}`;
          const rowClass = findVal(['kelas', 'fase', 'tingkat', 'rombel']) || 'X-Fase E';
          const rowNominal = findVal(['nominal', 'jumlah', 'bantuan', 'dana']) || 'Rp 1.800.000,-';
          let rowStatusRaw = findVal(['status', 'keterangan']) || 'Siap Cair';
          
          let rowStatus: PIPStudentRecipient['status'] = 'Siap Cair';
          const lowerStatus = rowStatusRaw.toLowerCase();
          if (lowerStatus.includes('aktif')) rowStatus = 'Rekening Aktif';
          else if (lowerStatus.includes('cairkan') || lowerStatus.includes('sudah cair') || lowerStatus.includes('telah')) rowStatus = 'Telah Dicairkan';
          else if (lowerStatus.includes('proses')) rowStatus = 'Dalam Proses';
          else rowStatus = 'Siap Cair';

          const rowBank = findVal(['bank', 'penyalur', 'rekening']) || 'BNI SimPel';
          const rowTermin = findVal(['termin', 'tahap', 'tahun']) || 'Termin 2 / 2026';

          return {
            id: `pip-excel-${Date.now()}-${idx}`,
            name: rowName,
            nisn: rowNisn,
            classGrade: rowClass,
            nominal: rowNominal.startsWith('Rp') ? rowNominal : `Rp ${rowNominal}`,
            status: rowStatus,
            bank: rowBank,
            termin: rowTermin,
            dateUpdated: new Date().toISOString().split('T')[0]
          };
        });

        setParsedExcelRows(parsed);
        setIsProcessingExcel(false);
        showToast(`Berhasil membaca file Excel: ${parsed.length} baris data ditemukan.`);
      } catch (err: any) {
        console.error('Error parsing excel:', err);
        showToast('Gagal membaca file Excel. Pastikan format file .xlsx atau .xls valid.');
        setIsProcessingExcel(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // Apply parsed Excel table to public recipients
  const handleApplyExcelData = () => {
    if (parsedExcelRows.length === 0) return;

    if (onSetRecipients) {
      if (excelUploadMode === 'replace') {
        onSetRecipients(parsedExcelRows);
      } else {
        onSetRecipients([...parsedExcelRows, ...recipients]);
      }
    } else {
      parsedExcelRows.forEach((item) => onAddRecipient(item));
    }

    showToast(`Sukses! ${parsedExcelRows.length} data siswa dari Excel telah otomatis diterbitkan ke Tabel Publik.`);
    setIsExcelModalOpen(false);
    setParsedExcelRows([]);
    setExcelFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Download official sample Excel template
  const handleDownloadExcelTemplate = () => {
    const templateData = [
      {
        'No': 1,
        'Nama Siswa': 'Ahmad Fauzi Ramadhan',
        'NISN': '0089123456',
        'Kelas': 'X-MIPA 1 (Fase E)',
        'Nominal': 'Rp 1.800.000,-',
        'Status': 'Siap Cair',
        'Bank': 'BNI SimPel',
        'Termin': 'Termin 2 / 2026'
      },
      {
        'No': 2,
        'Nama Siswa': 'Siti Khadijah Azzahra',
        'NISN': '0078456123',
        'Kelas': 'XI-IPS 2 (Fase F)',
        'Nominal': 'Rp 1.800.000,-',
        'Status': 'Rekening Aktif',
        'Bank': 'BNI SimPel',
        'Termin': 'Termin 2 / 2026'
      },
      {
        'No': 3,
        'Nama Siswa': 'Dimas Pratama Putra',
        'NISN': '0069781245',
        'Kelas': 'XII-MIPA 2',
        'Nominal': 'Rp 900.000,-',
        'Status': 'Telah Dicairkan',
        'Bank': 'BNI SimPel',
        'Termin': 'Termin 1 / 2026'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data_Penerima_PIP');
    XLSX.writeFile(wb, 'Format_Import_PIP_SMAN1SGL.xlsx');
    showToast('Format template Excel (.xlsx) berhasil diunduh.');
  };

  // Manual Recipient Submission
  const handleCreateRecipient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !nisn.trim()) return;

    const newRec: PIPStudentRecipient = {
      id: `pip-${Date.now()}`,
      name: name.trim(),
      nisn: nisn.trim(),
      classGrade,
      nominal,
      status,
      bank: 'BNI SimPel',
      termin: 'Termin 2 / 2026',
      dateUpdated: new Date().toISOString().split('T')[0]
    };

    onAddRecipient(newRec);
    setIsAddModalOpen(false);
    setName('');
    setNisn('');
    showToast(`Data penerima PIP ${newRec.name} berhasil ditambahkan.`);
  };

  // Manual Announcement Submission
  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;

    const newAnn: SchoolAnnouncement = {
      id: `ann-pip-${Date.now()}`,
      title: annTitle.trim(),
      category: 'PIP',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      summary: annContent.slice(0, 140) + '...',
      content: annContent,
      author: userRole === 'super_admin' ? 'Super Admin PIP' : userRole === 'admin' ? 'Admin Beasiswa' : 'Editor Konten',
      isPinned: true,
      readsCount: 0
    };

    onAddAnnouncement(newAnn);
    setIsAnnounceModalOpen(false);
    setAnnTitle('');
    setAnnContent('');
    showToast('Pengumuman PIP resmi diterbitkan ke portal publik.');
  };

  return (
    <div className="space-y-6">
      
      {/* Toast */}
      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-700 hover:text-emerald-900">
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#0A2540] flex items-center gap-2">
            <span>Manajemen Program Indonesia Pintar (PIP) 2026</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              Kemendikdasmen
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            Unggah berkas Excel data siswa penerima PIP, perbarui status pencairan, dan publikasikan ke tabel publik.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsExcelModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-4 h-4 text-white" />
            <span>Upload File Excel PIP</span>
          </button>

          <button
            onClick={() => setIsAnnounceModalOpen(true)}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-[#0066CC]" />
            <span>Terbitkan Warta PIP</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0A2540] hover:bg-[#0066CC] rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-[#FFB800]" />
            <span>Tambah Manual</span>
          </button>
        </div>
      </div>

      {/* Excel Instant Parsing Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <FileSpreadsheet className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
              <span>Sistem Otomatis Excel ke Tabel Publik</span>
              <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-1.5 py-0.2 rounded">
                Aktif
              </span>
            </h3>
            <p className="text-xs text-slate-600 mt-0.5 max-w-xl">
              Admin dapat mengunggah file spreadsheet (.xlsx, .xls) kapan saja. Sistem langsung mengubahnya menjadi baris tabel interaktif yang dapat dicari dan dilihat publik secara real-time.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleDownloadExcelTemplate}
            className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-white border border-emerald-300 hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh Format Excel</span>
          </button>
          <button
            onClick={() => setIsExcelModalOpen(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Buka & Parse Excel</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama siswa, NISN, atau kelas..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] bg-white text-slate-700 font-medium"
          >
            <option value="Semua">Semua Status</option>
            <option value="Siap Cair">Siap Cair</option>
            <option value="Rekening Aktif">Rekening Aktif</option>
            <option value="Dalam Proses">Dalam Proses</option>
            <option value="Telah Dicairkan">Telah Dicairkan</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
              <tr>
                <th className="py-3 px-4">Nama Siswa</th>
                <th className="py-3 px-4">NISN</th>
                <th className="py-3 px-4">Kelas / Tingkat</th>
                <th className="py-3 px-4">Nominal</th>
                <th className="py-3 px-4">Status Pencairan</th>
                <th className="py-3 px-4">Bank</th>
                <th className="py-3 px-4">Termin</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    Tidak ada data penerima PIP yang sesuai.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{r.name}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{r.nisn}</td>
                    <td className="py-3 px-4 text-slate-600">{r.classGrade}</td>
                    <td className="py-3 px-4 font-mono font-bold text-[#0066CC]">{r.nominal}</td>
                    <td className="py-3 px-4">
                      <select
                        value={r.status}
                        onChange={(e) => onUpdateStatus(r.id, e.target.value as any)}
                        className={`text-[11px] font-semibold rounded-md px-2 py-1 border focus:outline-none ${
                          r.status === 'Siap Cair'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : r.status === 'Rekening Aktif'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : r.status === 'Telah Dicairkan'
                            ? 'bg-slate-100 text-slate-800 border-slate-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                      >
                        <option value="Siap Cair">Siap Cair</option>
                        <option value="Rekening Aktif">Rekening Aktif</option>
                        <option value="Dalam Proses">Dalam Proses</option>
                        <option value="Telah Dicairkan">Telah Dicairkan</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{r.bank}</td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{r.termin}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          if (confirm(`Hapus data PIP untuk ${r.name}?`)) {
                            onDeleteRecipient(r.id);
                            showToast(`Data penerima PIP ${r.name} dihapus.`);
                          }
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: UPLOAD & PARSE EXCEL KE TABEL */}
      {isExcelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="p-5 bg-emerald-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Upload File Excel PIP</h3>
                  <p className="text-xs text-emerald-200">Otomatis berubah menjadi tabel data publik</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsExcelModalOpen(false);
                  setParsedExcelRows([]);
                  setExcelFileName(null);
                }}
                className="p-1 text-emerald-200 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              
              {/* File Input Box */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50 rounded-2xl p-6 text-center cursor-pointer transition-all"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={handleExcelFileChange}
                  className="hidden"
                />
                <FileSpreadsheet className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <div className="font-bold text-slate-800 text-sm">
                  {excelFileName ? excelFileName : 'Klik untuk Pilih File Excel (.xlsx / .xls / .csv)'}
                </div>
                <div className="text-slate-500 text-[11px] mt-1">
                  Kolom otomatis dideteksi: Nama Siswa, NISN, Kelas, Nominal, Status, Bank, Termin.
                </div>
              </div>

              {/* Processing Spinner */}
              {isProcessingExcel && (
                <div className="p-4 bg-slate-50 rounded-xl text-center text-slate-600 flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                  <span>Sedang memproses dan mengonversi isi Excel ke struktur tabel...</span>
                </div>
              )}

              {/* Parsed Preview Table */}
              {parsedExcelRows.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-slate-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Pratinjau Hasil Parsing ({parsedExcelRows.length} Siswa Ditemukan):</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-[11px] text-slate-600 font-medium">Metode Publikasi:</label>
                      <select
                        value={excelUploadMode}
                        onChange={(e) => setExcelUploadMode(e.target.value as any)}
                        className="px-2 py-1 text-[11px] border border-slate-200 rounded-lg bg-white"
                      >
                        <option value="append">Tambahkan ke Data Lama</option>
                        <option value="replace">Gantikan Seluruh Data Lama</option>
                      </select>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-xl overflow-hidden max-h-56 overflow-y-auto">
                    <table className="w-full text-left text-[11px]">
                      <thead className="bg-slate-100 text-slate-600 font-semibold sticky top-0">
                        <tr>
                          <th className="p-2">No</th>
                          <th className="p-2">Nama</th>
                          <th className="p-2">NISN</th>
                          <th className="p-2">Kelas</th>
                          <th className="p-2">Nominal</th>
                          <th className="p-2">Status</th>
                          <th className="p-2">Bank</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {parsedExcelRows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="p-2 font-mono text-slate-400">{idx + 1}</td>
                            <td className="p-2 font-bold text-slate-900">{row.name}</td>
                            <td className="p-2 font-mono">{row.nisn}</td>
                            <td className="p-2">{row.classGrade}</td>
                            <td className="p-2 font-mono text-emerald-700">{row.nominal}</td>
                            <td className="p-2">
                              <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded text-[10px] font-semibold border border-emerald-200">
                                {row.status}
                              </span>
                            </td>
                            <td className="p-2">{row.bank}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleDownloadExcelTemplate}
                  className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-700 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Contoh Template Excel</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsExcelModalOpen(false);
                      setParsedExcelRows([]);
                      setExcelFileName(null);
                    }}
                    className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    disabled={parsedExcelRows.length === 0}
                    onClick={handleApplyExcelData}
                    className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Terapkan ke Tabel Publik</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* MODAL MANUAL RECIPIENT */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-[#0A2540] text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">Tambah Data Siswa Penerima PIP</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-300 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleCreateRecipient} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap Siswa *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Muhammad Farhan"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0066CC]"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">NISN *</label>
                  <input
                    type="text"
                    value={nisn}
                    onChange={(e) => setNisn(e.target.value)}
                    placeholder="0087123984"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono focus:ring-2 focus:ring-[#0066CC]"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kelas / Fase</label>
                  <input
                    type="text"
                    value={classGrade}
                    onChange={(e) => setClassGrade(e.target.value)}
                    placeholder="X-MIPA 1"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0066CC]"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nominal Bantuan</label>
                  <input
                    type="text"
                    value={nominal}
                    onChange={(e) => setNominal(e.target.value)}
                    placeholder="Rp 1.800.000,-"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono focus:ring-2 focus:ring-[#0066CC]"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status Awal</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0066CC]"
                  >
                    <option value="Siap Cair">Siap Cair</option>
                    <option value="Rekening Aktif">Rekening Aktif</option>
                    <option value="Dalam Proses">Dalam Proses</option>
                    <option value="Telah Dicairkan">Telah Dicairkan</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0A2540] hover:bg-[#0066CC] text-white font-semibold rounded-lg"
                >
                  Simpan Penerima
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL ANNOUNCEMENT */}
      {isAnnounceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-[#0A2540] text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">Terbitkan Warta & Edaran PIP</h3>
              <button onClick={() => setIsAnnounceModalOpen(false)} className="text-slate-300 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleCreateAnnouncement} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Judul Pengumuman PIP *</label>
                <input
                  type="text"
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  placeholder="Contoh: Jadwal Pengambilan Surat Rekomendasi PIP Termin 2"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0066CC]"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Isi Surat / Pengumuman Lengkap *</label>
                <textarea
                  rows={5}
                  value={annContent}
                  onChange={(e) => setAnnContent(e.target.value)}
                  placeholder="Tuliskan petunjuk teknis, syarat dokumen, dan jadwal pencairan..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0066CC]"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAnnounceModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0A2540] hover:bg-[#0066CC] text-white font-semibold rounded-lg"
                >
                  Terbitkan Pengumuman
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
