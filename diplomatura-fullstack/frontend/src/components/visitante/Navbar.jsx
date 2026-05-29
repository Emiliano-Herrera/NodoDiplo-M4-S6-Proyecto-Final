import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User, Sun, Moon, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';

const navItems = [
  { name: 'Inicio', path: '/' },
  { name: 'Módulos', path: '/modulos' },
  { name: 'Diplomatura', path: '/diplomatura' },
  { name: 'Documentación', path: '/documentacion' },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const handleGoToAdmin = () => {
    navigate('/admin');
    setMobileMenuOpen(false);
  };

  // Verificar si el usuario es admin o editor
  const canAccessAdmin = user && (user.rol === 'admin' || user.rol === 'editor');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60" />
            <span className="font-bold text-lg">FullStack</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Section: Theme Toggle + Admin Button + User/Auth */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              title={darkMode ? 'Modo claro' : 'Modo oscuro'}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Admin Button (solo para admin/editor) */}
            {canAccessAdmin && (
              <button
                onClick={handleGoToAdmin}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                title="Panel de administración"
              >
                <LayoutDashboard className="w-4 h-4" />
              </button>
            )}

            {/* User / Auth */}
            {user ? (
              <div className="flex items-center gap-3 ml-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium">{user.nombre?.[0]?.toUpperCase()}</span>
                  </div>
                  <span className="text-sm">{user.nombre}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all ml-2"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-card/95 backdrop-blur-md">
          <nav className="flex flex-col p-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Theme Toggle en móvil */}
            <button
              onClick={() => {
                toggleTheme();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {darkMode ? 'Modo claro' : 'Modo oscuro'}
            </button>

            {/* Admin Button en móvil (solo para admin/editor) */}
            {canAccessAdmin && (
              <button
                onClick={handleGoToAdmin}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Panel Admin
              </button>
            )}

            {user ? (
              <>
                <div className="flex items-center gap-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium">{user.nombre?.[0]?.toUpperCase()}</span>
                  </div>
                  <span className="text-sm">{user.nombre}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-left text-sm text-red-500 py-2 hover:bg-red-500/10 rounded-lg px-2 transition-colors"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium text-center"
              >
                Iniciar Sesión
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}