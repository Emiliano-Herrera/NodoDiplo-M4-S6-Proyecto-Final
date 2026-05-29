import { useState, useEffect } from 'react';
import { Navbar } from '../../components/visitante/Navbar';
import { Footer } from '../../components/visitante/Footer';
import { ModulosSidebar } from '../../components/visitante/ModulosSidebar';
import { ModuloContent } from '../../components/visitante/ModuloContent';
import { getModulos } from '../../services/moduloService';
import { getTemaById } from '../../services/temaService';
import { Menu } from 'lucide-react';

export default function ModulosPage() {
  const [modulos, setModulos] = useState([]);
  const [selectedModulo, setSelectedModulo] = useState(null);
  const [selectedTema, setSelectedTema] = useState(null);
  const [selectedProyecto, setSelectedProyecto] = useState(null);
  const [tipoContenido, setTipoContenido] = useState('tema');
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const loadModulos = async () => {
      setLoading(true);
      try {
        const data = await getModulos(1, 100, '');
        const modulosOrdenados = (data.modulos || []).sort((a, b) => a.orden - b.orden);
        setModulos(modulosOrdenados);
        
        if (modulosOrdenados.length > 0) {
          setSelectedModulo(modulosOrdenados[0]);
        }
      } catch (error) {
        console.error('Error al cargar módulos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadModulos();
  }, []);

  const handleSelectModulo = (modulo) => {
    setSelectedModulo(modulo);
    setSelectedTema(null);
    setSelectedProyecto(null);
    setTipoContenido('tema');
    setSidebarOpen(false); // Cerrar sidebar en móvil al seleccionar
  };

  const handleSelectTema = async (tema) => {
    setTipoContenido('tema');
    setSelectedProyecto(null);
    
    if (tema && tema._id) {
      setSelectedTema(tema);
    } else if (tema && typeof tema === 'string') {
      const temaCompleto = await getTemaById(tema);
      setSelectedTema(temaCompleto);
    }
    setSidebarOpen(false); // Cerrar sidebar en móvil al seleccionar
  };

  const handleSelectProyecto = (proyecto) => {
    setTipoContenido('proyecto');
    setSelectedTema(null);
    setSelectedProyecto(proyecto);
    setSidebarOpen(false); // Cerrar sidebar en móvil al seleccionar
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 flex-1">
        {/* Botón para abrir sidebar en móvil */}
        <div className="lg:hidden sticky top-16 z-20 bg-background py-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <Menu className="w-5 h-5" />
            <span className="text-sm font-medium">Contenido del módulo</span>
          </button>
        </div>

        <div className="flex py-6 gap-6">
          {/* Sidebar - Desktop siempre visible, Mobile overlay */}
          <div className={`
            fixed inset-0 z-30 lg:relative lg:inset-auto lg:z-auto
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            {/* Overlay oscuro en móvil */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/50 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            
            {/* Sidebar content */}
            <div className="relative w-80 h-full bg-card lg:bg-transparent shadow-xl lg:shadow-none">
              <ModulosSidebar
                modulos={modulos}
                selectedModulo={selectedModulo}
                onSelectModulo={handleSelectModulo}
                onSelectTema={handleSelectTema}
                onSelectProyecto={handleSelectProyecto}
                selectedTemaId={selectedTema?._id}
                selectedProyectoId={selectedProyecto?._id}
              />
            </div>
          </div>
          
          {/* Área de contenido - Responsive */}
          <div className="flex-1 overflow-hidden w-full">
            <ModuloContent 
              tema={selectedTema} 
              proyecto={selectedProyecto}
              tipoContenido={tipoContenido} 
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}