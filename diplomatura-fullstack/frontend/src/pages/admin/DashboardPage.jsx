import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { 
  Users, 
  School, 
  BookOpen, 
  FolderTree, 
  TrendingUp, 
  Clock, 
  Eye, 
  PlusCircle, 
  List, 
  UserPlus,
  FileText,
  Video,
  Link as LinkIcon,
  Award,
  LayoutDashboard
} from 'lucide-react';
import { CardSkeleton, ChartSkeleton } from '../../components/ui/Skeleton';
import { getUsuarios } from '../../services/usuarioService';
import { getProfesores } from '../../services/profesorService';
import { getModulos } from '../../services/moduloService';
import { getTemas } from '../../services/temaService';
import { getEjemplos } from '../../services/ejemploService';

const statCards = [
  { title: 'Usuarios', valueKey: 'usuarios', icon: Users, gradient: 'from-blue-500 to-blue-600', link: '/admin/usuarios', color: 'text-blue-500' },
  { title: 'Profesores', valueKey: 'profesores', icon: School, gradient: 'from-green-500 to-green-600', link: '/admin/profesores', color: 'text-green-500' },
  { title: 'Módulos', valueKey: 'modulos', icon: BookOpen, gradient: 'from-purple-500 to-purple-600', link: '/admin/modulos', color: 'text-purple-500' },
  { title: 'Temas', valueKey: 'temas', icon: FolderTree, gradient: 'from-orange-500 to-orange-600', link: '/admin/temas', color: 'text-orange-500' },
];

const quickActions = [
  { icon: UserPlus, label: 'Nuevo Usuario', link: '/admin/usuarios', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { icon: School, label: 'Agregar Profesor', link: '/admin/profesores', color: 'text-green-500', bg: 'bg-green-500/10' },
  { icon: BookOpen, label: 'Crear Módulo', link: '/admin/modulos', color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { icon: FolderTree, label: 'Nuevo Tema', link: '/admin/temas', color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { icon: FileText, label: 'Ver Ejemplos', link: '/admin/temas', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { icon: Award, label: 'Proyectos', link: '/admin/modulos', color: 'text-pink-500', bg: 'bg-pink-500/10' },
];

const adminSections = [
  { icon: Users, label: 'Usuarios', link: '/admin/usuarios', description: 'Gestionar usuarios y roles', color: 'text-blue-500' },
  { icon: School, label: 'Profesores', link: '/admin/profesores', description: 'Administrar profesores', color: 'text-green-500' },
  { icon: BookOpen, label: 'Módulos', link: '/admin/modulos', description: 'Configurar módulos', color: 'text-purple-500' },
  { icon: FolderTree, label: 'Temas', link: '/admin/temas', description: 'Organizar temas', color: 'text-orange-500' },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState({
    usuarios: 0,
    profesores: 0,
    modulos: 0,
    temas: 0,
    ejemplos: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        // Cargar datos reales desde la API
        const [usuariosRes, profesoresRes, modulosRes, temasRes, ejemplosRes] = await Promise.allSettled([
          getUsuarios(1, 1, ''),
          getProfesores(1, 100, ''),
          getModulos(1, 100, ''),
          getTemas(1, 100, ''),
          getEjemplos(1, 100, '')
        ]);

        const usuarios = usuariosRes.status === 'fulfilled' ? usuariosRes.value.total || 0 : 0;
        const profesores = profesoresRes.status === 'fulfilled' ? (profesoresRes.value.profesores?.length || 0) : 0;
        const modulos = modulosRes.status === 'fulfilled' ? (modulosRes.value.modulos?.length || 0) : 0;
        const temas = temasRes.status === 'fulfilled' ? (temasRes.value.total || 0) : 0;
        const ejemplos = ejemplosRes.status === 'fulfilled' ? (ejemplosRes.value.total || 0) : 0;

        setStatsData({
          usuarios,
          profesores,
          modulos,
          temas,
          ejemplos,
        });
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1 animate-pulse">Cargando estadísticas...</p>
        </div>
        <CardSkeleton />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Bienvenido al panel de administración</p>
        </div>
        <Link
          to="/"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-200"
        >
          <Eye className="w-4 h-4" />
          Ver sitio web
        </Link>
      </div>
      
      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Link key={stat.title} to={stat.link}>
            <Card className="overflow-hidden border-border/50 hover:shadow-md transition-all duration-300 cursor-pointer group">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient}/10 group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statsData[stat.valueKey]}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Total registrados
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Fila adicional con más estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ejemplos
            </CardTitle>
            <div className="p-2 rounded-lg bg-cyan-500/10">
              <FileText className="w-4 h-4 text-cyan-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.ejemplos}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Ejemplos prácticos
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Proyectos Finales
            </CardTitle>
            <div className="p-2 rounded-lg bg-pink-500/10">
              <Award className="w-4 h-4 text-pink-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.modulos}</div>
            <p className="text-xs text-muted-foreground mt-1">
              1 por módulo
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Visitas al sitio
            </CardTitle>
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <LayoutDashboard className="w-4 h-4 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">---</div>
            <p className="text-xs text-muted-foreground mt-1">
              Próximamente
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Acciones rápidas y acceso a secciones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Acciones Rápidas */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <PlusCircle className="w-4 h-4 text-primary" />
              Acciones Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {quickActions.map((action, i) => (
                <Link
                  key={i}
                  to={action.link}
                  className="group flex flex-col items-center gap-2 p-3 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 hover:scale-105"
                >
                  <div className={`p-2 rounded-lg ${action.bg} group-hover:scale-110 transition-transform`}>
                    <action.icon className={`w-4 h-4 ${action.color}`} />
                  </div>
                  <span className="text-xs font-medium text-center">{action.label}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Acceso directo a secciones */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <List className="w-4 h-4 text-primary" />
              Gestión Rápida
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {adminSections.map((section, i) => (
                <Link
                  key={i}
                  to={section.link}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group"
                >
                  <div className={`p-2 rounded-lg bg-primary/5 group-hover:scale-110 transition-transform`}>
                    <section.icon className={`w-4 h-4 ${section.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{section.label}</p>
                    <p className="text-xs text-muted-foreground">{section.description}</p>
                  </div>
                  <TrendingUp className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actividad Reciente (placeholder) */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="w-4 h-4 text-primary" />
            Actividad Reciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors p-2 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Actividad reciente #{i}</p>
                  <p className="text-xs text-muted-foreground">Próximamente</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500">
                  En desarrollo
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}