import { Court, ClubActivity, ClubInstallation } from '../types';
import { images } from '../assets';

export const courts: Court[] = [
  {
    id: 'court-1',
    name: 'Cancha 1 (Techada)',
    type: 'covered',
    surface: 'carpet',
    hasGlassWalls: true,
    hasLighting: true,
    priceHour: 12000,
    image: images.quentoCanchaOk,
    features: ['Estructura techada', 'Césped azul premium', 'Blindex templado', 'Iluminación LED de alta potencia']
  },
  {
    id: 'court-2',
    name: 'Cancha 2 (Techada)',
    type: 'covered',
    surface: 'carpet',
    hasGlassWalls: true,
    hasLighting: true,
    priceHour: 12000,
    image: images.complejo2,
    features: ['Estructura techada', 'Césped azul premium', 'Blindex templado', 'Iluminación LED de alta potencia']
  },
  {
    id: 'court-3',
    name: 'Cancha 3 (Techada)',
    type: 'covered',
    surface: 'carpet',
    hasGlassWalls: true,
    hasLighting: true,
    priceHour: 12000,
    image: images.stadiumCancha3,
    features: ['Estructura techada', 'Césped azul premium', 'Blindex templado', 'Iluminación LED de alta potencia']
  }
];

export const clubInstallations: ClubInstallation[] = [
  {
    id: 'inst-1',
    title: 'Showroom y Pro-Shop',
    description: 'Nuestra tienda de equipamiento oficial. Encontrá paletas de las mejores marcas del mercado, tubos de pelotas, indumentaria, grips y accesorios con el mejor asesoramiento profesional.',
    image: images.quentoBar,
    size: 'large'
  },
  {
    id: 'inst-2',
    title: 'Quincho y Parrillas',
    description: 'Un espacio equipado para juntarse con amigos y familia después de los partidos o celebrar eventos deportivos y tercer tiempo.',
    image: images.quentoLugar,
    size: 'medium'
  },
  {
    id: 'inst-3',
    title: 'SUM & Restobar',
    description: 'Área social climatizada con servicio de cafetería de especialidad, bebidas, snacks y pantallas gigantes para disfrutar de los torneos en un ambiente cómodo.',
    image: images.quentoBar,
    size: 'small'
  }
];

export const clubActivities: ClubActivity[] = [
  {
    id: 'act-1',
    title: 'Torneo Apertura Stadium 4ta y 5ta Categoría',
    date: '12 - 14 de Septiembre, 2026',
    category: 'torneo',
    description: 'Torneo relámpago de fin de semana con importantes premios en efectivo, palas oficiales y sorteos. Categoría masculina e intermedia.',
    status: 'Abiertas',
    price: '$15.000 por pareja'
  },
  {
    id: 'act-2',
    title: 'Clínica de Padel Intensiva con Profesores Nacionales',
    date: '28 de Septiembre, 2026',
    category: 'clase',
    description: 'Mejorá tu juego de pared, posicionamiento táctico en pista y smash con nuestro equipo calificado. Cupos muy limitados.',
    status: 'Abiertas',
    price: '$6.000 por persona'
  },
  {
    id: 'act-3',
    title: 'Liga de Caballeros y Damas Stadium Padel',
    date: 'Octubre - Noviembre, 2026',
    category: 'evento',
    description: 'Liga trimestral amateur con ascensos y descensos automáticos. Jugá un partido garantizado por semana adaptado a tu nivel.',
    status: 'Próximamente',
    price: '$20.000 inscripción'
  }
];

export const availableTimeSlots = [
  '09:00',
  '10:30',
  '12:00',
  '13:30',
  '15:00',
  '16:30',
  '18:00',
  '19:30',
  '21:00',
  '22:00'
];

// Generates dynamic states for courts on a specific date to simulate a real availability engine
export const generateTimeSlotsForDate = (dateString: string, existingBookings: any[]): { time: string; slots: { courtId: string; state: 'available' | 'reserved' | 'unavailable' }[] }[] => {
  // Use date hash to generate consistent "random" mock bookings so the page looks realistic and stable,
  // but also merges with actual user bookings from localStorage!
  const getHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  const baseHash = getHash(dateString);

  return availableTimeSlots.map((time, timeIdx) => {
    const slots = courts.map((court, courtIdx) => {
      // Check if there is an actual user booking in state
      const isUserBooked = existingBookings.some(
        (b) => b.date === dateString && b.timeSlot === time && b.courtId === court.id
      );

      if (isUserBooked) {
        return { courtId: court.id, state: 'reserved' as const };
      }

      // Generate consistent mock occupancy based on date and time
      // Late evening slots (18:30, 20:00, 21:30) are more likely to be reserved
      const timeFactor = timeIdx >= 6 && timeIdx <= 9 ? 0.75 : 0.35;
      const courtFactor = (courtIdx % 3) * 0.1;
      const threshold = timeFactor + courtFactor;

      const randomValue = ((baseHash + timeIdx * 17 + courtIdx * 31) % 100) / 100;
      
      let state: 'available' | 'reserved' | 'unavailable' = 'available';
      if (randomValue < threshold * 0.7) {
        state = 'reserved';
      } else if (randomValue > 0.95) {
        state = 'unavailable'; // Maintenance, etc.
      }

      return { courtId: court.id, state };
    });

    return { time, slots };
  });
};
