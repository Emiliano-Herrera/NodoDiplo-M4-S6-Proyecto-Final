import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Users, School, BookOpen, FolderTree, TrendingUp, Clock } from 'lucide-react';
import { CardSkeleton, ChartSkeleton } from '../../components/ui/Skeleton';

const stats = [
  { title: 'Usuarios', valueKey: 'usuarios', icon: Users, gradient: 'from-blue-500 to-blue-600' },
  { title: 'Profesores', valueKey: 'profesores', icon: School, gradient: 'from-green-500 to-green-600' },
  { title: 'Módulos', valueKey: 'modulos', icon: BookOpen, gradient: 'from-purple-500 to-purple-600' },
  { title: 'Temas', valueKey: 'temas', icon: FolderTree, gradient: 'from-orange-500 to-orange-600' },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState({
    usuarios: 0,
    profesores: 0,
    modulos: 0,
    temas: 0,
  });

  useEffect(() => {
    // Simular carga de datos (después conectar con API real)
    const loadStats = async () => {
      setLoading(true);
      try {
        // Aquí después llamar a la API real
        await new Promise(resolve => setTimeout(resolve, 800));
        setStatsData({
          usuarios: 12,
          profesores: 3,
          modulos: 4,
          temas: 18,
        });
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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Bienvenido al panel de administración</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="overflow-hidden border-border/50 hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient}/10`}>
                <stat.icon className={`w-4 h-4 text-${stat.gradient.split(' ')[1]}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsData[stat.valueKey]}</div>
              <p className="text-xs text-muted-foreground mt-1">
                +0% desde el mes pasado
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    <p className="text-sm font-medium">Actividad #{i}</p>
                    <p className="text-xs text-muted-foreground">Hace {i} hora(s)</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500">
                    Completado
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="w-4 h-4 text-primary" />
              Acciones Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Users, label: 'Nuevo Usuario', color: 'text-blue-500' },
                { icon: School, label: 'Agregar Profesor', color: 'text-green-500' },
                { icon: BookOpen, label: 'Crear Módulo', color: 'text-purple-500' },
                { icon: FolderTree, label: 'Nuevo Tema', color: 'text-orange-500' },
              ].map((action, i) => (
                <button
                  key={i}
                  className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 hover:scale-105"
                >
                  <action.icon className={`w-5 h-5 ${action.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-xs font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}