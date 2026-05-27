import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { getModulos } from '../../services/moduloService';
import { createTema } from '../../services/temaService';
import { useAuth } from '../../hooks/useAuth';
import { showSuccess, showError } from '../../services/notifications';

export default function TemaCreatePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    orden: 1,
    modulo_id: '',
    video_url: '',
  });
  const [errors, setErrors] = useState({});

  const loadModulos = async () => {
    try {
      const data = await getModulos(1, 100, '');
      const modulosOrdenados = (data.modulos || []).sort((a, b) => a.orden - b.orden);
      setModulos(modulosOrdenados);
      if (modulosOrdenados.length > 0) {
        setFormData(prev => ({ ...prev, modulo_id: modulosOrdenados[0]._id }));
      }
    } catch (error) {
      console.error('Error al cargar módulos:', error);
      showError('Error al cargar los módulos');
    }
  };

  useEffect(() => {
    loadModulos();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.titulo.trim()) newErrors.titulo = 'El título es obligatorio';
    if (!formData.contenido.trim()) newErrors.contenido = 'El contenido es obligatorio';
    if (!formData.modulo_id) newErrors.modulo_id = 'Debes seleccionar un módulo';
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
        orden: Number(formData.orden),
      };
      await createTema(dataToSend);
      showSuccess('Tema creado correctamente', '✨ Creado');
      navigate('/admin/temas');
    } catch (error) {
      console.error('Error al crear tema:', error);
      showError(error.response?.data?.message || 'Error al crear el tema');
    } finally {
      setLoading(false);
    }
  };

  const esAdmin = user?.rol === 'admin';

  if (!esAdmin) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">No tienes permisos para acceder a esta página.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/admin/temas')}
          className="gap-2 rounded-full"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nuevo Tema</h1>
          <p className="text-sm text-muted-foreground">
            Agrega un nuevo tema a la diplomatura
          </p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Módulo */}
        <div>
          <Label htmlFor="modulo_id" className="block mb-2 text-sm font-medium">
            Módulo *
          </Label>
          <select
            id="modulo_id"
            value={formData.modulo_id}
            onChange={(e) => setFormData({ ...formData, modulo_id: e.target.value })}
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {modulos.map((modulo) => (
              <option key={modulo._id} value={modulo._id}>
                Módulo {modulo.orden}: {modulo.nombre}
              </option>
            ))}
          </select>
          {errors.modulo_id && <p className="text-sm text-red-500 mt-1">{errors.modulo_id}</p>}
        </div>

        {/* Título */}
        <div>
          <Label htmlFor="titulo" className="block mb-2 text-sm font-medium">
            Título *
          </Label>
          <Input
            id="titulo"
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            className={errors.titulo ? 'border-red-500 rounded-xl' : 'rounded-xl'}
            placeholder="Ej: Fundamentos de HTML"
          />
          {errors.titulo && <p className="text-sm text-red-500 mt-1">{errors.titulo}</p>}
        </div>

        {/* Orden */}
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

        {/* Contenido */}
        <div>
          <Label htmlFor="contenido" className="block mb-2 text-sm font-medium">
            Contenido (HTML / Markdown) *
          </Label>
          <Textarea
            id="contenido"
            value={formData.contenido}
            onChange={(e) => setFormData({ ...formData, contenido: e.target.value })}
            className={errors.contenido ? 'border-red-500 rounded-xl font-mono text-sm' : 'rounded-xl font-mono text-sm'}
            rows={12}
            placeholder="## Subtítulo&#10;&#10;Aquí va el contenido del tema..."
          />
          <p className="text-xs text-muted-foreground mt-1">
            Puedes usar formato HTML o Markdown
          </p>
          {errors.contenido && <p className="text-sm text-red-500 mt-1">{errors.contenido}</p>}
        </div>

        {/* Video URL (opcional) */}
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

        {/* Botones */}
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/temas')} className="rounded-full">
            Cancelar
          </Button>
          <Button type="submit" disabled={loading} className="gap-2 rounded-full">
            <Save className="w-4 h-4" />
            {loading ? 'Guardando...' : 'Crear Tema'}
          </Button>
        </div>
      </form>
    </div>
  );
}