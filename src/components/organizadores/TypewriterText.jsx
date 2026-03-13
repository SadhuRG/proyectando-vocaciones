import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * TypewriterText
 * ──────────────────────────────────────────────────────────────
 * Escribe carácter a carácter cuando el componente entra al
 * viewport. Usa requestAnimationFrame (no setInterval) para
 * evitar trabas, glitches y batería innecesaria.
 *
 * Coloca este archivo en:
 *   src/components/organizadores/TypewriterText.jsx
 *
 * Props:
 *   segments  Array<{ text: string, bold?: boolean }>
 *   speed     ms por carácter          (default: 40)
 *   delay     ms de espera al inicio   (default: 300)
 *   cursor    mostrar cursor parpadeante (default: true)
 *   className clase extra para el <span> wrapper
 *
 * Ejemplo de uso:
 *   const SEGS = [
 *     { text: 'Somos la ' },
 *     { text: 'SEDIPRO UNT', bold: true },
 *     { text: ', un equipo...' },
 *   ];
 *   <TypewriterText segments={SEGS} speed={40} delay={300} />
 */
const TypewriterText = ({
  segments = [],
  speed    = 40,
  delay    = 300,
  cursor   = true,
  className = '',
}) => {
  const [charCount, setCharCount] = useState(0);
  const [done, setDone]           = useState(false);

  const wrapperRef    = useRef(null);
  const rafRef        = useRef(null);
  const lastTimeRef   = useRef(null);
  const startedRef    = useRef(false);
  const charCountRef  = useRef(0);   // espejo de charCount para el loop rAF
  const totalRef      = useRef(0);

  /* Aplanar segments → array plano de { ch, bold } */
  const charsRef = useRef([]);
  useEffect(() => {
    const flat = [];
    segments.forEach((seg) => {
      [...seg.text].forEach((ch) => flat.push({ ch, bold: !!seg.bold }));
    });
    charsRef.current  = flat;
    totalRef.current  = flat.length;
    charCountRef.current = 0;
    setCharCount(0);
    setDone(false);
    startedRef.current = false;
    lastTimeRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, [segments]);

  /* Loop rAF: avanza un char cada `speed` ms */
  const loop = useCallback((timestamp) => {
    if (lastTimeRef.current === null) lastTimeRef.current = timestamp;

    const elapsed = timestamp - lastTimeRef.current;
    if (elapsed >= speed) {
      lastTimeRef.current = timestamp - (elapsed % speed); // evita deriva
      charCountRef.current = Math.min(
        charCountRef.current + 1,
        totalRef.current
      );
      setCharCount(charCountRef.current);

      if (charCountRef.current >= totalRef.current) {
        setDone(true);
        return; // salir del loop
      }
    }

    rafRef.current = requestAnimationFrame(loop);
  }, [speed]);

  /* Arrancar animación con delay opcional */
  const startAnimation = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    const t = setTimeout(() => {
      rafRef.current = requestAnimationFrame(loop);
    }, delay);
    return () => clearTimeout(t);
  }, [loop, delay]);

  /* IntersectionObserver: activa cuando la caja entra al viewport */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startAnimation]);

  /* Reconstruir JSX agrupando chars consecutivos del mismo tipo */
  const renderText = () => {
    const visible = charsRef.current.slice(0, charCount);
    if (!visible.length) return null;

    const groups = [];
    let cur = { bold: visible[0].bold, text: '' };
    visible.forEach(({ ch, bold }) => {
      if (bold === cur.bold) {
        cur.text += ch;
      } else {
        groups.push({ ...cur });
        cur = { bold, text: ch };
      }
    });
    groups.push(cur);

    return groups.map((g, i) =>
      g.bold
        ? <strong key={i}>{g.text}</strong>
        : <span    key={i}>{g.text}</span>
    );
  };

  return (
    <span
      ref={wrapperRef}
      className={`typewriter-wrapper${className ? ` ${className}` : ''}`}
      aria-live="polite"
    >
      {renderText()}
      {cursor && !done && (
        <span className="typewriter-cursor" aria-hidden="true">|</span>
      )}
    </span>
  );
};

export default TypewriterText;