import { useState, useEffect } from 'react';
import { X, Link as LinkIcon } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { ImageUpload } from '../../ui/ImageUpload';

export function ProyectoFinalForm({ proyecto, moduloId, onSave, onClose }) {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    requisitos: '',
    imagen_ejemplo: '',
    link_demo: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (proyecto) {
      setFormData({
        titulo: proyecto.titulo || '',
        descripcion: proyecto.descripcion || '',
        requisitos: proyecto.requisitos || '',
        imagen_ejemplo: proyecto.imagen_ejemplo || '',
        link_demo: proyecto.link_demo || '',
      });
    } else {
      setFormData({
        titulo: '',
        descripcion: '',
        requisitos: '',
        imagen_ejemplo: '',
        link_demo: '',
      });
    }
  }, [proyecto]);

  const validate = () => {
    const newErrors = {};
    if (!formData.titulo.trim()) newErrors.titulo = 'El título es obligatorio';
    if (!formData.descripcion.trim()) newErrors.descripcion = 'La descripción es obligatoria';
    if (!formData.requisitos.trim()) newErrors.requisitos = 'Los requisitos son obligatorios';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const dataToSend = {
        ...formData,
        modulo_id: moduloId,
      };
      await onSave(dataToSend);
      onClose();
    } catch (error) {
      console.error("Error en submit:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-xl shadow-xl w-full max-w-4xl p-6 border border-border animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-card pb-2">
          <h2 className="text-xl font-semibold">
            {proyecto ? 'Editar Proyecto Final' : 'Nuevo Proyecto Final'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label className="block mb-2 text-sm font-medium">Título *</Label>
            <Input
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              className={errors.titulo ? 'border-red-500 rounded-xl' : 'rounded-xl'}
              placeholder="Ej: Portfolio Personal"
            />
            {errors.titulo && <p className="text-sm text-red-500 mt-1">{errors.titulo}</p>}
          </div>

          <div>
            <Label className="block mb-2 text-sm font-medium">Descripción *</Label>
            <Textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              className={errors.descripcion ? 'border-red-500 rounded-xl' : 'rounded-xl'}
              rows={3}
              placeholder="Describe qué debe hacer el alumno..."
            />
            {errors.descripcion && <p className="text-sm text-red-500 mt-1">{errors.descripcion}</p>}
          </div>

          <div>
            <Label className="block mb-2 text-sm font-medium">Requisitos *</Label>
            <Textarea
              value={formData.requisitos}
              onChange={(e) => setFormData({ ...formData, requisitos: e.target.value })}
              className={errors.requisitos ? 'border-red-500 rounded-xl font-mono text-sm' : 'rounded-xl font-mono text-sm'}
              rows={6}
              placeholder="• Requisito 1&#10;• Requisito 2&#10;• Requisito 3"
            />
            {errors.requisitos && <p className="text-sm text-red-500 mt-1">{errors.requisitos}</p>}
            <p className="text-xs text-muted-foreground mt-1">
              Usa • o - para crear listas
            </p>
          </div>

          {/* Link de demostración */}
          <div>
            <Label className="block mb-2 text-sm font-medium">Link de demostración (opcional)</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LinkIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                value={formData.link_demo}
                onChange={(e) => setFormData({ ...formData, link_demo: e.target.value })}
                className="pl-9 rounded-xl"
                placeholder="https://mi-proyecto.netlify.app"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Enlace al proyecto desplegado (Netlify, Vercel, GitHub Pages, etc.)
            </p>
          </div>

          <div>
            <Label className="block mb-2 text-sm font-medium">Imagen de referencia (opcional)</Label>
            <ImageUpload
              value={formData.imagen_ejemplo}
              onChange={(url) => setFormData({ ...formData, imagen_ejemplo: url })}
              onRemove={() => setFormData({ ...formData, imagen_ejemplo: '' })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border/50 mt-4">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-full">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="rounded-full">
              {loading ? 'Guardando...' : proyecto ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}