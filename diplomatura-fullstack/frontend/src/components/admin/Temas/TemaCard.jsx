import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../ui/badge";

export function TemaCard({ tema, moduloId, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin/temas/${tema._id}`);
    if (onClick) onClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative h-full rounded-2xl bg-card border border-border/50 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
        {/* Borde superior decorativo */}
        <div className="h-1.5 bg-gradient-to-r from-primary/60 to-primary/20" />
        
        <div className="p-5">
          {/* Header con número */}
          <div className="flex items-center justify-between mb-3">
            <Badge variant="outline" className="rounded-full px-3 py-0.5 text-xs font-mono">
              Tema {tema.orden}
            </Badge>
          </div>
          
          {/* Título */}
          <h3 className="text-lg font-semibold tracking-tight mb-2 line-clamp-2">
            {tema.titulo}
          </h3>
          
          {/* Vista previa del contenido */}
          <div className="relative">
            <div
              className="text-sm text-muted-foreground line-clamp-3"
              dangerouslySetInnerHTML={{
                __html: tema.contenido?.substring(0, 150) + (tema.contenido?.length > 150 ? '...' : '') || 'Sin contenido'
              }}
            />
          </div>
          
          {/* Flecha indicadora */}
          <div className="mt-4 flex justify-end">
            <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}