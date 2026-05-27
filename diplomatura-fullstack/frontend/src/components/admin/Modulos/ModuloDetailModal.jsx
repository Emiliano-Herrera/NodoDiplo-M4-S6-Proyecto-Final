import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen } from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

const StaticStep = ({ step, title, children }) => {
  return (
    <div className="flex gap-4">
      {/* Lado izquierdo - número y línea */}
      <div className="flex flex-col items-center">
        <div className="flex size-8 flex-none items-center justify-center rounded-full border border-primary/20 bg-primary/10 font-medium text-primary text-sm">
          {step}
        </div>
        <div className="relative my-2 h-full w-px rounded-full bg-border" />
      </div>
      
      {/* Lado derecho - contenido */}
      <div className="mb-6 w-full">
        <h6 className="mb-2 font-medium text-lg text-foreground tracking-tight">
          {title}
        </h6>
        {children}
      </div>
    </div>
  );
};

export function ModuloDetailModal({ modulo, temas, onClose }) {
  // Colores según el orden del módulo
  const badgeColors = {
    1: 'blue',
    2: 'green',
    3: 'purple',
    4: 'orange',
  };
  
  const badgeColor = badgeColors[modulo?.orden] || 'neutral';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-2xl mx-4"
        >
          <div className="bg-card rounded-2xl border border-border/50 shadow-2xl overflow-hidden">
            {/* Header del modal */}
            <div className="flex justify-between items-center p-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Badge color={badgeColor} rounded="full" size="sm" className="font-mono">
                      Módulo {modulo?.orden}
                    </Badge>
                    <h2 className="text-xl font-semibold">{modulo?.nombre}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {modulo?.descripcion}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido del modal - Lista de temas estilo pasos */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {temas.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No hay temas registrados para este módulo.
                </div>
              ) : (
                <div className="space-y-0">
                  {temas.map((tema, index) => (
                    <StaticStep
                      key={tema._id}
                      step={tema.orden || index + 1}
                      title={tema.titulo}
                    >
                      {/* Aquí puedes agregar más contenido del tema después */}
                      <div className="text-sm text-muted-foreground">
                        {/* Contenido adicional del tema (opcional) */}
                      </div>
                    </StaticStep>
                  ))}
                </div>
              )}
            </div>

            {/* Footer del modal */}
            <div className="p-6 border-t border-border/50 bg-muted/10">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  {temas.length} {temas.length === 1 ? 'tema' : 'temas'} en este módulo
                </p>
                <Button variant="outline" onClick={onClose} className="rounded-full">
                  Cerrar
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}