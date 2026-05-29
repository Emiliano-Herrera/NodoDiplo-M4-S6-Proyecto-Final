import { useState, useEffect } from 'react';
import { Code, Image, Copy, Check, Video, Link as LinkIcon, ExternalLink, Eye, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { getEjemplosByTema } from '../../services/temaService';
import { LiveCodePreview } from '../admin/Ejemplos/LiveCodePreview';

export function ModuloContent({ tema, proyecto, tipoContenido = 'tema' }) {
  const [ejemplos, setEjemplos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedEjemplos, setExpandedEjemplos] = useState({});
  const [copiedStates, setCopiedStates] = useState({});
  const [showLivePreview, setShowLivePreview] = useState({});

  useEffect(() => {
    if (tema && tipoContenido === 'tema') {
      const loadEjemplos = async () => {
        setLoading(true);
        try {
          const data = await getEjemplosByTema(tema._id);
          setEjemplos(data);
        } catch (error) {
          console.error('Error al cargar ejemplos:', error);
        } finally {
          setLoading(false);
        }
      };
      loadEjemplos();
    }
  }, [tema]);

  const handleCopyCode = (code, ejemploId) => {
    navigator.clipboard.writeText(code);
    setCopiedStates(prev => ({ ...prev, [ejemploId]: true }));
    setTimeout(() => setCopiedStates(prev => ({ ...prev, [ejemploId]: false })), 2000);
  };

  const toggleExpanded = (ejemploId) => {
    setExpandedEjemplos(prev => ({ ...prev, [ejemploId]: !prev[ejemploId] }));
  };

  const toggleLivePreview = (ejemploId, e) => {
    e.stopPropagation();
    setShowLivePreview(prev => ({ ...prev, [ejemploId]: !prev[ejemploId] }));
  };

  const getYoutubeEmbedUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : url;
  };

  const isYoutubeUrl = (url) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  // Si es proyecto final
  if (tipoContenido === 'proyecto' && proyecto) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="p-4 md:p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl mb-4">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="p-3 rounded-xl bg-primary/20">
              <Award className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">Proyecto Final</h1>
              <p className="text-sm text-muted-foreground">Módulo {proyecto.modulo_id?.orden} - {proyecto.modulo_id?.nombre}</p>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 space-y-6">
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-3">{proyecto.titulo}</h2>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-sm md:text-base text-muted-foreground">{proyecto.descripcion}</p>
            </div>
          </div>

          {proyecto.requisitos && (
            <div className="bg-muted/20 p-4 rounded-xl">
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm md:text-base">
                <span>📋</span> Requisitos del proyecto
              </h3>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-xs md:text-sm">{proyecto.requisitos}</p>
              </div>
            </div>
          )}

          {proyecto.link_demo && (
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm md:text-base">
                <span>🔗</span> Ver demostración
              </h3>
              <a
                href={proyecto.link_demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm md:text-base break-all"
              >
                <ExternalLink className="w-4 h-4" />
                {proyecto.link_demo}
              </a>
            </div>
          )}

          {proyecto.imagen_ejemplo && (
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm md:text-base">
                <span>🖼️</span> Imagen de referencia
              </h3>
              <img
                src={proyecto.imagen_ejemplo}
                alt={proyecto.titulo}
                className="rounded-xl max-w-full h-auto border border-border/50 cursor-pointer"
                onClick={() => window.open(proyecto.imagen_ejemplo, '_blank')}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (tipoContenido === 'proyecto' && !proyecto) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground p-6">
        <div className="text-center">
          <Award className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No hay proyecto final disponible para este módulo</p>
        </div>
      </div>
    );
  }

  if (!tema) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground p-6">
        <p className="text-center">Selecciona un módulo y tema para ver el contenido</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      {/* Header del tema - Responsive */}
      <div className="p-4 md:p-6 bg-muted/10 rounded-xl mb-4">
        <h1 className="text-xl md:text-2xl font-bold mb-2 break-words">{tema.titulo}</h1>
        <div className="text-sm md:text-base text-muted-foreground prose prose-sm max-w-none">
          {tema.contenido}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : ejemplos.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground border rounded-xl">
          <Code className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No hay ejemplos disponibles para este tema</p>
        </div>
      ) : (
        <div className="space-y-4 md:space-y-6">
          {ejemplos.map((ejemplo) => {
            const isExpanded = expandedEjemplos[ejemplo._id];
            const hasCode = ejemplo.html || ejemplo.codigo;
            const hasImages = ejemplo.imagenes?.length > 0;
            const hasVideos = ejemplo.videos?.length > 0;
            const hasRecursos = ejemplo.recursos?.length > 0;
            const showPreview = showLivePreview[ejemplo._id];

            return (
              <div key={ejemplo._id} className="border border-border/50 rounded-xl overflow-hidden">
                <div 
                  className="p-3 md:p-4 bg-muted/10 cursor-pointer hover:bg-muted/20 transition-colors flex justify-between items-center gap-2"
                  onClick={() => toggleExpanded(ejemplo._id)}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base md:text-lg break-words">{ejemplo.titulo}</h3>
                    {ejemplo.explicacion && (
                      <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">
                        {ejemplo.explicacion}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                    <div className="hidden sm:flex gap-1 md:gap-2">
                      {hasCode && <span className="text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded-full bg-primary/10 text-primary">Código</span>}
                      {hasImages && <span className="text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded-full bg-primary/10 text-primary">Imágenes</span>}
                      {hasVideos && <span className="text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded-full bg-primary/10 text-primary">Videos</span>}
                      {hasRecursos && <span className="text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded-full bg-primary/10 text-primary">Recursos</span>}
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-3 md:p-4 space-y-4 border-t border-border/50">
                    {/* Explicación completa */}
                    {ejemplo.explicacion && (
                      <div className="bg-muted/20 p-3 md:p-4 rounded-lg">
                        <p className="text-xs md:text-sm">{ejemplo.explicacion}</p>
                      </div>
                    )}

                    {/* Botones para código/vista previa */}
                    {hasCode && (
                      <div>
                        <div className="flex gap-2 mb-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowLivePreview(prev => ({ ...prev, [ejemplo._id]: false }));
                            }}
                            className={`px-2 md:px-3 py-1 text-xs rounded-full transition-all duration-200 flex items-center gap-1 ${
                              !showPreview
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                            }`}
                          >
                            <Code className="w-3 h-3" />
                            Código
                          </button>
                          <button
                            onClick={(e) => toggleLivePreview(ejemplo._id, e)}
                            className={`px-2 md:px-3 py-1 text-xs rounded-full transition-all duration-200 flex items-center gap-1 ${
                              showPreview
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                            }`}
                          >
                            <Eye className="w-3 h-3" />
                            Vista Previa
                          </button>
                        </div>

                        {showPreview ? (
                          <LiveCodePreview
                            html={ejemplo.html || ''}
                            css={ejemplo.css || ''}
                            javascript={ejemplo.javascript || ''}
                          />
                        ) : (
                          <div>
                            <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                              <h4 className="text-xs md:text-sm font-medium text-muted-foreground">Código HTML</h4>
                              <button
                                onClick={() => handleCopyCode(ejemplo.html || ejemplo.codigo, ejemplo._id)}
                                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {copiedStates[ejemplo._id] ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                                {copiedStates[ejemplo._id] ? 'Copiado' : 'Copiar código'}
                              </button>
                            </div>
                            <pre className="bg-muted/30 p-3 md:p-4 rounded-xl overflow-x-auto">
                              <code className="text-xs md:text-sm font-mono whitespace-pre-wrap break-words">
                                {ejemplo.html || ejemplo.codigo}
                              </code>
                            </pre>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Imágenes - Grid responsive */}
                    {hasImages && (
                      <div>
                        <h4 className="text-xs md:text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                          <Image className="w-4 h-4" /> Imágenes del ejemplo
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
                          {ejemplo.imagenes.map((img, i) => (
                            <img
                              key={i}
                              src={img.url}
                              alt={img.descripcion || `Imagen ${i + 1}`}
                              className="rounded-lg w-full h-24 md:h-32 object-cover cursor-pointer hover:scale-105 transition-transform"
                              onClick={() => window.open(img.url, '_blank')}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Videos - Grid responsive */}
                    {hasVideos && (
                      <div>
                        <h4 className="text-xs md:text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                          <Video className="w-4 h-4" /> Videos del ejemplo
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {ejemplo.videos.map((video, i) => (
                            <div key={i} className="rounded-lg overflow-hidden">
                              {video.tipo === 'youtube' && isYoutubeUrl(video.url) ? (
                                <iframe
                                  src={getYoutubeEmbedUrl(video.url)}
                                  className="w-full aspect-video"
                                  allowFullScreen
                                  title={video.titulo || 'Video'}
                                />
                              ) : (
                                <video src={video.url} controls className="w-full rounded-lg" />
                              )}
                              {video.titulo && (
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{video.titulo}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recursos externos */}
                    {hasRecursos && (
                      <div>
                        <h4 className="text-xs md:text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                          <LinkIcon className="w-4 h-4" /> Recursos útiles
                        </h4>
                        <div className="space-y-2">
                          {ejemplo.recursos.map((recurso, i) => (
                            <a
                              key={i}
                              href={recurso.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/20 transition-colors group"
                            >
                              <ExternalLink className="w-4 h-4 text-primary flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                                  {recurso.titulo}
                                </p>
                                {recurso.descripcion && (
                                  <p className="text-xs text-muted-foreground line-clamp-1">{recurso.descripcion}</p>
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground flex-shrink-0 hidden sm:inline-block">{recurso.tipo}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}