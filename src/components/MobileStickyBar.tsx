import { useState, useEffect } from 'react';
import { Home, Calendar, Trophy, MapPin, Shield } from 'lucide-react';
import { motion } from 'motion/react';

interface MobileStickyBarProps {
  onNavigateToBooking: () => void;
}

export default function MobileStickyBar({ onNavigateToBooking }: MobileStickyBarProps) {
  const [activeTab, setActiveTab] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'reservas', 'el-club', 'torneos', 'contacto'];
      const scrollPos = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (sectionId: string) => {
    setActiveTab(sectionId);
    if (sectionId === 'reservas') {
      onNavigateToBooking();
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden pointer-events-auto">
      {/* Native App Floating Dock with Safe Area */}
      <div className="mx-auto max-w-lg px-3 pb-3 pt-1">
        <nav 
          role="navigation"
          aria-label="Navegación Móvil"
          className="bg-neutral-950/90 backdrop-blur-2xl border border-white/15 rounded-3xl py-2 px-3 flex items-center justify-around shadow-[0_-8px_30px_rgba(0,0,0,0.6)]"
        >
          
          {/* Tab 1: Inicio */}
          <button
            onClick={() => handleTabClick('inicio')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all cursor-pointer ${
              activeTab === 'inicio' ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Home className={`w-5 h-5 transition-transform ${activeTab === 'inicio' ? 'scale-110 text-[#2D37FB]' : ''}`} />
            <span className="text-[10px] font-black uppercase tracking-tight mt-1">Inicio</span>
            {activeTab === 'inicio' && (
              <motion.div layoutId="appTabDot" className="w-1 h-1 rounded-full bg-[#2D37FB] mt-0.5" />
            )}
          </button>

          {/* Tab 2: Club (Escudo) */}
          <button
            onClick={() => handleTabClick('el-club')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all cursor-pointer ${
              activeTab === 'el-club' ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Shield className={`w-5 h-5 transition-transform ${activeTab === 'el-club' ? 'scale-110 text-[#2D37FB]' : ''}`} />
            <span className="text-[10px] font-black uppercase tracking-tight mt-1">Club</span>
            {activeTab === 'el-club' && (
              <motion.div layoutId="appTabDot" className="w-1 h-1 rounded-full bg-[#2D37FB] mt-0.5" />
            )}
          </button>

          {/* Center Action Tab: RESERVAR (Floating App Center Button) */}
          <button
            onClick={() => handleTabClick('reservas')}
            className="flex flex-col items-center -mt-6 group focus:outline-none cursor-pointer"
          >
            <div className="w-13 h-13 rounded-full bg-[#2D37FB] hover:bg-[#271BA3] text-white flex items-center justify-center shadow-lg shadow-blue-950/80 border-3 border-neutral-950 transition-all transform group-active:scale-95 group-hover:scale-105 ring-2 ring-blue-500/40">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-white mt-1">Reservar</span>
          </button>

          {/* Tab 4: Torneos */}
          <button
            onClick={() => handleTabClick('torneos')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all cursor-pointer ${
              activeTab === 'torneos' ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Trophy className={`w-5 h-5 transition-transform ${activeTab === 'torneos' ? 'scale-110 text-[#2D37FB]' : ''}`} />
            <span className="text-[10px] font-black uppercase tracking-tight mt-1">Torneos</span>
            {activeTab === 'torneos' && (
              <motion.div layoutId="appTabDot" className="w-1 h-1 rounded-full bg-[#2D37FB] mt-0.5" />
            )}
          </button>

          {/* Tab 5: Ubicación / Llegar */}
          <button
            onClick={() => handleTabClick('contacto')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all cursor-pointer ${
              activeTab === 'contacto' ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <MapPin className={`w-5 h-5 transition-transform ${activeTab === 'contacto' ? 'scale-110 text-[#2D37FB]' : ''}`} />
            <span className="text-[10px] font-black uppercase tracking-tight mt-1">Llegar</span>
            {activeTab === 'contacto' && (
              <motion.div layoutId="appTabDot" className="w-1 h-1 rounded-full bg-[#2D37FB] mt-0.5" />
            )}
          </button>

        </nav>
      </div>
    </div>
  );
}
