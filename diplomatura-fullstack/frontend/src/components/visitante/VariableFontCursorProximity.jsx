import { useRef, useEffect, useMemo } from 'react';
import { useMouse } from '../../hooks/useMouse';

export function VariableFontCursorProximity({
  children,
  fromFontVariationSettings = "'wght' 400, 'slnt' 0",
  toFontVariationSettings = "'wght' 900, 'slnt' -10",
  containerRef,
  radiusZoomingZone = 150,
  falloff = "linear",
  className = "",
  ...props
}) {
  const letterRefs = useRef([]);
  const interpolatedSettingsRef = useRef([]);
  const frameIdRef = useRef(null);
  const { mousePosition } = useMouse(containerRef);

  // Parsear los ajustes de variación de fuente
  const parsedSettings = useMemo(() => {
    const fromSettings = new Map(
      fromFontVariationSettings
        .split(",")
        .map((s) => s.trim())
        .map((s) => {
          const [name, value] = s.split(" ");
          return [name.replace(/['"]/g, ""), parseFloat(value)];
        })
    );

    const toSettings = new Map(
      toFontVariationSettings
        .split(",")
        .map((s) => s.trim())
        .map((s) => {
          const [name, value] = s.split(" ");
          return [name.replace(/['"]/g, ""), parseFloat(value)];
        })
    );

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue,
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const calculateDistance = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };

  const calculateFalloff = (distance) => {
    const normalizedDistance = Math.min(
      Math.max(1 - distance / radiusZoomingZone, 0),
      1
    );

    switch (falloff) {
      case "exponential":
        return normalizedDistance ** 2;
      case "gaussian":
        return Math.exp(-((distance / (radiusZoomingZone / 2)) ** 2) / 2);
      default:
        return normalizedDistance;
    }
  };

  // Animación con requestAnimationFrame
  useEffect(() => {
    const animate = () => {
      if (!containerRef?.current) {
        frameIdRef.current = requestAnimationFrame(animate);
        return;
      }

      const containerRect = containerRef.current.getBoundingClientRect();

      letterRefs.current.forEach((letterRef, index) => {
        if (!letterRef) return;
        if (!mousePosition.x || !mousePosition.y) return;

        const rect = letterRef.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
        const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

        const distance = calculateDistance(
          mousePosition.x,
          mousePosition.y,
          letterCenterX,
          letterCenterY
        );

        if (distance >= radiusZoomingZone) {
          if (letterRef.style.fontVariationSettings !== fromFontVariationSettings) {
            letterRef.style.fontVariationSettings = fromFontVariationSettings;
          }
          return;
        }

        const falloffValue = calculateFalloff(distance);

        const newSettings = parsedSettings
          .map(({ axis, fromValue, toValue }) => {
            const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
            return `'${axis}' ${interpolatedValue}`;
          })
          .join(", ");

        interpolatedSettingsRef.current[index] = newSettings;
        letterRef.style.fontVariationSettings = newSettings;
      });

      frameIdRef.current = requestAnimationFrame(animate);
    };

    frameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [containerRef, mousePosition, parsedSettings, fromFontVariationSettings, radiusZoomingZone, falloff]);

  const words = children.split(" ");
  let letterIndex = 0;

  return (
    <span className={`inline ${className}`} {...props}>
      {words.map((word, wordIndex) => (
        <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap">
          {word.split("").map((letter) => {
            const currentLetterIndex = letterIndex++;
            return (
              <span
                key={currentLetterIndex}
                ref={(el) => {
                  letterRefs.current[currentLetterIndex] = el;
                }}
                className="inline-block transition-all duration-75"
                style={{
                  fontVariationSettings: interpolatedSettingsRef.current[currentLetterIndex] || fromFontVariationSettings,
                }}
              >
                {letter}
              </span>
            );
          })}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
      <span className="sr-only">{children}</span>
    </span>
  );
}

VariableFontCursorProximity.displayName = "VariableFontCursorProximity";
export default VariableFontCursorProximity;