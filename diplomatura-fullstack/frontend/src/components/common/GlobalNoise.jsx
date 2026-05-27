import { cn } from "../../lib/utils";

// URL del SVG de ruido (la misma de CuiCui)
const noiseSvgUrl = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlnsXlink='http://www.w3.org/1999/xlink' viewBox='0 0 700 700' width='700' height='700' opacity='1'%3e%3ctitle%3enoise%3c/title%3e%3cdefs%3e%3cfilter id='nnnoise-filter' x='-20%25' y='-20%25' width='140%25' height='140%25' filterUnits='objectBoundingBox' primitiveUnits='userSpaceOnUse' color-interpolation-filters='linearRGB'%3e%3cfeTurbulence type='fractalNoise' baseFrequency='0.2' numOctaves='4' seed='15' stitchTiles='stitch' x='0%25' y='0%25' width='100%25' height='100%25' result='turbulence'/%3e%3cfeSpecularLighting surfaceScale='5' specularConstant='0.8' specularExponent='20' lighting-color='white' x='0%25' y='0%25' width='100%25' height='100%25' in='turbulence' result='specularLighting'%3e%3cfeDistantLight azimuth='3' elevation='96'/%3e%3c/feSpecularLighting%3e%3cfeColorMatrix type='saturate' values='0' x='0%25' y='0%25' width='100%25' height='100%25' in='specularLighting' result='colormatrix'/%3e%3c/filter%3e%3c/defs%3e%3crect width='700' height='700' fill='black'/%3e%3crect width='700' height='700' fill='white' filter='url(%23nnnoise-filter)'/%3e%3c/svg%3e")`;

/**
 * Componente de ruido que cubre TODA la pantalla (incluyendo sidebar, navbar, etc.)
 */
export function GlobalNoise({ 
  opacity = 0.05, 
  backgroundSize = "400px",
  className,
  ...props 
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 pointer-events-none select-none z-[9999]",
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