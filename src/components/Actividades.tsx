import { Trophy, Users, Award, ExternalLink, Sparkles } from 'lucide-react';
import fondoQuentoTorneos from '../assets/images/stadium_cancha3.jpg';

export default function Actividades() {
  const cards = [
    {
      id: 'torneos',
      icon: Trophy,
      badge: 'Competencia Oficial',
      title: 'Torneos Open & Ligas',
      subtitle: '4ta a 7ma categoría • Damas y Caballeros',
      features: [
        'Premios, trofeos e indumentaria',
        'Partidos garantizados y zonas',
        '3 canchas de blindex techadas',
      ],
      ctaText: 'Inscribirme al Torneo',
      ctaUrl: 'https://wa.me/5492216049987?text=Hola%20Stadium!%20Quiero%20inscribirme%20al%20próximo%20torneo',
      highlight: true,
    },
    {
      id: 'clases',
      icon: Award,
      badge: 'Personalizado',
      title: 'Clases Particulares',
      subtitle: 'Individuales o en pareja',
      features: [
        'Profesores federados certificados',
        'Corrección técnica y táctica de golpes',
        'Horarios flexibles mañana y noche',
      ],
      ctaText: 'Consultar Horarios',
      ctaUrl: 'https://wa.me/5492216049987?text=Hola%20Stadium!%20Quisiera%20consultar%20por%20clases%20particulares',
      highlight: false,
    },
    {
      id: 'escuela',
      icon: Users,
      badge: 'Grupos Reducidos',
      title: 'Escuela & Clínicas',
      subtitle: 'Todos los niveles y edades',
      features: [
        'Máximo 4 alumnos por pista',
        'Dinámicas y situaciones de juego real',
        'Preparación física y torneos internos',
      ],
      ctaText: 'Sumarme a Escuela',
      ctaUrl: 'https://wa.me/5492216049987?text=Hola%20Stadium!%20Quiero%20sumarme%20a%20la%20escuela%20de%20pádel',
      highlight: false,
    },
  ];

  return (
    <section id="torneos" className="relative overflow-hidden py-16 sm:py-24 bg-neutral-950 text-white scroll-mt-20 border-t border-neutral-900">
      {/* Background Image: Grayscale, opacity, radial & linear gradients to fade borders and dissolve into black */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.16] pointer-events-none grayscale mix-blend-luminosity"
        style={{ 
          backgroundImage: `url(${fondoQuentoTorneos})`,
          maskImage: 'radial-gradient(circle, black 35%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle, black 35%, transparent 75%)'
        }}
      />
      
      {/* Top & Bottom edge soft linear gradients to blend perfectly with solid bg-neutral-950 */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-neutral-950 to-transparent z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-950 to-transparent z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white">
            COMPETÍ Y <span className="text-[#2D37FB]">PERFECCIONÁ</span> TU JUEGO
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 font-medium">
            Torneos oficiales, ligas continuas y entrenamiento con profesores federados.
          </p>
        </div>

        {/* 3 Modern Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1.5 ${
                  card.highlight
                    ? 'bg-neutral-900/90 border-2 border-[#2D37FB] shadow-2xl shadow-blue-950/40'
                    : 'bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 shadow-xl'
                }`}
              >
                {/* Glow accent for highlighted card */}
                {card.highlight && (
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#2D37FB]/15 rounded-full blur-2xl pointer-events-none" />
                )}

                <div>
                  {/* Top row: badge & icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        card.highlight
                          ? 'bg-[#2D37FB] text-white'
                          : 'bg-neutral-800 text-neutral-300'
                      }`}
                    >
                      {card.badge}
                    </span>
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        card.highlight
                          ? 'bg-[#2D37FB]/20 text-[#2D37FB]'
                          : 'bg-neutral-800 text-white'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-wide mb-6">
                    {card.subtitle}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-2.5 mb-8">
                    {card.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center text-xs sm:text-sm text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D37FB] mr-2.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA */}
                <a
                  href={card.ctaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                    card.highlight
                      ? 'bg-[#2D37FB] hover:bg-[#271BA3] text-white shadow-lg shadow-blue-950/60'
                      : 'bg-neutral-950 hover:bg-[#2D37FB] text-white border border-neutral-800'
                  }`}
                >
                  <span>{card.ctaText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
