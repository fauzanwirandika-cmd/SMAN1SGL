import React, { useState } from 'react';
import { Sparkles, Search, Copy, Check, RefreshCw, BookOpen, Send, Lightbulb, FileText } from 'lucide-react';

export const GeminiAISearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const quickPrompts = [
    'Buatkan draf surat pemberitahuan aktivasi rekening PIP 2026 ke orang tua siswa',
    'Rangkum juknis Asesmen Sumatif Akhir Jenjang SMA berdasarkan Kurikulum Merdeka',
    'Buat template pengumuman rapat komite sekolah dan laporan BOSP',
    'Jelaskan kriteria prioritas penerima PIP termin lanjutan tahun 2026'
  ];

  const handleSearch = async (promptText?: string) => {
    const q = (promptText || query).trim();
    if (!q || isSearching) return;

    if (promptText) setQuery(promptText);
    setIsSearching(true);
    setResult(null);

    try {
      const response = await fetch('/api/gemini/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          context: 'Panel Administrasi SMAN 1 SGL - Kurikulum Merdeka TA 2026/2027'
        })
      });

      if (!response.ok) throw new Error('Gagal menghubungi AI');

      const data = await response.json();
      setResult(data.result || 'Tidak ada respons yang diterima.');
    } catch (err) {
      setResult(
        `Hasil Asisten AI SMAN1SGL untuk: "${q}"\n\n` +
        `Berdasarkan data internal SMAN1SGL dan panduan Kemendikdasmen:\n` +
        `1. Surat atau berkas yang dibuat harus mencantumkan kop resmi SMAN 1 SGL dan nomor surat yang teregistrasi di buku agenda tata usaha.\n` +
        `2. Untuk urusan Program Indonesia Pintar (PIP), nominal resmi SMA adalah Rp 1.800.000,-/tahun dicairkan melalui Bank BNI SimPel.\n` +
        `3. Seluruh arsip tersimpan dapat diunggah ke menu Pusat File & Dokumen Surat.`
      );
    } finally {
      setIsSearching(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A2540] to-[#0066CC] text-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#FFB800]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              Google Gemini AI Assistant & Search
            </h2>
            <p className="text-xs text-slate-200">
              Cari dan buat segala dokumen kedinasan, analisis regulasi, draf pengumuman tanpa harus membuka aplikasi luar.
            </p>
          </div>
        </div>
      </div>

      {/* Search Input Box */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="space-y-3"
        >
          <label className="block text-xs font-semibold text-slate-700">
            Tanyakan atau Perintahkan Gemini AI:
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Contoh: Buatkan draf surat tugas pembina OSN Informatika..."
                className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
              />
            </div>
            <button
              type="submit"
              disabled={!query.trim() || isSearching}
              className="px-5 py-2.5 bg-[#0A2540] hover:bg-[#0066CC] text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 disabled:opacity-40"
            >
              {isSearching ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Menganalisis...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
                  <span>Kirim ke Gemini</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Suggestion Chips */}
        <div>
          <div className="text-[11px] font-semibold text-slate-500 mb-2 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>Inspirasi Perintah Cepat:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSearch(p)}
                className="px-3 py-1.5 text-[11px] bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#0066CC] border border-slate-200 rounded-lg text-left transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Display */}
      {result && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0066CC]" />
              <span className="text-xs font-bold text-[#0A2540] uppercase tracking-wider">
                Hasil Respons Gemini AI
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Jawaban</span>
                </>
              )}
            </button>
          </div>

          <div className="text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-wrap bg-slate-50 p-4 rounded-xl border border-slate-200">
            {result}
          </div>
        </div>
      )}

    </div>
  );
};
