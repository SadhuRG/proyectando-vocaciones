// src/pages/galeria.jsx
import { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/galeria.css';

const logoPv3 = '/galeria/logo_Pv3.png';
const logoPv2 = '/galeria/logo_Pv2.png';
const logoPv1 = '/galeria/logo_Pv1.png';

// ── Datos de ediciones — exportados para GaleriaEdicion ───────────
export const EDICIONES = [
  {
    id: 'pv3', route: '/galeria/pv3', edition: '3.0',
    version: 'Proyectando Vocaciones 3.0',
    fecha: '28 de Febrero, 2026', año: '2026', logo: logoPv3,
    descripcion: 'La tercera edición reunió a cientos de estudiantes con 35 carreras para descubrir su vocación universitaria.',
    frase: 'Convierte tus sueños en metas, tus metas en logros y tus logros en la historia que quieres contar.',
    color: '#9c15d0', colorLight: '#f3e8fb', colorAccent: '#facf2b', colorDark: '#3a0755',
    panelGrad: 'linear-gradient(145deg, #16022a 0%, #3d0b60 50%, #1a0430 100%)',
    stars: ['#9c15d0','#facf2b','#c46de8'],
  },
  {
    id: 'pv2', route: '/galeria/pv2', edition: '2.0',
    version: 'Proyectando Vocaciones 2.0',
    fecha: '22 de Febrero, 2025', año: '2025', logo: logoPv2,
    descripcion: 'La segunda edición consolidó el proyecto como referente de orientación universitaria en la región.',
    frase: 'En Proyectando Vocaciones, no solo descubres carreras, descubres quién quieres ser.',
    color: '#094a86', colorLight: '#daeaf8', colorAccent: '#f0ab2b', colorDark: '#041e3a',
    panelGrad: 'linear-gradient(145deg, #010d1e 0%, #07346e 50%, #020e22 100%)',
    stars: ['#094a86','#f0ab2b','#4a90d9'],
  },
  {
    id: 'pv1', route: '/galeria/pv1', edition: '1.0',
    version: 'Proyectando Vocaciones 1.0',
    fecha: '16 de Diciembre, 2022', año: '2022', logo: logoPv1,
    descripcion: 'El inicio de una idea que nació para conectar a los estudiantes con su vocación universitaria.',
    frase: 'Proyectando Vocaciones es más que un evento: es el inicio de tu viaje hacia un futuro lleno de logros y satisfacción personal.',
    color: '#1b385e', colorLight: '#e2ecf7', colorAccent: '#ef6d13', colorDark: '#0c1d30',
    panelGrad: 'linear-gradient(145deg, #050e1c 0%, #132843 50%, #07111f 100%)',
    stars: ['#1b385e','#ef6d13','#5a8ab8'],
  },
];

// ════════════════════════════════════════════════════
// PANEL DE FRASE
// — Aparece solo cuando la card está en hover (hovered)
// — Fondo completamente transparente
// — Partículas de color flotando alrededor del texto
// — Texto en color de la edición, legible sobre fondo claro
// ════════════════════════════════════════════════════
function FrasePanel({ ed, hovered }) {
  const particles = useRef(
    Array.from({ length: 22 }, (_, i) => ({
      x:  Math.random() * 100,
      y:  Math.random() * 100,
      r:  Math.random() * 2.8 + 0.6,
      d:  Math.random() * 3.5 + 2.5,
      c:  ed.stars[i % ed.stars.length],
    }))
  ).current;

  return (
    <div
      className={`gls-quote${hovered ? ' gls-quote--hov' : ''}`}
      style={{ '--qc': ed.color, '--qa': ed.colorAccent }}
    >
      {/* Partículas flotantes — sin fondo de caja */}
      <svg className="gls-quote__stars" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {particles.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r}
            fill={p.c}
            opacity={hovered ? 0.6 : 0}
            style={{
              transition: `opacity .45s ${i * 0.028}s ease`,
              animation: hovered
                ? `starFloat ${p.d}s ${i * 0.18}s ease-in-out infinite alternate`
                : 'none',
            }}
          />
        ))}
      </svg>

      {/* Comilla decorativa */}
      <div className="gls-quote__bigmark" style={{ color: ed.color }}>"</div>

      {/* Frase con comillas tipográficas */}
      <blockquote className="gls-quote__text" style={{ color: ed.colorDark }}>
        “{ed.frase}”
      </blockquote>

      {/* Línea separadora fina */}
      <div className="gls-quote__rule"
        style={{ background: `linear-gradient(90deg, transparent, ${ed.colorAccent}, transparent)` }} />

      {/* Firma */}
      <p className="gls-quote__sig" style={{ color: ed.colorAccent }}>
        — Proyectando Vocaciones {ed.edition}
      </p>
    </div>
  );
}

// ════════════════════════════════════════════════════
// POLAROIDS FLOTANTES — hero
// Usa las mismas fotos de los carruseles.
// 8 polaroids con posición, rotación y animación
// distintas, flotando sobre el fondo morado.
// ════════════════════════════════════════════════════

// Recoger una muestra de fotos de cada edición
const HERO_IMGS = [
  '/galeria/pv3.1.jpg',
  '/galeria/pv2.1.JPG',
  '/galeria/pv1.png',
  '/galeria/pv3.2.png',
  '/galeria/pv2.png',
  '/galeria/pv1.1.png',
  '/galeria/pv3.jpg',
  '/galeria/pv2.2.JPG',
];

// Configuración visual de cada polaroid
// (posición %, rotación deg, escala, animación)
const POLAROID_CFG = [
  { top:'8%',  left:'3%',   rot:-14, scale:1.02, anim:'floatA', delay:'0s',    label:'PV 3.0' },
  { top:'5%',  left:'22%',  rot:6,   scale:0.96, anim:'floatB', delay:'0.6s',  label:'PV 2.0' },
  { top:'55%', left:'1%',   rot:10,  scale:1.00, anim:'floatC', delay:'1.1s',  label:'PV 1.0' },
  { top:'68%', left:'20%',  rot:-7,  scale:0.98, anim:'floatA', delay:'1.8s',  label:'PV 3.0' },
  { top:'6%',  right:'4%',  rot:12,  scale:1.01, anim:'floatB', delay:'0.3s',  label:'PV 2.0' },
  { top:'10%', right:'22%', rot:-8,  scale:0.97, anim:'floatC', delay:'0.9s',  label:'PV 1.0' },
  { top:'60%', right:'3%',  rot:-11, scale:1.00, anim:'floatA', delay:'1.4s',  label:'PV 3.0' },
  { top:'65%', right:'21%', rot:9,   scale:0.99, anim:'floatB', delay:'2.0s',  label:'PV 2.0' },
];

function PolaroidsHero() {
  // Elegir 8 fotos distintas de forma determinista (no aleatoria en cada render)
  const chosen = useMemo(() => {
    if (!HERO_IMGS.length) return [];
    const step = Math.max(1, Math.floor(HERO_IMGS.length / 8));
    return POLAROID_CFG.map((_, i) => HERO_IMGS[(i * step) % HERO_IMGS.length]);
  }, []);

  return (
    <div className="gls-polaroids" aria-hidden="true">
      {POLAROID_CFG.map((cfg, i) => {
        const pos = {};
        if (cfg.left  !== undefined) pos.left  = cfg.left;
        if (cfg.right !== undefined) pos.right = cfg.right;
        pos.top = cfg.top;
        return (
          <div
            key={i}
            className={`gls-pol gls-pol--${cfg.anim}`}
            style={{
              ...pos,
              '--rot':      `${cfg.rot}deg`,
              '--sc':       cfg.scale,
              animationDelay: cfg.delay,
              opacity: 0,
            }}
          >
            <div className="gls-pol__frame">
              {chosen[i] && (
                <img src={chosen[i]} alt="" loading="lazy" className="gls-pol__img" />
              )}
              <div className="gls-pol__shine" />
            </div>
            <span className="gls-pol__label">{cfg.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// Destellos de cámara — reemplazan las figuras geométricas
function CameraSparkles() {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;

    const ctx = c.getContext('2d');
    let raf, W, H;

    const resize = () => {
      W = c.width = c.offsetWidth;
      H = c.height = c.offsetHeight;
    };

    resize();
    // Partículas tipo "bokeh" — círculos difusos, más fotográficos
    const COLORS = ['#9c15d0','#c46de8','#facf2b','#f0ab2b','#ffffff','#094a86'];
    const pts = Array.from({ length: 28 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - .5) * .25,
      vy: (Math.random() - .5) * .22,
      r:  Math.random() * 22 + 4,
      col: COLORS[Math.floor(Math.random() * COLORS.length)],
      a:  Math.random() * .10 + .02,
      pa: 0,                              // phase para pulso
      ps: Math.random() * Math.PI * 2,    // phase start
    }));
    const tick = (t) => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -60)  p.x = W + 60;
        if (p.x > W+60) p.x = -60;
        if (p.y < -60)  p.y = H + 60;
        if (p.y > H+60) p.y = -60;
        // Pulso suave de opacidad
        const pulse = p.a + Math.sin(t * .0008 + p.ps) * p.a * .6;
        // Bokeh: círculo con gradiente radial
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0,   p.col + 'ff');
        g.addColorStop(0.4, p.col + '88');
        g.addColorStop(1,   p.col + '00');
        ctx.globalAlpha = Math.min(pulse, .18);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        // Destello cruciforme pequeño en el centro
        ctx.globalAlpha = pulse * .55;
        ctx.strokeStyle = p.col;
        ctx.lineWidth = .8;
        ctx.beginPath();
        ctx.moveTo(p.x - p.r * .35, p.y); ctx.lineTo(p.x + p.r * .35, p.y);
        ctx.moveTo(p.x, p.y - p.r * .35); ctx.lineTo(p.x, p.y + p.r * .35);
        ctx.stroke();
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="gls-canvas" />;
}

// ════════════════════════════════════════════════════
// TARJETA DE EDICIÓN — con identidad cromática
// ════════════════════════════════════════════════════
function EdicionCard({ ed, index }) {
  const navigate = useNavigate();
  const cardRef  = useRef(null);
  const [vis, setVis]         = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse]     = useState({ x: 50, y: 50 });

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.10 }
    );
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - r.left) / r.width)  * 100,
      y: ((e.clientY - r.top)  / r.height) * 100,
    });
  };

  const isLeft = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`gls-ecard ${vis ? 'gls-ecard--vis' : ''} ${isLeft ? 'gls-ecard--l' : 'gls-ecard--r'}`}
      style={{ '--ec': ed.color, '--ecl': ed.colorLight, '--eca': ed.colorAccent }}
    >
      {/* Panel de frase — lado opuesto a la card */}
      <div className="gls-ecard__panel gls-ecard__panel--left">
        {!isLeft ? <FrasePanel ed={ed} hovered={hovered} /> : null}
      </div>

      {/* ── Nodo central ── */}
      <div className={`gls-ecard__node${hovered ? ' gls-ecard__node--hov' : ''}`}>
        <div className="gls-ecard__node-ring" />
        <div className="gls-ecard__node-outer" />
        <img src={ed.logo} alt={ed.version} className="gls-ecard__node-img" />
      </div>

      <div className="gls-ecard__panel gls-ecard__panel--right">
        {isLeft ? <FrasePanel ed={ed} hovered={hovered} /> : null}
      </div>

      {/* ── Card principal ── */}
      <div
        className={`gls-ecard__card${hovered ? ' gls-ecard__card--hov' : ''}`}
        onClick={() => navigate(ed.route)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        style={isLeft
          ? { gridColumn:1, gridRow:1, marginRight:'1.5rem', '--mx':`${mouse.x}%`, '--my':`${mouse.y}%` }
          : { gridColumn:3, gridRow:1, marginLeft:'1.5rem',  '--mx':`${mouse.x}%`, '--my':`${mouse.y}%` }
        }
      >
        {/* Barra superior con gradiente edición */}
        <div className="gls-ecard__topbar"
          style={{ background: `linear-gradient(90deg, ${ed.color}, ${ed.colorAccent})` }} />

        {/* Spotlight radial que sigue el ratón */}
        <div className="gls-ecard__spotlight"
          style={{ background: `radial-gradient(circle at var(--mx) var(--my), ${ed.colorLight} 0%, transparent 65%)` }} />

        {/* Número decorativo de fondo */}
        <div className="gls-ecard__num-bg" aria-hidden="true" style={{ color: ed.color }}>
          {ed.edition}
        </div>

        <div className="gls-ecard__content">
          <div className="gls-ecard__header">
            <span className="gls-ecard__tag"
              style={{ color: ed.color, borderColor: `${ed.color}40`, background: `${ed.color}10` }}>
              Edición {ed.edition}
            </span>
            {index === 0 && (
              <span className="gls-ecard__badge"
                style={{ background: ed.colorAccent, color: '#1a1a2e' }}>
                ✦ Más reciente
              </span>
            )}
          </div>

          <h2 className="gls-ecard__title" style={{ color: ed.colorDark }}>
            {ed.version}
          </h2>

          <div className="gls-ecard__fecha">
            <span className="gls-ecard__fecha-pip" style={{ background: ed.colorAccent }} />
            {ed.fecha}
          </div>

          <p className="gls-ecard__desc">{ed.descripcion}</p>

          {/* Botón con gradiente animado al hover */}
          <button className="gls-ecard__btn"
            style={{ '--btn-c': ed.color, '--btn-a': ed.colorAccent }}>
            Explorar galería
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="14" height="14">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════
// PÁGINA
// ════════════════════════════════════════════════════
export default function Galeria() {
  return (
    <main className="gls-page">
      <header className="gls-hero">
        {/* Bokeh / destellos de cámara */}
        <CameraSparkles />
        {/* Polaroids flotando en los laterales */}
        <PolaroidsHero />
        {/* Overlay para asegurar legibilidad del texto central */}
        <div className="gls-hero__overlay" />
          <div className="gls-hero__body">
            <span className="gls-hero__eyebrow">Universidad Nacional de Trujillo · SEDIPRO</span>

            <h1 className="gls-hero__title">
              <span className="gls-hero__title-main">Proyectando<br/>Vocaciones</span>
            </h1>
            <p className="gls-hero__sub">Tres ediciones · Cientos de momentos · Un propósito</p>
            <div className="gls-hero__scroll">
              <span>Explora las ediciones</span>
              <div className="gls-hero__chevrons"><span/><span/><span/></div>
          </div>
        </div>
      </header>

      <section className="gls-tl">
        <div className="gls-tl__intro">
          <p className="gls-tl__intro-label">Línea de tiempo</p>
          <h2 className="gls-tl__intro-title">Explora alguna edición</h2>
        </div>
        <div className="gls-tl__body">
          <div className="gls-tl__spine" />
          {EDICIONES.map((ed, i) => (
            <EdicionCard key={ed.id} ed={ed} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}