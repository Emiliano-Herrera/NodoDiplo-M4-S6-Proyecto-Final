import { useState } from "react";
import { motion } from "framer-motion";
import {
  Edit,
  Trash2,
  Copy,
  Check,
  Video,
  Image as ImageIcon,
  Eye,
  Code,
  Link,
  ExternalLink,
} from "lucide-react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { LiveCodePreview } from "./LiveCodePreview";

export function EjemploCard({ ejemplo, onEdit, onDelete, isAdmin }) {
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showFullCode, setShowFullCode] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(ejemplo.codigo || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasVideo = ejemplo.video_url && ejemplo.video_url !== "";
  const hasImages = ejemplo.imagenes && ejemplo.imagenes.length > 0;
  const hasVideos = ejemplo.videos && ejemplo.videos.length > 0;
  const hasRecursos = ejemplo.recursos && ejemplo.recursos.length > 0;

  const getYoutubeEmbedUrl = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  const isYoutubeUrl = (url) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  const getRecursoTypeIcon = (tipo) => {
    switch (tipo) {
      case "github":
        return <span className="text-xs">🐙</span>;
      case "documentacion":
        return <span className="text-xs">📚</span>;
      case "articulo":
        return <span className="text-xs">📄</span>;
      case "tutorial":
        return <span className="text-xs">🎓</span>;
      case "herramienta":
        return <span className="text-xs">🛠️</span>;
      default:
        return <ExternalLink className="w-3 h-3" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="border border-border/50 rounded-xl bg-card overflow-hidden hover:shadow-lg transition-all duration-200"
    >
      {/* Header con título y badges */}
      <div className="p-5 border-b border-border/50 bg-muted/10">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{ejemplo.titulo}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {hasVideo && (
                <Badge variant="outline" className="gap-1 text-xs">
                  <Video className="w-3 h-3" /> Video
                </Badge>
              )}
              {hasImages && (
                <Badge variant="outline" className="gap-1 text-xs">
                  <ImageIcon className="w-3 h-3" /> {ejemplo.imagenes.length}{" "}
                  {ejemplo.imagenes.length === 1 ? "imagen" : "imágenes"}
                </Badge>
              )}
              {hasVideos && (
                <Badge variant="outline" className="gap-1 text-xs">
                  <Video className="w-3 h-3" /> {ejemplo.videos.length} videos
                  adicionales
                </Badge>
              )}
              {hasRecursos && (
                <Badge variant="outline" className="gap-1 text-xs">
                  <Link className="w-3 h-3" /> {ejemplo.recursos.length}{" "}
                  recursos
                </Badge>
              )}
              {ejemplo.codigo && (
                <Badge variant="outline" className="gap-1 text-xs">
                  <Code className="w-3 h-3" /> Código interactivo
                </Badge>
              )}
            </div>
          </div>
          {isAdmin && (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(ejemplo)}
                className="h-8 w-8 p-0 rounded-full"
                title="Editar ejemplo"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(ejemplo)}
                className="h-8 w-8 p-0 rounded-full text-red-500 hover:text-red-600"
                title="Eliminar ejemplo"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Explicación */}
      {ejemplo.explicacion && (
        <div className="p-5 border-b border-border/50">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {ejemplo.explicacion}
          </p>
        </div>
      )}

      {/* Código y Vista Previa */}
      {ejemplo.html && (
        <div className="p-5 border-b border-border/50">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowLivePreview(false)}
              className={`px-3 py-1.5 text-xs rounded-full transition-all duration-200 flex items-center gap-1 ${
                !showLivePreview
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
              }`}
            >
              <Code className="w-3 h-3" />
              Código
            </button>
            <button
              onClick={() => setShowLivePreview(true)}
              className={`px-3 py-1.5 text-xs rounded-full transition-all duration-200 flex items-center gap-1 ${
                showLivePreview
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
              }`}
            >
              <Eye className="w-3 h-3" />
              Vista Previa
            </button>
          </div>

          {showLivePreview ? (
            <LiveCodePreview
              html={ejemplo.html}
              css={ejemplo.css}
              javascript={ejemplo.javascript}
            />
          ) : (
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono text-muted-foreground">
                  HTML
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-1.5 rounded-md hover:bg-muted transition-colors flex items-center gap-1 text-xs"
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-green-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  {copied ? "Copiado" : "Copiar"}
                </button>
              </div>
              <pre
                className={`text-xs font-mono bg-muted/30 p-4 rounded-lg overflow-x-auto ${!showFullCode && "max-h-40"}`}
              >
                <code className="whitespace-pre-wrap">{ejemplo.html}</code>
              </pre>
              {ejemplo.html?.length > 400 && (
                <button
                  onClick={() => setShowFullCode(!showFullCode)}
                  className="text-xs text-primary mt-2 hover:underline"
                >
                  {showFullCode ? "Ver menos" : "Ver más"}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Imágenes del ejemplo */}
      {hasImages && (
        <div className="px-5 py-4 border-b border-border/50">
          <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
            <ImageIcon className="w-3 h-3" />
            Imágenes del ejemplo:
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {ejemplo.imagenes.map((img, idx) => (
              <div key={idx} className="flex-shrink-0 group relative">
                <img
                  src={img.url}
                  alt={img.descripcion || `Imagen ${idx + 1}`}
                  className="w-24 h-24 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200 shadow-md"
                  onClick={() => window.open(img.url, "_blank")}
                />
                {img.descripcion && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="line-clamp-1">{img.descripcion}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Videos adicionales */}
      {hasVideos && (
        <div className="px-5 py-4 border-b border-border/50">
          <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
            <Video className="w-3 h-3" />
            Videos adicionales:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ejemplo.videos.map((video, idx) => (
              <div key={idx} className="bg-muted/20 rounded-lg p-2">
                {video.tipo === "youtube" && isYoutubeUrl(video.url) ? (
                  <iframe
                    src={getYoutubeEmbedUrl(video.url)}
                    className="w-full aspect-video rounded-lg"
                    allowFullScreen
                    title={video.titulo || "Video"}
                  />
                ) : (
                  <video
                    src={video.url}
                    controls
                    className="w-full rounded-lg"
                  />
                )}
                {video.titulo && (
                  <p className="text-xs font-medium mt-2 line-clamp-1">
                    {video.titulo}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recursos externos */}
      {hasRecursos && (
        <div className="px-5 py-4">
          <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
            <Link className="w-3 h-3" />
            Recursos útiles:
          </p>
          <div className="space-y-2">
            {ejemplo.recursos.map((recurso, idx) => (
              <a
                key={idx}
                href={recurso.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/20 transition-colors group"
              >
                <div className="p-1.5 rounded bg-primary/10">
                  {getRecursoTypeIcon(recurso.tipo)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">
                    {recurso.titulo}
                  </p>
                  {recurso.descripcion && (
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {recurso.descripcion}
                    </p>
                  )}
                </div>
                <Badge variant="outline" className="text-xs">
                  {recurso.tipo}
                </Badge>
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
