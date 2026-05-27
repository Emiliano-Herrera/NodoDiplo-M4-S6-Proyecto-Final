import { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp, Image, Video, Trash2, Code } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { ImageUpload } from '../../ui/ImageUpload';
import { VideoManager } from './VideoManager';
import { RecursoManager } from './RecursoManager';

export function EjemploForm({ ejemplo, temaId, onSave, onClose }) {
  const [formData, setFormData] = useState({
    titulo: '',
    explicacion: '',
    html: '',
    css: '',
    javascript: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imagenes, setImagenes] = useState([]);
  const [videos, setVideos] = useState([]);
  const [recursos, setRecursos] = useState([]);
  const [showImageUpload, setShowImageUpload] = useState(false);

  useEffect(() => {
    if (ejemplo) {
      console.log("📝 Cargando ejemplo para editar:", ejemplo);
      setFormData({
        titulo: ejemplo.titulo || '',
        explicacion: ejemplo.explicacion || '',
        html: ejemplo.html || '',
        css: ejemplo.css || '',
        javascript: ejemplo.javascript || '',
      });
      setImagenes(ejemplo.imagenes || []);
      setVideos(ejemplo.videos || []);
      setRecursos(ejemplo.recursos || []);
    } else {
      setFormData({
        titulo: '',
        explicacion: '',
        html: '',
        css: '',
        javascript: '',
      });
      setImagenes([]);
      setVideos([]);
      setRecursos([]);
    }
  }, [ejemplo]);

  const validate = () => {
    const newErrors = {};
    if (!formData.titulo.trim()) newErrors.titulo = 'El título es obligatorio';
    if (!formData.html.trim()) newErrors.html = 'El código HTML es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddImagen = (url) => {
    console.log("➕ Agregando imagen:", url);
    setImagenes([...imagenes, { url, descripcion: '' }]);
    setShowImageUpload(false);
  };

  const handleRemoveImagen = (index) => {
    console.log("🗑️ Eliminando imagen en índice:", index);
    const nuevasImagenes = [...imagenes];
    nuevasImagenes.splice(index, 1);
    setImagenes(nuevasImagenes);
  };

  const handleImagenDescripcionChange = (index, descripcion) => {
    const nuevas = [...imagenes];
    nuevas[index].descripcion = descripcion;
    setImagenes(nuevas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const dataToSend = {
        titulo: formData.titulo,
        explicacion: formData.explicacion,
        html: formData.html,
        css: formData.css,
        javascript: formData.javascript,
        tema_id: temaId,
        imagenes: imagenes,
        videos: videos,
        recursos: recursos,
      };
      console.log("📤 Enviando datos del ejemplo:", dataToSend);
      await onSave(dataToSend);
      onClose();
    } catch (error) {
      console.error("Error en submit:", error);
    } finally {
      setLoading(false);
    }
  };

  const hasImages = imagenes.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-xl shadow-xl w-full max-w-5xl p-6 border border-border animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-card pb-2">
          <h2 className="text-xl font-semibold">
            {ejemplo ? 'Editar Ejemplo' : 'Nuevo Ejemplo'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Título */}
          <div>
            <Label className="block mb-2 text-sm font-medium">Título *</Label>
            <Input
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              className={errors.titulo ? 'border-red-500 rounded-xl' : 'rounded-xl'}
              placeholder="Ej: Botón con efecto hover"
            />
            {errors.titulo && <p className="text-sm text-red-500 mt-1">{errors.titulo}</p>}
          </div>

          {/* Explicación */}
          <div>
            <Label className="block mb-2 text-sm font-medium">Explicación</Label>
            <Textarea
              value={formData.explicacion}
              onChange={(e) => setFormData({ ...formData, explicacion: e.target.value })}
              className="rounded-xl"
              rows={3}
              placeholder="Explica qué hace este ejemplo, cómo funciona y para qué sirve..."
            />
          </div>

          {/* Código HTML (obligatorio) */}
          <div>
            <Label className="block mb-2 text-sm font-medium">Código HTML *</Label>
            <Textarea
              value={formData.html}
              onChange={(e) => setFormData({ ...formData, html: e.target.value })}
              className={errors.html ? 'border-red-500 rounded-xl font-mono text-sm' : 'rounded-xl font-mono text-sm'}
              rows={8}
              placeholder={`<div class="container">
  <button class="btn">Click me</button>
</div>`}
            />
            {errors.html && <p className="text-sm text-red-500 mt-1">{errors.html}</p>}
            <p className="text-xs text-muted-foreground mt-1">
              Estructura HTML del ejemplo
            </p>
          </div>

          {/* Código CSS (opcional) */}
          <div>
            <Label className="block mb-2 text-sm font-medium">Código CSS (opcional)</Label>
            <Textarea
              value={formData.css}
              onChange={(e) => setFormData({ ...formData, css: e.target.value })}
              className="rounded-xl font-mono text-sm"
              rows={6}
              placeholder={`.btn {
  background: #3b82f6;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}
.btn:hover {
  background: #2563eb;
}`}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Estilos CSS (opcional)
            </p>
          </div>

          {/* Código JavaScript (opcional) */}
          <div>
            <Label className="block mb-2 text-sm font-medium">Código JavaScript (opcional)</Label>
            <Textarea
              value={formData.javascript}
              onChange={(e) => setFormData({ ...formData, javascript: e.target.value })}
              className="rounded-xl font-mono text-sm"
              rows={6}
              placeholder={`document.querySelector('.btn')?.addEventListener('click', () => {
  alert('¡Hola mundo!');
});`}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Código JavaScript (opcional)
            </p>
          </div>

          {/* Videos adicionales */}
          <div>
            <Label className="block mb-2 text-sm font-medium">Videos</Label>
            <VideoManager videos={videos} onChange={setVideos} />
          </div>

          {/* Recursos externos */}
          <div>
            <Label className="block mb-2 text-sm font-medium">Recursos externos</Label>
            <RecursoManager recursos={recursos} onChange={setRecursos} />
          </div>

          {/* Imágenes */}
          <div>
            <Label className="block mb-2 text-sm font-medium">Imágenes del ejemplo</Label>
            
            {hasImages && (
              <div className="space-y-2 mb-3">
                <p className="text-xs text-muted-foreground">Imágenes cargadas:</p>
                {imagenes.map((img, idx) => (
                  <div key={idx} className="flex gap-2 items-center bg-muted/20 p-2 rounded-lg">
                    <img 
                      src={img.url} 
                      alt="Preview" 
                      className="w-12 h-12 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => window.open(img.url, '_blank')}
                      onError={(e) => console.error("Error cargando imagen:", img.url, e)}
                    />
                    <Input
                      placeholder="Descripción de la imagen"
                      value={img.descripcion || ''}
                      onChange={(e) => handleImagenDescripcionChange(idx, e.target.value)}
                      className="flex-1 rounded-xl text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImagen(idx)}
                      className="p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {showImageUpload ? (
              <div>
                <ImageUpload
                  value=""
                  onChange={handleAddImagen}
                  onRemove={() => {}}
                />
                <button
                  type="button"
                  onClick={() => setShowImageUpload(false)}
                  className="text-xs text-muted-foreground hover:text-foreground mt-2"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowImageUpload(true)}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                <Image className="w-4 h-4" /> Agregar imagen
              </button>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Sube imágenes que muestren el resultado del ejemplo
            </p>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border/50 mt-4">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-full">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="rounded-full">
              {loading ? 'Guardando...' : ejemplo ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}