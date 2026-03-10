// src/pages/galeria.jsx
import { useState, useEffect, useRef } from 'react';
import '../css/galeria.css';
import GaleriaEdicion from '../components/organizadores/GaleriaEdicion';
import PixelTransition from '../components/organizadores/PixelTransition';

// ── Logos ─────────────────────────────────────────────────────────
const logoPv3 = '/galeria/logo_Pv3.png';
const logoPv2 = '/galeria/logo_Pv2.png';
const logoPv1 = '/galeria/logo_Pv1.png';

// ── Collages por edición (primeras fotos disponibles) ─────────────
// import.meta.glob carga automáticamente — solo toma las primeras 6
const take = (obj, n = 6) => Object.values(obj).slice(0, n).map(m => m.default);

const COLLAGE = {
  pv3: take(import.meta.glob('../assets/galeria/PV_3.0/**/*.{webp,jpg,jpeg,png}', { eager: true })),
  pv2: take(import.meta.glob('../assets/galeria/PV_2.0/**/*.{webp,jpg,jpeg,png}', { eager: true })),
  pv1: take(import.meta.glob('../assets/galeria/PV_1.0/*.{webp,jpg,jpeg,png}', { eager: true })),
};

// ── Datos de ediciones ────────────────────────────────────────────
const EDICIONES = [
  {
    id: 'pv3', edition: '3.0',
    version: 'Proyectando Vocaciones 3.0',
    fecha: '28 de Febrero, 2026', año: '2026', logo: logoPv3,
    descripcion: 'La tercera edición reunió a cientos de estudiantes con 35 carreras para descubrir su vocación universitaria.',
    color: '#9c15d0', colorLight: '#ebd4f4', colorAccent: '#facf2b', colorDark: '#451b54',
    activa: true,
  },
  {
    id: 'pv2', edition: '2.0',
    version: 'Proyectando Vocaciones 2.0',
    fecha: '22 de Febrero, 2025', año: '2025', logo: logoPv2,
    descripcion: 'La segunda edición consolidó el proyecto como referente de orientación universitaria en la región.',
    color: '#094a86', colorLight: '#cae1f5', colorAccent: '#f0ab2b', colorDark: '#0f274d',
    activa: true,
  },
  {
    id: 'pv1', edition: '1.0',
    version: 'Proyectando Vocaciones 1.0',
    fecha: '16 de Diciembre, 2022', año: '2022', logo: logoPv1,
    descripcion: 'El inicio de una idea que nació para conectar a los estudiantes con su vocación universitaria.',
    color: '#1b385e', colorLight: '#e7eff8', colorAccent: '#ef6d13', colorDark: '#0d1f35',
    activa: true,
  },
];

// ── Collage panel (grilla de fotos para PixelTransition) ──────────
function CollagePanel({ fotos, color }) {
  if (!fotos || fotos.length === 0) {
    return (
      <div style={{ width: '100%', height: '100%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#fff', fontSize: '0.85rem', opacity: 0.6 }}>Próximamente</span>
      </div>
    );
  }
  const grid = fotos.slice(0, 6);
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'grid',
      gridTemplateColumns: grid.length >= 4 ? '1fr 1fr' : '1fr',
      gridTemplateRows: `repeat(${Math.ceil(grid.length / 2)}, 1fr)`,
      gap: '3px',
      background: color,
    }}>
      {grid.map((src, i) => (
        <div key={i} style={{ overflow: 'hidden', position: 'relative' }}>
          <img
            src={src} alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      ))}
    </div>
  );
}

// ── Tarjeta de edición con layout de 3 columnas ───────────────────
function EdicionCard({ ed, index, onSelect }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const isLeft = index % 2 === 0;
  const fotos  = COLLAGE[ed.id] ?? [];

  // Panel con PixelTransition: logo → collage
  const logoPanel = (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: ed.colorLight }}>
      <img src={ed.logo} alt={ed.version} style={{ width: '70%', maxWidth: '160px', objectFit: 'contain' }} />
    </div>
  );
  const collagePanel = <CollagePanel fotos={fotos} color={ed.color} />;

  const pixelPanel = (
    <PixelTransition
      firstContent={logoPanel}
      secondContent={collagePanel}
      gridSize={9}
      pixelColor={ed.color}
      animationStepDuration={0.22}
      aspectRatio="100%"
      style={{ width: '100%', height: '100%', borderRadius: '16px', overflow: 'hidden' }}
    />
  );

  return (
    <div
      ref={ref}
      className={`gls-ecard ${vis ? 'gls-ecard--vis' : ''} ${isLeft ? 'gls-ecard--l' : 'gls-ecard--r'}`}
      style={{ '--ec': ed.color, '--ecl': ed.colorLight, '--eca': ed.colorAccent }}
    >
      {/* Panel izquierdo: pixel transition o vacío */}
      <div className="gls-ecard__panel gls-ecard__panel--left">
        {isLeft ? null : pixelPanel}
      </div>

      {/* Nodo central */}
      <div className="gls-ecard__node">
        <div className="gls-ecard__node-ring" />
        <img src={ed.logo} alt={ed.version} className="gls-ecard__node-img" />
      </div>

      {/* Panel derecho: pixel transition o vacío */}
      <div className="gls-ecard__panel gls-ecard__panel--right">
        {isLeft ? pixelPanel : null}
      </div>

      {/* Tarjeta de texto — siempre en el lado opuesto al panel */}
      <div
        className={`gls-ecard__card ${!ed.activa ? 'gls-ecard__card--off' : ''} ${isLeft ? 'gls-ecard__card--posleft' : 'gls-ecard__card--posright'}`}
        data-edition={ed.edition}
        onClick={() => ed.activa && onSelect(ed)}
      >
        <div className="gls-ecard__topbar" />
        <div className="gls-ecard__header">
          <span className="gls-ecard__tag">Edición {ed.edition}</span>
          {index === 0 && <span className="gls-ecard__badge" style={{ background: ed.colorAccent }}>✦ Más reciente</span>}
          {!ed.activa && <span className="gls-ecard__soon">Próximamente</span>}
        </div>
        <h2 className="gls-ecard__title" style={{ color: ed.color }}>{ed.version}</h2>
        <p className="gls-ecard__fecha">📅 {ed.fecha}</p>
        <p className="gls-ecard__desc">{ed.descripcion}</p>
        {ed.activa && (
          <button className="gls-ecard__btn" style={{ background: ed.color }}>
            Explorar galería →
          </button>
        )}
      </div>
    </div>
  );
}

// ── Bloque de galería por edición (cuadros con bordes, mismo tamaño) ─
function GaleriaBloque({ ed, onSelect }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const fotos = COLLAGE[ed.id] ?? [];
  const grid = fotos.slice(0, 6);

  return (
    <div
      ref={ref}
      className={`gls-bloque ${vis ? 'gls-bloque--vis' : ''}`}
      style={{ '--ec': ed.color, '--ecl': ed.colorLight }}
    >
      <div className="gls-bloque__header">
        <span className="gls-bloque__eyebrow">Sedipro UNT</span>
        <h3 className="gls-bloque__title" style={{ color: ed.color }}>{ed.version}</h3>
      </div>
      <div
        className="gls-bloque__grid"
        onClick={() => ed.activa && onSelect(ed)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && ed.activa && onSelect(ed)}
      >
        {grid.length > 0 ? (
          grid.map((src, i) => (
            <div key={i} className="gls-bloque__frame">
              <img src={src} alt="" loading="lazy" />
            </div>
          ))
        ) : (
          <div className="gls-bloque__empty">
            <span>Próximamente</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Página principal ──────────────────────────────────────────────
export default function Galeria() {
  const [edicion, setEdicion] = useState(null);
  if (edicion) return <GaleriaEdicion edicion={edicion} onVolver={() => setEdicion(null)} />;

  const seccionEdicionesRef = useRef(null);
  const scrollToEdiciones = () => {
    seccionEdicionesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="gls-page">

      {/* ── Títulos y galerías por edición ───────────────── */}
      <section className="gls-galeria">
        <div className="gls-galeria__intro">
          <p className="gls-galeria__eyebrow">Sedipro UNT</p>
          <h2 className="gls-galeria__title">Proyectando Vocaciones</h2>
        </div>

        <div className="gls-galeria__bloques">
          {EDICIONES.map((ed) => (
            <GaleriaBloque key={ed.id} ed={ed} onSelect={setEdicion} />
          ))}
        </div>

        <button className="gls-galeria__scroll-btn" onClick={scrollToEdiciones} type="button">
          <span>Ver selección de edición</span>
          <div className="gls-hero__chevrons"><span /><span /><span /></div>
        </button>
      </section>

      {/* ── Selección de edición (más detalle) ───────────── */}
      <section className="gls-tl" ref={seccionEdicionesRef}>
        <div className="gls-tl__intro">
          <h2 className="gls-tl__intro-title">Selección de edición</h2>
          <p className="gls-tl__intro-desc">Explora cada edición con más detalle</p>
        </div>

        <div className="gls-tl__body">
          <div className="gls-tl__spine" />
          {EDICIONES.map((ed, i) => (
            <EdicionCard key={ed.id} ed={ed} index={i} onSelect={setEdicion} />
          ))}
          <div className="gls-tl__cap">
            <div className="gls-tl__cap-dot" />
            <span>El origen de una tradición · 2022</span>
          </div>
        </div>
      </section>

      <footer className="gls-footer">
        <p>© Proyectando Vocaciones · Universidad Nacional de Trujillo</p>
      </footer>
    </main>
  );
}