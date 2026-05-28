import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FolderOpen } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { TemaCard } from '../../components/admin/Temas/TemaCard';
import { ProyectoFinalCard } from '../../components/admin/Temas/ProyectoFinalCard';
import { ProyectoFinalForm } from '../../components/admin/Temas/ProyectoFinalForm';
import { getModulos } from '../../services/moduloService';
import { getTemasByModulo } from '../../services/temaService';
import { getProyectoByModulo, createProyecto, updateProyecto, deleteProyecto } from '../../services/proyectoService';
import { useAuth } from '../../hooks/useAuth';
import { showSuccess, showError } from '../../services/notifications';
import Swal from 'sweetalert2';

export default function TemasAdminPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [modulos, setModulos] = useState([]);
  const [temasPorModulo, setTemasPorModulo] = useState({});
  const [selectedModulo, setSelectedModulo] = useState(null);
  const [proyecto, setProyecto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProyectoForm, setShowProyectoForm] = useState(false);
  const [selectedProyecto, setSelectedProyecto] = useState(null);

  const esAdmin = user?.rol === 'admin';

  const loadModulos = async () => {
    try {
      const data = await getModulos(1, 100, '');
      const modulosOrdenados = (data.modulos || []).sort((a, b) => a.orden - b.orden);
      setModulos(modulosOrdenados);
      if (modulosOrdenados.length > 0 && !selectedModulo) {
        setSelectedModulo(modulosOrdenados[0]);
      }
    } catch (error) {
      console.error('Error al cargar módulos:', error);
      showError('Error al cargar los módulos');
    }
  };

  const loadTemas = async () => {
    setLoading(true);
    try {
      const temasMap = {};
      for (const modulo of modulos) {
        const temas = await getTemasByModulo(modulo._id);
        const temasOrdenados = (temas || []).sort((a, b) => a.orden - b.orden);
        temasMap[modulo._id] = temasOrdenados;
      }
      setTemasPorModulo(temasMap);
    } catch (error) {
      console.error('Error al cargar temas:', error);
      showError('Error al cargar los temas');
    } finally {
      setLoading(false);
    }
  };

  const loadProyecto = async (moduloId) => {
    if (!moduloId) return;
    try {
      const data = await getProyectoByModulo(moduloId);
      setProyecto(data);
    } catch (error) {
      setProyecto(null);
    }
  };

  useEffect(() => {
    loadModulos();
  }, []);

  useEffect(() => {
    if (modulos.length > 0) {
      loadTemas();
    }
  }, [modulos]);

  useEffect(() => {
    if (selectedModulo) {
      loadProyecto(selectedModulo._id);
    }
  }, [selectedModulo]);

  const handleModuloClick = (modulo) => {
    setSelectedModulo(modulo);
  };

  const handleCreateProyecto = () => {
    setSelectedProyecto(null);
    setShowProyectoForm(true);
  };

  const handleEditProyecto = (proyecto) => {
    setSelectedProyecto(proyecto);
    setShowProyectoForm(true);
  };

  const handleSaveProyecto = async (proyectoData) => {
    try {
      if (selectedProyecto) {
        await updateProyecto(selectedProyecto._id, proyectoData);
        showSuccess('Proyecto actualizado correctamente', '✅ Actualizado');
      } else {
        await createProyecto(proyectoData);
        showSuccess('Proyecto creado correctamente', '✨ Creado');
      }
      await loadProyecto(selectedModulo._id);
      setShowProyectoForm(false);
      setSelectedProyecto(null);
    } catch (error) {
      showError(error.response?.data?.message || 'Error al guardar el proyecto');
    }
  };

  const handleDeleteProyecto = async (proyecto) => {
    const result = await Swal.fire({
      title: `¿Eliminar el proyecto "${proyecto.titulo}"?`,
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      iconColor: "#ef4444",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#000000",
      color: "#ffffff",
      confirmButtonColor: "#ffffff",
      cancelButtonColor: "#000000",
      customClass: {
        popup: "rounded-xl border border-red-500/30 shadow-xl",
        confirmButton: "rounded-lg px-4 py-2 font-medium border border-white/20 hover:bg-gray-100 transition-colors text-black",
        cancelButton: "rounded-lg px-4 py-2 font-medium border border-white/20 hover:bg-white/10 transition-colors text-white",
        actions: "gap-3",
        title: "text-xl font-semibold",
        htmlContainer: "text-gray-300",
      },
    });

    if (result.isConfirmed) {
      try {
        await deleteProyecto(proyecto._id);
        showSuccess(`Proyecto "${proyecto.titulo}" eliminado`, '🗑️ Eliminado');
        setProyecto(null);
      } catch (error) {
        showError('Error al eliminar el proyecto');
      }
    }
  };

  const temasActuales = selectedModulo ? temasPorModulo[selectedModulo._id] || [] : [];

  return (
    <div className="space-y-8 animate-fade-in-up p-6">
      {/* Header con botón nuevo tema */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Temas y Ejemplos</h1>
          <p className="text-sm text-muted-foreground">
            Explora los temas organizados por módulo
          </p>
        </div>
        {esAdmin && (
          <Button 
            onClick={() => navigate('/admin/temas/nuevo')} 
            className="gap-2 rounded-full"
          >
            <Plus className="w-4 h-4" />
            Nuevo Tema
          </Button>
        )}
      </div>

      {/* Filtro de módulos */}
      <div className="flex flex-wrap gap-3">
        {modulos.map((modulo) => (
          <button
            key={modulo._id}
            onClick={() => handleModuloClick(modulo)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedModulo?._id === modulo._id
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            Módulo {modulo.orden}
          </button>
        ))}
      </div>

      {/* Proyecto Final */}
      {selectedModulo && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Proyecto Final</h2>
            </div>
            {esAdmin && !proyecto && (
              <Button onClick={handleCreateProyecto} size="sm" className="gap-2 rounded-full">
                <Plus className="w-4 h-4" />
                Agregar Proyecto
              </Button>
            )}
          </div>

          {proyecto ? (
            <ProyectoFinalCard
              proyecto={proyecto}
              onEdit={handleEditProyecto}
              onDelete={handleDeleteProyecto}
              isAdmin={esAdmin}
            />
          ) : (
            <div className="bg-muted/20 rounded-xl border border-dashed border-border p-8 text-center">
              <p className="text-muted-foreground mb-2">No hay proyecto final para este módulo</p>
              {esAdmin && (
                <Button onClick={handleCreateProyecto} variant="outline" size="sm" className="gap-2 rounded-full">
                  <Plus className="w-4 h-4" />
                  Agregar Proyecto Final
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Separador */}
      {selectedModulo && (
        <div className="border-t border-border/50" />
      )}

      {/* Grid de temas */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 rounded-2xl bg-muted/30 animate-pulse" />
          ))}
        </div>
      ) : temasActuales.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground border rounded-2xl">
          No hay temas registrados para este módulo.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {temasActuales.map((tema) => (
            <TemaCard
              key={tema._id}
              tema={tema}
              moduloId={selectedModulo?._id}
            />
          ))}
        </div>
      )}

      {/* Modal de Proyecto Final */}
      {showProyectoForm && (
        <ProyectoFinalForm
          proyecto={selectedProyecto}
          moduloId={selectedModulo?._id}
          onSave={handleSaveProyecto}
          onClose={() => {
            setShowProyectoForm(false);
            setSelectedProyecto(null);
          }}
        />
      )}
    </div>
  );
}