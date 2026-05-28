import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Swal from 'sweetalert2';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { UsuarioTableAdvanced } from '../../components/admin/Usuarios/UsuarioTableAdvanced';
import { UsuarioForm } from '../../components/admin/Usuarios/UsuarioForm';
import { RoleChangeDialog } from '../../components/admin/Usuarios/RoleChangeDialog';
import { getUsuarios, createUsuario, updateUsuario, changeUserRole, deleteUsuario } from '../../services/usuarioService';
import { useAuth } from '../../hooks/useAuth';
import { TableSkeleton } from '../../components/ui/Skeleton';
import { showSuccess, showError } from '../../services/notifications';

export default function UsuariosAdminPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [usuarioForRole, setUsuarioForRole] = useState(null);
  const { user } = useAuth();

  const limit = 10;

  const loadUsuarios = async () => {
    setLoading(true);
    try {
      const data = await getUsuarios(page, limit, search);
      console.log("📊 Datos recibidos:", { 
        usuarios: data.usuarios?.length, 
        total: data.total, 
        pages: data.pages,
        currentPage: page 
      });
      setUsuarios(data.usuarios || []);
      setTotal(data.total || 0);
      setTotalPages(data.pages || 1);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      showError('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsuarios();
  }, [page, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Resetear a primera página cuando se busca
  };

  const handleCreate = () => {
    setSelectedUsuario(null);
    setShowForm(true);
  };

  const handleEdit = (usuario) => {
    setSelectedUsuario(usuario);
    setShowForm(true);
  };

  const handleSave = async (usuarioData) => {
    try {
      if (selectedUsuario) {
        await updateUsuario(selectedUsuario._id, usuarioData);
        showSuccess('Usuario actualizado correctamente', '✅ Actualizado');
      } else {
        await createUsuario(usuarioData);
        showSuccess('Usuario creado correctamente', '✨ Creado');
      }
      loadUsuarios();
    } catch (error) {
      showError(error.response?.data?.message || 'Error al guardar el usuario');
    }
  };

  const handleRoleChange = (usuario) => {
    setUsuarioForRole(usuario);
    setShowRoleDialog(true);
  };

  const handleConfirmRoleChange = async (id, nuevoRol) => {
    try {
      await changeUserRole(id, nuevoRol);
      showSuccess(`Rol cambiado a ${nuevoRol}`, '🔄 Rol actualizado');
      loadUsuarios();
    } catch (error) {
      showError('Error al cambiar el rol');
    }
  };

  const handleDelete = async (usuario) => {
    const result = await Swal.fire({
      title: `¿Eliminar a ${usuario.nombre}?`,
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
        await deleteUsuario(usuario._id);
        showSuccess(`${usuario.nombre} ha sido eliminado`, '🗑️ Eliminado');
        
        await Swal.fire({
          title: '¡Eliminado!',
          text: `${usuario.nombre} ha sido eliminado correctamente`,
          icon: 'success',
          iconColor: '#22c55e',
          background: '#000000',
          color: '#ffffff',
          confirmButtonColor: '#ffffff',
          confirmButtonTextColor: '#000000',
          customClass: {
            popup: 'rounded-xl border border-green-500/30 shadow-xl',
            confirmButton: 'rounded-lg px-4 py-2 font-medium border border-white/20 hover:bg-gray-100 transition-colors text-black',
            title: 'text-xl font-semibold',
            htmlContainer: 'text-gray-300',
          },
        });
        
        loadUsuarios();
      } catch (error) {
        showError('Error al eliminar el usuario');
      }
    }
  };

  const esAdmin = user?.rol === 'admin';

  // Funciones de paginación
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
          <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona los usuarios y sus roles ({total} usuarios totales)
          </p>
        </div>
        {esAdmin && (
          <Button onClick={handleCreate} className="gap-2 rounded-full">
            <Plus className="w-4 h-4" />
            Nuevo Usuario
          </Button>
        )}
      </div>

      {/* Buscador (descomentado) */}
      <div className="relative max-w-md">
        <Input
          placeholder="Buscar por email o nombre..."
          value={search}
          onChange={handleSearch}
          className="rounded-full"
        />
      </div>

      {/* Tabla con Skeleton + fade-in */}
      {loading ? (
        <TableSkeleton columns={6} rows={5} />
      ) : (
        <div className="animate-scale-in">
          <UsuarioTableAdvanced
            usuarios={usuarios}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRoleChange={handleRoleChange}
            currentUserRol={user?.rol}
          />
        </div>
      )}

      {/* Paginación - VISIBLE */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-muted-foreground">
            Mostrando {usuarios.length} de {total} usuarios
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

      {/* Modales */}
      {showForm && (
        <UsuarioForm
          usuario={selectedUsuario}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

      {showRoleDialog && (
        <RoleChangeDialog
          usuario={usuarioForRole}
          onConfirm={handleConfirmRoleChange}
          onClose={() => setShowRoleDialog(false)}
        />
      )}
    </div>
  );
}