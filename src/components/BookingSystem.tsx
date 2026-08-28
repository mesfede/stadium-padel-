import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, MapPin, Clock, Check, ArrowLeft, Ticket, CalendarCheck, AlertCircle, Trash2, X } from 'lucide-react';
import { courts } from '../data/mockData';
import { Court, Booking } from '../types';
import fondoReservas from '../assets/images/fondo_reservas.jpg';

export default function BookingSystem() {
  // States
  const [selectedDateStr, setSelectedDateStr] = useState<string>('');
  const [selectedDateLabel, setSelectedDateLabel] = useState<string>('');
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Custom interactive calendar modal state
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  
  // Checkout Form steps
  const [checkoutStep, setCheckoutStep] = useState<'selection' | 'form' | 'success'>('selection');
  const [showMyBookings, setShowMyBookings] = useState(false);
  
  // User info
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<Booking | null>(null);

  // Active bookings list
  const [myBookings, setMyBookings] = useState<Booking[]>([]);

  // Generate 8 days starting today (first 5 shown on mobile, all 8 on desktop)
  const [calendarDays, setCalendarDays] = useState<{ dayName: string; dayNum: string; dateStr: string; fullLabel: string }[]>([]);

  useEffect(() => {
    const dates = [];
    const daysEs = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
    
    for (let i = 0; i < 8; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dayName = daysEs[d.getDay()];
      const dayNum = String(d.getDate()).padStart(2, '0');
      
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const dayStr = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${dayStr}`;
      
      const fullLabel = d.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
      dates.push({ dayName, dayNum, dateStr, fullLabel });
    }
    
    setCalendarDays(dates);
    // Select first day by default
    setSelectedDateStr(dates[0].dateStr);
    setSelectedDateLabel(dates[0].fullLabel);
    // Do NOT select court by default so user picks one
    setSelectedCourt(null);

    // Load existing bookings from local storage
    const saved = localStorage.getItem('stadium_bookings');
    if (saved) {
      try {
        setMyBookings(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Time slots every 1.5 hours from 09:00 to 22:30
  const TIME_SLOTS = [
    '09:00',
    '10:30',
    '12:00',
    '13:30',
    '15:00',
    '16:30',
    '18:00',
    '19:30',
    '21:00',
    '22:30'
  ];

  // Helper to generate slot states deterministically
  const getSlotState = (time: string, date: string, courtId: string) => {
    const hasActiveUserBooking = myBookings.some(
      (b) => b.date === date && b.timeSlot === time && b.courtId === courtId
    );
    if (hasActiveUserBooking) {
      return 'reservado';
    }

    const seedString = `${time}-${date}-${courtId}`;
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
      hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
    }
    const score = Math.abs(hash) % 100;

    // 25% are reserved, 10% fixed monthly, 65% available
    if (score < 25) return 'reservado';
    if (score >= 25 && score < 35) return 'fijo mensual';
    return 'disponible';
  };

  const getAvailableSlotsCount = (date: string, courtId: string) => {
    return TIME_SLOTS.filter(
      (time) => getSlotState(time, date, courtId) === 'disponible'
    ).length;
  };

  const handleDateSelect = (dateStr: string, label: string) => {
    setSelectedDateStr(dateStr);
    setSelectedDateLabel(label);
    setSelectedTime(''); // Reset time selection on date change
  };

  const handleFullCalendarSelect = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const fullLabel = date.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
    
    setSelectedDateStr(dateStr);
    setSelectedDateLabel(fullLabel);
    setShowFullCalendar(false);
    setSelectedTime('');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setCheckoutStep('form');
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim()) {
      setErrorMsg('Por favor completá tu nombre y teléfono.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    if (!selectedCourt) return;

    // Generate WhatsApp direct confirmation link
    const whatsappMsg = `¡Hola Stadium Pádel! Quiero confirmar mi reserva de cancha:
🎾 Cancha: ${selectedCourt.name} (Techada)
📅 Día: ${selectedDateLabel}
⏰ Horario: ${selectedTime} hs
👤 Nombre: ${userName.trim()}
📱 Teléfono: ${userPhone.trim()}`;

    const whatsappUrl = `https://wa.me/5492212264893?text=${encodeURIComponent(whatsappMsg)}`;

    setTimeout(() => {
      const newBooking: Booking = {
        id: 'BK-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        courtId: selectedCourt.id,
        courtName: selectedCourt.name,
        date: selectedDateStr,
        dateFormatted: selectedDateLabel,
        timeSlot: selectedTime,
        userName: userName.trim(),
        userEmail: '',
        userPhone: userPhone.trim(),
        totalPrice: selectedCourt.priceHour,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      const updated = [newBooking, ...myBookings];
      setMyBookings(updated);
      localStorage.setItem('stadium_bookings', JSON.stringify(updated));

      setBookingResult(newBooking);
      setIsSubmitting(false);
      setCheckoutStep('success');

      // Open WhatsApp automatically
      try {
        window.open(whatsappUrl, '_blank');
      } catch (err) {
        console.error('Could not auto-open WhatsApp:', err);
      }
    }, 600);
  };

  const handleCancelBooking = (bookingId: string) => {
    const updated = myBookings.filter(b => b.id !== bookingId);
    setMyBookings(updated);
    localStorage.setItem('stadium_bookings', JSON.stringify(updated));
  };

  const getFormattedDateTitle = (dateStr: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    return dateObj.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  const generateMonthGrid = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startDayOfWeek = firstDay.getDay(); // 0 = Sunday
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const grid = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      grid.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      grid.push(new Date(currentYear, currentMonth, day));
    }
    return grid;
  };

  return (
    <section 
      id="reservas" 
      className="relative py-20 sm:py-28 text-white scroll-mt-20 overflow-hidden bg-neutral-950"
    >
      {/* Background photo with enhanced visibility */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${fondoReservas})`,
        }}
      />
      {/* Soft gradient transitions */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/65 via-neutral-950/20 to-neutral-950/75 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight leading-none italic drop-shadow-md">
            <span className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">RESERVÁ TU </span>
            <span className="text-[#2D37FB] drop-shadow-[0_4px_12px_rgba(45,55,251,0.4)]">CANCHA</span>
          </h2>
          <p className="mt-3.5 text-sm sm:text-base md:text-lg text-neutral-100 font-bold drop-shadow">
            Elegí el día, seleccioná tu cancha y reservá tu horario al instante.
          </p>
        </div>

        {/* Stack of Glass Cards */}
        <div className="space-y-6 sm:space-y-8">
          
          {/* 1. ELEGÍ EL DÍA (Glass Card) */}
          <div className="w-full bg-neutral-950/40 backdrop-blur-md p-4 sm:p-6 md:p-7 rounded-3xl border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between gap-2 mb-4 sm:mb-5">
              <div className="flex items-center space-x-1.5 sm:space-x-2 min-w-0">
                <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2D37FB] shrink-0" />
                <h3 className="text-xs sm:text-base md:text-lg font-display font-black italic uppercase tracking-wider text-white whitespace-nowrap">
                  1. ELEGÍ EL DÍA
                </h3>
              </div>

              {/* Single-line Ver Calendario trigger */}
              <button
                onClick={() => setShowFullCalendar(!showFullCalendar)}
                className="inline-flex items-center text-[10px] sm:text-xs font-black uppercase tracking-wider text-white hover:bg-[#2D37FB] transition-all bg-neutral-950 px-3 py-1.5 rounded-full border border-white/15 shadow-sm cursor-pointer whitespace-nowrap shrink-0"
              >
                <CalendarIcon className="w-3 h-3 mr-1 text-[#2D37FB]" />
                <span>{showFullCalendar ? 'Cerrar' : 'VER CALENDARIO'}</span>
              </button>
            </div>

            {/* Full Interactive Calendar Modal Overlay */}
            <AnimatePresence>
              {showFullCalendar && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden bg-neutral-950/95 border border-white/20 rounded-2xl p-4 sm:p-5 mb-5 shadow-2xl"
                >
                  <div className="flex justify-between items-center mb-3 border-b border-neutral-800 pb-2">
                    <span className="text-[11px] sm:text-xs font-black uppercase text-neutral-400">
                      Seleccioná cualquier día del mes
                    </span>
                    <button
                      onClick={() => setShowFullCalendar(false)}
                      className="text-xs font-bold text-neutral-400 hover:text-white"
                    >
                      Cerrar [x]
                    </button>
                  </div>

                  {/* Month header */}
                  <div className="text-center font-bold text-xs sm:text-sm text-white mb-2.5 uppercase tracking-wide">
                    {new Date().toLocaleString('es-AR', { month: 'long', year: 'numeric' })}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] sm:text-xs font-bold mb-1.5">
                    {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(d => (
                      <div key={d} className="py-1 text-neutral-400">{d}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                    {generateMonthGrid().map((day, idx) => {
                      if (!day) return <div key={`empty-${idx}`} />;
                      
                      const isPast = day < new Date(new Date().setHours(0,0,0,0));
                      const isSelected = selectedDateStr === `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
                      
                      return (
                        <button
                          key={`day-${idx}`}
                          disabled={isPast}
                          onClick={() => handleFullCalendarSelect(day)}
                          className={`py-2 rounded-lg text-center font-bold text-xs transition-all ${
                            isPast 
                              ? 'text-neutral-700 cursor-not-allowed'
                              : isSelected
                              ? 'bg-[#2D37FB] text-white font-black shadow-md shadow-blue-900/40'
                              : 'hover:bg-neutral-800 text-neutral-300'
                          }`}
                        >
                          {day.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Days Grid: 5 days on Mobile, 8 days on Desktop */}
            <div className="grid grid-cols-5 md:grid-cols-8 gap-1.5 sm:gap-2.5 lg:gap-3 max-w-5xl mx-auto">
              {calendarDays.map((item, index) => {
                const isSelected = selectedDateStr === item.dateStr;
                const isExtraForDesktop = index >= 5;
                return (
                  <button
                    key={item.dateStr}
                    onClick={() => handleDateSelect(item.dateStr, item.fullLabel)}
                    className={`${isExtraForDesktop ? 'hidden md:flex' : 'flex'} flex-col items-center justify-center py-2.5 sm:py-3.5 lg:py-4 px-1 sm:px-2 rounded-2xl border text-center transition-all cursor-pointer min-h-[66px] sm:min-h-[84px] lg:min-h-[92px] ${
                      isSelected
                        ? 'bg-[#2D37FB] text-white border-blue-400/60 shadow-xl shadow-blue-950/70 scale-[1.04]'
                        : 'bg-[#cbd5e1]/90 hover:bg-white border-white/40 text-neutral-900 shadow-sm hover:scale-[1.02]'
                    }`}
                  >
                    <span className={`text-[10px] sm:text-xs uppercase font-black tracking-wide leading-none ${isSelected ? 'text-blue-100' : 'text-neutral-700'}`}>
                      {item.dayName}
                    </span>
                    <span className={`text-lg sm:text-2xl lg:text-3xl font-display font-black mt-1 leading-none ${isSelected ? 'text-white' : 'text-neutral-950'}`}>
                      {item.dayNum}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. ELEGÍ LA CANCHA (Glass Card - 2 Rows on Mobile: 1,2,3 & 4,5,6 / 1 Row of 6 on Desktop) */}
          <div className="w-full bg-neutral-950/40 backdrop-blur-md p-4 sm:p-6 md:p-7 rounded-3xl border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between gap-2 mb-5">
              <div className="flex items-center space-x-1.5 sm:space-x-2 min-w-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#2D37FB] shrink-0" />
                <h3 className="text-xs sm:text-base md:text-lg font-display font-black italic uppercase tracking-wider text-white whitespace-nowrap">
                  2. ELEGÍ LA CANCHA
                </h3>
              </div>

              {/* Status Pill Badge - Hidden on mobile as requested */}
              <div className="hidden sm:flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/95 text-neutral-950 text-[9px] sm:text-[10px] font-black uppercase shadow-sm whitespace-nowrap shrink-0">
                <span className="flex items-center text-neutral-900">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                  LIBRES
                </span>
                <span className="text-neutral-300 font-light">|</span>
                <span className="text-neutral-500 font-bold">COMPLETA</span>
              </div>
            </div>

            {/* 3 Courts: Full-width layout spanning 100% of container width, with horizontal pleno + photo card design */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 w-full">
              {courts.map((court, idx) => {
                const isSelected = selectedCourt?.id === court.id;
                const courtNum = idx + 1;
                const availableCount = getAvailableSlotsCount(selectedDateStr, court.id);

                return (
                  <button
                    key={court.id}
                    onClick={() => {
                      setSelectedCourt(court);
                      setSelectedTime('');
                    }}
                    className={`group/btn w-full rounded-2xl border text-left transition-all cursor-pointer shadow-lg overflow-hidden flex flex-row items-stretch h-24 sm:h-28 md:h-32 relative ${
                      isSelected
                        ? 'border-[#2D37FB] ring-2 ring-[#2D37FB]/70 shadow-2xl shadow-blue-950/60 scale-[1.02] -translate-y-0.5'
                        : 'border-white/20 hover:border-white/50 bg-neutral-900/80 hover:bg-neutral-800/90 shadow-md hover:scale-[1.01]'
                    }`}
                  >
                    {/* Left: Pleno con número y datos de cancha */}
                    <div className={`w-[48%] sm:w-[45%] p-2.5 sm:p-3.5 flex flex-col justify-between items-start transition-colors duration-300 shrink-0 z-10 ${
                      isSelected
                        ? 'bg-[#2D37FB] text-white'
                        : 'bg-neutral-950/90 text-white group-hover/btn:bg-neutral-900'
                    }`}>
                      <div className="flex items-center space-x-1.5">
                        <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest leading-none ${
                          isSelected ? 'text-blue-100' : 'text-[#2D37FB]'
                        }`}>
                          CANCHA
                        </span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        )}
                      </div>

                      {/* Big Court Number */}
                      <div className="my-auto flex items-baseline space-x-1">
                        <span className="font-display font-black text-3xl sm:text-4xl md:text-5xl leading-none tracking-tight">
                          {courtNum}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-bold text-neutral-400 block uppercase">
                          Techada
                        </span>
                      </div>

                      {/* Availability status badge */}
                      <div className="w-full">
                        <span className={`inline-flex items-center text-[9px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-md ${
                          isSelected 
                            ? 'bg-white/20 text-white backdrop-blur-sm' 
                            : availableCount > 0 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            isSelected ? 'bg-white' : availableCount > 0 ? 'bg-emerald-400' : 'bg-red-400'
                          }`} />
                          {availableCount} {availableCount === 1 ? 'libre' : 'libres'}
                        </span>
                      </div>
                    </div>

                    {/* Right: Court Image with gradient overlay and subtle zoom on hover */}
                    <div className="relative w-[52%] sm:w-[55%] h-full overflow-hidden bg-neutral-950">
                      <img 
                        src={court.image} 
                        alt={court.name}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/btn:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      {/* Gradient overlay transitioning seamlessly from left to right */}
                      <div className={`absolute inset-0 transition-opacity duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#2D37FB]/40 via-transparent to-black/40'
                          : 'bg-gradient-to-r from-neutral-950/80 via-transparent to-black/30'
                      }`} />

                      {/* Subtle Glass Tag on image */}
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[8px] sm:text-[9px] font-bold text-neutral-200 border border-white/10 uppercase tracking-wider">
                        Blindex
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. HORARIOS DISPONIBLES (Compact & Structured Glass Card) */}
          <AnimatePresence>
            {selectedDateStr && selectedCourt ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="w-full bg-neutral-950/40 backdrop-blur-md p-4 sm:p-6 md:p-7 rounded-3xl border border-white/20 shadow-2xl"
              >
                <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#2D37FB]" />
                    <h3 className="text-sm sm:text-base md:text-lg font-display font-black italic uppercase tracking-wider text-white">
                      3. HORARIOS - CANCHA {courts.findIndex(c => c.id === selectedCourt.id) + 1}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-wider bg-black/40 px-3 py-1 rounded-full border border-white/10 self-start sm:self-auto">
                    <span className="flex items-center text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1" /> Libre
                    </span>
                    <span className="flex items-center text-neutral-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 mr-1" /> Ocupado
                    </span>
                    <span className="flex items-center text-amber-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1" /> Fijo
                    </span>
                  </div>
                </div>

                {/* Structured Compact Grid of Time Slots */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-2.5">
                  {TIME_SLOTS.map((time) => {
                    const slotState = getSlotState(time, selectedDateStr, selectedCourt.id);
                    const isSelected = selectedTime === time;

                    if (slotState === 'reservado') {
                      return (
                        <div
                          key={time}
                          className="bg-black/40 py-2.5 px-2 rounded-xl border border-white/5 text-center cursor-not-allowed opacity-35"
                        >
                          <span className="block text-xs sm:text-sm font-black text-neutral-400">{time} hs</span>
                          <span className="block text-[8px] font-bold uppercase text-neutral-500 mt-0.5">
                            Ocupado
                          </span>
                        </div>
                      );
                    }

                    if (slotState === 'fijo mensual') {
                      return (
                        <div
                          key={time}
                          className="bg-amber-950/30 py-2.5 px-2 rounded-xl border border-amber-600/40 text-center cursor-not-allowed opacity-55"
                        >
                          <span className="block text-xs sm:text-sm font-black text-amber-400">{time} hs</span>
                          <span className="block text-[8px] font-black uppercase text-amber-400 mt-0.5 tracking-tight">
                            Fijo
                          </span>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`py-2.5 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#2D37FB] text-white border-blue-400 shadow-md shadow-blue-950/60 scale-105'
                            : 'bg-emerald-900/30 hover:bg-emerald-800/50 border-emerald-400/40 hover:border-emerald-400 text-white shadow-sm hover:scale-[1.02]'
                        }`}
                      >
                        <span className="block text-xs sm:text-sm font-black">{time} hs</span>
                        <span className="block text-[8px] sm:text-[9px] font-black uppercase mt-0.5 tracking-tight text-emerald-300">
                          Libre
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

        </div>

      </div>

      {/* Checkout Form Modal / Popup */}
      <AnimatePresence>
        {checkoutStep === 'form' && selectedCourt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-neutral-950 text-white w-full max-w-lg rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => setCheckoutStep('selection')}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-base font-black uppercase tracking-wider text-[#2D37FB] mb-4 flex items-center">
                <Ticket className="w-5 h-5 mr-2" />
                CONFIRMÁ TU RESERVA
              </h3>

              {/* Summary details */}
              <div className="bg-neutral-900/90 border border-neutral-800 p-4 rounded-xl mb-6 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Cancha:</span>
                  <span className="font-bold text-white">Cancha {courts.findIndex(c => c.id === selectedCourt.id) + 1} (100% Cubierta)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Fecha:</span>
                  <span className="font-bold text-white">{selectedDateLabel}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Horario:</span>
                  <span className="font-bold text-[#2D37FB]">{selectedTime} hs (90 minutos)</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-neutral-800">
                  <span className="text-neutral-400">Total a pagar:</span>
                  <span className="font-black text-sm text-emerald-400">${selectedCourt.priceHour.toLocaleString('es-AR')}</span>
                </div>
              </div>

              {/* Form inputs */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#2D37FB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="Ej. 221 604-9987"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#2D37FB]"
                  />
                  <p className="text-[11px] text-neutral-400 mt-1.5 font-medium">
                    Al confirmar, se abrirá WhatsApp automáticamente con los datos de tu reserva para que el club te la confirme.
                  </p>
                </div>

                {errorMsg && (
                  <div className="text-xs font-bold text-red-400 bg-red-950/40 p-3 rounded-lg border border-red-800 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <div className="pt-2 flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('selection')}
                    className="w-1/3 py-3.5 rounded-xl border border-neutral-700 text-xs font-bold uppercase text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Volver
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-2/3 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-neutral-950 text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>{isSubmitting ? 'Generando...' : 'Reservar por WhatsApp'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {checkoutStep === 'success' && bookingResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-neutral-950 text-white w-full max-w-md rounded-3xl border border-emerald-500/50 p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
                <Check className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-display font-black uppercase tracking-tight text-white mb-1">
                ¡Solicitud de Reserva Lista!
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Te enviamos a WhatsApp para la confirmación inmediata. Código: <span className="font-mono font-bold text-white">{bookingResult.id}</span>
              </p>

              <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 text-xs text-left space-y-2 mb-6">
                <p><span className="text-neutral-400">Titular:</span> <span className="font-bold text-white">{bookingResult.userName}</span></p>
                <p><span className="text-neutral-400">Teléfono:</span> <span className="font-bold text-white">{bookingResult.userPhone}</span></p>
                <p><span className="text-neutral-400">Día:</span> <span className="font-bold text-white">{bookingResult.dateFormatted}</span></p>
                <p><span className="text-neutral-400">Horario:</span> <span className="font-bold text-[#2D37FB]">{bookingResult.timeSlot} hs</span></p>
                <p><span className="text-neutral-400">Cancha:</span> <span className="font-bold text-white">{bookingResult.courtName} (Techada)</span></p>
              </div>

              <div className="space-y-3">
                <a
                  href={`https://wa.me/5492212264893?text=${encodeURIComponent(`¡Hola Stadium Pádel! Quiero confirmar mi reserva de cancha:
🎾 Cancha: ${bookingResult.courtName} (Techada)
📅 Día: ${bookingResult.dateFormatted}
⏰ Horario: ${bookingResult.timeSlot} hs
👤 Nombre: ${bookingResult.userName}
📱 Teléfono: ${bookingResult.userPhone}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-neutral-950 text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center shadow-lg cursor-pointer"
                >
                  Reabrir mensaje de WhatsApp
                </a>

                <button
                  onClick={() => {
                    setCheckoutStep('selection');
                    setSelectedTime('');
                  }}
                  className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Volver al inicio
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* My Active Bookings Modal */}
      <AnimatePresence>
        {showMyBookings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-neutral-950 text-white w-full max-w-lg rounded-3xl border border-neutral-800 p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowMyBookings(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-base font-black uppercase tracking-wider text-[#2D37FB] mb-6 flex items-center">
                <CalendarCheck className="w-5 h-5 mr-2" />
                MIS RESERVAS ({myBookings.length})
              </h3>

              {myBookings.length === 0 ? (
                <p className="text-xs text-neutral-400 text-center py-8">
                  No tenés reservas guardadas en este dispositivo.
                </p>
              ) : (
                <div className="space-y-3">
                  {myBookings.map((b) => (
                    <div key={b.id} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex justify-between items-center">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-bold text-sm text-white">{b.courtName}</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold">
                            {b.timeSlot} hs
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400">{b.dateFormatted}</p>
                      </div>

                      <button
                        onClick={() => handleCancelBooking(b.id)}
                        className="p-2 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition-colors"
                        title="Cancelar reserva"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
