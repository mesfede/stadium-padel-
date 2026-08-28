export interface Court {
  id: string;
  name: string;
  type: 'covered' | 'outdoor';
  surface: 'carpet'; // Blue synthetic turf
  hasGlassWalls: boolean; // Blindex
  hasLighting: boolean;
  priceHour: number;
  image: string;
  features: string[];
}

export interface Booking {
  id: string;
  courtId: string;
  courtName: string;
  date: string; // YYYY-MM-DD
  dateFormatted?: string;
  timeSlot: string; // HH:MM
  userName: string;
  userPhone: string;
  userEmail: string;
  totalPrice?: number;
  status?: string;
  createdAt: string;
}

export interface TimeSlot {
  time: string; // e.g. "08:00", "09:30"
  available: boolean;
  courtStates: Record<string, 'available' | 'reserved' | 'unavailable'>; // courtId -> state
}

export interface ClubActivity {
  id: string;
  title: string;
  date: string;
  category: 'torneo' | 'clase' | 'evento';
  description: string;
  status: 'Abiertas' | 'Próximamente' | 'Finalizado';
  image?: string;
  price?: string;
}

export interface ClubInstallation {
  id: string;
  title: string;
  description: string;
  image: string;
  size: 'large' | 'medium' | 'small';
}
