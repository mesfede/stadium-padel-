// Centralized asset management for Stadium Padel
// Real authentic club assets only

import logoStadium from './images/logo_stadium_ok.png';
import fondoReservas from './images/fondo_reservas.jpg';
import quentoCanchaOk from './images/stadium_cancha1.jpg';
import quentoBar from './images/stadium_gym.jpg';
import complejo2 from './images/stadium_coplejo1.jpg';
import quentoLugar from './images/stadium_coplejo.jpg';
import stadiumCancha3 from './images/stadium_cancha3.jpg';
import heroVideo from '../video_stadium.mp4';

export const images = {
  quentoLogo: logoStadium, // Keep quentoLogo key to avoid breaking references, but point to new logoStadium
  logoStadium,
  fondoReservas,
  quentoCanchaOk,
  quentoBar,
  complejo2,
  quentoLugar,
  stadiumCancha3,
};

export const videos = {
  heroVideo,
};



