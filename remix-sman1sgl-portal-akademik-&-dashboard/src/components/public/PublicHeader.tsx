import React, { useState } from 'react';
import { NavigationMenuItem, User, SchoolIdentity } from '../../types';
import { Menu, X, Shield, LogIn, ChevronRight, GraduationCap } from 'lucide-react';

interface PublicHeaderProps {
  menuItems: NavigationMenuItem[];
  currentUser: User | null;
  onNavigateToAuth: (mode?: 'login' | 'forgot-password') => void;
  onNavigateToAdmin: () => void;
  activeSection: string;
  onSectionClick: (path: string) => void;
  schoolIdentity?: SchoolIdentity;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({
  menuItems,
  currentUser,
  onNavigateToAuth,
  onNavigateToAdmin,
  activeSection,
  onSectionClick,
  schoolIdentity
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const visibleMenus = menuItems.filter(item => item.isVisible).sort((a, b) => a.order - b.order);

  const handleLinkClick = (path: string) => {
    onSectionClick(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Zone 1: Brand Title */}
          <div className="flex items-center gap-3 shrink-0">
            <a 
              href="#beranda" 
              onClick={(e) => { e.preventDefault(); handleLinkClick('#beranda'); }}
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066CC] rounded-lg"
            >
              <div className="w-11 h-11 rounded-xl bg-[#0A2540] text-white flex items-center justify-center font-bold shadow-md shadow-slate-900/10 group-hover:bg-[#0066CC] transition-colors overflow-hidden">
                {schoolIdentity?.logoUrl ? (
                  <img src={schoolIdentity.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <GraduationCap className="w-6 h-6 text-[#FFB800]" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-[#0A2540] leading-tight whitespace-nowrap">
                  {schoolIdentity?.name || 'SMAN 1 SGL'}
                </span>
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
                  {schoolIdentity?.tagline || 'Portal Akademik & Informasi'}
                </span>
              </div>
            </a>
          </div>

          {/* Zone 2: Dynamic Navigation Links (from Menu Builder) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            {visibleMenus.map((item) => {
              const isActive = activeSection === item.path || (item.path === '#beranda' && activeSection === '');
              return (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.path);
                  }}
                  className={`relative py-1 whitespace-nowrap transition-colors hover:text-[#0A2540] ${
                    isActive ? 'text-[#0066CC] font-semibold' : 'text-slate-600'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0066CC] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action / Auth */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {currentUser ? (
              <button
                onClick={onNavigateToAdmin}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0A2540] hover:bg-[#0066CC] rounded-lg shadow-sm transition-colors whitespace-nowrap"
              >
                <Shield className="w-4 h-4 text-[#FFB800]" />
                <span>Dashboard Privat</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigateToAuth('login')}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0A2540] hover:bg-[#0066CC] rounded-lg shadow-sm transition-colors whitespace-nowrap flex items-center gap-1.5"
              >
                <LogIn className="w-4 h-4 text-[#FFB800]" />
                <span>Masuk</span>
              </button>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            {currentUser ? (
              <button
                onClick={onNavigateToAdmin}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0A2540] rounded-md flex items-center gap-1"
              >
                <Shield className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>Area Privat</span>
              </button>
            ) : null}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Buka menu navigasi"
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066CC]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {visibleMenus.map((item) => (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.path);
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-[#0A2540]"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#0A2540] rounded-lg"
              >
                <Shield className="w-4 h-4 text-[#FFB800]" />
                <span>Masuk ke Dashboard ({currentUser.name})</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToAuth('login');
                }}
                className="w-full py-2.5 text-center text-xs font-semibold text-white bg-[#0A2540] rounded-lg hover:bg-[#0066CC] flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4 text-[#FFB800]" />
                <span>Masuk Akun</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
