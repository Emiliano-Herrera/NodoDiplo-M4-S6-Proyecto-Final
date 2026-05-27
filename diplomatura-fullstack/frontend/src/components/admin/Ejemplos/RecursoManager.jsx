import { useState } from 'react';
import { Link, Plus, X, FileText, BookOpen, ExternalLink, Trash2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Badge } from '../../ui/badge';

const recursoTypes = [
  { value: 'documentacion', label: 'Documentación', color: 'blue' },
  { value: 'github', label: 'GitHub', color: 'gray' },
  { value: 'articulo', label: 'Artículo', color: 'green' },
  { value: 'tutorial', label: 'Tutorial', color: 'purple' },
  { value: 'herramienta', label: 'Herramienta', color: 'orange' },
  { value: 'otro', label: 'Otro', color: 'gray' },
];

export function RecursoManager({ recursos = [], onChange }) {
  const [showForm, setShowForm] = useState(false);
  const [newRecurso, setNewRecurso] = useState({
    url: '',
    titulo: '',
    descripcion: '',
    tipo: 'documentacion',
    orden: recursos.length + 1,
  });

  const handleAddRecurso = () => {
    if (!newRecurso.url.trim() || !newRecurso.titulo.trim()) return;
    
    const updatedRecursos = [...recursos, { ...newRecurso, _id: Date.now() }];
    onChange(updatedRecursos);
    setNewRecurso({
      url: '',
      titulo: '',
      descripcion: '',
      tipo: 'documentacion',
      orden: updatedRecursos.length + 1,
    });
    setShowForm(false);
  };

  const handleRemoveRecurso = (index) => {
    const updatedRecursos = recursos.filter((_, i) => i !== index);
    updatedRecursos.forEach((r, i) => r.orden = i + 1);
    onChange(updatedRecursos);
  };

  const getTipoLabel = (tipo) => {
    return recursoTypes.find(t => t.value === tipo)?.label || tipo;
  };

  const getTipoColor = (tipo) => {
    return recursoTypes.find(t => t.value === tipo)?.color || 'gray';
  };

  return (
    <div className="space-y-3">
      {/* Lista de recursos existentes */}
      {recursos.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Recursos cargados:</p>
          {recursos.map((recurso, idx) => (
            <div key={idx} className="flex gap-2 items-start bg-muted/20 p-2 rounded-lg">
              <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                <ExternalLink className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{recurso.titulo}</p>
                {recurso.descripcion && (
                  <p className="text-xs text-muted-foreground line-clamp-1">{recurso.descripcion}</p>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {getTipoLabel(recurso.tipo)}
                  </Badge>
                  <a
                    href={recurso.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" /> Abrir
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveRecurso(idx)}
                className="p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Botón para agregar recurso */}
      {!showForm ? (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Agregar recurso externo
        </button>
      ) : (
        <div className="bg-muted/20 p-3 rounded-lg space-y-3">
          <div>
            <Label className="text-xs">Título *</Label>
            <Input
              value={newRecurso.titulo}
              onChange={(e) => setNewRecurso({ ...newRecurso, titulo: e.target.value })}
              placeholder="Ej: Documentación oficial de React"
              className="text-sm mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">URL *</Label>
            <Input
              value={newRecurso.url}
              onChange={(e) => setNewRecurso({ ...newRecurso, url: e.target.value })}
              placeholder="https://..."
              className="text-sm mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">Descripción (opcional)</Label>
            <Textarea
              value={newRecurso.descripcion}
              onChange={(e) => setNewRecurso({ ...newRecurso, descripcion: e.target.value })}
              placeholder="Breve descripción del recurso"
              className="text-sm mt-1"
              rows={2}
            />
          </div>
          <div>
            <Label className="text-xs">Tipo</Label>
            <select
              value={newRecurso.tipo}
              onChange={(e) => setNewRecurso({ ...newRecurso, tipo: e.target.value })}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm mt-1"
            >
              {recursoTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
            <Button type="button" size="sm" onClick={handleAddRecurso}>
              Agregar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}