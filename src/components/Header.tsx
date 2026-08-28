import { useState, useEffect } from 'react';
import { Instagram } from 'lucide-react';
import { images } from '../assets';

interface HeaderProps {
  onNavigateToBooking: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export default function Header({ onNavigateToSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'El Club', id: 'el-club' },
    { name: 'Reservas', id: 'reservas' },
    { name: 'Torneos y clases', id: 'torneos' },
    { name: 'Contacto', id: 'contacto' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigateToSection(id);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none py-2 sm:py-3"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center relative">
          
          {/* Centered Master Group with local glassy background scoped around content */}
          <div className={`transition-all duration-300 rounded-2xl sm:rounded-full px-4 sm:px-6 py-0.5 sm:py-1 shadow-lg border border-white/40 md:gap-4 lg:gap-6 ${
            isScrolled
              ? 'max-md:opacity-0 max-md:-translate-y-12 max-md:pointer-events-none max-md:scale-95 pointer-events-auto inline-flex items-center justify-center bg-white/75 backdrop-blur-xl border-neutral-200/60 shadow-neutral-900/10'
              : 'pointer-events-auto inline-flex items-center justify-center opacity-100 translate-y-0 scale-100 bg-white/65 backdrop-blur-lg border-white/50 shadow-black/10'
          }`}>
            {/* Protagonist Larger Logo with responsive scale and elegant 3D vertical overflow */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center justify-center group focus:outline-none py-0 shrink-0"
            >
              {!logoFailed ? (
                <img 
                  src={images.quentoLogo} 
                  alt="Stadium Padel Logo" 
                  className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 filter drop-shadow-sm block ${
                    isScrolled 
                      ? 'h-14 sm:h-16 md:h-18 max-w-[150px] sm:max-w-[180px] -my-3' 
                      : 'h-24 sm:h-28 md:h-34 max-w-[210px] sm:max-w-[260px] -my-6 sm:-my-8'
                  }`}
                  referrerPolicy="no-referrer"
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <div className={`rounded-xl bg-[#2D37FB] flex items-center justify-center overflow-hidden shadow-md shadow-blue-900/40 transition-all ${
                    isScrolled ? 'w-8 h-8' : 'w-10 h-10'
                  }`}>
                    <span className="font-display font-black text-white text-xl tracking-tight">S</span>
                  </div>
                  <span className="font-display font-black text-neutral-950 text-xl tracking-wider">
                    STADIUM
                  </span>
                </div>
              )}
            </a>

            {/* Desktop Navigation - Glassy buttons with subtle blue dot separators */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link, idx) => (
                <div key={link.id} className="flex items-center">
                  {idx > 0 && (
                    <span className="w-1 h-1 rounded-full bg-[#2D37FB]/80 mx-2 shrink-0" />
                  )}
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className={`text-neutral-800 hover:text-[#2D37FB] hover:bg-neutral-100/50 px-3 py-1 rounded-full transition-all duration-200 font-extrabold tracking-tight cursor-pointer focus:outline-none relative ${
                      isScrolled ? 'text-xs lg:text-[13px]' : 'text-[13.5px] lg:text-[14.5px]'
                    }`}
                  >
                    {link.name}
                  </button>
                </div>
              ))}
            </nav>

            {/* Instagram Action Button */}
            <div className="hidden md:flex items-center pl-1">
              <a
                href="https://www.instagram.com/padel_stadium"
                target="_blank"
                rel="noreferrer"
                className={`rounded-full bg-neutral-950 hover:bg-[#2D37FB] text-white hover:scale-110 transition-all duration-200 shadow-md flex items-center justify-center group ${
                  isScrolled ? 'p-1.5' : 'p-2'
                }`}
                aria-label="Instagram de Stadium Padel"
                title="Seguinos en Instagram"
              >
                <Instagram className={`transition-transform group-hover:rotate-6 ${isScrolled ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
