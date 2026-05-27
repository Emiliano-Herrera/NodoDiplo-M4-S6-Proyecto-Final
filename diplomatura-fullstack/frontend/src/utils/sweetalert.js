import Swal from 'sweetalert2';

// Configuración base para todas las alertas
const baseConfig = {
  background: 'hsl(222.2 84% 4.9%)',
  color: 'hsl(210 40% 98%)',
  iconColor: '#60a5fa',
  confirmButtonColor: '#3b82f6',
  cancelButtonColor: '#6b7280',
  customClass: {
    popup: 'rounded-xl border border-border/50 shadow-xl',
    title: 'text-xl font-semibold',
    htmlContainer: 'text-muted-foreground',
    confirmButton: 'rounded-lg px-4 py-2 font-medium',
    cancelButton: 'rounded-lg px-4 py-2 font-medium',
    actions: 'gap-3',
  },
};

// Función para mostrar confirmación de eliminación
export const confirmDelete = async (nombre, onConfirm) => {
  const result = await Swal.fire({
    title: `¿Eliminar ${nombre}?`,
    text: 'Esta acción no se puede deshacer',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    ...baseConfig,
  });

  if (result.isConfirmed) {
    await onConfirm();
    Swal.fire({
      title: 'Eliminado',
      text: `${nombre} ha sido eliminado correctamente`,
      icon: 'success',
      ...baseConfig,
    });
  }
};

// Función para mostrar alerta de éxito
export const showSuccess = (title, text) => {
  Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonText: 'Aceptar',
    ...baseConfig,
  });
};

// Función para mostrar alerta de error
export const showError = (title, text) => {
  Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonText: 'Aceptar',
    ...baseConfig,
  });
};

// Función para mostrar alerta de información
export const showInfo = (title, text) => {
  Swal.fire({
    title,
    text,
    icon: 'info',
    confirmButtonText: 'Aceptar',
    ...baseConfig,
  });
};

export default Swal;