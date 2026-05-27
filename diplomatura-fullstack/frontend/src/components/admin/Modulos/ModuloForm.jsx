import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { ImageUpload } from "../../ui/ImageUpload";

export function ModuloForm({
  modulo,
  profesores,
  modulosExistentes,
  onSave,
  onClose,
}) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    orden: 1,
    duracion_semanas: 4,
    profesor_id: "",
    imagen_portada: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Obtener IDs de profesores ya asignados a OTROS módulos (excluyendo el actual)
  const profesoresAsignadosIds =
    modulosExistentes
      ?.filter((m) => m._id !== modulo?._id && m.profesor_id)
      .map((m) => m.profesor_id?._id || m.profesor_id) || [];

  // Filtrar profesores disponibles (no asignados a otros módulos)
  const profesoresDisponibles =
    profesores?.filter(
      (p) =>
        !profesoresAsignadosIds.includes(p._id) ||
        p._id === formData.profesor_id,
    ) || [];

  useEffect(() => {
    if (modulo) {
      setFormData({
        nombre: modulo.nombre || "",
        descripcion: modulo.descripcion || "",
        orden: modulo.orden || 1,
        duracion_semanas: modulo.duracion_semanas || 4,
        profesor_id: modulo.profesor_id?._id || modulo.profesor_id || "",
        imagen_portada: modulo.imagen_portada || "",
      });
    } else {
      setFormData({
        nombre: "",
        descripcion: "",
        orden: 1,
        duracion_semanas: 4,
        profesor_id: "",
        imagen_portada: "",
      });
    }
  }, [modulo]);

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.descripcion.trim())
      newErrors.descripcion = "La descripción es obligatoria";
    if (formData.orden < 1 || formData.orden > 4) {
      newErrors.orden = "El orden debe ser entre 1 y 4";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Preparar datos para enviar
      const dataToSend = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        orden: Number(formData.orden),
        duracion_semanas: Number(formData.duracion_semanas),
        profesor_id: formData.profesor_id || null, // Enviar null si no hay profesor
        imagen_portada: formData.imagen_portada || "",
      };

      console.log("📤 Enviando datos del módulo:", dataToSend);
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
      <div className="bg-card rounded-xl shadow-xl w-full max-w-md p-6 border border-border animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-card pb-2">
          <h2 className="text-xl font-semibold">
            {modulo ? "Editar Módulo" : "Nuevo Módulo"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="nombre" className="block mb-2 text-sm font-medium">
              Nombre *
            </Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              className={
                errors.nombre ? "border-red-500 rounded-xl" : "rounded-xl"
              }
            />
            {errors.nombre && (
              <p className="text-sm text-red-500 mt-1">{errors.nombre}</p>
            )}
          </div>

          <div>
            <Label
              htmlFor="descripcion"
              className="block mb-2 text-sm font-medium"
            >
              Descripción *
            </Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) =>
                setFormData({ ...formData, descripcion: e.target.value })
              }
              className={
                errors.descripcion ? "border-red-500 rounded-xl" : "rounded-xl"
              }
              rows={3}
            />
            {errors.descripcion && (
              <p className="text-sm text-red-500 mt-1">{errors.descripcion}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="orden" className="block mb-2 text-sm font-medium">
                Orden (1-4) *
              </Label>
              <Input
                id="orden"
                type="number"
                min="1"
                max="4"
                value={formData.orden}
                onChange={(e) =>
                  setFormData({ ...formData, orden: parseInt(e.target.value) })
                }
                className={
                  errors.orden ? "border-red-500 rounded-xl" : "rounded-xl"
                }
              />
              {errors.orden && (
                <p className="text-sm text-red-500 mt-1">{errors.orden}</p>
              )}
            </div>

            <div>
              <Label
                htmlFor="duracion_semanas"
                className="block mb-2 text-sm font-medium"
              >
                Duración (semanas)
              </Label>
              <Input
                id="duracion_semanas"
                type="number"
                min="1"
                value={formData.duracion_semanas}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duracion_semanas: parseInt(e.target.value),
                  })
                }
                className="rounded-xl"
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="profesor_id"
              className="block mb-2 text-sm font-medium"
            >
              Profesor a cargo
            </Label>
            <Select
              value={formData.profesor_id || "ninguno"}
              onValueChange={(value) => {
                if (value === "ninguno") {
                  setFormData({ ...formData, profesor_id: "" });
                } else {
                  setFormData({ ...formData, profesor_id: value });
                }
              }}
            >
              <SelectTrigger className="w-full rounded-xl">
                <SelectValue placeholder="Seleccionar profesor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ninguno">Ninguno</SelectItem>
                {profesoresDisponibles.length > 0 ? (
                  profesoresDisponibles.map((profesor) => (
                    <SelectItem key={profesor._id} value={profesor._id}>
                      {profesor.nombre}
                      {profesoresAsignadosIds.includes(profesor._id) &&
                        profesor._id !== formData.profesor_id &&
                        " (asignado a otro módulo)"}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="sin_profesores" disabled>
                    No hay profesores disponibles
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {formData.profesor_id &&
              profesoresAsignadosIds.includes(formData.profesor_id) && (
                <p className="text-xs text-yellow-500 mt-1">
                  Este profesor ya está asignado a otro módulo
                </p>
              )}
          </div>

          <div>
            <Label className="block mb-2 text-sm font-medium">
              Imagen de portada
            </Label>
            <ImageUpload
              value={formData.imagen_portada}
              onChange={(url) =>
                setFormData({ ...formData, imagen_portada: url })
              }
              onRemove={() => setFormData({ ...formData, imagen_portada: "" })}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Formatos aceptados: JPG, PNG, WEBP. Máximo 2MB.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-full"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="rounded-full">
              {loading ? "Guardando..." : modulo ? "Actualizar" : "Crear"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
