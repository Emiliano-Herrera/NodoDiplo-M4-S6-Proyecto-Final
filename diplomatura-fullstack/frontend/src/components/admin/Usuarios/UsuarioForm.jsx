import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';

export function UsuarioForm({ usuario, onSave, onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'visitante',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (usuario) {
      console.log("📝 Cargando usuario para editar:", usuario);
      setFormData({
        nombre: usuario.nombre || '',
        email: usuario.email || '',
        password: '', // No cargar la contraseña por seguridad
        rol: usuario.rol || 'visitante',
      });
    } else {
      // Resetear formulario para nuevo usuario
      setFormData({
        nombre: '',
        email: '',
        password: '',
        rol: 'visitante',
      });
    }
  }, [usuario]);

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.email.trim()) newErrors.email = 'El email es obligatorio';
    if (!usuario && !formData.password) newErrors.password = 'La contraseña es obligatoria';
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const dataToSend = { ...formData };
      // Si es edición y no se cambió la contraseña, no la enviamos
      if (usuario && !dataToSend.password) {
        delete dataToSend.password;
      }
      console.log("📤 Enviando datos al padre:", dataToSend);
      await onSave(dataToSend);
      onClose();
    } catch (error) {
      console.error("❌ Error en submit:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-xl shadow-xl w-full max-w-md p-6 border border-border animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {usuario ? 'Editar Usuario' : 'Nuevo Usuario'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="nombre" className="block mb-2 text-sm font-medium">
              Nombre
            </Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className={errors.nombre ? 'border-red-500' : 'rounded-xl'}
            />
            {errors.nombre && <p className="text-sm text-red-500 mt-1">{errors.nombre}</p>}
          </div>

          <div>
            <Label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={errors.email ? 'border-red-500' : 'rounded-xl'}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="password" className="block mb-2 text-sm font-medium">
              {usuario ? 'Nueva Contraseña (opcional)' : 'Contraseña'}
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={errors.password ? 'border-red-500' : 'rounded-xl'}
              placeholder={usuario ? 'Dejar vacío para no cambiar' : ''}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          <div>
            <Label htmlFor="rol" className="block mb-2 text-sm font-medium">
              Rol
            </Label>
            <Select
              value={formData.rol}
              onValueChange={(value) => setFormData({ ...formData, rol: value })}
            >
              <SelectTrigger className="w-full rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="visitante">Visitante</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-full">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="rounded-full">
              {loading ? 'Guardando...' : usuario ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}