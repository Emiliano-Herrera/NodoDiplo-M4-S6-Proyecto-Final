import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { EjemploCard } from '../../components/admin/Ejemplos/EjemploCard';
import { EjemploForm } from '../../components/admin/Ejemplos/EjemploForm';
import { getTemaById, deleteTema } from '../../services/temaService';
import { getModuloById } from '../../services/moduloService';
import { getEjemplosByTema, createEjemplo, updateEjemplo, deleteEjemplo } from '../../services/ejemploService';
import { useAuth } from '../../hooks/useAuth';
import { showSuccess, showError } from '../../services/notifications';
import Swal from 'sweetalert2';

export default function TemaDetailPage() {
  const { temaId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tema, setTema] = useState(null);
  const [modulo, setModulo] = useState(null);
  const [ejemplos, setEjemplos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showEjemploForm, setShowEjemploForm] = useState(false);
  const [selectedEjemplo, setSelectedEjemplo] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const temaData = await getTemaById(temaId);
      setTema(temaData);
      
      if (temaData?.modulo_id) {
        const moduloData = await getModuloById(temaData.modulo_id);
        setModulo(moduloData);
      }
      
      const ejemplosData = await getEjemplosByTema(temaId);
      setEjemplos(ejemplosData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      showError('Error al cargar el tema');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (temaId) {
      loadData();
    }
  }, [temaId]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: `¿Eliminar el tema "${tema?.titulo}"?`,
      text: "Esta acción no se puede deshacer. Los ejemplos asociados también se eliminarán.",
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
        await deleteTema(temaId);
        showSuccess(`Tema "${tema?.titulo}" eliminado`, '🗑️ Eliminado');
        navigate('/admin/temas');
      } catch (error) {
        showError('Error al eliminar el tema');
      }
    }
  };

  const handleCreateEjemplo = () => {
    setSelectedEjemplo(null);
    setShowEjemploForm(true);
  };

  const handleEditEjemplo = (ejemplo) => {
    setSelectedEjemplo(ejemplo);
    setShowEjemploForm(true);
  };

  const handleDeleteEjemplo = async (ejemplo) => {
    const result = await Swal.fire({
      title: `¿Eliminar el ejemplo "${ejemplo.titulo}"?`,
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
        await deleteEjemplo(ejemplo._id);
        showSuccess(`Ejemplo "${ejemplo.titulo}" eliminado`, '🗑️ Eliminado');
        loadData();
      } catch (error) {
        showError('Error al eliminar el ejemplo');
      }
    }
  };

  const handleSaveEjemplo = async (ejemploData) => {
    try {
      if (selectedEjemplo) {
        await updateEjemplo(selectedEjemplo._id, ejemploData);
        showSuccess('Ejemplo actualizado correctamente', '✅ Actualizado');
      } else {
        await createEjemplo(ejemploData);
        showSuccess('Ejemplo creado correctamente', '✨ Creado');
      }
      loadData();
      setShowEjemploForm(false);
      setSelectedEjemplo(null);
    } catch (error) {
      console.error('Error al guardar ejemplo:', error);
      showError(error.response?.data?.message || 'Error al guardar el ejemplo');
    }
  };

  const esAdmin = user?.rol === 'admin';

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/admin/temas')}
            className="gap-2 rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
          <div>
            <div className="flex items-center gap-2">
              {modulo && (
                <Badge variant="outline" className="font-mono">
                  Módulo {modulo.orden}
                </Badge>
              )}
              <Badge variant="outline" className="font-mono">
                Tema {tema?.orden}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight mt-2">{tema?.titulo}</h1>
          </div>
        </div>
        {esAdmin && (
          <div className="flex gap-2">
            <Button 
              onClick={() => navigate(`/admin/temas/${temaId}/editar`)} 
              variant="outline" 
              className="gap-2 rounded-full"
            >
              <Edit className="w-4 h-4" />
              Editar
            </Button>
            <Button onClick={handleDelete} variant="destructive" className="gap-2 rounded-full">
              <Trash2 className="w-4 h-4" />
              Eliminar
            </Button>
          </div>
        )}
      </div>

      {/* Contenido del tema */}
      <div className="bg-card rounded-2xl border border-border/50 p-6">
        <div
          className="prose prose-sm dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: tema?.contenido || 'Sin contenido' }}
        />
      </div>

      {/* Sección de ejemplos */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Ejemplos</h2>
          {esAdmin && (
            <Button 
              onClick={handleCreateEjemplo} 
              size="sm"
              className="gap-2 rounded-full"
            >
              <Plus className="w-4 h-4" />
              Agregar Ejemplo
            </Button>
          )}
        </div>
        
        {ejemplos.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border/50 p-8 text-center text-muted-foreground">
            No hay ejemplos para este tema. Haz clic en "Agregar Ejemplo" para crear uno.
          </div>
        ) : (
          <div className="space-y-8">
            {ejemplos.map((ejemplo) => (
              <EjemploCard
                key={ejemplo._id}
                ejemplo={ejemplo}
                onEdit={() => handleEditEjemplo(ejemplo)}
                onDelete={() => handleDeleteEjemplo(ejemplo)}
                isAdmin={esAdmin}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal para crear/editar ejemplos */}
      {showEjemploForm && (
        <EjemploForm
          ejemplo={selectedEjemplo}
          temaId={temaId}
          onSave={handleSaveEjemplo}
          onClose={() => {
            setShowEjemploForm(false);
            setSelectedEjemplo(null);
          }}
        />
      )}
    </div>
  );
}