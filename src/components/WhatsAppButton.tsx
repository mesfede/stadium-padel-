import { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show after scrolling a bit
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Show a quick tooltip after 5 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);

    // Hide tooltip after 10 seconds total
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 12000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const waUrl = 'https://wa.me/5492212264893?text=Hola%20Stadium%20P%C3%A1del!%20Quiero%20hacer%20una%20consulta%20general.';

  return (
    <div className="fixed bottom-22 md:bottom-6 right-4 md:right-6 z-30 flex flex-col items-end">
      
      {/* Tooltip speech bubble */}
      <AnimatePresence>
        {isVisible && showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-3.5 rounded-xl shadow-xl max-w-xs relative text-left"
          >
            {/* Close button for tooltip */}
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-1 right-1 p-0.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
              aria-label="Cerrar sugerencia"
            >
              <X className="w-3 h-3" />
            </button>
            
            <p className="text-xs font-bold text-neutral-800 dark:text-neutral-100 pr-3 leading-snug">
              ¿Tenés dudas sobre canchas o torneos?
            </p>
            <p className="text-[10px] text-neutral-500 mt-1">
              Escribinos directamente por WhatsApp y te contestamos al instante.
            </p>
            
            {/* Speech bubble down arrow indicator */}
            <div className="absolute right-4.5 -bottom-1.5 w-3 h-3 bg-white dark:bg-neutral-900 border-r border-b border-neutral-200 dark:border-neutral-800 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating circle button */}
      <AnimatePresence>
        {isVisible && (
          <motion.a
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-[1.05] relative group"
            aria-label="Escribinos por WhatsApp"
          >
            {/* Pulsing visual radial indicator to invite touch */}
            <span className="absolute -inset-1 rounded-full bg-emerald-600/30 animate-ping z-0" />
            
            <MessageSquare className="w-5.5 h-5.5 relative z-10" />

            {/* Label sliding on desktop hover */}
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out font-extrabold text-xs tracking-wider uppercase whitespace-nowrap hidden sm:inline relative z-10 pl-0 group-hover:pl-2">
              WhatsApp Stadium
            </span>
          </motion.a>
        )}
      </AnimatePresence>

    </div>
  );
}
