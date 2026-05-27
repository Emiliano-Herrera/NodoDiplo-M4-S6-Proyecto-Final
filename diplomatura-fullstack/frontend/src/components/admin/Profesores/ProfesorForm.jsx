import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';

export function ProfesorForm({ profesor, modulos, onSave, onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    especialidad: '',
    biografia: '',
    // modulo_id: null, // COMENTADO TEMPORALMENTE
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profesor) {
      setFormData({
        nombre: profesor.nombre || '',
        email: profesor.email || '',
        especialidad: profesor.especialidad || '',
        biografia: profesor.biografia || '',
        // modulo_id: profesor.modulo_id || null,
      });
    } else {
      setFormData({
        nombre: '',
        email: '',
        especialidad: '',
        biografia: '',
        // modulo_id: null,
      });
    }
  }, [profesor]);

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
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
            {profesor ? 'Editar Profesor' : 'Nuevo Profesor'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="nombre" className="block mb-2 text-sm font-medium">
              Nombre *
            </Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className={errors.nombre ? 'border-red-500 rounded-xl' : 'rounded-xl'}
            />
            {errors.nombre && <p className="text-sm text-red-500 mt-1">{errors.nombre}</p>}
          </div>

          <div>
            <Label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={errors.email ? 'border-red-500 rounded-xl' : 'rounded-xl'}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="especialidad" className="block mb-2 text-sm font-medium">
              Especialidad
            </Label>
            <Input
              id="especialidad"
              value={formData.especialidad}
              onChange={(e) => setFormData({ ...formData, especialidad: e.target.value })}
              className="rounded-xl"
              placeholder="Ej: Diseño Web, JavaScript, Node.js"
            />
          </div>

          {/* Campo: Módulo a cargo - COMENTADO TEMPORALMENTE PARA PROBAR */}
          {/* <div>
            <Label htmlFor="modulo_id" className="block mb-2 text-sm font-medium">
              Módulo a cargo
            </Label>
            <Select ...>
              ...
            </Select>
          </div> */}

          <div>
            <Label htmlFor="biografia" className="block mb-2 text-sm font-medium">
              Biografía
            </Label>
            <Textarea
              id="biografia"
              value={formData.biografia}
              onChange={(e) => setFormData({ ...formData, biografia: e.target.value })}
              className="rounded-xl"
              rows={3}
              placeholder="Breve descripción del profesor..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-full">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="rounded-full">
              {loading ? 'Guardando...' : profesor ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}