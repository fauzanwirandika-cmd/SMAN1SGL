import React, { useState, useEffect } from 'react';
import { Clock, Globe, CheckCircle } from 'lucide-react';

export const LiveClockWidget: React.FC = () => {
  const [timeString, setTimeString] = useState<string>('');
  const [dateString, setDateString] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Format date in Indonesian: e.g. "Minggu, 11 Oktober 2026"
      const dateFormatted = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      // Format time: e.g. "18:42:05 WIB"
      const timeFormatted = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }) + ' WIB';

      setDateString(dateFormatted);
      setTimeString(timeFormatted);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs text-slate-300">
      <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
        <Clock className="w-3.5 h-3.5 text-[#FFB800] shrink-0" />
        <span className="font-mono tabular-nums font-semibold text-white">
          {timeString || 'Memuat jam...'}
        </span>
      </div>

      <span className="hidden md:inline font-medium text-slate-300">
        {dateString}
      </span>

      <div className="hidden lg:flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>Sinkron Google Time (WIB)</span>
      </div>
    </div>
  );
};
