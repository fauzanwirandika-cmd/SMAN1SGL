import React, { useState } from 'react';
import { PhotoGalleryItem } from '../../types';
import { Image as ImageIcon, Maximize2, X, Sparkles } from 'lucide-react';

interface PhotoGallerySectionProps {
  galleryItems: PhotoGalleryItem[];
}

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({ galleryItems }) => {
  const [selectedImage, setSelectedImage] = useState<PhotoGalleryItem | null>(null);

  return (
    <section id="galeri" className="py-16 sm:py-20 bg-[#F4F6F8] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-[#0066CC] uppercase tracking-wider mb-2">
            Dokumentasi & Portofolio
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] tracking-tight">
            Galeri Kegiatan Civitas SMAN1SGL
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Menampilkan aktivitas pembelajaran interaktif, riset laboratorium, fasilitas kampus terpadu, dan panggung apresiasi prestasi siswa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback container in case of path issue
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs text-white font-medium flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-sm">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Perbesar Foto</span>
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                    <span className="font-semibold text-[#0066CC]">{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{item.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#0A2540] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="relative aspect-[16/10] bg-slate-900">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span className="font-semibold text-[#0066CC]">{selectedImage.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{selectedImage.date}</span>
              </div>
              <h3 className="text-lg font-bold text-[#0A2540]">
                {selectedImage.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
