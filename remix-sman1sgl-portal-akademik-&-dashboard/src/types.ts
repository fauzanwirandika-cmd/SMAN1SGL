export type UserRole = 'super_admin' | 'admin' | 'editor' | 'member';

export type UserStatus = 'active' | 'pending' | 'suspended';

export interface User {
  id: string;
  name: string;
  username?: string;
  email: string;
  password?: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  registeredAt: string;
  lastLogin: string;
  avatarUrl?: string;
  nisnNip?: string;
}

export interface NavigationMenuItem {
  id: string;
  label: string;
  path: string;
  isExternal: boolean;
  isVisible: boolean;
  order: number;
  requiresAuth?: boolean;
}

export interface SchoolAnnouncement {
  id: string;
  title: string;
  category: 'Akademik' | 'Kesiswaan' | 'Prestasi' | 'Agenda' | 'PIP';
  date: string;
  summary: string;
  content: string;
  author: string;
  isPinned: boolean;
  readsCount: number;
}

export interface SchoolIdentity {
  name: string;
  tagline: string;
  logoUrl: string;
  heroBannerUrl: string;
  principalName: string;
  principalNip: string;
  principalAvatarUrl: string;
  npsn: string;
  accreditation: string;
  address: string;
  phone: string;
  email: string;
}

export interface EducationCalendarEvent {
  id: string;
  title: string;
  dateRange: string;
  semester: 'Ganjil' | 'Genap';
  category: 'Pembelajaran' | 'Ujian' | 'Libur' | 'Asesmen' | 'Rapor';
  description: string;
}

export interface PIPStudentRecipient {
  id: string;
  name: string;
  nisn: string;
  classGrade: string;
  nominal: string;
  status: 'Siap Cair' | 'Dalam Proses' | 'Rekening Aktif' | 'Telah Dicairkan';
  bank: string;
  termin: string;
  dateUpdated: string;
}

export interface SchoolDocument {
  id: string;
  title: string;
  category: string;
  fileType: 'pdf' | 'doc' | 'xls' | 'zip' | 'jpg' | 'eml' | 'msg' | 'txt';
  size: string;
  downloadCount: number;
  isPublic: boolean;
  source: 'local' | 'gdrive';
  driveId?: string;
  updatedAt: string;
  uploadedBy: string;
}

export interface PhotoGalleryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  description: string;
}

export interface CustomPage {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  heroSubtitle: string;
  contentHtml: string;
  lastModified: string;
  showInNav: boolean;
  ctaText?: string;
  ctaLink?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  ipAddress: string;
  severity: 'info' | 'warning' | 'security';
}
