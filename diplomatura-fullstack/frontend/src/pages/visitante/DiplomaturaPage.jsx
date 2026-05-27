import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Navbar } from '../../components/visitante/Navbar';
import { Footer } from '../../components/visitante/Footer';
import { Users, Target, Award, Clock, BookOpen, Code, Globe, Briefcase, ChevronRight, School } from 'lucide-react';
import { getProfesores } from '../../services/profesorService';
import { ScrollReveal } from '../../components/visitante/ScrollReveal';
import { SiHtml5, SiCss, SiJavascript, SiNodedotjs, SiReact } from '@icons-pack/react-simple-icons';

export default function DiplomaturaPage() {
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);
  const isHeroVisible = useInView(heroRef, { once: true, threshold: 0.1 });

  useEffect(() => {
    const loadProfesores = async () => {
      try {
        const data = await getProfesores(1, 100, '');
        setProfesores(data.profesores || []);
      } catch (error) {
        console.error('Error al cargar profesores:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProfesores();
  }, []);

  const beneficios = [
    { icon: BookOpen, title: '4 Módulos Completos', description: 'Desde HTML/CSS hasta React, cubriendo todo el stack moderno' },
    { icon: Code, title: '50+ Ejemplos Prácticos', description: 'Código real y ejemplos que puedes usar en tus proyectos' },
    { icon: Briefcase, title: 'Proyectos Reales', description: 'Proyectos finales para construir un portafolio profesional' },
    { icon: Users, title: 'Profesores Expertos', description: 'Instructores con experiencia en la industria' },
    { icon: Clock, title: 'A tu Ritmo', description: 'Aprende cuando y donde quieras' }
  ];

  const estadisticas = [
    { value: '4', label: 'Módulos', icon: BookOpen },
    { value: '50+', label: 'Ejemplos', icon: Code },
    { value: '4', label: 'Proyectos', icon: Award },
    { value: '100%', label: 'Online', icon: Globe },
  ];

  const tecnologias = [
    { name: 'HTML5', icon: SiHtml5, icon2: SiCss, label: 'HTML + CSS', description: 'Estructura y estilos para la web', delay: 0 },
    { name: 'JavaScript', icon: SiJavascript, label: 'JavaScript', description: 'Lógica e interactividad', delay: 0.1 },
    { name: 'Node.js', icon: SiNodedotjs, label: 'Node.js', description: 'Backend y servidores', delay: 0.2 },
    { name: 'React', icon: SiReact, label: 'React', description: 'Interfaces modernas', delay: 0.3 },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Section - Minimalista */}
      <section ref={heroRef} className="relative overflow-hidden py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isHeroVisible ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <div className="p-4 rounded-3xl bg-muted/30">
                <School className="w-12 h-12 text-muted-foreground" />
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={isHeroVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
            >
              La Diplomatura
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isHeroVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-muted-foreground"
            >
              Una experiencia educativa completa que te transformará en un desarrollador full-stack.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ¿Qué es la diplomatura? */}
      <ScrollReveal direction="up" delay={0}>
        <section className="py-16 border-t border-border/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-semibold mb-4 text-foreground">¿Qué es la Diplomatura Full-Stack?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Un programa de formación intensivo diseñado para llevarte desde cero hasta un nivel profesional en el desarrollo web.
                A través de 4 módulos, aprenderás las tecnologías más demandadas del mercado.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Estadísticas */}
      <ScrollReveal direction="up" delay={0.1}>
        <section className="py-16 bg-muted/10 border-y border-border/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {estadisticas.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-14 h-14 mx-auto rounded-full bg-muted/20 flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="text-3xl font-semibold text-foreground">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ¿Qué vas a aprender? */}
      <ScrollReveal direction="up" delay={0.2}>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-semibold mb-3 text-foreground">¿Qué vas a aprender?</h2>
              <p className="text-muted-foreground">Un recorrido completo por las tecnologías que dominan la industria</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tecnologias.map((tech, idx) => {
                const IconComponent = tech.icon;
                const IconComponent2 = tech.icon2;
                return (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="bg-card p-6 rounded-2xl border border-border/50 text-center hover:border-border transition-all duration-300"
                  >
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <IconComponent className="w-10 h-10 text-muted-foreground" />
                      {IconComponent2 && <IconComponent2 className="w-10 h-10 text-muted-foreground" />}
                    </div>
                    <h3 className="font-medium text-foreground mb-1">{tech.label}</h3>
                    <p className="text-sm text-muted-foreground">{tech.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Beneficios */}
      <ScrollReveal direction="up" delay={0.3}>
        <section className="py-16 bg-muted/10 border-y border-border/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-semibold mb-3 text-foreground">Beneficios</h2>
              <p className="text-muted-foreground">Una formación diseñada para tu éxito profesional</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beneficios.map((beneficio, idx) => {
                const Icon = beneficio.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="bg-card p-6 rounded-2xl border border-border/50 hover:border-border transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-muted/20 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h3 className="text-base font-medium text-foreground mb-2">{beneficio.title}</h3>
                    <p className="text-sm text-muted-foreground">{beneficio.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Equipo de Profesores */}
      <ScrollReveal direction="up" delay={0.4}>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-semibold mb-3 text-foreground">Profesores</h2>
              <p className="text-muted-foreground">Expertos con experiencia en la industria</p>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t border-muted-foreground" />
              </div>
            ) : profesores.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No hay profesores registrados aún</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profesores.map((profesor, idx) => (
                  <motion.div
                    key={profesor._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="bg-card rounded-2xl border border-border/50 p-6 hover:border-border transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-muted/20 flex items-center justify-center">
                        <span className="text-xl font-medium text-foreground">{profesor.nombre?.[0]?.toUpperCase()}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{profesor.nombre}</h3>
                        <p className="text-sm text-muted-foreground">{profesor.especialidad || 'Full-Stack Developer'}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {profesor.biografia || 'Apasionado por la tecnología y la enseñanza.'}
                    </p>
                    {profesor.email && (
                      <a href={`mailto:${profesor.email}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mt-3">
                        Contactar <ChevronRight className="w-3 h-3" />
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </ScrollReveal>

      <Footer />
    </div>
  );
}