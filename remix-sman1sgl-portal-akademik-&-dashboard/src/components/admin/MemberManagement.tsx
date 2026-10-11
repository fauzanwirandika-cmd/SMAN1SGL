import React, { useState, useMemo, useRef } from 'react';
import { User, UserRole, UserStatus } from '../../types';
import * as XLSX from 'xlsx';
import {
  Search,
  Filter,
  Check,
  X,
  UserCheck,
  UserX,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Shield,
  Plus,
  Mail,
  AlertCircle,
  Upload,
  HardDrive,
  Cloud,
  FileSpreadsheet,
  FileText,
  CheckSquare,
  Square,
  KeyRound,
  Download,
  Users
} from 'lucide-react';

interface MemberManagementProps {
  users: User[];
  currentUserId: string;
  onApproveUser: (userId: string) => void;
  onRejectUser: (userId: string) => void;
  onUpdateRole: (userId: string, newRole: UserRole) => void;
  onToggleStatus: (userId: string, newStatus: UserStatus) => void;
  onAddUser: (user: User) => void;
  onBatchAddUsers?: (newUsers: User[]) => void;
}

interface ParsedEmailCandidate {
  id: string;
  name: string;
  email: string;
  username: string;
  password?: string;
  nisnNip?: string;
  role: UserRole;
  selected: boolean;
}

export const MemberManagement: React.FC<MemberManagementProps> = ({
  users,
  currentUserId,
  onApproveUser,
  onRejectUser,
  onUpdateRole,
  onToggleStatus,
  onAddUser,
  onBatchAddUsers
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'date'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Manual Add Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('member');
  const [newNisn, setNewNisn] = useState('');

  // Email Upload Modal State (PC File Explorer & Google Drive)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadSource, setUploadSource] = useState<'pc' | 'gdrive' | 'paste'>('pc');
  const [defaultPassword, setDefaultPassword] = useState('smansa2026#');
  const [defaultBatchRole, setDefaultBatchRole] = useState<UserRole>('member');
  const [rawPastedText, setRawPastedText] = useState('');
  const [customDriveUrl, setCustomDriveUrl] = useState('');
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [parsedCandidates, setParsedCandidates] = useState<ParsedEmailCandidate[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Sample Google Drive Files available to import
  const gdriveFiles = [
    {
      id: 'gdrive-1',
      name: 'Data_Email_Siswa_Kelas_X_TP_2026-2027.xlsx',
      size: '24.5 KB',
      recordCount: 10,
      description: 'Daftar email akun Google Workspace siswa baru Kelas X angkatan 2026/2027',
      emails: [
        { name: 'Aditya Pratama Putra', email: 'aditya.pratama@sman1sgl.sch.id', nisn: '0091234501' },
        { name: 'Bunga Citra Lestari', email: 'bunga.citra@sman1sgl.sch.id', nisn: '0091234502' },
        { name: 'Dimas Kurniawan', email: 'dimas.kurniawan@sman1sgl.sch.id', nisn: '0091234503' },
        { name: 'Farah Amalia Putri', email: 'farah.amalia@sman1sgl.sch.id', nisn: '0091234504' },
        { name: 'Gilang Ramadhan', email: 'gilang.ramadhan@sman1sgl.sch.id', nisn: '0091234505' },
        { name: 'Hana Safitri', email: 'hana.safitri@sman1sgl.sch.id', nisn: '0091234506' },
        { name: 'Irfan Hakim Maulana', email: 'irfan.hakim@sman1sgl.sch.id', nisn: '0091234507' },
        { name: 'Jasmine Aulia', email: 'jasmine.aulia@sman1sgl.sch.id', nisn: '0091234508' },
        { name: 'Kurnia Sandy', email: 'kurnia.sandy@sman1sgl.sch.id', nisn: '0091234509' },
        { name: 'Laila Nur Azizah', email: 'laila.nur@sman1sgl.sch.id', nisn: '0091234510' }
      ]
    },
    {
      id: 'gdrive-2',
      name: 'Daftar_Email_Penerima_PIP_SimPel_2026.csv',
      size: '14.2 KB',
      recordCount: 6,
      description: 'Rekapitulasi email penerima PIP 2026 untuk aktivasi akun member portal',
      emails: [
        { name: 'Muhammad Al-Fatih', email: 'alfatih.m@sman1sgl.sch.id', nisn: '0081234567' },
        { name: 'Nabila Syahrani', email: 'nabila.syahrani@sman1sgl.sch.id', nisn: '0082345678' },
        { name: 'Rangga Danendra', email: 'rangga.danendra@sman1sgl.sch.id', nisn: '0073456789' },
        { name: 'Siti Nur Aisyah', email: 'siti.aisyah@sman1sgl.sch.id', nisn: '0084567890' },
        { name: 'Taufik Hidayat', email: 'taufik.h@sman1sgl.sch.id', nisn: '0095678901' },
        { name: 'Zahra Amelia Putri', email: 'zahra.amelia@sman1sgl.sch.id', nisn: '0086789012' }
      ]
    },
    {
      id: 'gdrive-3',
      name: 'Database_Email_Guru_dan_Tendik_SMAN1SGL.xlsx',
      size: '18.8 KB',
      recordCount: 4,
      description: 'Daftar email resmi pendidik dan tenaga kependidikan SMAN 1 SGL',
      emails: [
        { name: 'Hendra Setiawan, S.Pd', email: 'hendra.setiawan@sman1sgl.sch.id', nisn: '19870412 201101 1 003' },
        { name: 'Ratna Dewi, M.Pd', email: 'ratna.dewi@sman1sgl.sch.id', nisn: '19850215 200902 2 004' },
        { name: 'Ahmad Fauzi, S.Kom', email: 'ahmad.fauzi@sman1sgl.sch.id', nisn: '19900320 201503 1 002' },
        { name: 'Sri Wahyuni, S.E', email: 'sri.wahyuni@sman1sgl.sch.id', nisn: '19920810 201801 2 005' }
      ]
    }
  ];

  // Helper to generate a clean username from email or name
  const makeUsername = (email: string, name: string) => {
    if (email && email.includes('@')) {
      return email.split('@')[0].toLowerCase().replace(/[^a-z0-9_.]/g, '');
    }
    return name.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z0-9_.]/g, '');
  };

  // Helper to extract candidate from text or row
  const processRawEmailRows = (rows: any[]): ParsedEmailCandidate[] => {
    const list: ParsedEmailCandidate[] = [];
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/i;

    rows.forEach((row, idx) => {
      let emailFound = '';
      let nameFound = '';
      let nisnFound = '';

      if (typeof row === 'string') {
        const match = row.match(emailRegex);
        if (match) {
          emailFound = match[0];
          // Try to get name from the rest of the string
          const clean = row.replace(emailFound, '').replace(/[,;|]/g, ' ').trim();
          nameFound = clean.length > 2 ? clean : emailFound.split('@')[0].replace(/[._]/g, ' ');
        }
      } else if (typeof row === 'object' && row !== null) {
        // Inspect row keys
        for (const [key, val] of Object.entries(row)) {
          const keyLower = key.toLowerCase();
          const strVal = String(val || '').trim();

          if (!emailFound && (keyLower.includes('email') || keyLower.includes('surel') || keyLower.includes('mail') || emailRegex.test(strVal))) {
            const m = strVal.match(emailRegex);
            if (m) emailFound = m[0];
          }

          if (!nameFound && (keyLower.includes('nama') || keyLower.includes('name') || keyLower.includes('siswa') || keyLower.includes('guru'))) {
            nameFound = strVal;
          }

          if (!nisnFound && (keyLower.includes('nisn') || keyLower.includes('nip') || keyLower.includes('no_induk'))) {
            nisnFound = strVal;
          }
        }
      }

      if (emailFound) {
        // Capitalize name
        const displayName = nameFound
          ? nameFound.split(' ').map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()).join(' ')
          : emailFound.split('@')[0].replace(/[._]/g, ' ').split(' ').map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()).join(' ');

        list.push({
          id: `cand-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
          name: displayName,
          email: emailFound.toLowerCase(),
          username: makeUsername(emailFound, displayName),
          nisnNip: nisnFound || undefined,
          role: defaultBatchRole,
          selected: true
        });
      }
    });

    // Remove duplicates based on email
    const seen = new Set<string>();
    return list.filter((item) => {
      if (seen.has(item.email)) return false;
      seen.add(item.email);
      return true;
    });
  };

  // Handler for PC File Explorer Upload (XLSX, XLS, CSV, TXT, JSON)
  const handleFileFromPC = (file: File) => {
    setIsProcessingFile(true);
    const extension = file.name.split('.').pop()?.toLowerCase() || '';

    const reader = new FileReader();

    if (extension === 'xlsx' || extension === 'xls' || extension === 'csv') {
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonRows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

          const extracted = processRawEmailRows(jsonRows);
          setParsedCandidates(extracted);
          setIsProcessingFile(false);
          showToast(`Berhasil membaca berkas "${file.name}". Ditemukan ${extracted.length} alamat email.`);
        } catch (err) {
          setIsProcessingFile(false);
          showToast('Gagal memproses berkas Excel/CSV. Pastikan format tabel memiliki kolom email.');
        }
      };
      reader.readAsBinaryString(file);
    } else {
      // Text or JSON file
      reader.onload = (e) => {
        try {
          const content = String(e.target?.result || '');
          let rows: any[] = [];
          if (extension === 'json') {
            const parsed = JSON.parse(content);
            rows = Array.isArray(parsed) ? parsed : [parsed];
          } else {
            rows = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
          }
          const extracted = processRawEmailRows(rows);
          setParsedCandidates(extracted);
          setIsProcessingFile(false);
          showToast(`Berhasil membaca berkas "${file.name}". Ditemukan ${extracted.length} alamat email.`);
        } catch (err) {
          setIsProcessingFile(false);
          showToast('Gagal memproses berkas teks. Pastikan isi berkas memuat alamat email valid.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Handler for Google Drive preset pick
  const handlePickFromGDrive = (item: typeof gdriveFiles[0]) => {
    setIsProcessingFile(true);
    setTimeout(() => {
      const candidates: ParsedEmailCandidate[] = item.emails.map((e, idx) => ({
        id: `cand-gdrive-${Date.now()}-${idx}`,
        name: e.name,
        email: e.email.toLowerCase(),
        username: makeUsername(e.email, e.name),
        nisnNip: e.nisn,
        role: defaultBatchRole,
        selected: true
      }));

      setParsedCandidates(candidates);
      setIsProcessingFile(false);
      showToast(`Berkas Google Drive "${item.name}" berhasil dimuat. Ditemukan ${candidates.length} email.`);
    }, 450);
  };

  // Handler for Raw Paste
  const handleParsePastedText = () => {
    if (!rawPastedText.trim()) return;
    const lines = rawPastedText.split(/\r?\n/).filter((l) => l.trim());
    const candidates = processRawEmailRows(lines);
    setParsedCandidates(candidates);
    showToast(`Ditemukan ${candidates.length} email dari teks yang ditempel.`);
  };

  // Confirm and Create Batch Member Accounts
  const handleConfirmBatchCreation = () => {
    const selectedList = parsedCandidates.filter((c) => c.selected);
    if (selectedList.length === 0) {
      showToast('Pilih setidaknya satu email untuk dibuatkan akun.');
      return;
    }

    const newUsers: User[] = selectedList.map((cand) => ({
      id: `usr-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: cand.name,
      username: cand.username,
      email: cand.email,
      password: cand.password || defaultPassword,
      role: cand.role || 'member',
      status: 'active',
      emailVerified: true,
      registeredAt: new Date().toISOString().split('T')[0],
      lastLogin: 'Belum pernah',
      nisnNip: cand.nisnNip
    }));

    if (onBatchAddUsers) {
      onBatchAddUsers(newUsers);
    } else {
      newUsers.forEach((u) => onAddUser(u));
    }

    setIsUploadModalOpen(false);
    setParsedCandidates([]);
    setRawPastedText('');
    showToast(`Sukses! ${newUsers.length} akun member baru berhasil dibuat dari daftar email.`);
  };

  const handleSelectAllCandidates = (val: boolean) => {
    setParsedCandidates((prev) => prev.map((c) => ({ ...c, selected: val })));
  };

  const filteredUsers = useMemo(() => {
    return users
      .filter((u) => {
        const matchesQuery =
          u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (u.username && u.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (u.nisnNip && u.nisnNip.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesRole = roleFilter === 'all' || u.role === roleFilter;
        const matchesStatus = statusFilter === 'all' || u.status === statusFilter;

        return matchesQuery && matchesRole && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else {
          return sortOrder === 'asc'
            ? a.registeredAt.localeCompare(b.registeredAt)
            : b.registeredAt.localeCompare(a.registeredAt);
        }
      });
  }, [users, searchQuery, roleFilter, statusFilter, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const generatedUsername = newUsername.trim() || newEmail.split('@')[0].toLowerCase();
    const generatedPassword = newPassword.trim() || 'member12345';

    const created: User = {
      id: `usr-${Date.now()}`,
      name: newName.trim(),
      username: generatedUsername,
      email: newEmail.trim().toLowerCase(),
      password: generatedPassword,
      role: newRole,
      status: 'active',
      emailVerified: true,
      registeredAt: new Date().toISOString().split('T')[0],
      lastLogin: 'Belum pernah',
      nisnNip: newNisn.trim() ? newNisn : undefined
    };

    onAddUser(created);
    setIsAddModalOpen(false);
    setNewName('');
    setNewUsername('');
    setNewEmail('');
    setNewPassword('');
    setNewNisn('');
    showToast(`Akun member ${created.name} berhasil dibuat (Username: ${created.username}, Sandi: ${created.password}).`);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast */}
      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-700 hover:text-emerald-900">
            ✕
          </button>
        </div>
      )}

      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-bold text-[#0A2540]">
              Pengelolaan Member & Akun Pengguna
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-[#0066CC]">
              {users.length} Akun Terdaftar
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Pendaftaran member dikelola terpusat oleh Admin. Anda dapat membuat akun manual atau mengunggah daftar email via File Explorer PC dan Google Drive.
          </p>
        </div>

        {/* Action Buttons: Upload Email & Tambah Manual */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Button Upload Email via File Explorer / Google Drive */}
          <button
            onClick={() => {
              setIsUploadModalOpen(true);
              setParsedCandidates([]);
            }}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0066CC] hover:bg-[#0052A3] rounded-lg shadow-sm transition-all flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-[#FFB800]" />
            <span>Upload Email (PC / Google Drive)</span>
          </button>

          {/* Button Tambah Member Manual */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-xs transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-[#0066CC]" />
            <span>Tambah Member Manual</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Cari nama, email, username, atau NISN..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
          >
            <option value="all">Semua Peran</option>
            <option value="super_admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="member">Member (Siswa/Guru)</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
          >
            <option value="all">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="pending">Menunggu Verifikasi</option>
            <option value="suspended">Ditangguhkan</option>
          </select>

          {/* Sort */}
          <button
            onClick={() => {
              if (sortBy === 'date') {
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              } else {
                setSortBy('date');
                setSortOrder('desc');
              }
            }}
            className="px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 font-medium"
          >
            Tgl {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>

      </div>

      {/* Members Interactive Data Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4 sm:px-6">Member / Identitas</th>
                <th className="py-3 px-4">Username & Akses</th>
                <th className="py-3 px-4">Peran (Role)</th>
                <th className="py-3 px-4">Status Akun</th>
                <th className="py-3 px-4 hidden md:table-cell">Terdaftar</th>
                <th className="py-3 px-4 sm:px-6 text-right">Aksi Manajemen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-medium text-slate-700">Tidak ada member yang cocok dengan pencarian.</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Klik "Upload Email" atau "Tambah Member Manual" untuk menambahkan akun baru.
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                    
                    {/* Member Name & Email */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#0A2540] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                          {user.avatarUrl ? (
                            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover rounded-full" />
                          ) : (
                            user.name.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 leading-snug">
                            {user.name}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-400 inline" />
                            <span>{user.email}</span>
                          </div>
                          {user.nisnNip && (
                            <div className="text-[10px] text-slate-400 font-mono">
                              NISN/NIP: {user.nisnNip}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Username & Credential Info */}
                    <td className="py-3.5 px-4">
                      <div className="font-mono text-slate-700 text-xs">
                        {user.username || user.email.split('@')[0]}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Sandi: <span className="font-mono">••••••••</span>
                      </div>
                    </td>

                    {/* Role Select */}
                    <td className="py-3.5 px-4">
                      <select
                        value={user.role}
                        onChange={(e) => {
                          onUpdateRole(user.id, e.target.value as UserRole);
                          showToast(`Peran ${user.name} diubah menjadi ${e.target.value}.`);
                        }}
                        className="py-1 px-2 border border-slate-200 rounded text-xs bg-slate-50 font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0066CC]"
                      >
                        <option value="super_admin">Super Admin</option>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="member">Member</option>
                      </select>
                    </td>

                    {/* Status & Verification */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <div>
                          {user.status === 'active' && (
                            <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-emerald-500" />
                              <span>Aktif</span>
                            </span>
                          )}
                          {user.status === 'pending' && (
                            <span className="inline-flex items-center gap-1.5 text-amber-700 font-semibold">
                              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                              <span>Menunggu</span>
                            </span>
                          )}
                          {user.status === 'suspended' && (
                            <span className="inline-flex items-center gap-1.5 text-red-700 font-medium">
                              <span className="w-2 h-2 rounded-full bg-red-500" />
                              <span>Ditangguhkan</span>
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {user.emailVerified ? 'Terverifikasi' : 'Belum Verif'}
                        </div>
                      </div>
                    </td>

                    {/* Registered Date */}
                    <td className="py-3.5 px-4 hidden md:table-cell text-slate-500 font-mono tabular-nums">
                      {user.registeredAt}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      {user.status === 'pending' ? (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              onApproveUser(user.id);
                              showToast(`Akun ${user.name} telah disetujui.`);
                            }}
                            className="px-2.5 py-1 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors flex items-center gap-1 shadow-xs"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Setujui</span>
                          </button>
                          <button
                            onClick={() => {
                              onRejectUser(user.id);
                              showToast(`Pendaftaran ${user.name} ditolak.`);
                            }}
                            className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-red-700 bg-slate-100 hover:bg-red-50 rounded-md transition-colors flex items-center gap-1"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Tolak</span>
                          </button>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2">
                          {user.status === 'active' ? (
                            <button
                              onClick={() => {
                                onToggleStatus(user.id, 'suspended');
                                showToast(`Akun ${user.name} ditangguhkan.`);
                              }}
                              className="px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                              Tangguhkan
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                onToggleStatus(user.id, 'active');
                                showToast(`Akun ${user.name} diaktifkan kembali.`);
                              }}
                              className="px-2.5 py-1 text-[11px] font-medium text-emerald-700 hover:bg-emerald-50 rounded transition-colors"
                            >
                              Aktifkan
                            </button>
                          )}
                        </div>
                      )}
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            Menampilkan <span className="font-semibold text-slate-800">{paginatedUsers.length}</span> dari{' '}
            <span className="font-semibold text-slate-800">{filteredUsers.length}</span> member
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono tabular-nums">
              Halaman {currentPage} dari {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* ================= MODAL UPLOAD EMAIL (PC FILE EXPLORER & GOOGLE DRIVE) ================= */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 bg-[#0A2540] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shadow-xs">
                  <Mail className="w-5 h-5 text-[#FFB800]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    Upload & Impor Email Member
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    Otomatisasi pembuatan akun siswa / staf melalui berkas email dari PC atau Google Drive
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Source Tab Switcher */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2">
              <button
                onClick={() => setUploadSource('pc')}
                className={`flex items-center gap-2 py-2.5 px-4 text-xs font-semibold border-b-2 transition-colors ${
                  uploadSource === 'pc'
                    ? 'border-[#0066CC] text-[#0066CC] bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <HardDrive className="w-4 h-4" />
                <span>File Explorer PC</span>
              </button>

              <button
                onClick={() => setUploadSource('gdrive')}
                className={`flex items-center gap-2 py-2.5 px-4 text-xs font-semibold border-b-2 transition-colors ${
                  uploadSource === 'gdrive'
                    ? 'border-[#0066CC] text-[#0066CC] bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Cloud className="w-4 h-4 text-blue-600" />
                <span>Google Drive</span>
              </button>

              <button
                onClick={() => setUploadSource('paste')}
                className={`flex items-center gap-2 py-2.5 px-4 text-xs font-semibold border-b-2 transition-colors ${
                  uploadSource === 'paste'
                    ? 'border-[#0066CC] text-[#0066CC] bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Tempel Teks (Paste)</span>
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              
              {/* Tab 1: File Explorer PC */}
              {uploadSource === 'pc' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-blue-900 leading-relaxed">
                    <strong>Pilih Berkas dari Komputer / PC:</strong> Unggah berkas Excel (<code>.xlsx</code>, <code>.xls</code>), CSV (<code>.csv</code>), atau Teks (<code>.txt</code>, <code>.json</code>). Sistem akan membaca daftar email siswa secara instan dan mengonversinya menjadi tabel calon member.
                  </div>

                  {/* Drag & Drop / Click Zone */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-[#0066CC] rounded-xl p-8 text-center bg-slate-50/60 hover:bg-slate-50 cursor-pointer transition-all"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".xlsx,.xls,.csv,.txt,.json"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileFromPC(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-[#0066CC] flex items-center justify-center mx-auto mb-3 shadow-xs">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-slate-800">
                      Klik untuk Buka File Explorer PC
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Mendukung berkas Excel, CSV, atau TXT daftar email siswa
                    </p>
                    <span className="mt-3 inline-block px-4 py-1.5 text-xs font-semibold text-[#0066CC] bg-white border border-blue-200 rounded-lg shadow-2xs hover:bg-blue-50">
                      Pilih dari File Explorer Komputer
                    </span>
                  </div>
                </div>
              )}

              {/* Tab 2: Google Drive Integration */}
              {uploadSource === 'gdrive' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                    <div className="flex items-center gap-2">
                      <Cloud className="w-4 h-4 text-emerald-600" />
                      <span>Terhubung dengan Google Workspace <strong>SMAN 1 SGL</strong></span>
                    </div>
                    <span className="font-semibold text-emerald-700">Online & Siap</span>
                  </div>

                  <p className="text-xs text-slate-600 font-semibold">
                    Pilih Berkas Spreadsheet Email dari Google Drive Sekolah:
                  </p>

                  <div className="space-y-2.5">
                    {gdriveFiles.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handlePickFromGDrive(item)}
                        className="p-3.5 rounded-xl border border-slate-200 hover:border-[#0066CC] hover:bg-blue-50/40 cursor-pointer transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                            <FileSpreadsheet className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-800 group-hover:text-[#0066CC] transition-colors">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {item.description} • <span className="font-mono text-[#0066CC] font-semibold">{item.recordCount} Email</span>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="px-3 py-1.5 text-[11px] font-semibold text-[#0066CC] bg-white border border-slate-200 group-hover:bg-[#0066CC] group-hover:text-white rounded-lg shadow-2xs transition-colors"
                        >
                          Pilih & Muat
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Or Custom Link */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Atau Tautkan Tautan Berkas / Spreadsheet Google Drive Lainnya:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={customDriveUrl}
                        onChange={(e) => setCustomDriveUrl(e.target.value)}
                        placeholder="https://docs.google.com/spreadsheets/d/..."
                        className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!customDriveUrl.trim()) return;
                          handlePickFromGDrive(gdriveFiles[0]);
                        }}
                        className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0066CC] hover:bg-[#0052A3] rounded-lg shrink-0"
                      >
                        Tautkan & Baca
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Paste Text */}
              {uploadSource === 'paste' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600">
                    Tempel daftar alamat email secara langsung (dipisahkan baris baru, koma, atau titik koma):
                  </p>
                  <textarea
                    rows={5}
                    value={rawPastedText}
                    onChange={(e) => setRawPastedText(e.target.value)}
                    placeholder="Contoh:&#10;siswa1@sman1sgl.sch.id, Ahmad Rizky&#10;siswa2@sman1sgl.sch.id, Siti Fatimah&#10;siswa3@sman1sgl.sch.id"
                    className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066CC] font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleParsePastedText}
                    disabled={!rawPastedText.trim()}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#0A2540] hover:bg-[#0066CC] rounded-lg disabled:opacity-40"
                  >
                    Deteksi & Ekstrak Email
                  </button>
                </div>
              )}

              {/* Candidates Preview & Configuration Section */}
              {parsedCandidates.length > 0 && (
                <div className="pt-4 border-t border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <span>Pratinjau Akun Member yang Akan Dibuat</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-bold">
                          {parsedCandidates.filter((c) => c.selected).length} Dipilih
                        </span>
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Periksa kembali nama dan email siswa sebelum akun dibuat otomatis ke dalam sistem.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => handleSelectAllCandidates(true)}
                        className="text-[#0066CC] font-semibold hover:underline text-[11px]"
                      >
                        Pilih Semua
                      </button>
                      <span className="text-slate-300">|</span>
                      <button
                        type="button"
                        onClick={() => handleSelectAllCandidates(false)}
                        className="text-slate-500 hover:underline text-[11px]"
                      >
                        Batal Semua
                      </button>
                    </div>
                  </div>

                  {/* Batch Global Defaults (Password & Role) */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Kata Sandi Awal untuk Semua Akun:
                      </label>
                      <input
                        type="text"
                        value={defaultPassword}
                        onChange={(e) => setDefaultPassword(e.target.value)}
                        placeholder="Contoh: smansa2026#"
                        className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg font-mono bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Peran (Role) Member:
                      </label>
                      <select
                        value={defaultBatchRole}
                        onChange={(e) => {
                          const val = e.target.value as UserRole;
                          setDefaultBatchRole(val);
                          setParsedCandidates((prev) => prev.map((c) => ({ ...c, role: val })));
                        }}
                        className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                      >
                        <option value="member">Member (Siswa / Guru)</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>

                  {/* Preview Table */}
                  <div className="max-h-56 overflow-y-auto border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-slate-600 font-semibold">
                        <tr>
                          <th className="py-2.5 px-3 w-8">
                            <input
                              type="checkbox"
                              checked={parsedCandidates.every((c) => c.selected)}
                              onChange={(e) => handleSelectAllCandidates(e.target.checked)}
                              className="rounded border-slate-300 text-[#0066CC]"
                            />
                          </th>
                          <th className="py-2.5 px-3">Nama Lengkap</th>
                          <th className="py-2.5 px-3">Email & Username</th>
                          <th className="py-2.5 px-3">NISN</th>
                          <th className="py-2.5 px-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {parsedCandidates.map((cand, idx) => (
                          <tr key={cand.id} className="hover:bg-slate-50">
                            <td className="py-2 px-3">
                              <input
                                type="checkbox"
                                checked={cand.selected}
                                onChange={(e) => {
                                  const val = e.target.checked;
                                  setParsedCandidates((prev) =>
                                    prev.map((c, i) => (i === idx ? { ...c, selected: val } : c))
                                  );
                                }}
                                className="rounded border-slate-300 text-[#0066CC]"
                              />
                            </td>
                            <td className="py-2 px-3 font-semibold text-slate-800">
                              <input
                                type="text"
                                value={cand.name}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setParsedCandidates((prev) =>
                                    prev.map((c, i) => (i === idx ? { ...c, name: val } : c))
                                  );
                                }}
                                className="px-2 py-0.5 border border-transparent hover:border-slate-300 focus:border-[#0066CC] rounded text-xs w-full bg-transparent"
                              />
                            </td>
                            <td className="py-2 px-3">
                              <div className="font-mono text-slate-600 text-[11px]">{cand.email}</div>
                              <div className="text-[10px] text-slate-400">User: {cand.username}</div>
                            </td>
                            <td className="py-2 px-3 font-mono text-slate-500 text-[11px]">
                              {cand.nisnNip || '-'}
                            </td>
                            <td className="py-2 px-3">
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                                <Check className="w-3 h-3" /> Siap
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleConfirmBatchCreation}
                disabled={parsedCandidates.filter((c) => c.selected).length === 0}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#0A2540] hover:bg-[#0066CC] rounded-lg shadow-sm transition-all flex items-center gap-2 disabled:opacity-40"
              >
                <Check className="w-4 h-4 text-[#FFB800]" />
                <span>
                  Konfirmasi & Buat {parsedCandidates.filter((c) => c.selected).length} Akun Member
                </span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= MODAL ADD MANUAL MEMBER ================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#0A2540]">
                Tambah Member Baru Secara Manual
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Nama Lengkap Siswa / Guru"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Alamat Email *
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="siswa@sman1sgl.sch.id"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Username Akun
                  </label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="siswa.nama"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kata Sandi Awal
                  </label>
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="member12345"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  NISN / NIP (Opsional)
                </label>
                <input
                  type="text"
                  value={newNisn}
                  onChange={(e) => setNewNisn(e.target.value)}
                  placeholder="Contoh: 0091234567"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Peran (Role)
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                >
                  <option value="member">Member (Siswa / Guru)</option>
                  <option value="editor">Editor Konten</option>
                  <option value="admin">Admin Sekolah</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0A2540] hover:bg-[#0066CC] rounded-lg"
                >
                  Simpan Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
