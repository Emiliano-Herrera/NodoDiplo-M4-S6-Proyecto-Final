import { sileo } from 'sileo';

// Configuración base
const baseOptions = {
  duration: 3000,
  position: 'top-center',
  fill: '#000000',
  roundness: 12,
};

// Notificación de éxito
export const showSuccess = (message, title = 'Éxito') => {
  sileo.success({
    title: title,
    description: message,
    ...baseOptions,
    styles: {
      title: 'text-white font-semibold',
      description: 'text-gray-300',
      badge: 'bg-green-500/20',
    },
  });
};

// Notificación de error
export const showError = (message, title = 'Error') => {
  sileo.error({
    title: title,
    description: message,
    ...baseOptions,
    styles: {
      title: 'text-white font-semibold',
      description: 'text-gray-300',
      badge: 'bg-red-500/20',
    },
  });
};

// Notificación de información
export const showInfo = (message, title = 'Información') => {
  sileo.info({
    title: title,
    description: message,
    ...baseOptions,
    styles: {
      title: 'text-white font-semibold',
      description: 'text-gray-300',
      badge: 'bg-blue-500/20',
    },
  });
};

// Notificación de advertencia
export const showWarning = (message, title = 'Advertencia') => {
  sileo.warning({
    title: title,
    description: message,
    ...baseOptions,
    styles: {
      title: 'text-white font-semibold',
      description: 'text-gray-300',
      badge: 'bg-yellow-500/20',
    },
  });
};

// Notificación con acción (botón)
export const showAction = (title, description, buttonText, onAction) => {
  sileo.action({
    title: title,
    description: description,
    button: {
      title: buttonText,
      onClick: onAction,
    },
    ...baseOptions,
    duration: null, // No se cierra automáticamente
    styles: {
      title: 'text-white font-semibold',
      description: 'text-gray-300',
      button: 'bg-white/10 hover:bg-white/20 text-white rounded-lg px-3 py-1',
      badge: 'bg-primary/20',
    },
  });
};

// Notificación personalizada
export const showToast = (title, description, type = 'default') => {
  const methods = {
    default: sileo.show,
    success: sileo.success,
    error: sileo.error,
    info: sileo.info,
    warning: sileo.warning,
  };
  
  const method = methods[type] || methods.default;
  
  method({
    title: title,
    description: description,
    ...baseOptions,
    styles: {
      title: 'text-white font-semibold',
      description: 'text-gray-300',
      badge: type === 'success' ? 'bg-green-500/20' : 
             type === 'error' ? 'bg-red-500/20' :
             type === 'warning' ? 'bg-yellow-500/20' :
             'bg-gray-500/20',
    },
  });
};

// Notificación para promesas (loading -> success/error)
export const showPromise = (promise, loadingMsg, successTitle, successMsg, errorTitle, errorMsg) => {
  return sileo.promise(promise, {
    loading: {
      title: 'Cargando...',
      description: loadingMsg,
      ...baseOptions,
    },
    success: (data) => ({
      title: successTitle || '¡Completado!',
      description: successMsg || (data?.message || 'Operación exitosa'),
      ...baseOptions,
      styles: {
        title: 'text-white font-semibold',
        description: 'text-gray-300',
        badge: 'bg-green-500/20',
      },
    }),
    error: (err) => ({
      title: errorTitle || 'Error',
      description: errorMsg || (err?.response?.data?.message || err?.message || 'Algo salió mal'),
      ...baseOptions,
      styles: {
        title: 'text-white font-semibold',
        description: 'text-gray-300',
        badge: 'bg-red-500/20',
      },
    }),
  });
};

export default sileo;