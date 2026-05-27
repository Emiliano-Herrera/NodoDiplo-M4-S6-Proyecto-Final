import { SiHtml5, SiCss, SiJavascript, SiNodedotjs, SiReact } from '@icons-pack/react-simple-icons';
import { ScrollReveal } from './ScrollReveal';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const modules = [
  {
    id: 'I',
    title: 'HTML + CSS',
    icons: [SiHtml5, SiCss],
    description: 'Introducción a HTML y CSS. Estructura y estilos para la web. Es el punto de partida para entender cómo se construye y se presenta una página.',
    delay: 0,
  },
  {
    id: 'II',
    title: 'JavaScript (JS)',
    icons: [SiJavascript],
    description: 'Se aborda la lógica y la interactividad. El alumno aprende a manipular el DOM, manejar eventos y dar dinamismo a las interfaces.',
    delay: 0.1,
  },
  {
    id: 'III',
    title: 'Node.js',
    icons: [SiNodedotjs],
    description: 'Se trabaja el backend, creando servidores y manejando datos. Es el paso hacia el desarrollo full-stack.',
    delay: 0.2,
  },
  {
    id: 'IV',
    title: 'React',
    icons: [SiReact],
    description: 'Se enseña a construir interfaces modernas y reactivas, con componentes reutilizables y un enfoque declarativo.',
    delay: 0.3,
  },
];

// Componente para tarjeta individual con efecto parallax al hacer hover
function ModuleCard({ modulo }) {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x: x * 10, y: y * 10 });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <ScrollReveal direction="up" delay={modulo.delay} duration={0.5}>
      <motion.div
        ref={cardRef}
        className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 p-6 transition-all duration-500 hover:border-border hover:shadow-xl"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
          transition: 'transform 0.3s ease-out',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Fondo decorativo animado en gris */}
        <motion.div 
          className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gray-500/5 blur-2xl"
          whileHover={{ scale: 1.5, opacity: 0.1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Header con íconos en gris */}
        <div className="flex items-center gap-3 mb-4">
          <motion.div 
            className="flex items-center gap-1"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {modulo.icons.map((Icon, idx) => (
              <Icon key={idx} className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground group-hover:text-foreground transition-colors" />
            ))}
          </motion.div>
          <div className="h-8 w-px bg-border/50" />
          <motion.span 
            className="text-sm font-medium text-muted-foreground"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Módulo {modulo.id}
          </motion.span>
        </div>

        {/* Título */}
        <motion.h3 
          className="text-xl font-semibold mb-3"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Módulo {modulo.id} – {modulo.title}
        </motion.h3>

        {/* Descripción */}
        <p className="text-muted-foreground leading-relaxed">
          {modulo.description}
        </p>

        {/* Línea decorativa animada en gris */}
        <motion.div 
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gray-500/50 to-gray-400"
          initial={{ width: 0 }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.3 }}
        />

        {/* Badge decorativo en gris */}
        <motion.div 
          className="absolute bottom-4 right-4 text-5xl font-bold text-gray-500/5 group-hover:text-gray-500/10 transition-all duration-300"
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.3 }}
        >
          {modulo.id}
        </motion.div>
      </motion.div>
    </ScrollReveal>
  );
}

export function ModulosFeatures() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, threshold: 0.1 });

  return (
    <motion.section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-background to-muted/20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        {/* Título de la sección en blanco y gris */}
        <ScrollReveal direction="up" delay={0} duration={0.8}>
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent"
              initial={{ backgroundPosition: '0% 50%' }}
              animate={{ backgroundPosition: '100% 50%' }}
              transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            >
              Diplomatura de desarrollo web FULL STACK
            </motion.h2>
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Los alumnos podrán aprender a diseñar, desarrollar y mantener aplicaciones web
              utilizando las tecnologías más demandadas. El trayecto formativo se compone de los siguientes 4 módulos:
            </motion.p>
          </motion.div>
        </ScrollReveal>

        {/* Grid de módulos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {modules.map((modulo) => (
            <ModuleCard key={modulo.id} modulo={modulo} />
          ))}
        </div>

      </div>
    </motion.section>
  );
}