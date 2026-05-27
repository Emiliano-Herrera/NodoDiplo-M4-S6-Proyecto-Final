import { cn } from "../../lib/utils";

// URL del SVG de ruido (la misma de CuiCui pero sin animación)
const noiseSvgUrl = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlnsXlink='http://www.w3.org/1999/xlink' viewBox='0 0 700 700' width='700' height='700' opacity='1'%3e%3ctitle%3enoise%3c/title%3e%3cdefs%3e%3cfilter id='nnnoise-filter' x='-20%25' y='-20%25' width='140%25' height='140%25' filterUnits='objectBoundingBox' primitiveUnits='userSpaceOnUse' color-interpolation-filters='linearRGB'%3e%3cfeTurbulence type='fractalNoise' baseFrequency='0.2' numOctaves='4' seed='15' stitchTiles='stitch' x='0%25' y='0%25' width='100%25' height='100%25' result='turbulence'/%3e%3cfeSpecularLighting surfaceScale='5' specularConstant='0.8' specularExponent='20' lighting-color='white' x='0%25' y='0%25' width='100%25' height='100%25' in='turbulence' result='specularLighting'%3e%3cfeDistantLight azimuth='3' elevation='96'/%3e%3c/feSpecularLighting%3e%3cfeColorMatrix type='saturate' values='0' x='0%25' y='0%25' width='100%25' height='100%25' in='specularLighting' result='colormatrix'/%3e%3c/filter%3e%3c/defs%3e%3crect width='700' height='700' fill='black'/%3e%3crect width='700' height='700' fill='white' filter='url(%23nnnoise-filter)'/%3e%3c/svg%3e")`;

/**
 * Componente de ruido/estática SVG
 * @param {number} opacity - Opacidad del ruido (0 a 1)
 * @param {string} backgroundSize - Tamaño del patrón (ej: "400px", "200px", "100%")
 * @param {boolean} animated - Si la animación está activa o no
 */
export function StaticNoise({ 
  opacity = 0.15, 
  backgroundSize = "400px", 
  animated = false,  // Por defecto estático, sin movimiento
  className,
  ...props 
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none select-none z-0",
        animated && "animate-noise",
        className
      )}
      style={{
        backgroundRepeat: "repeat",
        backgroundImage: noiseSvgUrl,
        backgroundSize: backgroundSize,
        opacity: opacity,
      }}
      {...props}
    />
  );
}

// CSS de la animación (pero no la usaremos a menos que animated=true)
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes noise {
    0%, 100% { transform: translate(0, 0); }
    10% { transform: translate(-1.5%, -2.5%); }
    20% { transform: translate(2.5%, 1.5%); }
    30% { transform: translate(-2%, 3%); }
    40% { transform: translate(3%, -1.5%); }
    50% { transform: translate(-2.5%, -2.5%); }
    60% { transform: translate(1.5%, 2.5%); }
    70% { transform: translate(-3%, 1.5%); }
    80% { transform: translate(2%, -2%); }
    90% { transform: translate(-1.5%, 2%); }
  }
  .animate-noise {
    animation: noise 0.8s steps(10) infinite;
  }
`;
document.head.appendChild(styleSheet);