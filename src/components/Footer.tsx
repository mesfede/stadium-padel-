import { useState } from 'react';
import { MapPin, Phone, Mail, MessageSquare, ExternalLink, Instagram, Navigation, Clock, Compass } from 'lucide-react';
import { images } from '../assets';
import quentoFooter from '../assets/images/stadium_coplejo.jpg';

interface FooterProps {
  onNavigateToBooking: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export default function Footer({ onNavigateToBooking, onNavigateToSection }: FooterProps) {
  const [logoFailed, setLogoFailed] = useState(false);
  const mapQueryUrl = 'https://www.google.com/maps/search/?api=1&query=Calle+530+2457,+B1900+La+Plata,+Provincia+de+Buenos+Aires';
  const iframeSrc = 'https://maps.google.com/maps?q=Calle%20530%202457%2C%20B1900%20La%20Plata%2C%20Provincia%20de%20Buenos%20Aires&t=&z=16&ie=UTF8&iwloc=&output=embed';

  return (
    <footer 
      id="contacto" 
      className="relative overflow-hidden bg-[#0089D8] text-white pt-16 pb-12 transition-colors scroll-mt-20"
    >
      {/* Fondo de imagen con textura deportiva y sutileza */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.14] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url(${quentoFooter})` }}
      />
      
      {/* Degradé de transición para fundir a negro con la sección superior */}
      <div className="absolute top-0 left-0 right-0 h-[380px] bg-gradient-to-b from-neutral-950 via-neutral-950/90 via-neutral-950/50 to-transparent z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Integrated Ubicación & Cómo Llegar Compact Block */}
        <div className="bg-neutral-950 text-white rounded-3xl p-6 sm:p-8 md:p-10 mb-14 shadow-2xl border border-neutral-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Info Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#00b4d8]">UBICACIÓN</span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tight mt-1">
                  ¿CÓMO LLEGAR?
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#00b4d8] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-extrabold text-white">C. 530 n° 2457</p>
                    <p className="text-neutral-400 text-xs">B1900 La Plata, Provincia de Buenos Aires</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-[#00b4d8] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-extrabold text-white">Todos los días: 09:00 a 23:30 hs</p>
                    <p className="text-neutral-400 text-xs">Lunes a Domingos y feriados</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Compass className="w-5 h-5 text-[#00b4d8] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-neutral-300 text-xs font-medium leading-relaxed">
                      Excelente ubicación en La Plata. Portón de ingreso seguro y amplio estacionamiento privado gratuito.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={mapQueryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-4 py-2.5 rounded-xl bg-[#2D37FB] hover:bg-[#1e27d8] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  <Navigation className="w-3.5 h-3.5 mr-1.5" />
                  Abrir en Google Maps (GPS)
                </a>
                <a
                  href="https://wa.me/5492212264893"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-extrabold text-xs uppercase tracking-wider transition-all"
                >
                  <Phone className="w-3.5 h-3.5 mr-1.5 text-[#00b4d8]" />
                  0221 226-4893
                </a>
              </div>
            </div>

            {/* Compact Interactive Map (7 cols) */}
            <div className="lg:col-span-7 h-64 sm:h-80 rounded-2xl overflow-hidden border border-neutral-800 shadow-inner relative">
              <iframe
                title="Stadium Padel Map"
                src={iframeSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

          </div>
        </div>

        {/* 3 Columns Master Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-14">
          
          {/* Column 1: Brand & Badge (4 cols) */}
          <div className="md:col-span-4 space-y-6">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block group focus:outline-none"
            >
              {!logoFailed ? (
                <img 
                  src={images.quentoLogo} 
                  alt="Stadium Padel Logo" 
                  className="h-24 sm:h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-md brightness-0 invert"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md">
                    <span className="font-display font-black text-[#0089D8] text-xl">S</span>
                  </div>
                  <span className="font-display font-black text-white text-xl tracking-wider">
                    STADIUM PADEL
                  </span>
                </div>
              )}
            </a>

            <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-semibold max-w-sm drop-shadow-sm">
              El club de pádel líder con canchas cubiertas profesionales, césped de alta densidad, blindex, iluminación LED y el mejor ambiente deportivo y social.
            </p>

            <div className="pt-1">
              <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[11px] font-black uppercase tracking-wider shadow-sm">
                <span className="w-2 h-2 rounded-full bg-white shrink-0 shadow-sm" />
                <span>100% CANCHAS CUBIERTAS</span>
              </span>
            </div>
          </div>

          {/* Column 2: Contacto & Reservas (4 cols) */}
          <div className="md:col-span-4 space-y-5">
            <h3 className="text-xl sm:text-2xl font-display font-black italic tracking-tight text-white uppercase drop-shadow-sm">
              CONTACTO & RESERVAS
            </h3>

            <div className="space-y-4 text-xs sm:text-[13px] font-bold text-white">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0 border border-white/20">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/95 font-semibold">C. 530 n° 2457, B1900 La Plata</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0 border border-white/20">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/95 font-semibold">9:00 a 23:30 hs</span>
              </div>

              <a 
                href="https://wa.me/5492212264893" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center space-x-3 text-white hover:text-white/80 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/80 flex items-center justify-center shrink-0 border border-emerald-300/40 shadow-sm">
                  <MessageSquare className="w-4 h-4 fill-white text-white" />
                </div>
                <span className="underline underline-offset-4 font-extrabold text-white">0221 226-4893</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/70 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a 
                href="tel:02212264893" 
                className="flex items-center space-x-3 hover:text-white/80 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0 border border-white/20">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-extrabold">0221 226-4893</span>
              </a>

              <a 
                href="mailto:contacto@padelstadium.com.ar" 
                className="flex items-center space-x-3 hover:text-white/80 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0 border border-white/20">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/95 font-semibold">contacto@padelstadium.com.ar</span>
              </a>
            </div>
          </div>

          {/* Column 3: Comunidad (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xl sm:text-2xl font-display font-black italic tracking-tight text-white uppercase drop-shadow-sm">
              COMUNIDAD
            </h3>

            <p className="text-xs sm:text-[13px] text-white/90 font-semibold leading-relaxed mb-4">
              Enterate de los próximos torneos, clínicas, eventos y novedades diarias en nuestras redes.
            </p>

            <div className="space-y-3">
              {/* Instagram Card Button */}
              <a
                href="https://www.instagram.com/padel_stadium"
                target="_blank"
                rel="noreferrer"
                className="bg-white/15 hover:bg-white/25 p-3.5 rounded-2xl shadow-sm border border-white/25 flex items-center justify-between transition-all duration-200 hover:scale-[1.01] group cursor-pointer backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3">
                  {/* Instagram Gradient Icon Container */}
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-600 to-purple-600 flex items-center justify-center text-white shadow-sm shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-display font-black text-xs sm:text-sm text-white uppercase tracking-tight">
                      @PADEL_STADIUM
                    </span>
                    <span className="text-[11px] text-white/80 font-medium leading-none mt-1">
                      Seguinos en Instagram
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
              </a>

              {/* WhatsApp Card Button */}
              <a
                href="https://wa.me/5492212264893"
                target="_blank"
                rel="noreferrer"
                className="bg-white/15 hover:bg-white/25 p-3.5 rounded-2xl shadow-sm border border-white/25 flex items-center justify-between transition-all duration-200 hover:scale-[1.01] group cursor-pointer backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3">
                  {/* WhatsApp Green Icon Container */}
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-sm shrink-0">
                    <MessageSquare className="w-5 h-5 fill-white" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-display font-black text-xs sm:text-sm text-white uppercase tracking-tight">
                      STADIUM WHATSAPP
                    </span>
                    <span className="text-[11px] text-white/80 font-medium leading-none mt-1">
                      Atención al instante
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar Divider and Copyright */}
        <div className="pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-white/90">
          <p>
            © {new Date().getFullYear()} Stadium Pádel. Todos los derechos reservados.
          </p>

          <div className="flex items-center space-x-6 text-white/90">
            <button
              onClick={() => onNavigateToSection('el-club')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Instalaciones
            </button>
            <button
              onClick={onNavigateToBooking}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Reservas Online
            </button>
            <a
              href="https://www.instagram.com/padel_stadium"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
