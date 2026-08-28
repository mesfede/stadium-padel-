import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, ChevronLeft, ChevronRight, Calendar, ImageIcon } from 'lucide-react';
import { images } from '../assets';

interface ElClubProps {
  onNavigateToBooking: () => void;
}

interface FacilityItem {
  id: string;
  title: string;
  tag: string;
  mainImage: string;
  gallery: string[];
}

const FACILITIES: FacilityItem[] = [
  {
    id: 'canchas',
    title: '3 Canchas Premium Techadas',
    tag: 'Blindex & Césped Monofilamento',
    mainImage: images.quentoCanchaOk,
    gallery: [images.quentoCanchaOk, images.quentoLugar, images.complejo2]
  },
  {
    id: 'servicios',
    title: 'Bar, Vestuarios & Pro Shop',
    tag: 'Tercer Tiempo & Comodidades',
    mainImage: images.quentoBar,
    gallery: [images.quentoBar, images.quentoLugar]
  },
  {
    id: 'iluminacion',
    title: 'Iluminación LED Profesional',
    tag: 'Visibilidad Óptima',
    mainImage: images.quentoLugar,
    gallery: [images.quentoLugar, images.quentoCanchaOk]
  },
  {
    id: 'torneos',
    title: 'Torneos, Clases & Eventos',
    tag: 'Comunidad & Competencia',
    mainImage: images.complejo2,
    gallery: [images.complejo2, images.quentoCanchaOk, images.quentoBar]
  }
];

export default function ElClub({ onNavigateToBooking }: ElClubProps) {
  const [selectedFacility, setSelectedFacility] = useState<FacilityItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleOpenFacility = (facility: FacilityItem) => {
    setSelectedFacility(facility);
    setActiveImageIndex(0);
  };

  const handleNextImage = () => {
    if (!selectedFacility) return;
    setActiveImageIndex((prev) => (prev + 1) % selectedFacility.gallery.length);
  };

  const handlePrevImage = () => {
    if (!selectedFacility) return;
    setActiveImageIndex((prev) => (prev - 1 + selectedFacility.gallery.length) % selectedFacility.gallery.length);
  };

  return (
    <section id="el-club" className="py-20 sm:py-28 bg-neutral-950 text-white overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-tight text-white">
            NUESTRAS <span className="text-[#2D37FB]">INSTALACIONES</span>
          </h2>
          <div className="w-16 h-1 bg-[#2D37FB] mt-3 rounded-full" />
          <p className="mt-3.5 text-sm sm:text-base text-neutral-300 font-medium leading-relaxed">
            Conocé nuestras canchas techadas de primer nivel, servicios y comodidades.
          </p>
        </div>

        {/* Asymmetric Bento Cards Grid */}
        <div className="space-y-6">
          
          {/* Row 1: Large Card (Left ~60-65%) + Smaller Card (Right ~35-40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Card 1: 6 Canchas Premium (Big Card - 7 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={() => handleOpenFacility(FACILITIES[0])}
              className="lg:col-span-7 group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl cursor-pointer min-h-[300px] sm:min-h-[380px] flex flex-col justify-end"
            >
              <img 
                src={images.quentoCanchaOk} 
                alt="3 Canchas Premium Stadium"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-neutral-950/70 text-white text-xs font-bold flex items-center space-x-1.5 backdrop-blur-sm group-hover:bg-[#2D37FB] transition-colors">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Ver Galería</span>
              </div>
 
              <div className="relative z-10 p-6 sm:p-7">
                <span className="inline-block px-3 py-1 rounded-md bg-[#2D37FB] text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-2 shadow-md">
                  Blindex & Césped Monofilamento
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-white uppercase tracking-tight leading-tight">
                  3 Canchas Premium
                </h3>
              </div>
            </motion.div>

            {/* Card 2: Bar, Vestuarios & Pro Shop (Smaller Card - 5 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={() => handleOpenFacility(FACILITIES[1])}
              className="lg:col-span-5 group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl cursor-pointer min-h-[300px] sm:min-h-[380px] flex flex-col justify-end"
            >
              <img 
                src={images.quentoBar} 
                alt="Bar, Vestuarios & Pro Shop"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-neutral-950/70 text-white text-xs font-bold flex items-center space-x-1.5 backdrop-blur-sm group-hover:bg-[#2D37FB] transition-colors">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Ver Galería</span>
              </div>

              <div className="relative z-10 p-6 sm:p-7">
                <span className="inline-block px-3 py-1 rounded-md bg-neutral-950/80 border border-neutral-700 text-[#b9a791] text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-2 backdrop-blur-sm">
                  Bar, Vestuarios & Pro Shop
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight leading-tight">
                  Servicios Completos
                </h3>
              </div>
            </motion.div>

          </div>

          {/* Row 2: Inverted Layout - Smaller Card (Left ~35-40%) + Large Card (Right ~60-65%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Card 3: Iluminación LED (Smaller Card - 5 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              onClick={() => handleOpenFacility(FACILITIES[2])}
              className="lg:col-span-5 group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl cursor-pointer min-h-[300px] sm:min-h-[380px] flex flex-col justify-end"
            >
              <img 
                src={images.quentoLugar} 
                alt="Iluminación LED Stadium"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-neutral-950/70 text-white text-xs font-bold flex items-center space-x-1.5 backdrop-blur-sm group-hover:bg-[#2D37FB] transition-colors">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Ver Galería</span>
              </div>

              <div className="relative z-10 p-6 sm:p-7">
                <span className="inline-block px-3 py-1 rounded-md bg-neutral-950/80 border border-neutral-700 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-2 backdrop-blur-sm">
                  Visibilidad óptima sin sombras
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight leading-tight">
                  Iluminación LED
                </h3>
              </div>
            </motion.div>

            {/* Card 4: Clases & Torneos (Large Card - 7 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => handleOpenFacility(FACILITIES[3])}
              className="lg:col-span-7 group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl cursor-pointer min-h-[300px] sm:min-h-[380px] flex flex-col justify-end"
            >
              <img 
                src={images.complejo2} 
                alt="Ligas, Clases & Tercer Tiempo Stadium"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-neutral-950/70 text-white text-xs font-bold flex items-center space-x-1.5 backdrop-blur-sm group-hover:bg-[#2D37FB] transition-colors">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Ver Galería</span>
              </div>

              <div className="relative z-10 p-6 sm:p-7">
                <span className="inline-block px-3 py-1 rounded-md bg-[#2D37FB] text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-2 shadow-md">
                  Ligas, Clases & Tercer Tiempo
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-white uppercase tracking-tight leading-tight">
                  Clases & Torneos
                </h3>
              </div>
            </motion.div>

          </div>

        </div>

      </div>

      {/* Clean Interactive Photo Gallery Modal (No walls of text) */}
      <AnimatePresence>
        {selectedFacility && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-neutral-950 text-white w-full max-w-4xl rounded-3xl border border-neutral-800 overflow-hidden shadow-2xl relative flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedFacility(null)}
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/70 text-white/90 hover:text-white hover:bg-[#2D37FB] transition-all cursor-pointer shadow-lg"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Main Active Image View with Next/Prev Arrows */}
              <div className="relative h-72 sm:h-96 md:h-[480px] w-full bg-black flex items-center justify-center overflow-hidden">
                <img 
                  src={selectedFacility.gallery[activeImageIndex]} 
                  alt={`${selectedFacility.title} - Foto ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                
                {/* Image Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/40 pointer-events-none" />

                {/* Left arrow */}
                {selectedFacility.gallery.length > 1 && (
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-[#2D37FB] text-white transition-all backdrop-blur-md cursor-pointer"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                {/* Right arrow */}
                {selectedFacility.gallery.length > 1 && (
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-[#2D37FB] text-white transition-all backdrop-blur-md cursor-pointer"
                    aria-label="Foto siguiente"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}

                {/* Bottom Overlay Title on Image */}
                <div className="absolute bottom-4 left-6 right-6 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#2D37FB] text-white text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1">
                      {selectedFacility.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight drop-shadow-md">
                      {selectedFacility.title}
                    </h3>
                  </div>

                  <span className="text-xs font-bold text-neutral-300 bg-black/60 px-3 py-1 rounded-full border border-white/10 shrink-0">
                    {activeImageIndex + 1} de {selectedFacility.gallery.length} fotos
                  </span>
                </div>
              </div>

              {/* Gallery Thumbnails Strip & Action Button */}
              <div className="p-4 sm:p-5 bg-neutral-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-neutral-800">
                {/* Thumbnails */}
                <div className="flex items-center space-x-3 overflow-x-auto py-1">
                  {selectedFacility.gallery.map((imgSrc, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#2D37FB] scale-105 shadow-md shadow-blue-900/40 ring-1 ring-blue-400'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={imgSrc} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Booking CTA */}
                <div className="flex items-center space-x-3 shrink-0">
                  <button
                    onClick={() => {
                      setSelectedFacility(null);
                      onNavigateToBooking();
                    }}
                    className="px-5 py-3 rounded-xl bg-[#2D37FB] hover:bg-[#271BA3] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center space-x-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Reservar Cancha</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
