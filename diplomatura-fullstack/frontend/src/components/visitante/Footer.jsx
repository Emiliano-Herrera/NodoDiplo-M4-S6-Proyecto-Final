import { Link } from 'react-router-dom';
import { SiGithub, SiInstagram } from '@icons-pack/react-simple-icons';
import { Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60" />
              <span className="font-bold text-lg">FullStack</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              La diplomatura más completa para convertirte en desarrollador fullstack.
              Domina las tecnologías más demandadas del mercado.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-semibold mb-3">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/modulos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Módulos
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/documentacion" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Documentación
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="font-semibold mb-3">Síguenos</h3>
            <div className="flex gap-3">
              <a
                href="https://github.com/Emiliano-Herrera"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                aria-label="GitHub"
              >
                <SiGithub className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/elemy701/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:emilianoherrera701@gmail.com"
                className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-6 text-center text-xs text-muted-foreground">
          <p>© {currentYear} Diplomatura Fullstack - Todos los derechos reservados a Emiliano Olivera Herrera</p>
        </div>
      </div>
    </footer>
  );
}