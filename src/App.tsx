import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BookingSystem from './components/BookingSystem';
import ElClub from './components/ElClub';
import Actividades from './components/Actividades';
import Footer from './components/Footer';
import MobileStickyBar from './components/MobileStickyBar';

export default function App() {
  // Smooth scroll helper
  const navigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavigateToBooking = () => {
    navigateToSection('reservas');
  };

  useEffect(() => {
    // Dynamic Dark/Light Theme Support based on system preferences, but default to light for main UI
    // while keeping the header, hero, and facilities premium dark blocks for high sports atmosphere.
    document.documentElement.classList.add('light');
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 antialiased selection:bg-[#2D37FB] selection:text-white overflow-x-hidden">
      {/* 1. Header Navigation with simplified link list */}
      <Header
        onNavigateToBooking={handleNavigateToBooking}
        onNavigateToSection={navigateToSection}
      />

      {/* 2. Hero Presentation Block with custom fast blurred title slider */}
      <Hero
        onNavigateToBooking={handleNavigateToBooking}
        onNavigateToExplore={() => navigateToSection('el-club')}
      />

      {/* 3. Main Multi-step Booking Scheduler (Reservas) */}
      <BookingSystem />

      {/* 4. Unified El Club Section (courts, installations & lounge sum) */}
      <ElClub onNavigateToBooking={handleNavigateToBooking} />

      {/* 5. Torneos y Clases (activities & tournaments) */}
      <Actividades />

      {/* 6. Structured Footer with integrated Location, Map & Contact */}
      <Footer
        onNavigateToBooking={handleNavigateToBooking}
        onNavigateToSection={navigateToSection}
      />

      {/* 7. Smartphone Sticky Quick CTA Bar */}
      <MobileStickyBar onNavigateToBooking={handleNavigateToBooking} />
    </div>
  );
}
