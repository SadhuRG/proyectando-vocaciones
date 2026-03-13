// src/components/organizadores/PhotoCarousel.jsx
//
// Loop infinito real:
//   [clone_last | ...fotos reales... | clone_first]
//   Al llegar al clon, se salta instantáneamente al original.
// Lightbox: createPortal → fuera de overflow:hidden, siempre centrado.

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

// ─────────────────────────────────────────────────────────────────
// LIGHTBOX (exportado para uso en PV1 / CollageMosaico)
// ─────────────────────────────────────────────────────────────────
export function Lightbox({ images, startIndex, accentColor, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const n = images.length;
  const touchX = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const prev = useCallback(() => setIdx(i => (i - 1 + n) % n), [n]);
  const next = useCallback(() => setIdx(i => (i + 1) % n), [n]);

  const handleDownload = useCallback(async (e) => {
    e.stopPropagation();

    try {
      const imageUrl = images[idx];
      const response = await fetch(imageUrl, { mode: 'cors' });
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      const extension = blob.type.split('/')[1] || 'jpg';

      link.href = blobUrl;
      link.download = `galeria-${idx + 1}.${extension}`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error al descargar la imagen:', error);

      const link = document.createElement('a');
      link.href = images[idx];
      link.download = `galeria-${idx + 1}`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }, [images, idx]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    const ovfl = el.style.overflow;
    const pr = el.style.paddingRight;
    const bar = window.innerWidth - el.clientWidth;

    el.style.overflow = 'hidden';
    el.style.paddingRight = bar + 'px';

    return () => {
      el.style.overflow = ovfl;
      el.style.paddingRight = pr;
    };
  }, []);

  useEffect(() => {
    const fn = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };

    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose, prev, next]);

  const actionBtnStyle = {
    height: isMobile ? '2.6rem' : '2.9rem',
    borderRadius: '999px',
    border: '1px solid rgba(255,255,255,.18)',
    background: 'rgba(20,20,20,.78)',
    backdropFilter: 'blur(10px)',
    color: '#fff',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: isMobile ? '.4rem' : '.55rem',
    padding: isMobile ? '0 .85rem' : '0 1rem',
    fontSize: isMobile ? '.82rem' : '.92rem',
    fontWeight: 600,
    letterSpacing: '.01em',
    transition: 'all .2s ease',
    boxShadow: '0 10px 30px rgba(0,0,0,.25)',
  };

  const iconWrapStyle = {
    width: '1.15rem',
    height: '1.15rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  const modal = (
    <div
      onClick={onClose}
      onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
        touchX.current = null;
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: 'rgba(0,0,0,0.93)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '5.2rem 1rem 1.5rem' : '4rem 5rem 3rem',
        boxSizing: 'border-box',
        animation: 'lbFade .15s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: isMobile ? '.75rem' : '1rem',
          right: isMobile ? '.75rem' : '1.2rem',
          left: isMobile ? '.75rem' : 'auto',
          zIndex: 1000000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMobile ? 'space-between' : 'flex-end',
          gap: '.75rem',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={handleDownload}
          aria-label="Descargar imagen"
          title="Descargar imagen"
          style={{
            ...actionBtnStyle,
            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
            color: '#111',
            border: 'none',
          }}
        >
          <span style={iconWrapStyle}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
              <path
                d="M12 4v10m0 0 4-4m-4 4-4-4M5 19h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>{isMobile ? 'Descargar' : 'Descargar'}</span>
        </button>

        <button
          onClick={onClose}
          aria-label="Cerrar visor"
          title="Cerrar visor"
          style={actionBtnStyle}
        >
          <span style={iconWrapStyle}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span>{isMobile ? 'Cerrar' : 'Cerrar'}</span>
        </button>
      </div>

      {n > 1 && (
        <button
          onClick={e => { e.stopPropagation(); prev(); }}
          aria-label="Anterior"
          title="Imagen anterior"
          style={{
            position: 'fixed',
            left: isMobile ? '.5rem' : '.8rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1000000,
            width: isMobile ? '2.6rem' : '3rem',
            height: isMobile ? '2.6rem' : '3rem',
            borderRadius: '50%',
            border: '1.5px solid rgba(255,255,255,.2)',
            background: 'rgba(20,20,20,.75)',
            backdropFilter: 'blur(8px)',
            color: '#fff',
            fontSize: isMobile ? '1.7rem' : '2rem',
            lineHeight: 1,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
        >
          ‹
        </button>
      )}

      <div
        onClick={e => e.stopPropagation()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '.9rem',
          maxWidth: '100%',
          maxHeight: '100%',
          width: isMobile ? '100%' : 'auto',
          animation: 'lbZoom .22s cubic-bezier(.34,1.4,.64,1)',
        }}
      >
        <img
          key={idx}
          src={images[idx]}
          alt={`Foto ${idx + 1} de ${n}`}
          style={{
            display: 'block',
            maxWidth: isMobile ? '100%' : '100%',
            maxHeight: isMobile ? 'calc(100vh - 11rem)' : 'calc(100vh - 8rem)',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: isMobile ? '8px' : '10px',
            boxShadow: '0 24px 80px rgba(0,0,0,.7)',
          }}
        />

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '.55rem',
            fontSize: isMobile ? '.76rem' : '.82rem',
            fontFamily: 'sans-serif',
            background: 'rgba(0,0,0,.35)',
            padding: isMobile ? '.42rem .85rem' : '.45rem .95rem',
            borderRadius: '999px',
            letterSpacing: '.04em',
            color: '#fff',
          }}
        >
          <span style={{ color: accentColor, fontWeight: 700 }}>
            {idx + 1}
          </span>
          <span style={{ color: 'rgba(255,255,255,.35)' }}>/</span>
          <span style={{ color: 'rgba(255,255,255,.72)' }}>{n}</span>
        </div>
      </div>

      {n > 1 && (
        <button
          onClick={e => { e.stopPropagation(); next(); }}
          aria-label="Siguiente"
          title="Imagen siguiente"
          style={{
            position: 'fixed',
            right: isMobile ? '.5rem' : '.8rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1000000,
            width: isMobile ? '2.6rem' : '3rem',
            height: isMobile ? '2.6rem' : '3rem',
            borderRadius: '50%',
            border: '1.5px solid rgba(255,255,255,.2)',
            background: 'rgba(20,20,20,.75)',
            backdropFilter: 'blur(8px)',
            color: '#fff',
            fontSize: isMobile ? '1.7rem' : '2rem',
            lineHeight: 1,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
        >
          ›
        </button>
      )}
    </div>
  );

  return createPortal(modal, document.body);
}

// ─────────────────────────────────────────────────────────────────
// PHOTOCÁRRUSEL
// Loop infinito: [clon_último, ...reales..., clon_primero]
// ─────────────────────────────────────────────────────────────────
export default function PhotoCarousel({ fotos = [], color = '#333', colorAccent = '#fff' }) {
  const n = fotos.length;

  // Lista extendida: clon del último al inicio, clon del primero al final
  // clonIdx=0 → clon_último, clonIdx=1..n → reales, clonIdx=n+1 → clon_primero
  const ext = n > 1 ? [fotos[n - 1], ...fotos, fotos[0]] : fotos;

  // posición en la lista extendida; arranca en 1 (primer real)
  const [pos,      setPos]      = useState(1);
  const [animate,  setAnimate]  = useState(true);
  const [lbStart,  setLbStart]  = useState(null);
  const [offset,   setOffset]   = useState(0);
  const dragRef   = useRef(null);
  const jumping   = useRef(false);

  // Índice real (0-based) para dots/contador y lightbox
  const realIdx = n > 1 ? pos - 1 : pos;
  // Cuando estamos en los clones, realIdx puede ser -1 o n; corregir
  const dotIdx = ((realIdx % n) + n) % n;

  // Reset al cambiar galería
  useEffect(() => { setPos(1); setAnimate(false); setLbStart(null); }, [fotos]);

  // Después de animar al clon, saltar silenciosamente al real
  const handleTransitionEnd = useCallback(() => {
    if (jumping.current) return;
    if (pos === 0) {
      // Llegamos al clon del último → saltar al real del último
      jumping.current = true;
      setAnimate(false);
      setPos(n);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
          jumping.current = false;
        });
      });
    } else if (pos === ext.length - 1) {
      // Llegamos al clon del primero → saltar al real del primero
      jumping.current = true;
      setAnimate(false);
      setPos(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
          jumping.current = false;
        });
      });
    }
  }, [pos, n, ext.length]);

  const goPos = useCallback(p => { setAnimate(true); setPos(p); }, []);
  const prev  = useCallback(() => goPos(pos - 1), [pos, goPos]);
  const next  = useCallback(() => goPos(pos + 1), [pos, goPos]);
  // goTo por índice real (0-based)
  const goTo  = useCallback(i  => goPos(i + 1),   [goPos]);

  // ── Drag / pointer ──────────────────────────────────────────
  const onPDown = e => {
    if (e.button !== 0) return;
    dragRef.current = { startX: e.clientX, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPMove = e => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 5) dragRef.current.moved = true;
    setOffset(dx);
  };
  const onPUp = e => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 50) {
      setAnimate(true);
      setPos(p => dx < 0 ? p + 1 : p - 1);
    }
    dragRef.current = null;
    setOffset(0);
  };

  if (!n) return (
    <div style={{ padding: '3rem', textAlign: 'center', color: '#999' }}>
      📷 Fotos próximamente
    </div>
  );

  // Ancho del slide: 82% del contenedor visible
  const SW = 82; // %

  return (
    <>
      <div style={{
        position: 'relative',
        width: '100%',
        padding: '1.2rem 0 3rem',
        overflow: 'hidden',
        background: 'transparent',
        userSelect: 'none',
      }}>

        {/* Barra de identidad superior */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px', zIndex: 2,
          background: `linear-gradient(90deg,${color},${colorAccent},${color})`,
        }}/>

        {/* Track */}
        <div
          style={{
            display: 'flex',
            // Centrar el slide activo: el padding lateral es (100% - SW%) / 2
            // pero usamos transform para desplazar, no padding, porque tenemos clones
            gap: '12px',
            // Alineamos el primer slide al borde izquierdo del contenedor
            // y usamos translateX para centrar el slide activo
            transform: `translateX(calc(
              ${(100 - SW) / 2}%
              - ${pos * (SW)}%
              - ${pos * 12}px
              + ${offset}px
            ))`,
            transition: animate && !dragRef.current
              ? 'transform .42s cubic-bezier(.25,.8,.25,1)'
              : 'none',
            cursor: dragRef.current ? 'grabbing' : 'grab',
            willChange: 'transform',
          }}
          onTransitionEnd={handleTransitionEnd}
          onPointerDown={onPDown}
          onPointerMove={onPMove}
          onPointerUp={onPUp}
          onPointerLeave={onPUp}
        >
          {ext.map((src, i) => {
            // ¿Es este slide el activo?
            const isActive = i === pos;
            // Índice real para el lightbox (ignorar clones)
            const realI = i - 1; // 0-based, puede ser -1 o n para clones

            return (
              <div
                key={i}
                style={{
                  flex: `0 0 ${SW}%`,
                  aspectRatio: '16/10',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  transform: isActive ? 'scale(1)' : 'scale(0.94)',
                  filter: isActive ? 'none' : 'brightness(.65)',
                  transition: 'transform .4s ease, filter .4s ease, box-shadow .4s ease',
                  boxShadow: isActive
                    ? `0 20px 56px rgba(0,0,0,.38), 0 0 0 2.5px ${colorAccent}`
                    : '0 6px 24px rgba(0,0,0,.2)',
                  flexShrink: 0,
                }}
                onClick={() => {
                  if (dragRef.current?.moved) return;
                  // Si es el slide activo, abrir lightbox con índice real
                  if (isActive) {
                    setLbStart(dotIdx);
                  } else {
                    // Si es vecino, navegar a él
                    goPos(i);
                  }
                }}
                onPointerDown={e => e.stopPropagation()}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  draggable="false"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', display: 'block',
                    pointerEvents: 'none',
                  }}
                />
                {/* Overlay de zoom solo en slide activo */}
                {isActive && (
                  <div className="pc-hover" style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(0,0,0,.28)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    gap: '.3rem', color: '#fff',
                    fontSize: '.8rem', fontWeight: 500, letterSpacing: '.05em',
                    opacity: 0, transition: 'opacity .2s',
                    pointerEvents: 'none',
                  }}>
                    <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
                      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                      <path d="M17 17l3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M8 11h6M11 8v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                    <span>Ver completa</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Flecha anterior */}
        <button onClick={prev} aria-label="Anterior" style={{
          position: 'absolute', left: '.6rem', top: '50%',
          transform: 'translateY(-55%)', zIndex: 10,
          width: '2.6rem', height: '2.6rem', borderRadius: '50%',
          border: '1.5px solid rgba(0,0,0,.1)',
          background: 'rgba(255,255,255,.88)', backdropFilter: 'blur(6px)',
          boxShadow: '0 4px 16px rgba(0,0,0,.15)',
          color: '#222', cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Flecha siguiente */}
        <button onClick={next} aria-label="Siguiente" style={{
          position: 'absolute', right: '.6rem', top: '50%',
          transform: 'translateY(-55%)', zIndex: 10,
          width: '2.6rem', height: '2.6rem', borderRadius: '50%',
          border: '1.5px solid rgba(0,0,0,.1)',
          background: 'rgba(255,255,255,.88)', backdropFilter: 'blur(6px)',
          boxShadow: '0 4px 16px rgba(0,0,0,.15)',
          color: '#222', cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Dots (≤15 fotos) o barra de progreso (>15) */}
        <div style={{
          position: 'absolute', bottom: '.6rem', left: 0, right: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '.4rem', zIndex: 10,
        }}>
          {n <= 15
            ? fotos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Foto ${i + 1}`}
                  style={{
                    width:      i === dotIdx ? '22px' : '7px',
                    height:     '7px',
                    borderRadius: '100px',
                    border: 'none', padding: 0,
                    background: i === dotIdx ? color : 'rgba(0,0,0,.18)',
                    cursor: 'pointer',
                    transition: 'width .3s ease, background .3s ease',
                    flexShrink: 0,
                  }}
                />
              ))
            : (
              /* Barra de progreso para galerías grandes */
              <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
                <div style={{
                  width: '120px', height: '4px', borderRadius: '100px',
                  background: 'rgba(0,0,0,.12)', overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%', borderRadius: '100px',
                    background: color,
                    width: `${((dotIdx + 1) / n) * 100}%`,
                    transition: 'width .4s ease',
                  }}/>
                </div>
                <span style={{
                  fontSize: '.72rem', fontFamily: 'sans-serif',
                  color: 'rgba(0,0,0,.4)', letterSpacing: '.06em',
                }}>
                  <span style={{ color, fontWeight: 700 }}>{dotIdx + 1}</span> / {n}
                </span>
              </div>
            )
          }
        </div>
      </div>

      {/* Lightbox fuera del overflow:hidden */}
      {lbStart !== null && (
        <Lightbox
          images={fotos}
          startIndex={lbStart}
          accentColor={colorAccent}
          onClose={() => setLbStart(null)}
        />
      )}

      {/* Keyframes y hover CSS */}
      <style>{`
        @keyframes lbFade { from { opacity:0 } to { opacity:1 } }
        @keyframes lbZoom { from { transform:scale(.88);opacity:0 } to { transform:scale(1);opacity:1 } }
        div:hover > .pc-hover { opacity: 1 !important; }
      `}</style>
    </>
  );
}