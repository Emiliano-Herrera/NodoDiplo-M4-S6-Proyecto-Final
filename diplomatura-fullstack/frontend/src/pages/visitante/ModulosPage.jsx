import { useState, useEffect } from 'react';
import { Navbar } from '../../components/visitante/Navbar';
import { Footer } from '../../components/visitante/Footer';
import { ModulosSidebar } from '../../components/visitante/ModulosSidebar';
import { ModuloContent } from '../../components/visitante/ModuloContent';
import { getModulos } from '../../services/moduloService';
import { getTemaById } from '../../services/temaService';

export default function ModulosPage() {
  const [modulos, setModulos] = useState([]);
  const [selectedModulo, setSelectedModulo] = useState(null);
  const [selectedTema, setSelectedTema] = useState(null);
  const [selectedProyecto, setSelectedProyecto] = useState(null);
  const [tipoContenido, setTipoContenido] = useState('tema'); // 'tema' o 'proyecto'
  const [loading, setLoading] = useState(true);

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
  };

  const handleSelectProyecto = (proyecto) => {
    setTipoContenido('proyecto');
    setSelectedTema(null);
    setSelectedProyecto(proyecto);
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
        <div className="flex py-6 gap-6">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0">
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
          
          {/* Área de contenido */}
          <div className="flex-1 overflow-hidden">
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