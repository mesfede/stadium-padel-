import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ChevronDown } from 'lucide-react';
import { images, videos } from '../assets';

interface HeroProps {
  onNavigateToBooking: () => void;
  onNavigateToExplore: () => void;
}

const SLIDES = [
  'RESERVA Y JUGÁ',
  '3 CANCHAS PROFESIONALES',
  'TU PASIÓN, TU CANCHA',
  'VIVI EL MEJOR PADEL'
];

export default function Hero({ onNavigateToBooking, onNavigateToExplore }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const titleVariants = {
    enter: {
      opacity: 0,
      x: 280,
      skewX: -18,
      scaleX: 1.2,
      filter: 'blur(20px)',
    },
    center: {
      opacity: 1,
      x: 0,
      skewX: 0,
      scaleX: 1,
      filter: 'blur(0px)',
      transition: {
        x: { ease: [0.16, 1, 0.3, 1], duration: 0.38 },
        opacity: { duration: 0.25 },
        skewX: { ease: [0.16, 1, 0.3, 1], duration: 0.32 },
        scaleX: { ease: [0.16, 1, 0.3, 1], duration: 0.32 },
        filter: { duration: 0.28 }
      }
    },
    exit: {
      opacity: 0,
      x: -280,
      skewX: 18,
      scaleX: 1.25,
      filter: 'blur(22px)',
      transition: {
        x: { ease: [0.7, 0, 0.84, 0], duration: 0.3 },
        opacity: { duration: 0.2 },
        skewX: { duration: 0.25 },
        scaleX: { duration: 0.25 },
        filter: { duration: 0.22 }
      }
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-neutral-950 pt-20 pb-12">
      {/* Background Video with Poster Fallback */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={images.quentoCanchaOk}
          className="w-full h-full object-cover opacity-85 scale-105"
        >
          {/* Main requested video */}
          <source src={videos.heroVideo} type="video/mp4" />
          {/* Fallback back up stream */}
          <source src="https://player.vimeo.com/external/494252666.hd.mp4?s=2b1464c2f42a59f5165dc6dfcf7e33e9b08b3e8e&profile_id=170&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        
        {/* Layer of contrast/overlay - softer to keep video bright and clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-neutral-950/20 z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white -mt-16 sm:mt-6 md:mt-10 flex flex-col items-center justify-center">
        {/* Dynamic Slide Container - Unmasked, sporty, fits in max 2 lines */}
        <div className="min-h-[72px] sm:min-h-[130px] md:min-h-[150px] flex items-center justify-center w-full relative px-2">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentSlide}
              variants={titleVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="font-display font-black text-[2.25rem] xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] uppercase tracking-tight max-w-4xl text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
            >
              {SLIDES[currentSlide]}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Fixed bajada / Subtitle debajo de cada título */}
        <div className="max-w-2xl mt-1.5 sm:mt-4 px-2">
          <p className="text-[13.5px] sm:text-base md:text-lg text-neutral-200 font-medium tracking-wide leading-relaxed drop-shadow">
            Disfrutá del mejor pádel en Stadium Pádel. 3 canchas de primer nivel, disponibilidad inmediata y un ambiente inmejorable.
          </p>
        </div>
      </div>

      {/* Floating Scroll Indicator with Bouncing Tennis / Padel Ball */}
      <div 
        className="absolute bottom-44 sm:bottom-12 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer group"
        onClick={onNavigateToExplore}
      >
        <span className="text-[10px] sm:text-xs text-neutral-300 group-hover:text-white font-black tracking-[0.25em] uppercase mb-2 drop-shadow">
          Deslizar
        </span>
        
        {/* Tennis / Padel Bouncing Ball */}
        <div className="relative w-7 h-10 flex flex-col items-center justify-start">
          <motion.div
            animate={{ 
              y: [0, 18, 2, 18, 0],
              scaleY: [1, 0.7, 1.05, 0.75, 1],
              scaleX: [1, 1.25, 0.95, 1.2, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.4,
              ease: "easeInOut"
            }}
            className="w-4 h-4 rounded-full bg-[#ccff00] border border-lime-300 shadow-lg shadow-lime-400/50 flex items-center justify-center relative overflow-hidden"
          >
            {/* Padel / Tennis Ball Curved Seam */}
            <div className="absolute inset-0 border border-white/60 rounded-full scale-110 -rotate-45 opacity-80" />
            <div className="w-1 h-1 rounded-full bg-white/50" />
          </motion.div>
          
          {/* Subtle Ground Shadow */}
          <motion.div
            animate={{
              scale: [0.4, 1.1, 0.5, 1, 0.4],
              opacity: [0.2, 0.7, 0.3, 0.6, 0.2]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
              ease: "easeInOut"
            }}
            className="w-3.5 h-1 bg-black/80 rounded-full blur-[1px] mt-auto"
          />
        </div>
      </div>
    </section>
  );
}
