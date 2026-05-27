import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ModuloCard } from "../../components/admin/modulos/ModuloCard";
import { ModuloForm } from "../../components/admin/modulos/ModuloForm";
import {
  getModulos,
  createModulo,
  updateModulo,
  deleteModulo,
} from "../../services/moduloService";
import { getProfesores } from "../../services/profesorService";
import { getTemasByModulo } from "../../services/temaService";
import { useAuth } from "../../hooks/useAuth";
import { showSuccess, showError } from "../../services/notifications";

export default function ModulosAdminPage() {
  const [modulos, setModulos] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [temasPorModulo, setTemasPorModulo] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedModulo, setSelectedModulo] = useState(null);
  const { user } = useAuth();

  const loadProfesores = async () => {
    try {
      const data = await getProfesores(1, 100, "");
      setProfesores(data.profesores || []);
    } catch (error) {
      console.error("Error al cargar profesores:", error);
    }
  };

  const loadModulos = async () => {
    setLoading(true);
    try {
      const data = await getModulos(1, 100, search);
      console.log("📦 Datos completos de módulos:", data);

      const modulosOrdenados = (data.modulos || []).sort(
        (a, b) => a.orden - b.orden,
      );

      setModulos(modulosOrdenados);
      
      // Cargar temas para CADA módulo INMEDIATAMENTE
      const temasPromises = modulosOrdenados.map(async (modulo) => {
        try {
          const temas = await getTemasByModulo(modulo._id);
          const temasOrdenados = (temas || []).sort((a, b) => a.orden - b.orden);
          return { moduloId: modulo._id, temas: temasOrdenados };
        } catch (error) {
          console.error(`Error al cargar temas del módulo ${modulo._id}:`, error);
          return { moduloId: modulo._id, temas: [] };
        }
      });
      
      const resultados = await Promise.all(temasPromises);
      
      const nuevoEstado = {};
      resultados.forEach(({ moduloId, temas }) => {
        nuevoEstado[moduloId] = temas;
      });
      
      setTemasPorModulo(nuevoEstado);
      
    } catch (error) {
      console.error("Error al cargar módulos:", error);
      showError("Error al cargar los módulos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfesores();
    loadModulos();
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCreate = () => {
    setSelectedModulo(null);
    setShowForm(true);
  };

  /* const handleEdit = (modulo) => {
    setSelectedModulo(modulo);
    setShowForm(true);
  }; */

  const handleEdit = (modulo) => {
  console.log("📝 handleEdit llamado con:", modulo);
  setSelectedModulo(modulo);
  setShowForm(true);
};


  const getProfesorNombre = (profesor) => {
    if (!profesor) return null;
    if (typeof profesor === "object" && profesor.nombre) {
      return profesor.nombre;
    }
    if (typeof profesor === "string" && profesor) {
      const encontrado = profesores.find((p) => p._id === profesor);
      return encontrado ? encontrado.nombre : null;
    }
    return null;
  };

  const handleSave = async (moduloData) => {
    console.log("handleSave llamado con:", moduloData);
    try {
      if (selectedModulo) {
        await updateModulo(selectedModulo._id, moduloData);
        showSuccess('Módulo actualizado correctamente', '✅ Actualizado');
      } else {
        await createModulo(moduloData);
        showSuccess('Módulo creado correctamente', '✨ Creado');
      }
      await loadModulos();
      await loadProfesores();
    } catch (error) {
      console.error("Error en handleSave:", error);
      showError(error.response?.data?.message || 'Error al guardar el módulo');
    }
  };

  const handleDelete = async (modulo) => {
    const result = await Swal.fire({
      title: `¿Eliminar el módulo "${modulo.nombre}"?`,
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
        confirmButton:
          "rounded-lg px-4 py-2 font-medium border border-white/20 hover:bg-gray-100 transition-colors text-black",
        cancelButton:
          "rounded-lg px-4 py-2 font-medium border border-white/20 hover:bg-white/10 transition-colors text-white",
        actions: "gap-3",
        title: "text-xl font-semibold",
        htmlContainer: "text-gray-300",
      },
    });

    if (result.isConfirmed) {
      try {
        await deleteModulo(modulo._id);
        showSuccess(`Módulo "${modulo.nombre}" eliminado`, "🗑️ Eliminado");

        await Swal.fire({
          title: "¡Eliminado!",
          text: `El módulo "${modulo.nombre}" ha sido eliminado correctamente`,
          icon: "success",
          iconColor: "#22c55e",
          background: "#000000",
          color: "#ffffff",
          confirmButtonColor: "#ffffff",
          confirmButtonTextColor: "#000000",
          customClass: {
            popup: "rounded-xl border border-green-500/30 shadow-xl",
            confirmButton:
              "rounded-lg px-4 py-2 font-medium border border-white/20 hover:bg-gray-100 transition-colors text-black",
            title: "text-xl font-semibold",
            htmlContainer: "text-gray-300",
          },
        });

        loadModulos();
      } catch (error) {
        showError("Error al eliminar el módulo");
      }
    }
  };

  const esAdmin = user?.rol === "admin";
  console.log("👑 ¿Es admin?", esAdmin, "Rol:", user?.rol);
  
  const hayModulosCompletos = modulos.length >= 4;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Módulos</h1>
          <p className="text-muted-foreground mt-1">
            Los 4 módulos de la diplomatura ({modulos.length}/4)
          </p>
        </div>
        {esAdmin && !hayModulosCompletos && (
          <Button onClick={handleCreate} className="gap-2 rounded-full">
            <Plus className="w-4 h-4" />
            Nuevo Módulo
          </Button>
        )}
      </div>

      <div className="relative max-w-md">
        <Input
          placeholder="Buscar módulo por nombre..."
          value={search}
          onChange={handleSearch}
          className="rounded-full"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-muted/30 animate-pulse"
            />
          ))}
        </div>
      ) : modulos.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No hay módulos registrados. Los módulos se mostrarán aquí.
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence>
            {modulos.map((modulo) => (
              <ModuloCard
                key={modulo._id}
                modulo={modulo}
                profesorNombre={getProfesorNombre(modulo.profesor_id)}
                temas={temasPorModulo[modulo._id] || []}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isAdmin={esAdmin}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {showForm && (
        <ModuloForm
          modulo={selectedModulo}
          profesores={profesores}
          modulosExistentes={modulos}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}