import React, { useState } from 'react';
import { EducationCalendarEvent } from '../../types';
import { Calendar, Download, BookOpen, CheckCircle, FileText, Filter, ChevronRight, Award } from 'lucide-react';

interface EducationCalendarSectionProps {
  events: EducationCalendarEvent[];
}

export const EducationCalendarSection: React.FC<EducationCalendarSectionProps> = ({ events }) => {
  const [selectedSemester, setSelectedSemester] = useState<'Semua' | 'Ganjil' | 'Genap'>('Semua');
  const [downloadToast, setDownloadToast] = useState(false);

  const filteredEvents = events.filter((e) => {
    if (selectedSemester === 'Semua') return true;
    return e.semester === selectedSemester;
  });

  const handleDownloadCalendar = () => {
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 4000);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Ujian':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Libur':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'Asesmen':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Rapor':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  return (
    <section id="kalender" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Toast */}
        {downloadToast && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium flex items-center justify-between shadow-sm animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Kalender Pendidikan Resmi 2026/2027 (Kemendikdasmen RI) berhasil diunduh.</span>
            </div>
            <button onClick={() => setDownloadToast(false)} className="text-emerald-700 hover:text-emerald-900 text-xs">
              ✕
            </button>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold text-[#0066CC] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Pedoman Resmi Kemendikdasmen RI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] tracking-tight">
              Kalender Pendidikan Tahun Ajaran 2026/2027
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Jadwal resmi pembelajaran, masa pengenalan lingkungan sekolah (MPLS), asesmen sumatif, Asesmen Nasional (ANBK), dan libur semester berdasarkan ketetapan Menteri Pendidikan Dasar dan Menengah.
            </p>
          </div>

          <button
            onClick={handleDownloadCalendar}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-[#0A2540] hover:bg-[#0066CC] rounded-xl shadow-sm transition-colors flex items-center gap-2 shrink-0 self-start md:self-auto"
          >
            <Download className="w-4 h-4 text-[#FFB800]" />
            <span>Unduh Kalender PDF Resmi</span>
          </button>
        </div>

        {/* Semester Filter Tabs */}
        <div className="flex items-center gap-2 mb-8">
          {(['Semua', 'Ganjil', 'Genap'] as const).map((sem) => (
            <button
              key={sem}
              onClick={() => setSelectedSemester(sem)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
                selectedSemester === sem
                  ? 'bg-[#0A2540] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sem === 'Semua' ? 'Seluruh Agenda (1 Tahun)' : `Semester ${sem}`}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-[#F4F6F8] hover:bg-white rounded-xl p-5 border border-slate-200 hover:border-[#0066CC]/40 transition-all shadow-none hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${getCategoryColor(evt.category)}`}>
                    {evt.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 font-semibold">
                    Semester {evt.semester}
                  </span>
                </div>

                <div className="text-xs font-mono font-bold text-[#0066CC] mb-1.5 tabular-nums">
                  {evt.dateRange}
                </div>

                <h3 className="text-sm font-bold text-[#0A2540] leading-snug mb-2">
                  {evt.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {evt.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Kemendikdasmen Official Note Box */}
        <div className="mt-10 p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-blue-900">
                Ketetapan Kurikulum Merdeka Mandiri Berbagi TA 2026/2027
              </div>
              <div className="text-blue-800 text-[11px] mt-0.5">
                Berdasarkan Edaran Resmi Kementerian Pendidikan Dasar dan Menengah Republik Indonesia mengenai alokasi 36 - 38 minggu efektif per tahun.
              </div>
            </div>
          </div>
          <button
            onClick={handleDownloadCalendar}
            className="px-3.5 py-1.5 text-xs font-bold text-blue-900 bg-white hover:bg-blue-100 rounded-lg border border-blue-300 transition-colors shrink-0"
          >
            Lihat SK Menteri
          </button>
        </div>

      </div>
    </section>
  );
};
