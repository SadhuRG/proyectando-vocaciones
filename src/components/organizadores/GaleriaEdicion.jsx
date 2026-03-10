// src/components/organizadores/GaleriaEdicion.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import '../../css/galeria.css';

const globToUrls = (g) => Object.values(g).map((m) => m.default);

// ── Imágenes ──────────────────────────────────────────────────────
const IMG = {
  // ── PV 3.0 ────────────────────────────────────────────────────
  'pv3/recorrido-puerta-1':  globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/recorrido_puerta-1/*.{webp,jpg,jpeg,png}',                    { eager: true })),
  'pv3/recorrido-puerta-2':  globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/recorrido_puerta-2/*.{webp,jpg,jpeg,png}',                    { eager: true })),
  'pv3/feria-area-a':        globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/feria-area-a/*.{webp,jpg,jpeg,png}',                          { eager: true })),
  'pv3/feria-area-b':        globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/feria-area-b/*.{webp,jpg,jpeg,png}',                          { eager: true })),
  'pv3/feria-area-cd':       globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/feria-area-cd/*.{webp,jpg,jpeg,png}',                         { eager: true })),
  'pv3/administracion':      globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-administracion/*.{webp,jpg,jpeg,png}',        { eager: true })),
  'pv3/antropologia':        globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-antropologia/*.{webp,jpg,jpeg,png}',          { eager: true })),
  'pv3/arqueologia':         globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-arqueologia/*.{webp,jpg,jpeg,png}',           { eager: true })),
  'pv3/arquitectura':        globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-arquitectura/*.{webp,jpg,jpeg,png}',          { eager: true })),
  'pv3/comunicacion':        globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-comunicacion/*.{webp,jpg,jpeg,png}',          { eager: true })),
  'pv3/contabilidad':        globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-contabilidad/*.{webp,jpg,jpeg,png}',          { eager: true })),
  'pv3/derecho':             globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-derecho/*.{webp,jpg,jpeg,png}',               { eager: true })),
  'pv3/ed-primaria':         globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-ed-primaria/*.{webp,jpg,jpeg,png}',           { eager: true })),
  'pv3/enfermeria':          globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-enfermeria/*.{webp,jpg,jpeg,png}',            { eager: true })),
  'pv3/ing-agroindustrial':  globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-ing-agroindustrial/*.{webp,jpg,jpeg,png}',    { eager: true })),
  'pv3/ing-agronomica':      globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-ing-agronomica/*.{webp,jpg,jpeg,png}',        { eager: true })),
  'pv3/ing-ambiental':       globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-ing-ambiental/*.{webp,jpg,jpeg,png}',         { eager: true })),
  'pv3/ing-civil':           globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-ing-civil/*.{webp,jpg,jpeg,png}',             { eager: true })),
  'pv3/ing-industrial':      globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-ing-industrial/*.{webp,jpg,jpeg,png}',        { eager: true })),
  'pv3/ing-informatica':     globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-ing-informatica/*.{webp,jpg,jpeg,png}',       { eager: true })),
  'pv3/ing-mecatronica':     globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-ing-mecatronica/*.{webp,jpg,jpeg,png}',       { eager: true })),
  'pv3/medicina':            globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-medicina/*.{webp,jpg,jpeg,png}',              { eager: true })),
  'pv3/politicas':           globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-politicas/*.{webp,jpg,jpeg,png}',             { eager: true })),
  'pv3/trabajo-social':      globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-trabajo-social/*.{webp,jpg,jpeg,png}',        { eager: true })),
  'pv3/turismo':             globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-turismo/*.{webp,jpg,jpeg,png}',               { eager: true })),
  'pv3/zootecnia':           globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-zootecnia/*.{webp,jpg,jpeg,png}',             { eager: true })),

  // ── PV 2.0 ────────────────────────────────────────────────────
  'pv2/rutas':               globToUrls(import.meta.glob('../../assets/galeria/PV_2.0/Rutas/*.{webp,jpg,jpeg,png}',                                  { eager: true })),
  'pv2/auditorio':           globToUrls(import.meta.glob('../../assets/galeria/PV_2.0/Auditorio/*.{webp,jpg,jpeg,png}',                              { eager: true })),
  'pv2/equipo':              globToUrls(import.meta.glob('../../assets/galeria/PV_2.0/Equipo_trabajo/*.{webp,jpg,jpeg,png}',                          { eager: true })),
  'pv2/grupales':            globToUrls(import.meta.glob('../../assets/galeria/PV_2.0/Fotos_grupales/*.{webp,jpg,jpeg,png}',                          { eager: true })),
  // Charlas PV 2.0 — todas las imágenes de la carpeta general
  'pv2/charlas':             globToUrls(import.meta.glob('../../assets/galeria/PV_2.0/Charlas/*.{webp,jpg,jpeg,png}',                                 { eager: true })),

  // ── PV 1.0 — imágenes directas en la carpeta ─────────────────
  'pv1/todas':               globToUrls(import.meta.glob('../../assets/galeria/PV_1.0/*.{webp,jpg,jpeg,png}',                                         { eager: true })),
};

// ── Estructuras ───────────────────────────────────────────────────
const ESTRUCTURA = {
  pv3: [
    {
      id: 'recorrido', label: 'Recorrido', tag: 'Recorrido',
      description: 'Los estudiantes ingresaron y recorrieron la universidad por dos rutas',
      subsecciones: [
        { id: 'puerta-1', label: 'Recorrido Puerta 1', description: 'Área C & D',  key: 'pv3/recorrido-puerta-1' },
        { id: 'puerta-2', label: 'Recorrido Puerta 2', description: 'Área A & B',  key: 'pv3/recorrido-puerta-2' },
      ],
    },
    {
      id: 'feria', label: 'Feria de Carreras', tag: 'Feria',
      description: 'Stands interactivos por área de conocimiento',
      subsecciones: [
        { id: 'feria-a',  label: 'Área A',    description: 'Ciencias de la Vida y la Salud',      key: 'pv3/feria-area-a'  },
        { id: 'feria-b',  label: 'Área B',    description: 'Ciencias Básicas y Tecnológicas',      key: 'pv3/feria-area-b'  },
        { id: 'feria-cd', label: 'Área C & D',description: 'Ciencias de la Persona · Económicas', key: 'pv3/feria-area-cd' },
      ],
    },
    {
      id: 'charlas', label: 'Charlas por Carrera', tag: 'Charlas',
      description: 'Cada carrera presentó su propuesta a los futuros estudiantes',
      subsecciones: [
        { id: 'medicina',        label: 'Medicina',            description: 'Área A', key: 'pv3/medicina'          },
        { id: 'enfermeria',      label: 'Enfermería',          description: 'Área A', key: 'pv3/enfermeria'        },
        { id: 'zootecnia',       label: 'Zootecnia',           description: 'Área A', key: 'pv3/zootecnia'         },
        { id: 'arquitectura',    label: 'Arquitectura',        description: 'Área B', key: 'pv3/arquitectura'      },
        { id: 'ing-civil',       label: 'Ing. Civil',          description: 'Área B', key: 'pv3/ing-civil'         },
        { id: 'ing-industrial',  label: 'Ing. Industrial',     description: 'Área B', key: 'pv3/ing-industrial'    },
        { id: 'ing-mecatronica', label: 'Ing. Mecatrónica',    description: 'Área B', key: 'pv3/ing-mecatronica'   },
        { id: 'ing-ambiental',   label: 'Ing. Ambiental',      description: 'Área B', key: 'pv3/ing-ambiental'     },
        { id: 'ing-informatica', label: 'Ing. Informática',    description: 'Área B', key: 'pv3/ing-informatica'   },
        { id: 'agroindustrial',  label: 'Ing. Agroindustrial', description: 'Área B', key: 'pv3/ing-agroindustrial' },
        { id: 'agronomia',       label: 'Ing. Agronómica',     description: 'Área B', key: 'pv3/ing-agronomica'    },
        { id: 'derecho',         label: 'Derecho',             description: 'Área C', key: 'pv3/derecho'           },
        { id: 'politicas',       label: 'Ciencias Políticas',  description: 'Área C', key: 'pv3/politicas'         },
        { id: 'comunicacion',    label: 'Comunicaciones',      description: 'Área C', key: 'pv3/comunicacion'      },
        { id: 'ed-primaria',     label: 'Educación Primaria',  description: 'Área C', key: 'pv3/ed-primaria'       },
        { id: 'antropologia',    label: 'Antropología',        description: 'Área C', key: 'pv3/antropologia'      },
        { id: 'arqueologia',     label: 'Arqueología',         description: 'Área C', key: 'pv3/arqueologia'       },
        { id: 'trabajo-social',  label: 'Trabajo Social',      description: 'Área C', key: 'pv3/trabajo-social'    },
        { id: 'turismo',         label: 'Turismo',             description: 'Área C', key: 'pv3/turismo'           },
        { id: 'administracion',  label: 'Administración',      description: 'Área D', key: 'pv3/administracion'    },
        { id: 'contabilidad',    label: 'Contabilidad',        description: 'Área D', key: 'pv3/contabilidad'      },
      ],
    },
  ],

  pv2: [
    { id: 'rutas',    label: 'Rutas',            tag: 'Rutas',    description: 'Recorridos por las instalaciones universitarias', key: 'pv2/rutas'    },
    { id: 'auditorio',label: 'Auditorio',         tag: 'Auditorio',description: 'Actos centrales y presentaciones del evento',    key: 'pv2/auditorio'},
    { id: 'charlas',  label: 'Charlas',           tag: 'Charlas',  description: 'Charlas de orientación vocacional a los estudiantes', key: 'pv2/charlas' },
    { id: 'equipo',   label: 'Equipo de Trabajo', tag: 'Equipo',   description: 'El equipo organizador detrás del evento',        key: 'pv2/equipo'   },
    { id: 'grupales', label: 'Fotos Grupales',     tag: 'Grupales', description: 'Momentos compartidos con todos los asistentes',  key: 'pv2/grupales' },
  ],

  // PV 1.0 usa collage especial — se maneja en GaleriaPv1
  pv1: [],
};

// ── Lightbox (siempre centrado en viewport) ───────────────────────
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position  = 'fixed';
    document.body.style.top       = `-${scrollY}px`;
    document.body.style.width     = '100%';
    document.body.style.overflow  = 'hidden';
    const fn = (e) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', fn);
    return () => {
      window.removeEventListener('keydown', fn);
      document.body.style.position = '';
      document.body.style.top      = '';
      document.body.style.width    = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'rgba(0,0,0,0.94)', backdropFilter: 'blur(14px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'lbIn .2s ease',
      }}
      onClick={onClose}
    >
      <button className="gle-lb__close" onClick={onClose}>✕</button>
      <button className="gle-lb__nav gle-lb__nav--prev" onClick={(e) => { e.stopPropagation(); onPrev(); }}>‹</button>
      <div
        style={{
          maxWidth: '92vw', maxHeight: '88vh',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.6rem',
          animation: 'lbZ .3s cubic-bezier(.34,1.56,.64,1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={images[index]} alt=""
          style={{ maxWidth: '100%', maxHeight: '82vh', objectFit: 'contain', borderRadius: '10px', boxShadow: '0 30px 80px rgba(0,0,0,.55)' }}
        />
        <p style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.38)', letterSpacing: '.06em' }}>
          {index + 1} / {images.length}
        </p>
      </div>
      <button className="gle-lb__nav gle-lb__nav--next" onClick={(e) => { e.stopPropagation(); onNext(); }}>›</button>
    </div>
  );
}

// ── Collage mosaico animado para PV 1.0 ──────────────────────────
// Layout editorial: foto hero + grilla de cuadros grandes con
// reveal staggered al aparecer en viewport + parallax sutil al hover
function CollageMosaico({ fotos, edicion }) {
  const [lbIdx, setLbIdx]   = useState(null);
  const [visSet, setVisSet]  = useState(new Set());
  const refs                 = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number(e.target.dataset.idx);
            setVisSet((prev) => new Set([...prev, i]));
          }
        });
      },
      { threshold: 0.12 }
    );
    refs.current.forEach((r) => r && obs.observe(r));
    return () => obs.disconnect();
  }, [fotos.length]);

  // Parallax suave en hover individual
  const handleMove = (e, el) => {
    const rect  = el.getBoundingClientRect();
    const cx    = (e.clientX - rect.left) / rect.width  - 0.5;
    const cy    = (e.clientY - rect.top)  / rect.height - 0.5;
    const img   = el.querySelector('img');
    if (img) img.style.transform = `scale(1.08) translate(${cx * 12}px, ${cy * 10}px)`;
  };
  const handleLeave = (el) => {
    const img = el.querySelector('img');
    if (img) img.style.transform = 'scale(1) translate(0,0)';
  };

  if (!fotos.length) return (
    <div className="gle-empty"><span>📷</span><p>Fotos próximamente</p></div>
  );

  const imgs = fotos.slice(0, 9);

  // Layout: 1 hero grande (ocupa 2 cols y 2 rows) + 7 celdas en grilla asimétrica
  // Usamos CSS grid-area para un patrón editorial vistoso
  const AREAS = [
    'hero',  // 0 — grande
    'b',     // 1
    'c',     // 2
    'd',     // 3
    'e',     // 4
    'f',     // 5
    'g',     // 6
    'h',     // 7
    'i',     // 8
  ];

  return (
    <>
      <div
        className="gle-mosaic"
        style={{ '--mc': edicion.color, '--mcl': edicion.colorLight, '--mca': edicion.colorAccent }}
      >
        {imgs.map((src, i) => {
          const isVis   = visSet.has(i);
          const isHero  = i === 0;
          const delay   = i * 0.08;
          return (
            <div
              key={i}
              ref={(el) => (refs.current[i] = el)}
              data-idx={i}
              className={`gle-mosaic__cell gle-mosaic__cell--${AREAS[i]} ${isVis ? 'gle-mosaic__cell--vis' : ''} ${isHero ? 'gle-mosaic__cell--hero' : ''}`}
              style={{ transitionDelay: `${delay}s` }}
              onClick={() => setLbIdx(i)}
              onMouseMove={(e) => handleMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleLeave(e.currentTarget)}
            >
              <img src={src} alt="" loading="lazy" />

              {/* Overlay con gradiente y número */}
              <div className="gle-mosaic__overlay">
                <span className="gle-mosaic__num">0{i + 1}</span>
                <span className="gle-mosaic__zoom-ico">⊕</span>
              </div>

              {/* Borde de color al hover */}
              <div className="gle-mosaic__border" />
            </div>
          );
        })}

        {/* Barra inferior */}
        <div className="gle-mosaic__footer">
          <div className="gle-mosaic__footer-dot" style={{ background: edicion.color }} />
          <span>📅 16 de Diciembre, 2022</span>
          <span className="gle-mosaic__footer-sep">·</span>
          <span>{fotos.length} foto{fotos.length !== 1 ? 's' : ''}</span>
          <span className="gle-mosaic__footer-sep">·</span>
          <span>Proyectando Vocaciones 1.0</span>
          {fotos.length > 9 && (
            <button
              className="gle-mosaic__ver-mas"
              style={{ background: edicion.color }}
              onClick={() => setLbIdx(0)}
            >
              Ver todas ({fotos.length}) →
            </button>
          )}
        </div>
      </div>

      {lbIdx !== null && (
        <Lightbox
          images={fotos}
          index={lbIdx}
          onClose={() => setLbIdx(null)}
          onPrev={() => setLbIdx((p) => (p - 1 + fotos.length) % fotos.length)}
          onNext={() => setLbIdx((p) => (p + 1) % fotos.length)}
        />
      )}
    </>
  );
}

// ── Vista especial PV 1.0 ─────────────────────────────────────────
function GaleriaPv1({ edicion, onVolver }) {
  const fotos = IMG['pv1/todas'] ?? [];

  return (
    <main className="gle-page" data-edition={edicion.edition}
      style={{ '--ep': edicion.color, '--epl': edicion.colorLight, '--epa': edicion.colorAccent }}
    >
      <header className="gle-hero">
        <div className="gle-hero__bg" />
        <div className="gle-hero__inner">
          <button className="gle-hero__back" onClick={onVolver}>← Todas las ediciones</button>
          <div className="gle-hero__content">
            <img src={edicion.logo} alt={edicion.version} className="gle-hero__logo" />
            <div>
              <span className="gle-hero__eyebrow">{edicion.fecha}</span>
              <h1 className="gle-hero__title">{edicion.version}</h1>
              <p className="gle-hero__desc">{edicion.descripcion}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="gle-body">
        <section className="gle-sec gle-sec--vis" style={{ paddingTop: '3rem' }}>
          <div className="gle-sec__head">
            <div className="gle-sec__badge" style={{ background: edicion.color }}>Galería</div>
            <div className="gle-sec__info">
              <h2 className="gle-sec__title">Momentos del evento</h2>
              <p className="gle-sec__desc">El inicio de Proyectando Vocaciones — 16 de Diciembre de 2022</p>
            </div>
            <div className="gle-sec__rule" style={{ background: `linear-gradient(90deg,${edicion.color},transparent)` }} />
          </div>
          <CollageMosaico fotos={fotos} edicion={edicion} />
        </section>
      </div>

      <footer className="gle-footer">
        <p>© Proyectando Vocaciones · Universidad Nacional de Trujillo</p>
      </footer>
    </main>
  );
}

// ── Carrusel 3D ───────────────────────────────────────────────────
function Carrusel({ imgKey, edicion }) {
  const fotos = IMG[imgKey] ?? [];
  const [current, setCurrent] = useState(0);
  const [lbIdx, setLbIdx]     = useState(null);
  const autoRef = useRef(null);

  const next = useCallback(() => setCurrent((c) => (c + 1) % fotos.length), [fotos.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + fotos.length) % fotos.length), [fotos.length]);

  useEffect(() => {
    if (fotos.length <= 1) return;
    autoRef.current = setInterval(next, 4000);
    return () => clearInterval(autoRef.current);
  }, [next, fotos.length]);

  const resetAuto = () => { clearInterval(autoRef.current); autoRef.current = setInterval(next, 4000); };

  if (!fotos.length) return (
    <div className="gle-empty"><span>📷</span><p>Fotos próximamente</p></div>
  );

  const vis = fotos.length === 1
    ? [{ src: fotos[0], idx: 0, pos: 'center' }]
    : fotos.length === 2
      ? [{ src: fotos[0], idx: 0, pos: current === 0 ? 'center' : 'left' }, { src: fotos[1], idx: 1, pos: current === 1 ? 'center' : 'right' }]
      : [
          { src: fotos[(current - 1 + fotos.length) % fotos.length], idx: (current - 1 + fotos.length) % fotos.length, pos: 'left' },
          { src: fotos[current], idx: current, pos: 'center' },
          { src: fotos[(current + 1) % fotos.length], idx: (current + 1) % fotos.length, pos: 'right' },
        ];

  return (
    <div className="gle-car" style={{ '--cc': edicion.color, '--ccl': edicion.colorLight }}>
      <div className="gle-car__bg" style={{ backgroundImage: `url(${fotos[current]})` }} />
      {fotos.length > 1 && (
        <>
          <button className="gle-car__arr gle-car__arr--p" onClick={() => { prev(); resetAuto(); }}>‹</button>
          <button className="gle-car__arr gle-car__arr--n" onClick={() => { next(); resetAuto(); }}>›</button>
        </>
      )}
      <div className="gle-car__track">
        {vis.map(({ src, idx, pos }) => (
          <div key={idx} className={`gle-car__slide gle-car__slide--${pos}`}
            onClick={() => pos === 'center' ? setLbIdx(idx) : pos === 'left' ? (prev(), resetAuto()) : (next(), resetAuto())}
          >
            <img src={src} alt="" loading="lazy" decoding="async" />
            {pos === 'center' && <div className="gle-car__zoom"><span>⊕ Ver foto</span></div>}
          </div>
        ))}
      </div>
      <div className="gle-car__dots">
        {fotos.map((_, i) => (
          <button key={i}
            className={`gle-car__dot${i === current ? ' gle-car__dot--on' : ''}`}
            style={i === current ? { background: edicion.color } : {}}
            onClick={() => { setCurrent(i); resetAuto(); }}
          />
        ))}
      </div>
      <div className="gle-car__cnt">{current + 1} / {fotos.length}</div>
      {lbIdx !== null && (
        <Lightbox images={fotos} index={lbIdx}
          onClose={() => setLbIdx(null)}
          onPrev={() => setLbIdx((p) => (p - 1 + fotos.length) % fotos.length)}
          onNext={() => setLbIdx((p) => (p + 1) % fotos.length)}
        />
      )}
    </div>
  );
}

function TabSection({ seccion, edicion }) {
  const [tab, setTab] = useState(0);
  return (
    <div>
      <div className="gle-tabs">
        {seccion.subsecciones.map((s, i) => (
          <button key={s.id}
            className={`gle-tab${tab === i ? ' gle-tab--on' : ''}`}
            style={tab === i ? { background: edicion.color, borderColor: edicion.color, color: '#fff' } : {}}
            onClick={() => setTab(i)}
          >
            <span className="gle-tab__n">{s.label}</span>
            <span className="gle-tab__d">{s.description}</span>
          </button>
        ))}
      </div>
      <Carrusel imgKey={seccion.subsecciones[tab].key} edicion={edicion} />
    </div>
  );
}

function Seccion({ seccion, edicion }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.07 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section ref={ref} id={seccion.id} className={`gle-sec ${vis ? 'gle-sec--vis' : ''}`}>
      <div className="gle-sec__head">
        <div className="gle-sec__badge" style={{ background: edicion.color }}>{seccion.tag}</div>
        <div className="gle-sec__info">
          <h2 className="gle-sec__title">{seccion.label}</h2>
          <p className="gle-sec__desc">{seccion.description}</p>
        </div>
        <div className="gle-sec__rule" style={{ background: `linear-gradient(90deg,${edicion.color},transparent)` }} />
      </div>
      {seccion.subsecciones
        ? <TabSection seccion={seccion} edicion={edicion} />
        : <Carrusel imgKey={seccion.key} edicion={edicion} />
      }
      <div className="gle-divider" />
    </section>
  );
}

// ── Componente principal ──────────────────────────────────────────
export default function GaleriaEdicion({ edicion, onVolver }) {
  // PV 1.0 tiene su propia vista con collage mosaico
  if (edicion.id === 'pv1') {
    return <GaleriaPv1 edicion={edicion} onVolver={onVolver} />;
  }

  const [filter, setFilter] = useState('all');
  const secciones = ESTRUCTURA[edicion.id] ?? [];
  const shown = filter === 'all' ? secciones : secciones.filter((s) => s.id === filter);

  return (
    <main className="gle-page" data-edition={edicion.edition}
      style={{ '--ep': edicion.color, '--epl': edicion.colorLight, '--epa': edicion.colorAccent }}
    >
      <header className="gle-hero">
        <div className="gle-hero__bg" />
        <div className="gle-hero__inner">
          <button className="gle-hero__back" onClick={onVolver}>← Todas las ediciones</button>
          <div className="gle-hero__content">
            <img src={edicion.logo} alt={edicion.version} className="gle-hero__logo" />
            <div>
              <span className="gle-hero__eyebrow">{edicion.fecha}</span>
              <h1 className="gle-hero__title">{edicion.version}</h1>
              <p className="gle-hero__desc">{edicion.descripcion}</p>
            </div>
          </div>
        </div>
      </header>

      <nav className="gle-nav">
        <div className="gle-nav__track">
          {[{ id: 'all', label: 'Todo' }, ...secciones].map((s) => (
            <button key={s.id}
              className={`gle-nav-btn${filter === s.id ? ' gle-nav-btn--on' : ''}`}
              style={filter === s.id ? { background: edicion.color, borderColor: edicion.color, color: '#fff' } : {}}
              onClick={() => { setFilter(s.id); if (s.id !== 'all') document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              {s.label || s.tag}
            </button>
          ))}
        </div>
      </nav>

      <div className="gle-body">
        {shown.length === 0
          ? <div className="gle-empty" style={{ padding: '6rem 2rem' }}><span>📷</span><p>Fotos próximamente</p></div>
          : shown.map((s) => <Seccion key={s.id} seccion={s} edicion={edicion} />)
        }
      </div>

      <footer className="gle-footer">
        <p>© Proyectando Vocaciones · Universidad Nacional de Trujillo</p>
      </footer>
    </main>
  );
}