import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Navbar } from "../../components/visitante/Navbar";
import { Footer } from "../../components/visitante/Footer";
import { ScrollReveal } from "../../components/visitante/ScrollReveal";
import {
  BookOpen,
  Code,
  Database,
  Server,
  Layout,
  Shield,
  Users,
  FileText,
  Link as LinkIcon,
  ChevronRight,
  Terminal,
  Package,
  Globe,
  Lock,
  Layers,
  CheckCircle,
  Key,
  Hash,
  Cloud,
  Info,
} from "lucide-react";

export default function DocumentacionPage() {
  const heroRef = useRef(null);
  const isHeroVisible = useInView(heroRef, { once: true, threshold: 0.1 });

  const tecnologias = [
    {
      name: "Frontend",
      icon: Layout,
      items: [
        "React 18",
        "Vite",
        "TailwindCSS",
        "Framer Motion",
        "React Router DOM",
      ],
    },
    {
      name: "Backend",
      icon: Server,
      items: ["Node.js", "Express", "JWT", "bcrypt"],
    },
    {
      name: "Base de Datos",
      icon: Database,
      items: ["MongoDB", "Mongoose", "Cloudinary"],
    },
    {
      name: "UI Componentes",
      icon: Package,
      items: ["shadcn/ui", "Lucide Icons", "Simple Icons"],
    },
  ];

  const endpoints = [
    {
      method: "POST",
      path: "/auth/registro",
      description: "Registro de nuevos usuarios",
      auth: false,
    },
    {
      method: "POST",
      path: "/auth/login",
      description: "Inicio de sesión",
      auth: false,
    },
    {
      method: "GET",
      path: "/auth/perfil",
      description: "Obtener perfil del usuario",
      auth: true,
    },
    {
      method: "GET",
      path: "/modulos",
      description: "Listar todos los módulos",
      auth: false,
    },
    {
      method: "GET",
      path: "/temas/modulo/:id",
      description: "Obtener temas de un módulo",
      auth: false,
    },
    {
      method: "GET",
      path: "/ejemplos/tema/:id",
      description: "Obtener ejemplos de un tema",
      auth: false,
    },
    {
      method: "GET",
      path: "/profesores",
      description: "Listar profesores",
      auth: false,
    },
    {
      method: "GET",
      path: "/lenguajes",
      description: "API externa de lenguajes",
      auth: false,
    },
  ];

  const features = [
    {
      icon: Users,
      title: "Sistema de Roles",
      description: "Admin, Editor y Visitante con diferentes permisos",
    },
    {
      icon: Shield,
      title: "Autenticación JWT",
      description: "Tokens seguros para proteger rutas sensibles",
    },
    {
      icon: Layers,
      title: "CRUD Completo",
      description: "Gestión de módulos, temas, ejemplos y profesores",
    },
    {
      icon: Globe,
      title: "API Externa",
      description: "Consumo de API de lenguajes de programación",
    },
    {
      icon: Lock,
      title: "Rutas Protegidas",
      description: "Acceso restringido según el rol del usuario",
    },
    {
      icon: FileText,
      title: "Markdown/HTML",
      description: "Contenido enriquecido con soporte HTML",
    },
  ];

  const tecnologiasBackend = [
    {
      name: "Node.js",
      icon: Server,
      question: "¿Qué es?",
      answer:
        "Entorno de ejecución de JavaScript en el servidor. Permite correr JavaScript fuera del navegador, lo que posibilita crear aplicaciones backend con el mismo lenguaje que usas en el frontend.",
      where:
        "Es la base de todo tu backend. El archivo backend/src/index.js corre sobre Node.js.",
      example:
        "Cuando ejecutas npm run dev en la carpeta backend, Node.js ejecuta tu servidor y lo mantiene corriendo mientras desarrollas.",
      file: "backend/src/index.js",
    },
    {
      name: "Express",
      icon: Code,
      question: "¿Qué es?",
      answer:
        "Framework web para Node.js que simplifica la creación de APIs y servidores. Proporciona herramientas para manejar rutas, peticiones HTTP, middleware y más.",
      where: "Se usa en backend/src/index.js y en todas las rutas de la API.",
      example:
        'app.get("/api/modulos", obtenerModulos); app.post("/api/auth/login", loginUsuario);',
      file: "backend/src/routes/*.js",
    },
    {
      name: "JWT (JSON Web Token)",
      icon: Key,
      question: "¿Qué es?",
      answer:
        'Un token firmado que permite autenticar usuarios sin guardar sesiones en el servidor. Es como un "carnet de identidad" digital que el servidor le da al usuario cuando inicia sesión.',
      where:
        "Se usa en el proceso de login y en todas las peticiones protegidas.",
      example:
        'Al hacer login, el backend genera un token. El frontend lo guarda en localStorage y lo envía en cada petición en el header "Authorization: Bearer <token>".',
      files: [
        "backend/src/utils/generateToken.js",
        "backend/src/middlewares/authMiddleware.js",
        "frontend/src/services/api.js",
      ],
    },
    {
      name: "bcrypt",
      icon: Lock,
      question: "¿Qué es?",
      answer:
        "Librería para encriptar contraseñas de forma segura. Nunca se guardan contraseñas en texto plano en la base de datos, solo su hash (una versión encriptada).",
      where:
        "Se usa en el modelo Usuario.js, tanto al guardar una nueva contraseña como al compararla durante el login.",
      example:
        'Al registrar un usuario, la contraseña "123456" se convierte en algo como "$2a$10$xH9kL5mN8pQrS3tUvW7yZe". Al hacer login, bcrypt compara la contraseña ingresada con ese hash.',
      file: "backend/src/models/Usuario.js",
    },
    {
      name: "MongoDB",
      icon: Database,
      question: "¿Qué es?",
      answer:
        "Base de datos NoSQL que guarda datos en formato JSON (documentos). Es flexible y escalable, ideal para aplicaciones web modernas.",
      where:
        "Toda la información de tu proyecto (usuarios, módulos, temas, ejemplos, imágenes, videos) se guarda aquí.",
      example:
        'Cada registro es un documento JSON. Por ejemplo, un usuario se guarda como { "nombre": "Juan", "email": "juan@email.com", "rol": "admin" }',
      file: "backend/src/config/db.js (conexión usando Mongoose)",
    },
    {
      name: "Cloudinary",
      icon: Cloud,
      question: "¿Qué es?",
      answer:
        "Servicio en la nube para almacenar y optimizar imágenes y videos. Permite subir archivos desde el frontend y obtener URLs para usarlas en la aplicación.",
      where:
        "Se usa para subir imágenes de perfil de usuarios, portadas de módulos, imágenes de ejemplos y videos.",
      example:
        "Cuando un administrador sube una imagen desde el formulario, se envía a Cloudinary y este devuelve una URL que se guarda en la base de datos.",
      file: "frontend/src/components/ui/ImageUpload.jsx",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative overflow-hidden py-16 md:py-24"
      >
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
                <FileText className="w-12 h-12 text-muted-foreground" />
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={isHeroVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
            >
              Documentación
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isHeroVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-muted-foreground"
            >
              Guía completa de la Diplomatura Full-Stack
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stack Tecnológico General */}
      <ScrollReveal direction="up" delay={0}>
        <section className="py-16 border-t border-border/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-semibold mb-3 text-foreground">
                Stack Tecnológico
              </h2>
              <p className="text-muted-foreground">
                Tecnologías utilizadas en el proyecto
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tecnologias.map((tech, idx) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="bg-card p-6 rounded-2xl border border-border/50 hover:border-border transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-muted/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-3">
                      {tech.name}
                    </h3>
                    <ul className="space-y-2">
                      {tech.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <ChevronRight className="w-3 h-3 text-muted-foreground" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Tecnologías del Backend - Explicación Detallada */}
      {/* Tecnologías del Backend - Explicación Detallada */}
      <ScrollReveal direction="up" delay={0.1}>
        <section className="py-16 bg-muted/10 border-y border-border/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-semibold mb-3 text-foreground">
                Tecnologías del Backend
              </h2>
              <p className="text-muted-foreground">
                Explicación detallada de cada tecnología utilizada en el
                servidor
              </p>
            </div>

            <div className="space-y-8">
              {/* Node.js */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl border border-border/50 overflow-hidden"
              >
                <div className="p-6 border-b border-border/50 bg-muted/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted/20 flex items-center justify-center">
                      <Server className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      Node.js
                    </h3>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-medium text-foreground">¿Qué es?</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Es un entorno de ejecución de JavaScript en el servidor.
                      Me permite correr JavaScript fuera del navegador, lo que
                      me posibilita crear aplicaciones backend con el mismo
                      lenguaje que uso en el frontend.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-medium text-foreground">
                        ¿Dónde lo uso?
                      </h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Es la base de todo mi backend. El archivo{" "}
                      <code className="text-xs font-mono bg-muted/30 px-2 py-1 rounded">
                        backend/src/index.js
                      </code>{" "}
                      corre sobre Node.js.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-medium text-foreground">Ejemplo</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Cuando ejecuto{" "}
                      <code className="text-xs font-mono bg-muted/30 px-2 py-1 rounded">
                        npm run dev
                      </code>{" "}
                      en la carpeta backend, Node.js ejecuta mi servidor y lo
                      mantiene corriendo mientras desarrollo.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Express */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl border border-border/50 overflow-hidden"
              >
                <div className="p-6 border-b border-border/50 bg-muted/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted/20 flex items-center justify-center">
                      <Code className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      Express
                    </h3>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-medium text-foreground">¿Qué es?</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Es un framework web para Node.js que me simplifica la
                      creación de APIs y servidores. Me proporciona herramientas
                      para manejar rutas, peticiones HTTP, middleware y más.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-medium text-foreground">
                        ¿Dónde lo uso?
                      </h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Lo uso en{" "}
                      <code className="text-xs font-mono bg-muted/30 px-2 py-1 rounded">
                        backend/src/index.js
                      </code>{" "}
                      y en todas las rutas de la API.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-medium text-foreground">Ejemplo</h4>
                    </div>
                    <pre className="bg-muted/30 p-3 rounded-xl text-sm font-mono text-muted-foreground overflow-x-auto">
                      {`app.get("/api/modulos", obtenerModulos);
app.post("/api/auth/login", loginUsuario);`}
                    </pre>
                  </div>
                </div>
              </motion.div>

              {/* JWT */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl border border-border/50 overflow-hidden"
              >
                <div className="p-6 border-b border-border/50 bg-muted/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted/20 flex items-center justify-center">
                      <Key className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      JWT (JSON Web Token)
                    </h3>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-medium text-foreground">¿Qué es?</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Es un token firmado que me permite autenticar usuarios sin
                      guardar sesiones en el servidor. Es como un "carnet de
                      identidad" digital que mi servidor le da al usuario cuando
                      inicia sesión.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-medium text-foreground">
                        ¿Dónde lo uso?
                      </h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Lo uso en el proceso de login y en todas las peticiones
                      protegidas. Aquí están los archivos clave:
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <code className="text-xs font-mono bg-muted/30 px-2 py-1 rounded">
                        backend/src/utils/generateToken.js
                      </code>
                      <code className="text-xs font-mono bg-muted/30 px-2 py-1 rounded">
                        backend/src/middlewares/authMiddleware.js
                      </code>
                      <code className="text-xs font-mono bg-muted/30 px-2 py-1 rounded">
                        frontend/src/services/api.js
                      </code>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-medium text-foreground">Ejemplo</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Cuando un usuario hace login, mi backend genera un token.
                      El frontend lo guarda en localStorage y lo envía en cada
                      petición en el header "Authorization: Bearer
                      &lt;token&gt;".
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* bcrypt */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl border border-border/50 overflow-hidden"
              >
                <div className="p-6 border-b border-border/50 bg-muted/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted/20 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      bcrypt
                    </h3>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-medium text-foreground">¿Qué es?</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Es una librería que me permite encriptar contraseñas de
                      forma segura. Nunca guardo contraseñas en texto plano en
                      la base de datos, solo su hash (una versión encriptada).
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-medium text-foreground">
                        ¿Dónde lo uso?
                      </h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Lo uso en el modelo{" "}
                      <code className="text-xs font-mono bg-muted/30 px-2 py-1 rounded">
                        Usuario.js
                      </code>
                      , tanto al guardar una nueva contraseña como al compararla
                      durante el login.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-medium text-foreground">Ejemplo</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Cuando un usuario se registra con la contraseña "123456",
                      bcrypt la convierte en algo como
                      "$2a$10$xH9kL5mN8pQrS3tUvW7yZe". Luego, cuando ese usuario
                      hace login, bcrypt compara la contraseña ingresada con ese
                      hash.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* MongoDB */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl border border-border/50 overflow-hidden"
              >
                <div className="p-6 border-b border-border/50 bg-muted/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted/20 flex items-center justify-center">
                      <Database className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      MongoDB
                    </h3>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-medium text-foreground">¿Qué es?</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Es una base de datos NoSQL que guarda datos en formato
                      JSON (documentos). Es flexible y escalable, ideal para
                      aplicaciones web modernas como la mía.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-medium text-foreground">
                        ¿Dónde lo uso?
                      </h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Toda la información de mi proyecto (usuarios, módulos,
                      temas, ejemplos, imágenes, videos) se guarda aquí. La
                      conexión la hago en{" "}
                      <code className="text-xs font-mono bg-muted/30 px-2 py-1 rounded">
                        backend/src/config/db.js
                      </code>{" "}
                      usando Mongoose.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-medium text-foreground">Ejemplo</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Cada registro es un documento JSON. Por ejemplo, un
                      usuario se guarda así:
                    </p>
                    <pre className="bg-muted/30 p-3 rounded-xl text-sm font-mono text-muted-foreground overflow-x-auto">
                      {`{ "nombre": "Juan", "email": "juan@email.com", "rol": "admin" }`}
                    </pre>
                  </div>
                </div>
              </motion.div>

              {/* Cloudinary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl border border-border/50 overflow-hidden"
              >
                <div className="p-6 border-b border-border/50 bg-muted/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted/20 flex items-center justify-center">
                      <Cloud className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      Cloudinary
                    </h3>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-medium text-foreground">¿Qué es?</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Es un servicio en la nube que me permite almacenar y
                      optimizar imágenes y videos. Me facilita subir archivos
                      desde el frontend y obtener URLs para usarlas en mi
                      aplicación.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-medium text-foreground">
                        ¿Dónde lo uso?
                      </h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Lo uso para subir imágenes de perfil de usuarios, portadas
                      de módulos, imágenes de ejemplos y videos.
                    </p>
                    <code className="inline-block mt-2 text-xs font-mono bg-muted/30 px-2 py-1 rounded">
                      frontend/src/components/ui/ImageUpload.jsx
                    </code>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-medium text-foreground">Ejemplo</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Cuando yo, como administrador, subo una imagen desde el
                      formulario, el frontend la envía a Cloudinary y este me
                      devuelve una URL que luego guardo en mi base de datos.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Características */}
      <ScrollReveal direction="up" delay={0.2}>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-semibold mb-3 text-foreground">
                Características
              </h2>
              <p className="text-muted-foreground">
                Funcionalidades principales del sistema
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
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
                    <h3 className="text-base font-medium text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* API Endpoints */}
      <ScrollReveal direction="up" delay={0.3}>
        <section className="py-16 bg-muted/10 border-y border-border/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-semibold mb-3 text-foreground">
                API Endpoints
              </h2>
              <p className="text-muted-foreground">
                Principales rutas disponibles en el backend
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/20 border-b border-border/50">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-foreground">
                        Método
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-foreground">
                        Endpoint
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-foreground">
                        Descripción
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-foreground">
                        Auth
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoints.map((endpoint, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-border/50 last:border-0 hover:bg-muted/5 transition-colors"
                      >
                        <td className="p-4">
                          <span
                            className={`inline-flex px-2 py-1 rounded text-xs font-mono ${
                              endpoint.method === "GET"
                                ? "bg-green-500/10 text-green-500"
                                : endpoint.method === "POST"
                                  ? "bg-blue-500/10 text-blue-500"
                                  : endpoint.method === "PUT"
                                    ? "bg-yellow-500/10 text-yellow-500"
                                    : "bg-red-500/10 text-red-500"
                            }`}
                          >
                            {endpoint.method}
                          </span>
                        </td>
                        <td className="p-4">
                          <code className="text-sm font-mono text-muted-foreground">
                            {endpoint.path}
                          </code>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {endpoint.description}
                        </td>
                        <td className="p-4">
                          {endpoint.auth ? (
                            <span className="inline-flex items-center gap-1 text-xs text-yellow-500">
                              <Lock className="w-3 h-3" /> Token
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs text-green-500">
                              <CheckCircle className="w-3 h-3" /> Público
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Roles y Permisos */}
      <ScrollReveal direction="up" delay={0.4}>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-semibold mb-3 text-foreground">
                Roles y Permisos
              </h2>
              <p className="text-muted-foreground">
                Sistema de roles con diferentes niveles de acceso
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-2xl border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Admin
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Acceso total al sistema
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• CRUD completo de usuarios</li>
                  <li>• Gestionar profesores</li>
                  <li>• Crear/editar/eliminar módulos</li>
                  <li>• Gestionar temas y ejemplos</li>
                  <li>• Cambiar roles de usuarios</li>
                </ul>
              </div>

              <div className="bg-card p-6 rounded-2xl border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Editor
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Puede editar contenido
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Editar módulos y temas</li>
                  <li>• Modificar ejemplos</li>
                  <li>• Ver panel de administración</li>
                  <li>• No puede eliminar contenido</li>
                  <li>• No gestiona usuarios</li>
                </ul>
              </div>

              <div className="bg-card p-6 rounded-2xl border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-gray-500/10 flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Visitante
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Solo lectura
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Ver módulos y temas</li>
                  <li>• Explorar ejemplos</li>
                  <li>• Ver contenido educativo</li>
                  <li>• No puede modificar nada</li>
                  <li>• Acceso público</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Flujo de Autenticación JWT */}
      <ScrollReveal direction="up" delay={0.45}>
        <section className="py-16 bg-muted/10 border-y border-border/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-semibold mb-3 text-foreground">
                Flujo de Autenticación
              </h2>
              <p className="text-muted-foreground">
                Cómo funciona JWT en la aplicación
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/20 border-b border-border/50">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-foreground">
                        Paso
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-foreground">
                        Qué pasa
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-foreground">
                        Dónde
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50 hover:bg-muted/5 transition-colors">
                      <td className="p-4 font-mono text-sm text-muted-foreground">
                        1
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        Usuario envía email + contraseña
                      </td>
                      <td className="p-4">
                        <code className="text-xs font-mono">LoginPage.jsx</code>
                      </td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/5 transition-colors">
                      <td className="p-4 font-mono text-sm text-muted-foreground">
                        2
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        Backend verifica credenciales
                      </td>
                      <td className="p-4">
                        <code className="text-xs font-mono">
                          authController.js
                        </code>
                      </td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/5 transition-colors">
                      <td className="p-4 font-mono text-sm text-muted-foreground">
                        3
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        bcrypt compara la contraseña
                      </td>
                      <td className="p-4">
                        <code className="text-xs font-mono">Usuario.js</code>
                      </td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/5 transition-colors">
                      <td className="p-4 font-mono text-sm text-muted-foreground">
                        4
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        Backend genera JWT
                      </td>
                      <td className="p-4">
                        <code className="text-xs font-mono">
                          generateToken.js
                        </code>
                      </td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/5 transition-colors">
                      <td className="p-4 font-mono text-sm text-muted-foreground">
                        5
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        Frontend guarda JWT
                      </td>
                      <td className="p-4">
                        <code className="text-xs font-mono">localStorage</code>
                      </td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/5 transition-colors">
                      <td className="p-4 font-mono text-sm text-muted-foreground">
                        6
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        Frontend envía JWT en headers
                      </td>
                      <td className="p-4">
                        <code className="text-xs font-mono">
                          api.js (interceptor)
                        </code>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/5 transition-colors">
                      <td className="p-4 font-mono text-sm text-muted-foreground">
                        7
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        Backend verifica JWT
                      </td>
                      <td className="p-4">
                        <code className="text-xs font-mono">
                          authMiddleware.js
                        </code>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Estructura del Proyecto */}
      <ScrollReveal direction="up" delay={0.5}>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-semibold mb-3 text-foreground">
                Estructura del Proyecto
              </h2>
              <p className="text-muted-foreground">
                Organización de carpetas y archivos
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border/50 p-6">
              <pre className="text-sm font-mono text-muted-foreground overflow-x-auto">
                {`diplomatura-fullstack/
├── backend/
│   ├── src/
│   │   ├── config/         # Configuración (DB, variables)
│   │   ├── controllers/    # Lógica de negocio
│   │   ├── middlewares/    # Autenticación, roles
│   │   ├── models/         # Modelos MongoDB
│   │   ├── routes/         # Endpoints API
│   │   └── index.js        # Punto de entrada
│   └── .env                # Variables de entorno
│
└── frontend/
    ├── src/
    │   ├── components/     # Componentes reutilizables
    │   │   ├── admin/      # Panel administrativo
    │   │   ├── auth/       # Login/Registro
    │   │   ├── ui/         # shadcn/ui componentes
    │   │   └── visitante/  # Vistas públicas
    │   ├── contexts/       # Context API
    │   ├── hooks/          # Custom hooks
    │   ├── pages/          # Páginas de la app
    │   ├── services/       # Llamadas API
    │   └── utils/          # Utilidades
    └── .env                # Variables de entorno`}
              </pre>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Estructura de Base de Datos */}
      <ScrollReveal direction="up" delay={0.55}>
        <section className="py-16 bg-muted/10 border-y border-border/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-semibold mb-3 text-foreground">
                Base de Datos
              </h2>
              <p className="text-muted-foreground">
                Colecciones y relaciones en MongoDB
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Colecciones
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">usuarios</span>
                    <span className="text-xs text-muted-foreground">
                      Roles y autenticación
                    </span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">profesores</span>
                    <span className="text-xs text-muted-foreground">
                      Profesores de la diplomatura
                    </span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">modulos</span>
                    <span className="text-xs text-muted-foreground">
                      4 módulos principales
                    </span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">temas</span>
                    <span className="text-xs text-muted-foreground">
                      Temas de cada módulo
                    </span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">ejemplos</span>
                    <span className="text-xs text-muted-foreground">
                      Ejemplos prácticos
                    </span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      imagenes_ejemplos
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Imágenes de ejemplos
                    </span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      videos_ejemplos
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Videos de ejemplos
                    </span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      recursos_ejemplos
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Recursos externos
                    </span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      proyectos_finales
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Proyectos finales
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Relaciones
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>
                    • Un{" "}
                    <span className="text-foreground font-mono">profesor</span>{" "}
                    dicta muchos{" "}
                    <span className="text-foreground font-mono">módulos</span>
                  </li>
                  <li>
                    • Un{" "}
                    <span className="text-foreground font-mono">módulo</span>{" "}
                    tiene muchos{" "}
                    <span className="text-foreground font-mono">temas</span>
                  </li>
                  <li>
                    • Un <span className="text-foreground font-mono">tema</span>{" "}
                    tiene muchos{" "}
                    <span className="text-foreground font-mono">ejemplos</span>
                  </li>
                  <li>
                    • Un{" "}
                    <span className="text-foreground font-mono">ejemplo</span>{" "}
                    tiene muchas{" "}
                    <span className="text-foreground font-mono">imágenes</span>,{" "}
                    <span className="text-foreground font-mono">videos</span> y{" "}
                    <span className="text-foreground font-mono">recursos</span>
                  </li>
                  <li>
                    • Un{" "}
                    <span className="text-foreground font-mono">módulo</span>{" "}
                    tiene un{" "}
                    <span className="text-foreground font-mono">
                      proyecto final
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Instalación */}
      <ScrollReveal direction="up" delay={0.6}>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-semibold mb-3 text-foreground">
                Instalación
              </h2>
              <p className="text-muted-foreground">
                Pasos para ejecutar el proyecto localmente
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border/50 p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-medium text-foreground mb-2 flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> Backend
                  </h3>
                  <pre className="bg-muted/30 p-4 rounded-xl text-sm font-mono text-muted-foreground overflow-x-auto">
                    {`cd backend
npm install
npm run dev`}
                  </pre>
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground mb-2 flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> Frontend
                  </h3>
                  <pre className="bg-muted/30 p-4 rounded-xl text-sm font-mono text-muted-foreground overflow-x-auto">
                    {`cd frontend
npm install
npm run dev`}
                  </pre>
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground mb-2 flex items-center gap-2">
                    <Package className="w-4 h-4" /> Variables de entorno
                    necesarias
                  </h3>
                  <pre className="bg-muted/30 p-4 rounded-xl text-sm font-mono text-muted-foreground overflow-x-auto">
                    {`# Backend .env
PORT=5000
MONGODB_URI=tu_mongodb_uri
JWT_SECRET=tu_jwt_secret

# Frontend .env
VITE_API_URL=http://localhost:5000`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Enlaces útiles */}
      <ScrollReveal direction="up" delay={0.7}>
        <section className="py-16 bg-muted/10 border-y border-border/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-semibold mb-3 text-foreground">
                Enlaces útiles
              </h2>
              <p className="text-muted-foreground">
                Documentación y recursos externos
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://react.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors text-sm text-muted-foreground hover:text-foreground"
              >
                <Code className="w-4 h-4" /> React
              </a>
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors text-sm text-muted-foreground hover:text-foreground"
              >
                <Layout className="w-4 h-4" /> TailwindCSS
              </a>
              <a
                href="https://nodejs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors text-sm text-muted-foreground hover:text-foreground"
              >
                <Server className="w-4 h-4" /> Node.js
              </a>
              <a
                href="https://www.mongodb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors text-sm text-muted-foreground hover:text-foreground"
              >
                <Database className="w-4 h-4" /> MongoDB
              </a>
              <a
                href="https://ui.shadcn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors text-sm text-muted-foreground hover:text-foreground"
              >
                <Package className="w-4 h-4" /> shadcn/ui
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <Footer />
    </div>
  );
}
