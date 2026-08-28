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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none py-0 md:py-3"
    >
      <div className="max-w-7xl mx-auto px-0 md:px-6 lg:px-8">
        <div className="flex items-center justify-center relative">
          
          {/* Master Container:
              - Mobile (max-md): drops from ceiling (top-cut), compact glass box where the logo fills the space.
              - Desktop (md+): elegant floating pill capsule with logo, navigation links, and Instagram button.
          */}
          <div className={`transition-all duration-300 pointer-events-auto inline-flex items-center justify-between md:justify-center ${
            isScrolled
              ? 'max-md:opacity-0 max-md:-translate-y-16 max-md:pointer-events-none max-md:scale-95 bg-white/90 backdrop-blur-md border-b border-x border-neutral-200/70 shadow-md rounded-b-2xl px-3 py-1 md:bg-white/90 md:backdrop-blur-xl md:rounded-full md:border md:border-neutral-200/80 md:shadow-lg md:shadow-neutral-950/10 md:px-6 md:py-1.5 md:gap-5 lg:gap-8'
              : 'opacity-100 translate-y-0 scale-100 bg-white/85 backdrop-blur-md border-b border-x border-white/70 shadow-xl shadow-black/10 rounded-b-2xl px-3 py-1 md:bg-white/80 md:backdrop-blur-xl md:rounded-full md:border md:border-white/60 md:shadow-xl md:shadow-black/10 md:px-7 md:py-2 md:gap-6 lg:gap-9'
          }`}>
            {/* Protagonist Logo with generous 3D vertical overflow effect */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center justify-center group focus:outline-none shrink-0 w-auto"
            >
              {!logoFailed ? (
                <img 
                  src={images.quentoLogo} 
                  alt="Stadium Padel Logo" 
                  className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 filter drop-shadow-md block ${
                    isScrolled 
                      ? 'h-16 sm:h-18 md:h-20 lg:h-22 max-w-[200px] sm:max-w-[230px] md:max-w-[200px] lg:max-w-[230px] -my-1 md:-my-4' 
                      : 'h-24 sm:h-28 md:h-32 lg:h-36 max-w-[260px] sm:max-w-[290px] md:max-w-[280px] lg:max-w-[320px] -my-0.5 sm:-my-1 md:-my-7 lg:-my-8'
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
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 shrink-0">
              {navLinks.map((link, idx) => (
                <div key={link.id} className="flex items-center">
                  {idx > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0089D8] mx-2 lg:mx-3 shrink-0" />
                  )}
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className={`text-neutral-800 hover:text-[#0089D8] hover:bg-neutral-100/70 px-3 py-1.5 rounded-full transition-all duration-200 font-bold tracking-tight cursor-pointer focus:outline-none whitespace-nowrap ${
                      isScrolled ? 'text-xs lg:text-[13.5px]' : 'text-sm lg:text-[15px]'
                    }`}
                  >
                    {link.name}
                  </button>
                </div>
              ))}
            </nav>

            {/* Instagram Action Button */}
            <div className="hidden md:flex items-center pl-2 shrink-0">
              <a
                href="https://www.instagram.com/padel_stadium"
                target="_blank"
                rel="noreferrer"
                className={`rounded-full bg-neutral-950 hover:bg-[#0089D8] text-white hover:scale-110 transition-all duration-200 shadow-md flex items-center justify-center group ${
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
