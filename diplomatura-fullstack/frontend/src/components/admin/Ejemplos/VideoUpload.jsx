import { useState } from 'react';
import { Video, X, Loader2, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import axios from 'axios';

export function VideoUpload({ value, onChange, onRemove, className }) {
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(value || '');
  const [isYoutubeUrl, setIsYoutubeUrl] = useState(false);

  const CLOUD_NAME = 'drlj6ixxm';
  const UPLOAD_PRESET = 'diplomatura_preset';

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      alert('Por favor selecciona un video válido');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert('El video no puede superar los 50MB');
      return;
    }

    setLoading(true);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('cloud_name', CLOUD_NAME);
    formData.append('resource_type', 'video');

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
        formData
      );
      
      const videoUrl = response.data.secure_url;
      setVideoUrl(videoUrl);
      setIsYoutubeUrl(false);
      onChange(videoUrl);
    } catch (error) {
      console.error('Error al subir video:', error);
      alert('Error al subir el video. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleYoutubeUrl = (url) => {
    setVideoUrl(url);
    setIsYoutubeUrl(true);
    onChange(url);
  };

  const handleRemove = () => {
    setVideoUrl('');
    setIsYoutubeUrl(false);
    onRemove();
  };

  // Extraer ID de YouTube
  const getYoutubeEmbedUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : url;
  };

  return (
    <div className={cn("space-y-3", className)}>
      {videoUrl ? (
        <div className="relative rounded-lg overflow-hidden border border-border">
          {isYoutubeUrl ? (
            <iframe
              src={getYoutubeEmbedUrl(videoUrl)}
              className="w-full aspect-video"
              allowFullScreen
              title="Video preview"
            />
          ) : (
            <video src={videoUrl} controls className="w-full aspect-video" />
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full hover:bg-black/80 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Subir archivo de video */}
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/20 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {loading ? (
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              ) : (
                <>
                  <Video className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="text-xs text-muted-foreground text-center">
                    Click para subir video<br />(max 50MB)
                  </p>
                </>
              )}
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="video/mp4,video/webm" 
              onChange={handleFileChange}
              disabled={loading}
            />
          </label>
          
          {/* O usar URL de YouTube */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Play className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="O pega URL de YouTube"
              value={videoUrl}
              onChange={(e) => handleYoutubeUrl(e.target.value)}
              className="w-full rounded-xl border border-border bg-background pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      )}
    </div>
  );
}