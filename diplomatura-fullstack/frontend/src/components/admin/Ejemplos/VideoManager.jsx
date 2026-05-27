import { useState } from 'react';
import { Video, Plus, X, Globe, Trash2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';

const videoTypes = [
  { value: 'youtube', label: 'YouTube' },
  { value: 'vimeo', label: 'Vimeo' },
  { value: 'local', label: 'Video local' },
  { value: 'otro', label: 'Otro' },
];

export function VideoManager({ videos = [], onChange }) {
  const [showForm, setShowForm] = useState(false);
  const [newVideo, setNewVideo] = useState({
    url: '',
    titulo: '',
    tipo: 'youtube',
    orden: videos.length + 1,
  });

  const handleAddVideo = () => {
    if (!newVideo.url.trim()) return;
    
    const updatedVideos = [...videos, { ...newVideo, _id: Date.now() }];
    onChange(updatedVideos);
    setNewVideo({
      url: '',
      titulo: '',
      tipo: 'youtube',
      orden: updatedVideos.length + 1,
    });
    setShowForm(false);
  };

  const handleRemoveVideo = (index) => {
    const updatedVideos = videos.filter((_, i) => i !== index);
    updatedVideos.forEach((v, i) => v.orden = i + 1);
    onChange(updatedVideos);
  };

  const getYoutubeEmbedUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : url;
  };

  const isYoutubeUrl = (url) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  return (
    <div className="space-y-3">
      {/* Lista de videos existentes */}
      {videos.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Videos cargados:</p>
          {videos.map((video, idx) => (
            <div key={idx} className="flex gap-2 items-center bg-muted/20 p-2 rounded-lg">
              <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-black/30">
                {video.tipo === 'youtube' && isYoutubeUrl(video.url) ? (
                  <img
                    src={`https://img.youtube.com/vi/${video.url.split('v=')[1]?.split('&')[0]}/default.jpg`}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Video className="w-8 h-8 m-4 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{video.titulo || 'Sin título'}</p>
                <p className="text-xs text-muted-foreground truncate max-w-xs">{video.url}</p>
                <Badge variant="outline" className="mt-1 text-xs">
                  {videoTypes.find(t => t.value === video.tipo)?.label || video.tipo}
                </Badge>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveVideo(idx)}
                className="p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Botón para agregar video */}
      {!showForm ? (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Agregar video
        </button>
      ) : (
        <div className="bg-muted/20 p-3 rounded-lg space-y-3">
          <div>
            <Label className="text-xs">URL del video *</Label>
            <Input
              value={newVideo.url}
              onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
              placeholder="https://youtube.com/... o https://vimeo.com/..."
              className="text-sm mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">Título (opcional)</Label>
            <Input
              value={newVideo.titulo}
              onChange={(e) => setNewVideo({ ...newVideo, titulo: e.target.value })}
              placeholder="Título del video"
              className="text-sm mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">Tipo</Label>
            <select
              value={newVideo.tipo}
              onChange={(e) => setNewVideo({ ...newVideo, tipo: e.target.value })}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm mt-1"
            >
              {videoTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
            <Button type="button" size="sm" onClick={handleAddVideo}>
              Agregar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}