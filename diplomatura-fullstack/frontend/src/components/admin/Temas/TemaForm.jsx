import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';

export function TemaForm({ tema, moduloId, onSave, onClose }) {
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    orden: 1,
    video_url: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tema) {
      setFormData({
        titulo: tema.titulo || '',
        contenido: tema.contenido || '',
        orden: tema.orden || 1,
        video_url: tema.video_url || '',
      });
    } else {
      setFormData({
        titulo: '',
        contenido: '',
        orden: 1,
        video_url: '',
      });
    }
  }, [tema]);

  const validate = () => {
    const newErrors = {};
    if (!formData.titulo.trim()) newErrors.titulo = 'El título es obligatorio';
    if (!formData.contenido.trim()) newErrors.contenido = 'El contenido es obligatorio';
    if (formData.orden < 1) newErrors.orden = 'El orden debe ser mayor a 0';
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
        orden: Number(formData.orden),
      };
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
      <div className="bg-card rounded-xl shadow-xl w-full max-w-2xl p-6 border border-border animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-card pb-2">
          <h2 className="text-xl font-semibold">
            {tema ? 'Editar Tema' : 'Nuevo Tema'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="titulo" className="block mb-2 text-sm font-medium">
              Título *
            </Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              className={errors.titulo ? 'border-red-500 rounded-xl' : 'rounded-xl'}
            />
            {errors.titulo && <p className="text-sm text-red-500 mt-1">{errors.titulo}</p>}
          </div>

          <div>
            <Label htmlFor="contenido" className="block mb-2 text-sm font-medium">
              Contenido (HTML / Markdown) *
            </Label>
            <Textarea
              id="contenido"
              value={formData.contenido}
              onChange={(e) => setFormData({ ...formData, contenido: e.target.value })}
              className={errors.contenido ? 'border-red-500 rounded-xl font-mono text-sm' : 'rounded-xl font-mono text-sm'}
              rows={10}
              placeholder="## Subtítulo&#10;&#10;Aquí va el contenido del tema..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Puedes usar formato HTML o Markdown
            </p>
            {errors.contenido && <p className="text-sm text-red-500 mt-1">{errors.contenido}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="orden" className="block mb-2 text-sm font-medium">
                Orden *
              </Label>
              <Input
                id="orden"
                type="number"
                min="1"
                value={formData.orden}
                onChange={(e) => setFormData({ ...formData, orden: parseInt(e.target.value) })}
                className={errors.orden ? 'border-red-500 rounded-xl' : 'rounded-xl'}
              />
              {errors.orden && <p className="text-sm text-red-500 mt-1">{errors.orden}</p>}
            </div>

            <div>
              <Label htmlFor="video_url" className="block mb-2 text-sm font-medium">
                URL del video (opcional)
              </Label>
              <Input
                id="video_url"
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                className="rounded-xl"
                placeholder="https://youtube.com/..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-full">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="rounded-full">
              {loading ? 'Guardando...' : tema ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}