import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, FolderOpen, FileText, Award } from 'lucide-react';
import { getTemasByModulo } from '../../services/temaService';
import { getProyectoByModulo } from '../../services/proyectoService';

export function ModulosSidebar({ modulos, selectedModulo, onSelectModulo, onSelectTema, onSelectProyecto, selectedTemaId, selectedProyectoId }) {
  const [expandedModules, setExpandedModules] = useState({});
  const [temasPorModulo, setTemasPorModulo] = useState({});
  const [proyectosPorModulo, setProyectosPorModulo] = useState({});
  const [loading, setLoading] = useState({});
  const [loadingProyecto, setLoadingProyecto] = useState({});

  // Cargar temas cuando se expande un módulo
  useEffect(() => {
    const loadTemas = async (moduloId) => {
      if (temasPorModulo[moduloId]) return;
      
      setLoading(prev => ({ ...prev, [moduloId]: true }));
      try {
        const temas = await getTemasByModulo(moduloId);
        setTemasPorModulo(prev => ({ ...prev, [moduloId]: temas }));
      } catch (error) {
        console.error('Error al cargar temas:', error);
      } finally {
        setLoading(prev => ({ ...prev, [moduloId]: false }));
      }
    };

    const loadProyecto = async (moduloId) => {
      if (proyectosPorModulo[moduloId] !== undefined) return;
      
      setLoadingProyecto(prev => ({ ...prev, [moduloId]: true }));
      try {
        const proyecto = await getProyectoByModulo(moduloId);
        setProyectosPorModulo(prev => ({ ...prev, [moduloId]: proyecto }));
      } catch (error) {
        console.error('Error al cargar proyecto:', error);
        setProyectosPorModulo(prev => ({ ...prev, [moduloId]: null }));
      } finally {
        setLoadingProyecto(prev => ({ ...prev, [moduloId]: false }));
      }
    };

    if (selectedModulo && !temasPorModulo[selectedModulo._id]) {
      loadTemas(selectedModulo._id);
    }
    if (selectedModulo && proyectosPorModulo[selectedModulo._id] === undefined) {
      loadProyecto(selectedModulo._id);
    }
  }, [selectedModulo, temasPorModulo, proyectosPorModulo]);

  const toggleModule = (moduloId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduloId]: !prev[moduloId]
    }));
    
    // Cargar temas si no están cargados
    if (!temasPorModulo[moduloId]) {
      const loadTemas = async () => {
        setLoading(prev => ({ ...prev, [moduloId]: true }));
        try {
          const temas = await getTemasByModulo(moduloId);
          setTemasPorModulo(prev => ({ ...prev, [moduloId]: temas }));
        } catch (error) {
          console.error('Error al cargar temas:', error);
        } finally {
          setLoading(prev => ({ ...prev, [moduloId]: false }));
        }
      };
      loadTemas();
    }
    
    // Cargar proyecto si no está cargado
    if (proyectosPorModulo[moduloId] === undefined) {
      const loadProyecto = async () => {
        setLoadingProyecto(prev => ({ ...prev, [moduloId]: true }));
        try {
          const proyecto = await getProyectoByModulo(moduloId);
          setProyectosPorModulo(prev => ({ ...prev, [moduloId]: proyecto }));
        } catch (error) {
          setProyectosPorModulo(prev => ({ ...prev, [moduloId]: null }));
        } finally {
          setLoadingProyecto(prev => ({ ...prev, [moduloId]: false }));
        }
      };
      loadProyecto();
    }
  };

  // Expandir automáticamente el módulo seleccionado
  useEffect(() => {
    if (selectedModulo && !expandedModules[selectedModulo._id]) {
      setExpandedModules(prev => ({ ...prev, [selectedModulo._id]: true }));
    }
  }, [selectedModulo]);

  return (
    <aside className="w-80 bg-card h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Contenido</h2>
        <p className="text-xs text-muted-foreground">Módulos de la diplomatura</p>
      </div>

      <nav className="px-2 py-2 space-y-1">
        {modulos.map((modulo) => {
          const isExpanded = expandedModules[modulo._id];
          const isSelected = selectedModulo?._id === modulo._id;
          const temas = temasPorModulo[modulo._id] || [];
          const proyecto = proyectosPorModulo[modulo._id];
          const isLoading = loading[modulo._id];
          const isLoadingProyecto = loadingProyecto[modulo._id];

          return (
            <div key={modulo._id} className="space-y-1">
              {/* Encabezado del módulo */}
              <button
                onClick={() => {
                  onSelectModulo(modulo);
                  toggleModule(modulo._id);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                  isSelected
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-4 h-4" />
                  <span className="text-sm">Módulo {modulo.orden}: {modulo.nombre}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {/* Temas y Proyecto Final del módulo (expandido) */}
              {isExpanded && (
                <div className="ml-6 space-y-1">
                  {isLoading ? (
                    <div className="p-2 text-xs text-muted-foreground animate-pulse">
                      Cargando temas...
                    </div>
                  ) : temas.length === 0 ? (
                    <div className="p-2 text-xs text-muted-foreground">
                      No hay temas disponibles
                    </div>
                  ) : (
                    <>
                      {/* Temas normales */}
                      {temas.map((tema) => (
                        <button
                          key={tema._id}
                          onClick={() => onSelectTema(tema)}
                          className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all duration-200 text-sm ${
                            selectedTemaId === tema._id && !selectedProyectoId
                              ? 'bg-primary/10 text-primary'
                              : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                          }`}
                        >
                          <FileText className="w-3 h-3" />
                          <span>{tema.titulo}</span>
                        </button>
                      ))}
                      
                      {/* Separador */}
                      <div className="my-2 border-t border-border/50" />
                      
                      {/* Proyecto Final */}
                      {isLoadingProyecto ? (
                        <div className="p-2 text-xs text-muted-foreground animate-pulse">
                          Cargando proyecto final...
                        </div>
                      ) : proyecto ? (
                        <button
                          onClick={() => onSelectProyecto(proyecto)}
                          className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all duration-200 text-sm ${
                            selectedProyectoId === proyecto._id
                              ? 'bg-primary/10 text-primary'
                              : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                          }`}
                        >
                          <Award className="w-3 h-3" />
                          <span>Proyecto Final</span>
                        </button>
                      ) : (
                        <div className="p-2 text-xs text-muted-foreground opacity-50">
                          No hay proyecto final disponible.
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}