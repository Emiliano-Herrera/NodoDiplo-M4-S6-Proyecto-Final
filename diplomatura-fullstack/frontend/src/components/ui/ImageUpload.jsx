// src/components/ui/ImageUpload.jsx
import { useState } from 'react';
import { ImagePlus, X, Upload, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import axios from 'axios';

export function ImageUpload({ value, onChange, onRemove, className }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(value || '');

  // Configuración de Cloudinary (obtén estos datos de tu cuenta)
  const CLOUD_NAME = 'drlj6ixxm'; // Reemplaza con tu cloud name
  const UPLOAD_PRESET = 'diplomatura_preset'; // Lo crearemos en el paso 4

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida');
      return;
    }

    // Validar tamaño (máximo 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('La imagen no puede superar los 2MB');
      return;
    }

    setLoading(true);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('cloud_name', CLOUD_NAME);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      
      const imageUrl = response.data.secure_url;
      setPreview(imageUrl);
      onChange(imageUrl);
    } catch (error) {
      console.error('Error al subir imagen:', error);
      alert('Error al subir la imagen. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onRemove();
  };

  return (
    <div className={cn("space-y-2", className)}>
      {preview ? (
        <div className="relative w-full max-w-xs rounded-lg overflow-hidden border border-border">
          <img 
            src={preview} 
            alt="Vista previa" 
            className="w-full h-32 object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-black/60 rounded-full hover:bg-black/80 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full max-w-xs h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/20 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {loading ? (
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            ) : (
              <>
                <ImagePlus className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground text-center">
                  Click para subir<br />imagen (max 2MB)
                </p>
              </>
            )}
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/jpeg,image/png,image/webp" 
            onChange={handleFileChange}
            disabled={loading}
          />
        </label>
      )}
    </div>
  );
}