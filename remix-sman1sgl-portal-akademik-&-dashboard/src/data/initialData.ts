import {
  User,
  NavigationMenuItem,
  SchoolAnnouncement,
  SchoolDocument,
  PhotoGalleryItem,
  CustomPage,
  AuditLog
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Fauzandeliwirandika',
    username: 'adminsmansas1',
    email: 'fauzanwirandika@gmail.com',
    password: 'supersmansa1@@',
    role: 'super_admin',
    status: 'active',
    emailVerified: true,
    registeredAt: '2026-01-10',
    lastLogin: '2026-10-11 08:32',
    avatarUrl: '/src/assets/images/principal_avatar_1791715068611.jpg',
    nisnNip: '19840512 200801 1 004'
  },
  {
    id: 'usr-2',
    name: 'Dra. Hj. Ratna Sari, M.Pd',
    username: 'admin.ratna',
    email: 'ratna.sari@sman1sgl.sch.id',
    password: 'admin12345',
    role: 'admin',
    status: 'active',
    emailVerified: true,
    registeredAt: '2026-02-14',
    lastLogin: '2026-10-10 16:40',
    nisnNip: '19760822 200212 2 001'
  },
  {
    id: 'usr-3',
    name: 'Budi Santoso, S.Kom',
    username: 'editor.budi',
    email: 'budi.santoso@sman1sgl.sch.id',
    password: 'editor12345',
    role: 'editor',
    status: 'active',
    emailVerified: true,
    registeredAt: '2026-03-01',
    lastLogin: '2026-10-09 11:15',
    nisnNip: '19890315 201504 1 002'
  },
  {
    id: 'usr-4',
    name: 'Amanda Putri Maharani',
    username: 'amanda.putri',
    email: 'amanda.putri@siswa.sman1sgl.sch.id',
    password: 'member12345',
    role: 'member',
    status: 'active',
    emailVerified: true,
    registeredAt: '2026-07-15',
    lastLogin: '2026-10-11 07:10',
    nisnNip: 'NISN 0078129384'
  },
  {
    id: 'usr-5',
    name: 'Rizky Dwi Pratama',
    email: 'rizky.pratama@siswa.sman1sgl.sch.id',
    role: 'member',
    status: 'pending',
    emailVerified: false,
    registeredAt: '2026-10-10',
    lastLogin: 'Belum pernah',
    nisnNip: 'NISN 0089102847'
  },
  {
    id: 'usr-6',
    name: 'Nadhira Citra Kirana',
    email: 'nadhira.citra@siswa.sman1sgl.sch.id',
    role: 'member',
    status: 'pending',
    emailVerified: true,
    registeredAt: '2026-10-11',
    lastLogin: 'Belum pernah',
    nisnNip: 'NISN 0084561920'
  },
  {
    id: 'usr-7',
    name: 'Siti Aminah, S.Pd',
    email: 'siti.aminah@sman1sgl.sch.id',
    role: 'member',
    status: 'active',
    emailVerified: true,
    registeredAt: '2026-04-12',
    lastLogin: '2026-10-08 14:22',
    nisnNip: '19910204 201903 2 008'
  },
  {
    id: 'usr-8',
    name: 'Kevin Wijaya Saputra',
    email: 'kevin.wijaya@siswa.sman1sgl.sch.id',
    role: 'member',
    status: 'suspended',
    emailVerified: true,
    registeredAt: '2026-06-02',
    lastLogin: '2026-09-18 09:05',
    nisnNip: 'NISN 0072938401'
  }
];

export const INITIAL_MENU_ITEMS: NavigationMenuItem[] = [
  { id: 'menu-1', label: 'Beranda', path: '#beranda', isExternal: false, isVisible: true, order: 1 },
  { id: 'menu-2', label: 'Profil & Sambutan', path: '#sambutan', isExternal: false, isVisible: true, order: 2 },
  { id: 'menu-3', label: 'PIP', path: '#pip', isExternal: false, isVisible: true, order: 3 },
  { id: 'menu-4', label: 'Kalender 2026/2027', path: '#kalender', isExternal: false, isVisible: true, order: 4 },
  { id: 'menu-5', label: 'Galeri Kegiatan', path: '#galeri', isExternal: false, isVisible: true, order: 5 },
  { id: 'menu-6', label: 'Dokumen Publik', path: '#dokumen', isExternal: false, isVisible: true, order: 6 },
  { id: 'menu-7', label: 'PPDB 2026/2027', path: '#ppdb', isExternal: false, isVisible: true, order: 7 },
];

export const INITIAL_ANNOUNCEMENTS: SchoolAnnouncement[] = [
  {
    id: 'ann-pip-1',
    title: 'Penyaluran Bantuan Program Indonesia Pintar (PIP) Termin 2 Tahun 2026: Syarat & Aktivasi Rekening SimPel',
    category: 'PIP',
    date: '11 Oktober 2026',
    summary: 'Diberitahukan kepada seluruh siswa nominasi dan SK Pemberian PIP 2026 agar segera mengaktivasi rekening SimPel BNI sebelum 30 November 2026.',
    content: `Kementerian Pendidikan Dasar dan Menengah (Kemendikdasmen) telah menerbitkan Surat Keputusan (SK) Pemberian Program Indonesia Pintar (PIP) Termin 2 Tahun Anggaran 2026 untuk peserta didik SMAN 1 SGL.

Besaran Dana Bantuan PIP Jenjang SMA:
- Siswa Kelas X & XI (1 Tahun Penuh): Rp 1.800.000,- (Satu Juta Delapan Ratus Ribu Rupiah)
- Siswa Kelas XII (1 Semester Akhir): Rp 900.000,- (Sembilan Ratus Ribu Rupiah)

Langkah & Prosedur Pencairan:
1. Mengambil Surat Keterangan Kepala Sekolah di Ruang Tata Usaha (Bagian Kesiswaan) SMAN1SGL.
2. Membawa Fotokopi KTP Orang Tua / Wali dan Kartu Keluarga (KK).
3. Membawa Buku Tabungan SimPel BNI dan KIP fisik (jika ada).
4. Melakukan aktivasi dan penarikan langsung di Bank BNI KC terdekat.

Bagi siswa yang mengalami kendala data NIK/NISN ganda, harap segera melapor ke operator Dapodik sekolah. Pelayanan verifikasi gratis tanpa pungutan biaya.`,
    author: 'Tim Pengelola PIP & Kesiswaan',
    isPinned: true,
    readsCount: 2150
  },
  {
    id: 'ann-pip-2',
    title: 'Verifikasi Berkas Calon Penerima PIP Tambahan Fase E & F Tahun Pelajaran 2026/2027',
    category: 'PIP',
    date: '09 Oktober 2026',
    summary: 'Pengajuan usulan PIP kuota tambahan melalui Dapodik sekolah dibuka bagi keluarga pemegang KIS/KKS/PKH.',
    content: `Untuk menjamin pemerataan akses pendidikan, SMAN1SGL membuka posko pendataan dan verifikasi usulan Program Indonesia Pintar (PIP) jalur usulan sekolah tahun 2026.

Kriteria Prioritas:
- Peserta didik dari keluarga pemegang Kartu Indonesia Sehat (KIS PBI) atau Program Keluarga Harapan (PKH).
- Peserta didik berstatus yatim/piatu/panti asuhan atau terdampak bencana.
- Terdaftar aktif di Dapodik SMAN1SGL dengan NISN valid.

Batas akhir pengumpulan berkas di Ruang Bimbingan Konseling / Kesiswaan adalah 25 Oktober 2026.`,
    author: 'Koordinator Beasiswa & PIP',
    isPinned: false,
    readsCount: 1680
  },
  {
    id: 'ann-1',
    title: 'Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027 Jalur Prestasi & Zonasi',
    category: 'Akademik',
    date: '10 Oktober 2026',
    summary: 'Pendaftaran PPDB SMAN1SGL resmi dibuka mulai 15 Oktober 2026. Lengkapi berkas digital melalui portal resmi.',
    content: `Panitia Penerimaan Peserta Didik Baru (PPDB) SMAN1SGL mengumumkan pembukaan pendaftaran calon siswa-siswi baru tahun pelajaran 2026/2027.

Jalur pendaftaran meliputi:
1. Jalur Prestasi Akademik & Non-Akademik (Kuota 25%)
2. Jalur Zonasi Domisili (Kuota 50%)
3. Jalur Afirmasi & Perpindahan Tugas Orang Tua (Kuota 25%)

Syarat dan berkas pendaftaran dapat diunduh pada tab Dokumen Publik di portal ini. Pastikan akun calon pendaftar telah terdaftar dan terverifikasi di sistem sebelum batas akhir 30 Oktober 2026.`,
    author: 'Panitia PPDB SMAN1SGL',
    isPinned: true,
    readsCount: 1420
  },
  {
    id: 'ann-2',
    title: 'Juara Umum Olimpiade Sains Nasional (OSN) Tingkat Provinsi Bidang Informatika & Fisika',
    category: 'Prestasi',
    date: '08 Oktober 2026',
    summary: 'Tim perwakilan SMAN1SGL meraih 3 medali emas dan 2 medali perak dalam ajang OSN Provinsi 2026.',
    content: `Prestasi membanggakan kembali ditorehkan oleh siswa-siswi SMAN1SGL. Dalam ajang Olimpiade Sains Nasional (OSN) Tingkat Provinsi yang diselenggarakan pekan lalu, kontingen SMAN1SGL berhasil meraih Juara Umum dengan perolehan:
- Medali Emas Bidang Informatika: Amanda Putri Maharani (Kelas XI-A)
- Medali Emas Bidang Fisika Terapan: Rizky Dwi Pratama (Kelas XI-B)
- Medali Emas Bidang Biologi Molekuler: Siti Nurhaliza (Kelas XII-IPA 1)

Terima kasih kepada pembina dan seluruh civitas akademika atas dukungan tiada henti.`,
    author: 'Kesiswaan & Pembinaan Bakat',
    isPinned: true,
    readsCount: 985
  },
  {
    id: 'ann-3',
    title: 'Jadwal Asesmen Sumatif Tengah Semester (ASTS) Ganjil Tahun Pelajaran 2026/2027',
    category: 'Akademik',
    date: '05 Oktober 2026',
    summary: 'Pelaksanaan ASTS berbasis Computer Based Test (CBT) akan dilaksanakan serentak mulai 20 Oktober 2026.',
    content: `Diberitahukan kepada seluruh siswa kelas X, XI, dan XII bahwa Asesmen Sumatif Tengah Semester (ASTS) Ganjil akan dilaksanakan secara luring di laboratorium komputer SMAN1SGL menggunakan sistem CBT sekolah.

Jadwal rinci pembagian sesi dan kartu ujian dapat dilihat dan diunduh di dashboard siswa masing-masing pada menu Dokumen Saya.`,
    author: 'Kurikulum & Evaluasi',
    isPinned: false,
    readsCount: 752
  },
  {
    id: 'ann-4',
    title: 'Workshop Digital Literasi & Kecerdasan Artifisial untuk Ekstrakurikuler Robotika',
    category: 'Kesiswaan',
    date: '02 Oktober 2026',
    summary: 'Pelatihan pengembangan pemrograman mikrokontroler dan otomasi untuk anggota klub sains terapan.',
    content: `SMAN1SGL bekerjasama dengan institusi teknologi terkemuka menyelenggarakan workshop intensif selama 2 hari di Laboratorium Digital Kampus SMAN1SGL. Peserta akan mempraktikkan langsung pemrograman sensor dan kecerdasan artifisial dasar.`,
    author: 'Koordinator Ekstrakurikuler',
    isPinned: false,
    readsCount: 460
  }
];

export const INITIAL_DOCUMENTS: SchoolDocument[] = [
  {
    id: 'doc-1',
    title: 'Kalender Akademik SMAN1SGL Tahun Ajaran 2026/2027',
    category: 'Pedoman Akademik',
    fileType: 'pdf',
    size: '1.8 MB',
    downloadCount: 1840,
    isPublic: true,
    source: 'local',
    updatedAt: '2026-09-01',
    uploadedBy: 'Fauzandeliwirandika'
  },
  {
    id: 'doc-2',
    title: 'Petunjuk Teknis PPDB Digital & Skema Afirmasi SMAN1SGL',
    category: 'PPDB & Penerimaan',
    fileType: 'pdf',
    size: '3.4 MB',
    downloadCount: 2950,
    isPublic: true,
    source: 'local',
    updatedAt: '2026-10-09',
    uploadedBy: 'Dra. Hj. Ratna Sari'
  },
  {
    id: 'doc-3',
    title: 'Kurikulum Merdeka: Silabus & Capaian Pembelajaran Fase E & F',
    category: 'Kurikulum',
    fileType: 'pdf',
    size: '5.2 MB',
    downloadCount: 1210,
    isPublic: true,
    source: 'gdrive',
    driveId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    updatedAt: '2026-08-15',
    uploadedBy: 'Budi Santoso, S.Kom'
  },
  {
    id: 'doc-4',
    title: 'Formulir Pendaftaran Ulang & Surat Pakta Integritas Siswa',
    category: 'Formulir',
    fileType: 'doc',
    size: '420 KB',
    downloadCount: 890,
    isPublic: true,
    source: 'local',
    updatedAt: '2026-10-02',
    uploadedBy: 'Dra. Hj. Ratna Sari'
  },
  {
    id: 'doc-5',
    title: 'Laporan Evaluasi Diri Sekolah & Akreditasi A Unggul (Audit Resmi)',
    category: 'Arsip Institusi',
    fileType: 'pdf',
    size: '7.8 MB',
    downloadCount: 340,
    isPublic: false,
    source: 'gdrive',
    driveId: '1F4020aVw0l291-sman1sgl-akreditasi-a-2026',
    updatedAt: '2026-07-20',
    uploadedBy: 'Fauzandeliwirandika'
  },
  {
    id: 'doc-6',
    title: 'Rekapitulasi Anggaran BOSP & Rencana Kerja Sekolah (RKS) 2026',
    category: 'Keuangan & Tata Usaha',
    fileType: 'xls',
    size: '1.2 MB',
    downloadCount: 110,
    isPublic: false,
    source: 'local',
    updatedAt: '2026-09-30',
    uploadedBy: 'Fauzandeliwirandika'
  }
];

export const INITIAL_GALLERY: PhotoGalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Gedung Kampus Utama & Lingkungan Belajar Asri SMAN1SGL',
    category: 'Fasilitas & Kampus',
    date: 'Oktober 2026',
    imageUrl: '/src/assets/images/hero_sman1sgl_campus_1791715014925.jpg',
    description: 'Suasana asri dan modern lingkungan belajar SMAN1SGL dengan fasilitas lengkap, ruang kelas multimedia, dan ruang terbuka hijau.'
  },
  {
    id: 'gal-2',
    title: 'Praktikum Sains & Digital Learning Lab Terpadu',
    category: 'Akademik & Riset',
    date: 'September 2026',
    imageUrl: '/src/assets/images/school_activity_classroom_1791715036198.jpg',
    description: 'Siswa-siswi memanfaatkan mikroskop digital dan perangkat tablet interaktif dalam praktikum biologi dan rekayasa sains.'
  },
  {
    id: 'gal-3',
    title: 'Penganugerahan Juara & Kontingen Berprestasi',
    category: 'Prestasi Siswa',
    date: 'Agustus 2026',
    imageUrl: '/src/assets/images/school_ceremony_achievement_1791715056383.jpg',
    description: 'Penyerahan piala dan sertifikat penghargaan juara kompetisi sains, debat, dan olahraga di hadapan auditorium sekolah.'
  }
];

export const INITIAL_PAGES: CustomPage[] = [
  {
    id: 'page-home',
    title: 'Beranda SMAN1SGL',
    slug: 'home',
    status: 'published',
    heroSubtitle: 'Mewujudkan Generasi Unggul, Berkarakter Kuat, dan Berdaya Saing Global Melalui Pendidikan Berstandar Nasional.',
    contentHtml: `SMAN1SGL adalah institusi pendidikan menengah atas unggulan yang mengedepankan integrasi karakter luhur, penguasaan sains teknologi, dan wawasan kebangsaan. Dengan kurikulum berstandar dan fasilitas modern, kami berkomitmen mendampingi setiap siswa mencapai potensi terbaiknya.`,
    lastModified: '2026-10-10 14:15',
    showInNav: true,
    ctaText: 'Lihat Panduan PPDB',
    ctaLink: '#dokumen'
  },
  {
    id: 'page-profile',
    title: 'Profil & Visi Misi Sekolah',
    slug: 'profil-sekolah',
    status: 'published',
    heroSubtitle: 'Sejarah, Visi, Misi, dan Fondasi Karakter Luhur Civitas SMAN1SGL.',
    contentHtml: `Visi SMAN1SGL: Menjadi sekolah pelopor keunggulan akademik, riset sains terapan, dan keteladanan budi pekerti yang adaptif terhadap era digital.

Misi Sekolah:
1. Menyelenggarakan proses pembelajaran interaktif dan berbasis teknologi digital.
2. Membina karakter religius, mandiri, gotong royong, dan bernalar kritis.
3. Memberikan ruang apresiasi optimal bagi pengembangan bakat seni, olahraga, dan sains.
4. Menjalin kemitraan kolaboratif dengan perguruan tinggi dan industri teknologi.`,
    lastModified: '2026-09-28 09:30',
    showInNav: true,
    ctaText: 'Pelajari Kurikulum',
    ctaLink: '#dokumen'
  },
  {
    id: 'page-fasilitas',
    title: 'Fasilitas & Sarana Prasarana',
    slug: 'fasilitas-sekolah',
    status: 'published',
    heroSubtitle: 'Infrastruktur Modern Menunjang Pembelajaran Holistik Siswa SMAN1SGL.',
    contentHtml: `Fasilitas SMAN1SGL mencakup:
- Laboratorium Sains (Fisika, Kimia, Biologi) berstandar riset
- Laboratorium Komputer & Digital Media Station
- Perpustakaan Digital Terakreditasi Nasional dengan e-Book repository
- Lapangan Olahraga Multifungsi (Futsal, Basket, Voli)
- Gedung Auditorium Seni & Pertemuan Kapasitas 800 Orang
- Sistem Informasi Manajemen Sekolah Terpadu (SMAN1SGL Cloud Portal)`,
    lastModified: '2026-09-15 16:45',
    showInNav: false,
    ctaText: 'Hubungi Kami',
    ctaLink: '#kontak'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-11 08:32:10',
    actor: 'Fauzandeliwirandika (Super Admin)',
    action: 'Login session established via Multi-Factor Security',
    ipAddress: '182.253.110.42',
    severity: 'info'
  },
  {
    id: 'log-2',
    timestamp: '2026-10-11 07:14:02',
    actor: 'System Auth Guard',
    action: 'New member registration queued: Nadhira Citra Kirana (NISN 0084561920)',
    ipAddress: '114.124.201.88',
    severity: 'info'
  },
  {
    id: 'log-3',
    timestamp: '2026-10-10 18:22:45',
    actor: 'System Security Scanner',
    action: 'SSL / TLS certificate renewal check passed (Valid until Oct 2027)',
    ipAddress: '127.0.0.1 (System)',
    severity: 'info'
  },
  {
    id: 'log-4',
    timestamp: '2026-10-10 16:40:19',
    actor: 'Dra. Hj. Ratna Sari, M.Pd (Admin)',
    action: 'Document published: Petunjuk Teknis PPDB Digital 2026/2027',
    ipAddress: '180.248.33.15',
    severity: 'info'
  },
  {
    id: 'log-5',
    timestamp: '2026-10-09 22:04:12',
    actor: 'Auth Firewall',
    action: 'Blocked 3 failed login attempts from unknown IP subnet (Rate-limit active)',
    ipAddress: '198.51.100.77',
    severity: 'security'
  }
];

export const INITIAL_SCHOOL_IDENTITY = {
  name: 'SMAN 1 SGL',
  tagline: 'Portal Akademik & Informasi Resmi',
  logoUrl: '',
  heroBannerUrl: '/src/assets/images/hero_sman1sgl_campus_1791715014925.jpg',
  principalName: 'Bapak Hidayat Nur Wahid, M.Pd',
  principalNip: '19710315 199702 1 003',
  principalAvatarUrl: '/src/assets/images/principal_avatar_1791715068611.jpg',
  npsn: '10402891',
  accreditation: 'A (Unggul)',
  address: 'Jl. Pendidikan No. 1, Kompleks Kampus Pendidikan, SGL - Indonesia',
  phone: '(0761) 849201',
  email: 'info@sman1sgl.sch.id'
};

export const INITIAL_CALENDAR_EVENTS = [
  {
    id: 'cal-1',
    title: 'Hari Pertama Masuk Sekolah & Masa Pengenalan Lingkungan Sekolah (MPLS)',
    dateRange: '13 - 17 Juli 2026',
    semester: 'Ganjil' as const,
    category: 'Pembelajaran' as const,
    description: 'Penyambutan siswa baru kelas X serta pembagian rombongan belajar Fase E dan F.'
  },
  {
    id: 'cal-2',
    title: 'Peringatan Hari Kemerdekaan Republik Indonesia ke-81',
    dateRange: '17 Agustus 2026',
    semester: 'Ganjil' as const,
    category: 'Libur' as const,
    description: 'Upacara bendera peringatan detik-detik Proklamasi Kemerdekaan RI di lapangan utama.'
  },
  {
    id: 'cal-3',
    title: 'Asesmen Sumatif Tengah Semester (ASTS) Ganjil Berbasis CBT',
    dateRange: '21 September - 02 Oktober 2026',
    semester: 'Ganjil' as const,
    category: 'Ujian' as const,
    description: 'Evaluasi capaian pembelajaran tengah semester 1 untuk seluruh jenjang kelas X, XI, XII.'
  },
  {
    id: 'cal-4',
    title: 'Pelaksanaan Asesmen Nasional Berbasis Komputer (ANBK SMA)',
    dateRange: '19 - 22 Oktober 2026',
    semester: 'Ganjil' as const,
    category: 'Asesmen' as const,
    description: 'Asesmen Literasi, Numerasi, dan Survei Karakter oleh Kemendikdasmen bagi sampel siswa kelas XI.'
  },
  {
    id: 'cal-5',
    title: 'Asesmen Sumatif Akhir Semester (ASAS) Ganjil',
    dateRange: '30 November - 11 Desember 2026',
    semester: 'Ganjil' as const,
    category: 'Ujian' as const,
    description: 'Asesmen akhir semester ganjil tahun ajaran 2026/2027.'
  },
  {
    id: 'cal-6',
    title: 'Penyerahan Laporan Hasil Belajar (Buku Rapor Semester Ganjil)',
    dateRange: '18 Desember 2026',
    semester: 'Ganjil' as const,
    category: 'Rapor' as const,
    description: 'Pertemuan wali murid dan penyerahan e-Rapor Kurikulum Merdeka.'
  },
  {
    id: 'cal-7',
    title: 'Libur Pembelajaran Semester Ganjil',
    dateRange: '21 Desember 2026 - 02 Januari 2027',
    semester: 'Ganjil' as const,
    category: 'Libur' as const,
    description: 'Masa libur semester gasal bagi siswa dan evaluasi kerja pendidik.'
  },
  {
    id: 'cal-8',
    title: 'Hari Pertama Masuk Semester Genap TA 2026/2027',
    dateRange: '04 Januari 2027',
    semester: 'Genap' as const,
    category: 'Pembelajaran' as const,
    description: 'Memulai kegiatan belajar mengajar semester genap.'
  },
  {
    id: 'cal-9',
    title: 'Ujian Asesmen Sekolah Akhir Jenjang (Kelas XII)',
    dateRange: '15 - 26 Maret 2027',
    semester: 'Genap' as const,
    category: 'Ujian' as const,
    description: 'Penilaian sumatif kelulusan peserta didik kelas XII SMA.'
  },
  {
    id: 'cal-10',
    title: 'Asesmen Sumatif Akhir Tahun (ASAT) Kenaikan Kelas',
    dateRange: '31 Mei - 11 Juni 2027',
    semester: 'Genap' as const,
    category: 'Ujian' as const,
    description: 'Ujian penentu kenaikan kelas fase E ke fase F.'
  },
  {
    id: 'cal-11',
    title: 'Pembagian Rapor Semester Genap & Kenaikan Kelas',
    dateRange: '25 Juni 2027',
    semester: 'Genap' as const,
    category: 'Rapor' as const,
    description: 'Rapat pleno dewan guru dan penerimaan rapor semester genap.'
  },
  {
    id: 'cal-12',
    title: 'Libur Akhir Tahun Pelajaran 2026/2027',
    dateRange: '28 Juni - 10 Juli 2027',
    semester: 'Genap' as const,
    category: 'Libur' as const,
    description: 'Libur kenaikan kelas dan persiapan tahun ajaran baru 2027/2028.'
  }
];

export const INITIAL_PIP_RECIPIENTS = [
  {
    id: 'pip-1',
    name: 'Muhammad Farhan Al-Ghifari',
    nisn: '0087123984',
    classGrade: 'X-MIPA 1 (Fase E)',
    nominal: 'Rp 1.800.000,-',
    status: 'Siap Cair' as const,
    bank: 'BNI SimPel',
    termin: 'Termin 2 / 2026',
    dateUpdated: '2026-10-10'
  },
  {
    id: 'pip-2',
    name: 'Nadia Rahmawati',
    nisn: '0078234190',
    classGrade: 'XI-IPS 2 (Fase F)',
    nominal: 'Rp 1.800.000,-',
    status: 'Rekening Aktif' as const,
    bank: 'BNI SimPel',
    termin: 'Termin 2 / 2026',
    dateUpdated: '2026-10-09'
  },
  {
    id: 'pip-3',
    name: 'Bagus Tri Pamungkas',
    nisn: '0069345201',
    classGrade: 'XII-MIPA 3',
    nominal: 'Rp 900.000,-',
    status: 'Telah Dicairkan' as const,
    bank: 'BNI SimPel',
    termin: 'Termin 1 / 2026',
    dateUpdated: '2026-08-20'
  },
  {
    id: 'pip-4',
    name: 'Aisyah Putri Azzahra',
    nisn: '0089102847',
    classGrade: 'X-MIPA 3 (Fase E)',
    nominal: 'Rp 1.800.000,-',
    status: 'Dalam Proses' as const,
    bank: 'BNI SimPel',
    termin: 'Termin 2 / 2026',
    dateUpdated: '2026-10-11'
  }
];
