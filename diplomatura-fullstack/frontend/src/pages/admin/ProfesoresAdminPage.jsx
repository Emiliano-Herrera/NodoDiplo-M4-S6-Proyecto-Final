import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Swal from "sweetalert2";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ProfesorTableAdvanced } from "../../components/admin/profesores/ProfesorTableAdvanced.jsx";
import { ProfesorForm } from "../../components/admin/profesores/ProfesorForm.jsx";
import {
  getProfesores,
  createProfesor,
  updateProfesor,
  deleteProfesor,
} from "../../services/profesorService";
import { getModulos } from "../../services/moduloService";
import { useAuth } from "../../hooks/useAuth";
import { TableSkeleton } from "../../components/ui/Skeleton";
import { showSuccess, showError } from "../../services/notifications";

export default function ProfesoresAdminPage() {
  const [profesores, setProfesores] = useState([]);
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [selectedProfesor, setSelectedProfesor] = useState(null);
  const { user } = useAuth();

  const limit = 10;

  const loadModulos = async () => {
    try {
      const data = await getModulos(1, 100, "");
      setModulos(data.modulos || []);
    } catch (error) {
      console.error("Error al cargar módulos:", error);
    }
  };

  const loadProfesores = async () => {
    setLoading(true);
    try {
      const data = await getProfesores(page, limit, search);
      setProfesores(data.profesores || []);
      setTotal(data.total || 0);
      setTotalPages(data.pages || 1);
    } catch (error) {
      console.error("Error al cargar profesores:", error);
      showError("Error al cargar los profesores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadModulos = async () => {
      try {
        const data = await getModulos(1, 100, "");
        console.log("📚 Módulos cargados:", data.modulos);
        setModulos(data.modulos || []);
      } catch (error) {
        console.error("Error al cargar módulos:", error);
        setModulos([]);
      }
    };
    loadModulos();
    loadProfesores();
  }, [page, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCreate = () => {
    setSelectedProfesor(null);
    setShowForm(true);
  };

  const handleEdit = (profesor) => {
    setSelectedProfesor(profesor);
    setShowForm(true);
  };

  const handleSave = async (profesorData) => {
    try {
      if (selectedProfesor) {
        await updateProfesor(selectedProfesor._id, profesorData);
        showSuccess("Profesor actualizado correctamente", "Actualizado");
      } else {
        await createProfesor(profesorData);
        showSuccess("Profesor creado correctamente", "Creado");
      }
      loadProfesores();
    } catch (error) {
      showError(
        error.response?.data?.message || "Error al guardar el profesor",
      );
    }
  };

  const handleDelete = async (profesor) => {
    const result = await Swal.fire({
      title: `¿Eliminar a ${profesor.nombre}?`,
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
        await deleteProfesor(profesor._id);
        showSuccess(`${profesor.nombre} ha sido eliminado`, "Eliminado");

        await Swal.fire({
          title: "¡Eliminado!",
          text: `${profesor.nombre} ha sido eliminado correctamente`,
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

        loadProfesores();
      } catch (error) {
        showError("Error al eliminar el profesor");
      }
    }
  };

  const esAdmin = user?.rol === "admin";

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profesores</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona los profesores de la diplomatura ({total} profesores)
          </p>
        </div>
        {esAdmin && (
          <Button onClick={handleCreate} className="gap-2 rounded-full">
            <Plus className="w-4 h-4" />
            Nuevo Profesor
          </Button>
        )}
      </div>

      {/* Buscador */}
      <div className="relative max-w-md">
        <Input
          placeholder="Buscar por nombre o email..."
          value={search}
          onChange={handleSearch}
          className="rounded-full"
        />
      </div>

      {/* Tabla con Skeleton + fade-in */}
      {loading ? (
        <TableSkeleton columns={7} rows={5} />
      ) : (
        <div className="animate-scale-in">
          <ProfesorTableAdvanced
            profesores={profesores}
            modulos={modulos}
            onEdit={handleEdit}
            onDelete={handleDelete}
            currentUserRol={user?.rol}
          />
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-muted-foreground">
            Mostrando {profesores.length} de {total} profesores
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousPage}
              disabled={page === 1}
              className="rounded-full"
            >
              Anterior
            </Button>
            <span className="flex items-center px-3 text-sm">
              Página {page} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={page === totalPages}
              className="rounded-full"
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}

      {/* Modal de formulario */}
      {showForm && (
        <ProfesorForm
          profesor={selectedProfesor}
          modulos={modulos}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
