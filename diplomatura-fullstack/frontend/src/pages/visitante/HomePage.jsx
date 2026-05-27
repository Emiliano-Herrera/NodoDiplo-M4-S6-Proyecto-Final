import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/visitante/Navbar';
import { Footer } from '../../components/visitante/Footer';
import { ModulosFeatures } from '../../components/visitante/ModulosFeatures';
import { ScrollReveal } from '../../components/visitante/ScrollReveal';
import { VariableFontCursorProximity } from '../../components/visitante/VariableFontCursorProximity';
import { SiHtml5, SiCss, SiJavascript, SiNodedotjs, SiReact } from '@icons-pack/react-simple-icons';

const techIcons = [
  { name: 'HTML5', icon: SiHtml5 },
  { name: 'CSS3', icon: SiCss },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'React', icon: SiReact },
];

export default function HomePage() {
  const containerRef = useRef(null);

  // Scroll suave al hacer clic en el botón
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('modulos-features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col" ref={containerRef}>
      <Navbar />

      {/* Hero Principal - Ocupa toda la pantalla al inicio */}
      <main className="flex-1 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Título principal - DESARROLLO WEB */}
            <ScrollReveal direction="up" delay={0}>
              <div className="mb-2">
                <VariableFontCursorProximity
                  containerRef={containerRef}
                  fromFontVariationSettings="'wght' 400, 'slnt' 0"
                  toFontVariationSettings="'wght' 900, 'slnt' -10"
                  radiusZoomingZone={200}
                  falloff="linear"
                  className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-gradient-to-b from-white via-gray-300 to-gray-600 bg-clip-text text-transparent"
                >
                  DESARROLLO WEB
                </VariableFontCursorProximity>
              </div>
            </ScrollReveal>
            
            {/* Título secundario - FULL-STACK */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="mb-6">
                <VariableFontCursorProximity
                  containerRef={containerRef}
                  fromFontVariationSettings="'wght' 400, 'slnt' 0"
                  toFontVariationSettings="'wght' 900, 'slnt' -10"
                  radiusZoomingZone={200}
                  falloff="linear"
                  className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-gradient-to-b from-white via-gray-300 to-gray-600 bg-clip-text text-transparent"
                >
                  FULL-STACK
                </VariableFontCursorProximity>
              </div>
            </ScrollReveal>
            
            {/* Subtítulo */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="mb-12">
                <VariableFontCursorProximity
                  containerRef={containerRef}
                  fromFontVariationSettings="'wght' 400, 'slnt' 0"
                  toFontVariationSettings="'wght' 700, 'slnt' -5"
                  radiusZoomingZone={150}
                  falloff="linear"
                  className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
                >
                  Domina las tecnologías más demandadas y construye aplicaciones web completas
                </VariableFontCursorProximity>
              </div>
            </ScrollReveal>

            {/* Íconos de tecnologías */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="flex flex-wrap justify-center gap-10 md:gap-14">
                {techIcons.map((tech, idx) => {
                  const IconComponent = tech.icon;
                  return (
                    <div
                      key={tech.name}
                      className="group flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-1"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <IconComponent className="w-14 h-14 md:w-20 md:h-20 text-muted-foreground group-hover:text-primary transition-colors drop-shadow-lg" />
                      <span className="text-sm font-medium text-muted-foreground">{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>

      {/* Sección de módulos destacados con id para scroll */}
      <div id="modulos-features">
        <ModulosFeatures />
      </div>

      <Footer />
    </div>
  );
}