import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  School, 
  BookOpen, 
  FolderTree,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  Home,
  User,
  Shield,
  Edit
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { useAuth } from '../../../hooks/useAuth';

const menuItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/usuarios', icon: Users, label: 'Usuarios' },
  { path: '/admin/profesores', icon: School, label: 'Profesores' },
  { path: '/admin/modulos', icon: BookOpen, label: 'Módulos' },
  { path: '/admin/temas', icon: FolderTree, label: 'Temas' },
];

// Función para obtener el icono del rol
const getRoleIcon = (rol) => {
  switch (rol) {
    case 'admin':
      return <Shield className="w-4 h-4 text-red-500" />;
    case 'editor':
      return <Edit className="w-4 h-4 text-blue-500" />;
    default:
      return <User className="w-4 h-4 text-green-500" />;
  }
};

// Función para obtener el nombre del rol en español
const getRoleName = (rol) => {
  switch (rol) {
    case 'admin':
      return 'Administrador';
    case 'editor':
      return 'Editor';
    default:
      return 'Visitante';
  }
};

export function Sidebar() {
  const { darkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleGoToVisitante = () => {
    navigate('/');
  };

  const SidebarContent = ({ isMobile }) => (
    <>
      {/* Header con logo y theme switch */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60" />
          <div>
            <h1 className="text-sm font-bold tracking-tight">Admin Panel</h1>
            <p className="text-[10px] text-muted-foreground">Diplomatura FS</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted/50 transition-all duration-200"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          {isMobile && (
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-muted/50 transition-all duration-200 lg:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Perfil del usuario logueado */}
      {user && (
        <div className="mx-4 mt-4 p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">
                {user.nombre?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {user.nombre || 'Usuario'}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email || 'sin email'}
              </p>
              <div className="flex items-center gap-1 mt-1">
                {getRoleIcon(user.rol)}
                <span className="text-xs font-medium text-muted-foreground">
                  {getRoleName(user.rol)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navegación principal */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-base font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer con botón visitante y logout */}
      <div className="px-4 py-4 border-t border-border/50 space-y-2">
        {/* Botón para ir a la vista de visitante */}
        <button
          onClick={handleGoToVisitante}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-base font-medium text-primary hover:bg-primary/10 transition-all duration-200"
        >
          <Home className="w-5 h-5" />
          <span>Ver sitio web</span>
        </button>

        {/* Botón de cerrar sesión */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-base font-medium text-red-500 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </>
  );

  // Versión para móvil (sidebar flotante)
  if (isMobile) {
    return (
      <>
        {/* Botón hamburguesa */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border/50 shadow-lg hover:bg-muted/50 transition-all duration-200 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar móvil */}
        <aside
          className={`
            fixed top-0 left-0 z-50 h-full w-80 bg-card/95 backdrop-blur-md 
            border-r border-border/50 shadow-2xl transition-transform duration-300 ease-out
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:hidden
          `}
        >
          <SidebarContent isMobile={true} />
        </aside>
      </>
    );
  }

  // Versión para desktop (sidebar fijo)
  return (
    <aside className="w-80 h-[calc(100vh-2rem)] sticky top-4 flex flex-col shrink-0 border border-border/50 bg-card/60 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden ml-8 lg:flex">
      <SidebarContent isMobile={false} />
    </aside>
  );
}