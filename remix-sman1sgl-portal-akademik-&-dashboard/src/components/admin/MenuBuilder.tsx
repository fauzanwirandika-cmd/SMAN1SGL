import React, { useState } from 'react';
import { NavigationMenuItem } from '../../types';
import {
  MenuSquare,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Check,
  Edit2,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface MenuBuilderProps {
  menuItems: NavigationMenuItem[];
  onUpdateMenuItems: (items: NavigationMenuItem[]) => void;
}

export const MenuBuilder: React.FC<MenuBuilderProps> = ({
  menuItems,
  onUpdateMenuItems
}) => {
  const [items, setItems] = useState<NavigationMenuItem[]>(menuItems);
  const [newLabel, setNewLabel] = useState('');
  const [newPath, setNewPath] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // reassign order numbers
    const reordered = updated.map((item, idx) => ({ ...item, order: idx + 1 }));
    setItems(reordered);
    onUpdateMenuItems(reordered);
    showToast(`Urutan menu berhasil diubah.`);
  };

  const handleToggleVisibility = (id: string) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, isVisible: !item.isVisible } : item
    );
    setItems(updated);
    onUpdateMenuItems(updated);
    showToast('Visibilitas menu diperbarui.');
  };

  const handleDelete = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    const reordered = updated.map((item, idx) => ({ ...item, order: idx + 1 }));
    setItems(reordered);
    onUpdateMenuItems(reordered);
    showToast('Item menu dihapus.');
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim() || !newPath.trim()) return;

    const newItem: NavigationMenuItem = {
      id: `menu-${Date.now()}`,
      label: newLabel.trim(),
      path: newPath.trim().startsWith('#') || newPath.trim().startsWith('http') ? newPath.trim() : `#${newPath.trim()}`,
      isExternal: newPath.startsWith('http'),
      isVisible: true,
      order: items.length + 1
    };

    const updated = [...items, newItem];
    setItems(updated);
    onUpdateMenuItems(updated);
    setNewLabel('');
    setNewPath('');
    showToast(`Menu baru "${newItem.label}" berhasil ditambahkan ke navigasi.`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-[#0A2540]">
          Menu Builder (Navigasi Dinamis Publik)
        </h2>
        <p className="text-xs text-slate-500">
          Atur struktur menu header portal publik SMAN1SGL. Urutan dan status visibilitas langsung disinkronkan ke halaman utama.
        </p>
      </div>

      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-emerald-700 hover:text-emerald-900">
            ✕
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Reorder and Manage Menu List (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-[#0A2540] uppercase tracking-wider">
              Daftar Menu Navigasi Aktif
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              Total {items.length} Entri
            </span>
          </div>

          <div className="space-y-2">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                  item.isVisible ? 'bg-slate-50/80 border-slate-200' : 'bg-slate-100/50 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-600 font-mono text-xs flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <span>{item.label}</span>
                      {!item.isVisible && (
                        <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                          Disembunyikan
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                      {item.path}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {/* Up */}
                  <button
                    onClick={() => handleMove(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 rounded hover:bg-slate-200 text-slate-600 disabled:opacity-30"
                    title="Pindah ke Atas"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>

                  {/* Down */}
                  <button
                    onClick={() => handleMove(idx, 'down')}
                    disabled={idx === items.length - 1}
                    className="p-1.5 rounded hover:bg-slate-200 text-slate-600 disabled:opacity-30"
                    title="Pindah ke Bawah"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Visibility Toggle */}
                  <button
                    onClick={() => handleToggleVisibility(item.id)}
                    className="p-1.5 rounded hover:bg-slate-200 text-slate-600"
                    title={item.isVisible ? 'Sembunyikan dari Publik' : 'Tampilkan ke Publik'}
                  >
                    {item.isVisible ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600"
                    title="Hapus Menu"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Add New Menu Item Form (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-[#0A2540] uppercase tracking-wider">
              Tambah Item Menu Baru
            </span>
          </div>

          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Label Teks Menu *
              </label>
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="Contoh: Ekstrakurikuler"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Slug / URL Tautan *
              </label>
              <input
                type="text"
                value={newPath}
                onChange={(e) => setNewPath(e.target.value)}
                placeholder="Contoh: #ekskul atau https://..."
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                required
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Gunakan `#nama-seksi` untuk tautan halaman beranda, atau URL eksternal lengkap.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-semibold text-white bg-[#0A2540] hover:bg-[#0066CC] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4 text-[#FFB800]" />
              <span>Tambahkan ke Navigasi Header</span>
            </button>
          </form>

          <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-100 text-[11px] text-blue-900 leading-relaxed">
            Item navigasi yang aktif akan segera terlihat oleh semua pengunjung situs di bar navigasi atas.
          </div>
        </div>

      </div>

    </div>
  );
};
