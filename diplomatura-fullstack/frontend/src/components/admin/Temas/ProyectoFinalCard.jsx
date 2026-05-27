import { useState } from 'react';
import { Edit, Trash2, ExternalLink, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

export function ProyectoFinalCard({ proyecto, onEdit, onDelete, isAdmin }) {
  const [imageError, setImageError] = useState(false);
  const hasImage = proyecto?.imagen_ejemplo && proyecto.imagen_ejemplo !== '' && !imageError;
  const hasLink = proyecto?.link_demo && proyecto.link_demo !== '';

  if (!proyecto) return null;

  return (
    <div className="border border-primary/30 rounded-xl bg-gradient-to-br from-primary/5 to-primary/0 overflow-hidden hover:shadow-lg transition-all duration-200">
      {/* Header */}
      <div className="p-5 border-b border-primary/20 bg-primary/5">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-primary/20 text-primary border-0">Proyecto Final</Badge>
            </div>
            <h3 className="font-semibold text-lg">{proyecto.titulo}</h3>
          </div>
          {isAdmin && (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(proyecto)}
                className="h-8 w-8 p-0 rounded-full hover:bg-primary/10"
                title="Editar proyecto"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(proyecto)}
                className="h-8 w-8 p-0 rounded-full text-red-500 hover:text-red-600 hover:bg-red-500/10"
                title="Eliminar proyecto"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5 space-y-4">
        {/* Descripción */}
        {proyecto.descripcion && (
          <div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {proyecto.descripcion}
            </p>
          </div>
        )}

        {/* Requisitos */}
        {proyecto.requisitos && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">📋 Requisitos:</p>
            <div className="bg-muted/20 rounded-lg p-3">
              <p className="text-sm whitespace-pre-wrap">{proyecto.requisitos}</p>
            </div>
          </div>
        )}

        {/* Link de demostración */}
        {hasLink && (
          <div>
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <LinkIcon className="w-3 h-3" /> Ver demostración:
            </p>
            <a
              href={proyecto.link_demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm break-all"
            >
              <ExternalLink className="w-4 h-4 flex-shrink-0" />
              <span className="break-all">{proyecto.link_demo}</span>
            </a>
          </div>
        )}

        {/* Imagen de ejemplo */}
        {hasImage && (
          <div>
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <ImageIcon className="w-3 h-3" /> Imagen de referencia:
            </p>
            <img
              src={proyecto.imagen_ejemplo}
              alt={proyecto.titulo}
              className="w-full max-h-48 object-cover rounded-lg cursor-pointer hover:scale-[1.02] transition-transform duration-200"
              onClick={() => window.open(proyecto.imagen_ejemplo, '_blank')}
              onError={() => setImageError(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}