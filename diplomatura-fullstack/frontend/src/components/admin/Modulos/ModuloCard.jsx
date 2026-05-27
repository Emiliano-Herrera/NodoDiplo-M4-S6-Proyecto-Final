import { useState } from "react";
import { motion } from "framer-motion";
import {
  Edit,
  Trash2,
  Clock,
  User,
  BookOpen,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";
import { Badge } from "../../ui/badge";
import { ModuloDetailModal } from "./ModuloDetailModal";

export function ModuloCard({
  modulo,
  profesorNombre,
  temas,
  onEdit,
  onDelete,
  isAdmin,
}) {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  const badgeColors = {
    1: "blue",
    2: "green",
    3: "purple",
    4: "orange",
  };

  const badgeColor = badgeColors[modulo.orden] || "neutral";
  
  // Verificar si hay imagen de portada
  const hasImage = modulo.imagen_portada && modulo.imagen_portada !== "" && !imageError;

  const handleViewDetail = () => {
    setShowDetailModal(true);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("✏️ Click en editar", modulo);
    if (onEdit) onEdit(modulo);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("🗑️ Click en eliminar", modulo);
    if (onDelete) onDelete(modulo);
  };

  return (
    <>
      <div className="relative h-full">
        <div className="relative h-full rounded-2xl border border-border/50 bg-card shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/30 flex flex-col">
          
          {/* Imagen de portada - Mejorada */}
          {hasImage && (
            <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
              <img
                src={modulo.imagen_portada}
                alt={modulo.nombre}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                onError={() => setImageError(true)}
              />
              {/* Overlay gradiente para mejor legibilidad del texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Badge de orden superpuesto sobre la imagen */}
              <div className="absolute top-3 left-3">
                <Badge
                  color={badgeColor}
                  rounded="full"
                  size="md"
                  className="font-mono shadow-lg backdrop-blur-sm bg-black/50"
                >
                  Módulo {modulo.orden}
                </Badge>
              </div>
              
              {/* Botones de acción superpuestos */}
              {isAdmin && (
                <div className="absolute top-3 right-3 flex gap-1 z-50">
                  <button
                    onClick={handleEditClick}
                    className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
                    aria-label="Editar módulo"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleDeleteClick}
                    className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
                    aria-label="Eliminar módulo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Contenido de la tarjeta */}
          <div className={`flex-1 flex flex-col p-6 ${!hasImage ? 'pt-6' : ''}`}>
            {/* Si no hay imagen, mostrar badges aquí */}
            {!hasImage && (
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    color={badgeColor}
                    rounded="full"
                    size="md"
                    className="font-mono"
                  >
                    Módulo {modulo.orden}
                  </Badge>
                  {modulo.duracion_semanas && (
                    <Badge
                      variant="outline"
                      rounded="full"
                      size="sm"
                      className="gap-1"
                    >
                      <Clock className="size-3" />
                      {modulo.duracion_semanas} sem
                    </Badge>
                  )}
                </div>

                {/* Botones de acción (sin imagen) */}
                {isAdmin && (
                  <div className="flex gap-1">
                    <button
                      onClick={handleEditClick}
                      className="p-1.5 rounded-full hover:bg-primary/10 transition-colors"
                      aria-label="Editar módulo"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleDeleteClick}
                      className="p-1.5 rounded-full text-red-500 hover:text-red-600 hover:bg-red-500/10 transition-colors"
                      aria-label="Eliminar módulo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Título y Descripción */}
            <div className="flex-1">
              {hasImage ? (
                <>
                  <h3 className="text-xl font-semibold tracking-tight mb-2 line-clamp-1 mt-2">
                    {modulo.nombre}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                    {modulo.descripcion || "Sin descripción"}
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold tracking-tight mb-2 line-clamp-1">
                    {modulo.nombre}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                    {modulo.descripcion || "Sin descripción"}
                  </p>
                </>
              )}
            </div>

            {/* Información del profesor */}
            <div className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-muted/20">
              <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Profesor a cargo</p>
                <p className="text-sm font-medium">
                  {profesorNombre || "No asignado"}
                </p>
              </div>
            </div>

            {/* Duración (si no se mostró antes) */}
            {hasImage && modulo.duracion_semanas && (
              <div className="flex items-center gap-1 mb-3">
                <Clock className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {modulo.duracion_semanas} semanas
                </span>
              </div>
            )}

            {/* Footer con botón */}
            <button
              onClick={handleViewDetail}
              className="w-full flex items-center justify-between group/btn mt-2 rounded-xl hover:bg-primary/10 p-3 transition-colors cursor-pointer"
              type="button"
            >
              <span className="text-sm md:text-base">Ver contenido</span>
              <ChevronRight className="size-4 md:size-5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de detalle */}
      {showDetailModal && (
        <ModuloDetailModal
          modulo={modulo}
          temas={temas}
          onClose={() => setShowDetailModal(false)}
        />
      )}
    </>
  );
}