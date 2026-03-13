import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

// Calcula si un color de fondo (rgb/rgba) es "oscuro" usando luminancia aproximada
const isDarkColor = (bg) => {
  if (!bg) return false;
  const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!match) return false;
  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 140; // umbral: < 140 lo consideramos fondo oscuro
};

/**
 * Botón flotante "Volver arriba".
 * - Se muestra cuando el usuario ha hecho scroll hacia abajo (> 400px).
 * - Adapta sus colores según el fondo sobre el que está (blanco vs morado/oscuro).
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [onDarkBackground, setOnDarkBackground] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const threshold = 400;

    const updateState = () => {
      const shouldShow = window.scrollY > threshold;
      setVisible(shouldShow);

      // En móvil evitamos recalcular el fondo para que no parpadee el botón.
      if (isMobile) return;

      // Detectar el color de fondo debajo del botón (aprox. esquina inferior derecha)
      const x = window.innerWidth - 32;
      const y = window.innerHeight - 32;
      const el = document.elementFromPoint(x, y);
      if (el) {
        const bg = window.getComputedStyle(el).backgroundColor;
        setOnDarkBackground(isDarkColor(bg));
      }
    };

    updateState();
    window.addEventListener('scroll', updateState);
    window.addEventListener('resize', updateState);
    return () => {
      window.removeEventListener('scroll', updateState);
      window.removeEventListener('resize', updateState);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  // En móvil usamos siempre la variante morada fija (on-light) para evitar parpadeos.
  const variantClass = isMobile
    ? 'back-to-top-float--on-light'
    : (onDarkBackground ? 'back-to-top-float--on-dark' : 'back-to-top-float--on-light');

  return (
    <button
      type="button"
      className={`back-to-top-float ${variantClass}`}
      onClick={scrollToTop}
      aria-label="Volver arriba"
    >
      <FaArrowUp size={18} />
    </button>
  );
}
