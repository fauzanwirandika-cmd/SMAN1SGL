/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  User,
  UserRole,
  UserStatus,
  NavigationMenuItem,
  SchoolAnnouncement,
  SchoolDocument,
  PhotoGalleryItem,
  CustomPage,
  AuditLog,
  SchoolIdentity,
  EducationCalendarEvent,
  PIPStudentRecipient
} from './types';
import {
  INITIAL_USERS,
  INITIAL_MENU_ITEMS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_DOCUMENTS,
  INITIAL_GALLERY,
  INITIAL_PAGES,
  INITIAL_AUDIT_LOGS,
  INITIAL_SCHOOL_IDENTITY,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_PIP_RECIPIENTS
} from './data/initialData';

// Public Zone Components
import { PublicHeader } from './components/public/PublicHeader';
import { HeroSection } from './components/public/HeroSection';
import { PIPSection } from './components/public/PIPSection';
import { AnnouncementsSection } from './components/public/AnnouncementsSection';
import { EducationCalendarSection } from './components/public/EducationCalendarSection';
import { PhotoGallerySection } from './components/public/PhotoGallerySection';
import { DocumentsSection } from './components/public/DocumentsSection';
import { PPDBSection } from './components/public/PPDBSection';
import { PublicFooter } from './components/public/PublicFooter';
import { LiveClockWidget } from './components/public/LiveClockWidget';
import { AIChatboard } from './components/public/AIChatboard';

// Auth Component
import { AuthModal } from './components/auth/AuthModal';

// Private Zone (Admin & Member Dashboard) Components
import { AdminSidebar } from './components/admin/AdminSidebar';
import { AdminHeader } from './components/admin/AdminHeader';
import { StatCards } from './components/admin/StatCards';
import { MemberManagement } from './components/admin/MemberManagement';
import { FileCenter } from './components/admin/FileCenter';
import { PageEditor } from './components/admin/PageEditor';
import { MenuBuilder } from './components/admin/MenuBuilder';
import { SecurityAudit } from './components/admin/SecurityAudit';
import { MemberPortalView } from './components/admin/MemberPortalView';
import { PIPManager } from './components/admin/PIPManager';
import { SchoolIdentityEditor } from './components/admin/SchoolIdentityEditor';
import { GeminiAISearch } from './components/admin/GeminiAISearch';

import { Shield, ExternalLink, ArrowRight, CheckCircle2, UserCheck, Sparkles } from 'lucide-react';

export default function App() {
  // Global Data State
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<User | null>(null); // Public visitors start logged out
  const [menuItems, setMenuItems] = useState<NavigationMenuItem[]>(INITIAL_MENU_ITEMS);
  const [announcements, setAnnouncements] = useState<SchoolAnnouncement[]>(INITIAL_ANNOUNCEMENTS);
  const [documents, setDocuments] = useState<SchoolDocument[]>(INITIAL_DOCUMENTS);
  const [gallery, setGallery] = useState<PhotoGalleryItem[]>(INITIAL_GALLERY);
  const [pages, setPages] = useState<CustomPage[]>(INITIAL_PAGES);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // New School Features State
  const [schoolIdentity, setSchoolIdentity] = useState<SchoolIdentity>(INITIAL_SCHOOL_IDENTITY);
  const [calendarEvents, setCalendarEvents] = useState<EducationCalendarEvent[]>(INITIAL_CALENDAR_EVENTS);
  const [pipRecipients, setPipRecipients] = useState<PIPStudentRecipient[]>(INITIAL_PIP_RECIPIENTS);

  // View & Navigation Routing State
  const [currentZone, setCurrentZone] = useState<'public' | 'private'>('public');
  const [adminTab, setAdminTab] = useState<string>('overview');
  const [activeSection, setActiveSection] = useState<string>('');

  // Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'forgot-password'>('login');

  // Pending approval counter
  const pendingMembersCount = users.filter((u) => u.status === 'pending').length;

  // Handlers for Member Management (Super Admin only)
  const handleApproveUser = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: 'active', emailVerified: true } : u))
    );
    const approverName = currentUser?.name || 'Super Admin';
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        actor: `${approverName} (Super Admin)`,
        action: `Approved new member account: ${userId}`,
        ipAddress: '182.253.110.42',
        severity: 'info'
      },
      ...prev
    ]);
  };

  const handleRejectUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const handleUpdateRole = (userId: string, newRole: UserRole) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) => (prev ? { ...prev, role: newRole } : null));
    }
  };

  const handleToggleStatus = (userId: string, newStatus: UserStatus) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)));
  };

  const handleAddUser = (newUser: User) => {
    setUsers((prev) => [newUser, ...prev]);
  };

  const handleBatchAddUsers = (newUsers: User[]) => {
    setUsers((prev) => [...newUsers, ...prev]);
  };

  // Handlers for Files (Super Admin, Admin, Editor)
  const handleAddDocument = (newDoc: SchoolDocument) => {
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  // Handlers for Page Editor (Super Admin, Editor)
  const handleSavePage = (updatedPage: CustomPage) => {
    setPages((prev) => prev.map((p) => (p.id === updatedPage.id ? updatedPage : p)));
  };

  // Handlers for PIP (Super Admin, Admin, Editor)
  const handleAddPipRecipient = (item: PIPStudentRecipient) => {
    setPipRecipients((prev) => [item, ...prev]);
  };

  const handleUpdatePipStatus = (id: string, status: PIPStudentRecipient['status']) => {
    setPipRecipients((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const handleDeletePipRecipient = (id: string) => {
    setPipRecipients((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAddPipAnnouncement = (ann: SchoolAnnouncement) => {
    setAnnouncements((prev) => [ann, ...prev]);
  };

  // Handlers for School Identity (Super Admin, Editor)
  const handleSaveSchoolIdentity = (updated: SchoolIdentity) => {
    setSchoolIdentity(updated);
  };

  // Handlers for Auth
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        actor: `${user.name} (${user.role})`,
        action: `User logged in to Private Dashboard`,
        ipAddress: '180.248.33.15',
        severity: 'info'
      },
      ...prev
    ]);
    setCurrentZone('private');
    if (user.role === 'member') {
      setAdminTab('my-docs');
    } else {
      setAdminTab('overview');
    }
  };

  // Role Switcher for Sandbox Testing with RBAC Guards
  const handleSwitchRole = (role: UserRole) => {
    if (!currentUser) return;
    const updated = { ...currentUser, role };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? { ...u, role } : u)));

    // Strict Role Redirection
    if (role === 'member') {
      setAdminTab('my-docs');
    } else if (role === 'admin') {
      // Admin can only access overview, files, pip, gemini-search
      if (['members', 'pages', 'identity', 'menu-builder', 'security'].includes(adminTab)) {
        setAdminTab('overview');
      }
    } else if (role === 'editor') {
      // Editor can only access overview, pages, identity, menu-builder, pip, files (no members, no security)
      if (['members', 'security'].includes(adminTab)) {
        setAdminTab('overview');
      }
    }
  };

  const handleSectionScroll = (path: string) => {
    setActiveSection(path);
    if (path.startsWith('#')) {
      const el = document.getElementById(path.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-slate-800 flex flex-col font-sans selection:bg-[#0066CC] selection:text-white">
      
      {/* Top Header Bar: Clean SMAN 1 SGL Identity + Real-Time Live Clock Widget */}
      <aside aria-label="Informasi Waktu dan Akses Sistem" className="bg-[#0A2540] text-white border-b border-white/10 px-4 py-2 flex flex-wrap items-center justify-between text-xs gap-3 z-50">
        
        {/* Left: SMAN 1 SGL & Jam Terkini Google */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 font-bold text-white tracking-wide text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFB800]" />
            <span>{schoolIdentity.name}</span>
          </div>

          <span className="hidden sm:inline text-white/20">|</span>

          {/* Pemberitahuan Jam Terkini, Hari, Tanggal, Bulan, Tahun */}
          <LiveClockWidget />
        </div>

        {/* Right side: hanya tombol navigasi kembali saat berada di zona privat */}
        {currentZone === 'private' && (
          <button
            onClick={() => setCurrentZone('public')}
            className="px-3.5 py-1.5 rounded-md bg-white/15 hover:bg-white/25 text-white font-semibold transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>Kembali ke Portal Publik</span>
          </button>
        )}
      </aside>

      {/* Main View Render */}
      {currentZone === 'public' ? (
        /* ================= AREA PUBLIK ================= */
        <main className="flex-1 flex flex-col">
          <PublicHeader
            menuItems={menuItems}
            currentUser={currentUser}
            onNavigateToAuth={(mode = 'login') => {
              setAuthModalMode(mode);
              setAuthModalOpen(true);
            }}
            onNavigateToAdmin={() => setCurrentZone('private')}
            activeSection={activeSection}
            onSectionClick={handleSectionScroll}
            schoolIdentity={schoolIdentity}
          />

          <div className="flex-1">
            <HeroSection
              onNavigateToPPDB={() => handleSectionScroll('#ppdb')}
              onNavigateToAnnouncements={() => handleSectionScroll('#pip')}
              schoolIdentity={schoolIdentity}
            />

            {/* PIP (Program Indonesia Pintar) - Tabel Nama-Nama Siswa Penerima Bantuan */}
            <PIPSection
              recipients={pipRecipients}
              announcements={announcements}
            />

            {/* Pengumuman & Berita Sekolah */}
            <AnnouncementsSection announcements={announcements} />

            {/* Kalender Pendidikan Tahun Ajaran 2026/2027 Resmi Kemendikdasmen */}
            <EducationCalendarSection events={calendarEvents} />

            {/* Galeri Kegiatan Sekolah */}
            <PhotoGallerySection galleryItems={gallery} />

            {/* Repositori Dokumen & Surat Publik */}
            <DocumentsSection documents={documents} />

            {/* Informasi Jalur PPDB 2026/2027 */}
            <PPDBSection
              onDownloadGuideClick={() => handleSectionScroll('#dokumen')}
            />
          </div>

          <PublicFooter
            onNavigateToAdmin={() => setCurrentZone('private')}
            onNavigateToAuth={() => {
              setAuthModalMode('login');
              setAuthModalOpen(true);
            }}
            isAuthenticated={!!currentUser}
          />

          {/* Chatboard AI Resmi SMAN1SGL (Terkoneksi Gemini, Tanpa Input API Key) */}
          <AIChatboard />
        </main>
      ) : (
        /* ================= AREA PRIVAT / DASHBOARD ADMIN & MEMBER ================= */
        <div className="flex-1 flex min-h-screen">
          {currentUser ? (
            <>
              {/* Fixed Left Sidebar Navigation */}
              <AdminSidebar
                currentTab={adminTab}
                onSelectTab={setAdminTab}
                currentUser={currentUser}
                onSwitchRole={handleSwitchRole}
                onLogout={() => {
                  setCurrentUser(null);
                  setCurrentZone('public');
                }}
                onBackToPublic={() => setCurrentZone('public')}
                pendingMembersCount={pendingMembersCount}
              />

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col min-w-0 bg-[#F4F6F8]">
                <AdminHeader
                  currentTab={adminTab}
                  currentUser={currentUser}
                  onBackToPublic={() => setCurrentZone('public')}
                />

                <main className="flex-1 p-5 sm:p-7 max-w-7xl w-full mx-auto space-y-6">
                  
                  {/* Tab Overview: Ringkasan Sistem */}
                  {adminTab === 'overview' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h1 className="text-xl font-bold text-[#0A2540]">
                            Ringkasan Sistem & Statistik Akademik {schoolIdentity.name}
                          </h1>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Data real-time portal sekolah, bantuan PIP, akun pengguna, dan integrasi kurikulum.
                          </p>
                        </div>
                      </div>

                      <StatCards
                        users={users}
                        documents={documents}
                        onNavigateToMembers={() => {
                          if (currentUser.role === 'super_admin') setAdminTab('members');
                        }}
                        onNavigateToFiles={() => setAdminTab('files')}
                      />

                      {/* Quick Cards Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        
                        {/* Status PIP Card */}
                        <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <span className="text-xs font-bold text-[#0A2540] uppercase tracking-wider flex items-center gap-1.5">
                              <Sparkles className="w-4 h-4 text-[#FFB800]" />
                              <span>Penerima PIP Aktif ({pipRecipients.length} Siswa)</span>
                            </span>
                            <button
                              onClick={() => setAdminTab('pip')}
                              className="text-xs text-[#0066CC] font-semibold hover:underline"
                            >
                              Kelola PIP
                            </button>
                          </div>
                          <div className="space-y-2">
                            {pipRecipients.slice(0, 3).map((r) => (
                              <div key={r.id} className="p-3 bg-slate-50 rounded-lg flex items-center justify-between text-xs">
                                <div>
                                  <div className="font-bold text-slate-900">{r.name}</div>
                                  <div className="text-[11px] text-slate-500">{r.classGrade} · NISN {r.nisn}</div>
                                </div>
                                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                  {r.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Antrean Member Baru (Super Admin) atau Berkas Terbaru */}
                        <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <span className="text-xs font-bold text-[#0A2540] uppercase tracking-wider">
                              Berkas Dokumen Terkini
                            </span>
                            <button
                              onClick={() => setAdminTab('files')}
                              className="text-xs text-[#0066CC] font-semibold hover:underline"
                            >
                              Buka Pusat File
                            </button>
                          </div>
                          <div className="space-y-2">
                            {documents.slice(0, 3).map((doc) => (
                              <div key={doc.id} className="p-3 bg-slate-50 rounded-lg flex items-center justify-between text-xs">
                                <div>
                                  <div className="font-semibold text-slate-900">{doc.title}</div>
                                  <div className="text-[11px] text-slate-500">{doc.category} · {doc.size}</div>
                                </div>
                                <span className="font-mono text-[11px] text-slate-400">{doc.updatedAt}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* Tab Members (Super Admin & Admin) */}
                  {adminTab === 'members' && (currentUser.role === 'super_admin' || currentUser.role === 'admin') && (
                    <MemberManagement
                      users={users}
                      currentUserId={currentUser.id}
                      onApproveUser={handleApproveUser}
                      onRejectUser={handleRejectUser}
                      onUpdateRole={handleUpdateRole}
                      onToggleStatus={handleToggleStatus}
                      onAddUser={handleAddUser}
                      onBatchAddUsers={handleBatchAddUsers}
                    />
                  )}

                  {/* Tab PIP (Super Admin, Admin, Editor) */}
                  {adminTab === 'pip' && currentUser.role !== 'member' && (
                    <PIPManager
                      recipients={pipRecipients}
                      userRole={currentUser.role}
                      onAddRecipient={handleAddPipRecipient}
                      onUpdateStatus={handleUpdatePipStatus}
                      onDeleteRecipient={handleDeletePipRecipient}
                      onAddAnnouncement={handleAddPipAnnouncement}
                      onSetRecipients={setPipRecipients}
                    />
                  )}

                  {/* Tab Files & Dokumen Surat (Super Admin, Admin, Editor) */}
                  {adminTab === 'files' && currentUser.role !== 'member' && (
                    <FileCenter
                      documents={documents}
                      onAddDocument={handleAddDocument}
                      onDeleteDocument={handleDeleteDocument}
                    />
                  )}

                  {/* Tab Pages: Live Preview (Super Admin, Editor) */}
                  {adminTab === 'pages' && (currentUser.role === 'super_admin' || currentUser.role === 'editor') && (
                    <PageEditor
                      pages={pages}
                      onSavePage={handleSavePage}
                    />
                  )}

                  {/* Tab Identity & Foto Profil Sekolah (Super Admin, Editor) */}
                  {adminTab === 'identity' && (currentUser.role === 'super_admin' || currentUser.role === 'editor') && (
                    <SchoolIdentityEditor
                      identity={schoolIdentity}
                      onSaveIdentity={handleSaveSchoolIdentity}
                    />
                  )}

                  {/* Tab Menu Builder (Super Admin, Editor) */}
                  {adminTab === 'menu-builder' && (currentUser.role === 'super_admin' || currentUser.role === 'editor') && (
                    <MenuBuilder
                      menuItems={menuItems}
                      onUpdateMenuItems={setMenuItems}
                    />
                  )}

                  {/* Tab Gemini AI Search (Super Admin, Admin) */}
                  {adminTab === 'gemini-search' && (currentUser.role === 'super_admin' || currentUser.role === 'admin') && (
                    <GeminiAISearch />
                  )}

                  {/* Tab Security & Audit Log (Super Admin Only) */}
                  {adminTab === 'security' && currentUser.role === 'super_admin' && (
                    <SecurityAudit logs={auditLogs} />
                  )}

                  {/* Tab Khusus Member / Siswa */}
                  {(adminTab === 'my-docs' || adminTab === 'support') && (
                    <MemberPortalView
                      currentUser={currentUser}
                      documents={documents}
                    />
                  )}

                </main>
              </div>
            </>
          ) : (
            <div className="p-12 text-center max-w-md mx-auto my-auto space-y-4">
              <Shield className="w-12 h-12 text-[#0A2540] mx-auto" />
              <h3 className="text-lg font-bold">Autentikasi Diperlukan</h3>
              <p className="text-xs text-slate-500">
                Silakan masuk untuk mengakses panel administrasi dan zona privat SMAN 1 SGL.
              </p>
              <button
                onClick={() => {
                  setAuthModalMode('login');
                  setAuthModalOpen(true);
                }}
                className="px-4 py-2 bg-[#0A2540] text-white text-xs font-semibold rounded-lg"
              >
                Masuk Sekarang
              </button>
            </div>
          )}
        </div>
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        onLoginSuccess={handleLoginSuccess}
        existingUsers={users}
      />

    </div>
  );
}
