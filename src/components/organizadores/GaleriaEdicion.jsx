// src/components/organizadores/GaleriaEdicion.jsx
// v4 — hero temático, carrusel con identidad, fix lightbox scroll, footer preservado

import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// keen-slider removido — carrusel propio en JS puro
import { EDICIONES } from '../../pages/galeria';
import PhotoCarousel from './PhotoCarousel';

const globToUrls = (g) => Object.values(g).map(m => m.default);

const IMG = {
  'pv3/recorrido-puerta-1': globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/recorrido_puerta-1/*.{webp,jpg,jpeg,png}',                { eager:true })),
  'pv3/recorrido-puerta-2': globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/recorrido_puerta-2/*.{webp,jpg,jpeg,png}',                { eager:true })),
  'pv3/feria-area-a':       globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/feria-area-a/*.{webp,jpg,jpeg,png}',                      { eager:true })),
  'pv3/feria-area-b':       globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/feria-area-b/*.{webp,jpg,jpeg,png}',                      { eager:true })),
  'pv3/feria-area-cd':      globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/feria-area-cd/*.{webp,jpg,jpeg,png}',                     { eager:true })),
  'pv3/administracion':     globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-administracion/*.{webp,jpg,jpeg,png}',    { eager:true })),
  'pv3/antropologia':       globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-antropologia/*.{webp,jpg,jpeg,png}',      { eager:true })),
  'pv3/arqueologia':        globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-arqueologia/*.{webp,jpg,jpeg,png}',       { eager:true })),
  'pv3/arquitectura':       globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-arquitectura/*.{webp,jpg,jpeg,png}',      { eager:true })),
  'pv3/comunicacion':       globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-comunicacion/*.{webp,jpg,jpeg,png}',      { eager:true })),
  'pv3/contabilidad':       globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-contabilidad/*.{webp,jpg,jpeg,png}',      { eager:true })),
  'pv3/derecho':            globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-derecho/*.{webp,jpg,jpeg,png}',           { eager:true })),
  'pv3/ed-primaria':        globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-ed-primaria/*.{webp,jpg,jpeg,png}',       { eager:true })),
  'pv3/enfermeria':         globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-enfermeria/*.{webp,jpg,jpeg,png}',        { eager:true })),
  'pv3/ing-agroindustrial': globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-ing-agroindustrial/*.{webp,jpg,jpeg,png}',{ eager:true })),
  'pv3/ing-agronomica':     globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-ing-agronomica/*.{webp,jpg,jpeg,png}',    { eager:true })),
  'pv3/ing-ambiental':      globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-ing-ambiental/*.{webp,jpg,jpeg,png}',     { eager:true })),
  'pv3/ing-civil':          globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-ing-civil/*.{webp,jpg,jpeg,png}',         { eager:true })),
  'pv3/ing-industrial':     globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-ing-industrial/*.{webp,jpg,jpeg,png}',    { eager:true })),
  'pv3/ing-informatica':    globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-ing-informatica/*.{webp,jpg,jpeg,png}',   { eager:true })),
  'pv3/ing-mecatronica':    globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-ing-mecatronica/*.{webp,jpg,jpeg,png}',   { eager:true })),
  'pv3/medicina':           globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-medicina/*.{webp,jpg,jpeg,png}',          { eager:true })),
  'pv3/politicas':          globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-politicas/*.{webp,jpg,jpeg,png}',         { eager:true })),
  'pv3/trabajo-social':     globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-trabajo-social/*.{webp,jpg,jpeg,png}',    { eager:true })),
  'pv3/turismo':            globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-turismo/*.{webp,jpg,jpeg,png}',           { eager:true })),
  'pv3/zootecnia':          globToUrls(import.meta.glob('../../assets/galeria/PV_3.0/carreras/carrera-zootecnia/*.{webp,jpg,jpeg,png}',         { eager:true })),
  'pv2/rutas':              globToUrls(import.meta.glob('../../assets/galeria/PV_2.0/Rutas/*.{webp,jpg,jpeg,png}',                             { eager:true })),
  'pv2/auditorio':          globToUrls(import.meta.glob('../../assets/galeria/PV_2.0/Auditorio/*.{webp,jpg,jpeg,png}',                         { eager:true })),
  'pv2/charlas':            globToUrls(import.meta.glob('../../assets/galeria/PV_2.0/Charlas/*.{webp,jpg,jpeg,png}',                           { eager:true })),
  'pv2/equipo':             globToUrls(import.meta.glob('../../assets/galeria/PV_2.0/Equipo_trabajo/*.{webp,jpg,jpeg,png}',                     { eager:true })),
  'pv2/grupales':           globToUrls(import.meta.glob('../../assets/galeria/PV_2.0/Fotos_grupales/*.{webp,jpg,jpeg,png}',                     { eager:true })),
  'pv1/todas':              globToUrls(import.meta.glob('../../assets/galeria/PV_1.0/*.{webp,jpg,jpeg,png}',                                   { eager:true })),
};

const ESTRUCTURA = {
  pv3: [
    { id:'recorrido', slug:'recorrido', label:'Recorrido', tag:'Recorrido',
      description:'Los estudiantes ingresaron y recorrieron la universidad por dos rutas',
      subsecciones:[
        { id:'puerta-1', label:'Recorrido Puerta 1', description:'Área C & D', key:'pv3/recorrido-puerta-1' },
        { id:'puerta-2', label:'Recorrido Puerta 2', description:'Área A & B', key:'pv3/recorrido-puerta-2' },
      ]},
    { id:'feria', slug:'feria', label:'Feria de Carreras', tag:'Feria',
      description:'Stands interactivos por área de conocimiento',
      subsecciones:[
        { id:'feria-a',  label:'Área A',     description:'Ciencias de la Vida y la Salud',       key:'pv3/feria-area-a'  },
        { id:'feria-b',  label:'Área B',     description:'Ciencias Básicas y Tecnológicas',       key:'pv3/feria-area-b'  },
        { id:'feria-cd', label:'Área C & D', description:'Ciencias de la Persona · Económicas',  key:'pv3/feria-area-cd' },
      ]},
    { id:'charlas', slug:'charlas', label:'Charlas', tag:'Charlas',
      description:'Cada carrera presentó su propuesta a los futuros estudiantes',
      subsecciones:[
        { id:'medicina',        label:'Medicina',            description:'Área A', key:'pv3/medicina'           },
        { id:'enfermeria',      label:'Enfermería',          description:'Área A', key:'pv3/enfermeria'         },
        { id:'zootecnia',       label:'Zootecnia',           description:'Área A', key:'pv3/zootecnia'          },
        { id:'arquitectura',    label:'Arquitectura',        description:'Área B', key:'pv3/arquitectura'       },
        { id:'ing-civil',       label:'Ing. Civil',          description:'Área B', key:'pv3/ing-civil'          },
        { id:'ing-industrial',  label:'Ing. Industrial',     description:'Área B', key:'pv3/ing-industrial'     },
        { id:'ing-mecatronica', label:'Ing. Mecatrónica',    description:'Área B', key:'pv3/ing-mecatronica'    },
        { id:'ing-ambiental',   label:'Ing. Ambiental',      description:'Área B', key:'pv3/ing-ambiental'      },
        { id:'ing-informatica', label:'Ing. Informática',    description:'Área B', key:'pv3/ing-informatica'    },
        { id:'agroindustrial',  label:'Ing. Agroindustrial', description:'Área B', key:'pv3/ing-agroindustrial' },
        { id:'agronomia',       label:'Ing. Agronómica',     description:'Área B', key:'pv3/ing-agronomica'     },
        { id:'derecho',         label:'Derecho',             description:'Área C', key:'pv3/derecho'            },
        { id:'politicas',       label:'Cs. Políticas',       description:'Área C', key:'pv3/politicas'          },
        { id:'comunicacion',    label:'Comunicaciones',      description:'Área C', key:'pv3/comunicacion'       },
        { id:'ed-primaria',     label:'Ed. Primaria',        description:'Área C', key:'pv3/ed-primaria'        },
        { id:'antropologia',    label:'Antropología',        description:'Área C', key:'pv3/antropologia'       },
        { id:'arqueologia',     label:'Arqueología',         description:'Área C', key:'pv3/arqueologia'        },
        { id:'trabajo-social',  label:'Trabajo Social',      description:'Área C', key:'pv3/trabajo-social'     },
        { id:'turismo',         label:'Turismo',             description:'Área C', key:'pv3/turismo'            },
        { id:'administracion',  label:'Administración',      description:'Área D', key:'pv3/administracion'     },
        { id:'contabilidad',    label:'Contabilidad',        description:'Área D', key:'pv3/contabilidad'       },
      ]},
  ],
  pv2: [
    { id:'rutas',    slug:'rutas',    label:'Rutas',         tag:'Rutas',    description:'Recorridos por las instalaciones universitarias',     key:'pv2/rutas'    },
    { id:'auditorio',slug:'auditorio',label:'Auditorio',     tag:'Auditorio',description:'Actos centrales y presentaciones del evento',        key:'pv2/auditorio'},
    { id:'charlas',  slug:'charlas',  label:'Charlas',       tag:'Charlas',  description:'Charlas de orientación vocacional a los estudiantes', key:'pv2/charlas'  },
    { id:'equipo',   slug:'equipo',   label:'Equipo',        tag:'Equipo',   description:'El equipo organizador detrás del evento',            key:'pv2/equipo'   },
    { id:'grupales', slug:'grupales', label:'Fotos Grupales',tag:'Grupales', description:'Momentos compartidos con todos los asistentes',      key:'pv2/grupales' },
  ],
  pv1: [],
};

const totalFotos = {
  pv3: Object.entries(IMG).filter(([k])=>k.startsWith('pv3')).reduce((s,[,v])=>s+v.length,0),
  pv2: Object.entries(IMG).filter(([k])=>k.startsWith('pv2')).reduce((s,[,v])=>s+v.length,0),
  pv1: (IMG['pv1/todas']??[]).length,
};

// ════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════
// CARRUSEL — delega a PhotoCarousel.jsx
// PhotoCarousel maneja su propio Lightbox (createPortal en body)
// ════════════════════════════════════════════════════════════════
function Carrusel({ imgKey, edicion }) {
  const fotos = IMG[imgKey] ?? [];
  return (
    <PhotoCarousel
      fotos={fotos}
      color={edicion.color}
      colorAccent={edicion.colorAccent}
    />
  );
}


function TabSection({ seccion, edicion }) {
  const [tab, setTab] = useState(0);
  return (
    <div>
      <div className="gle-tabs">
        {seccion.subsecciones.map((s,i)=>(
          <button key={s.id}
            className={`gle-tab${tab===i?' gle-tab--on':''}`}
            style={tab===i
              ?{background:edicion.color,borderColor:edicion.color,color:'#fff'}
              :{borderColor:`${edicion.color}40`}}
            onClick={()=>setTab(i)}>
            <span className="gle-tab__n">{s.label}</span>
            <span className="gle-tab__d">{s.description}</span>
          </button>
        ))}
      </div>
      <Carrusel key={seccion.subsecciones[tab].key} imgKey={seccion.subsecciones[tab].key} edicion={edicion}/>
    </div>
  );
}

function Seccion({ seccion, edicion }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold:0.07});
    if(ref.current)obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return (
    <section ref={ref} id={seccion.id} className={`gle-sec${vis?' gle-sec--vis':''}`}>
      <div className="gle-sec__head">
        <div className="gle-sec__badge"
          style={{background:`linear-gradient(90deg,${edicion.color},${edicion.colorAccent})`}}>
          {seccion.tag}
        </div>
        <div className="gle-sec__info">
          <h2 className="gle-sec__title">{seccion.label}</h2>
          <p className="gle-sec__desc">{seccion.description}</p>
        </div>
        <div className="gle-sec__rule"
          style={{background:`linear-gradient(90deg,${edicion.color},transparent)`}}/>
      </div>
      {seccion.subsecciones
        ?<TabSection seccion={seccion} edicion={edicion}/>
        :<Carrusel key={seccion.key} imgKey={seccion.key} edicion={edicion}/>
      }
      <div className="gle-divider"
        style={{background:`linear-gradient(90deg,${edicion.color}25,transparent 60%)`}}/>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════
// COLLAGE MOSAICO PV 1.0
// ════════════════════════════════════════════════════════════════
function CollageMosaico({ fotos, edicion }) {
  const [lbStart,setLbStart] = useState(null);
  const [visSet, setVisSet]  = useState(new Set());
  const refs    = useRef([]);
  const wrapRef = useRef(null);
  const handleClose = useCallback(()=>setLbStart(null),[]);

  useEffect(()=>{
    const obs = new IntersectionObserver(entries=>entries.forEach(e=>{
      if(e.isIntersecting){const i=Number(e.target.dataset.idx);setVisSet(p=>new Set([...p,i]));}
    }),{threshold:0.12});
    refs.current.forEach(r=>r&&obs.observe(r));
    return ()=>obs.disconnect();
  },[fotos.length]);

  const handleMove=(e,el)=>{
    const r=el.getBoundingClientRect();
    const cx=(e.clientX-r.left)/r.width-.5;
    const cy=(e.clientY-r.top)/r.height-.5;
    const img=el.querySelector('img');
    if(img)img.style.transform=`scale(1.08) translate(${cx*12}px,${cy*10}px)`;
  };
  const handleLeave=el=>{const img=el.querySelector('img');if(img)img.style.transform='scale(1) translate(0,0)';};

  if(!fotos.length) return <div className="gle-empty"><span>📷</span><p>Fotos próximamente</p></div>;

  const AREAS=['hero','b','c','d','e','f','g','h','i'];
  const imgs=fotos.slice(0,9);

  return (
    <>
      <div ref={wrapRef} className="gle-mosaic"
        style={{'--mc':edicion.color,'--mcl':edicion.colorLight,'--mca':edicion.colorAccent}}>
        {imgs.map((src,i)=>(
          <div key={i} ref={el=>(refs.current[i]=el)} data-idx={i}
            className={`gle-mosaic__cell gle-mosaic__cell--${AREAS[i]}${visSet.has(i)?' gle-mosaic__cell--vis':''}${i===0?' gle-mosaic__cell--hero':''}`}
            style={{transitionDelay:`${i*0.08}s`}}
            onClick={()=>setLbStart(i)}
            onMouseMove={e=>handleMove(e,e.currentTarget)}
            onMouseLeave={e=>handleLeave(e.currentTarget)}>
            <img src={src} alt="" loading="lazy"/>
            <div className="gle-mosaic__overlay">
              <span className="gle-mosaic__num">0{i+1}</span>
              <span className="gle-mosaic__zoom-ico">⊕</span>
            </div>
            <div className="gle-mosaic__border"/>
          </div>
        ))}
        <div className="gle-mosaic__footer">
          <div className="gle-mosaic__footer-dot" style={{background:edicion.color}}/>
          <span>📅 16 de Diciembre, 2022</span>
          <span className="gle-mosaic__footer-sep">·</span>
          <span>{fotos.length} foto{fotos.length!==1?'s':''}</span>
          <span className="gle-mosaic__footer-sep">·</span>
          <span>Proyectando Vocaciones 1.0</span>
          {fotos.length>9&&(
            <button className="gle-mosaic__ver-mas" style={{background:edicion.color}}
              onClick={()=>setLbStart(0)}>Ver todas ({fotos.length}) →</button>
          )}
        </div>
      </div>
      {lbStart!==null&&(
        <Lightbox images={fotos} startIndex={lbStart} onClose={handleClose} anchorRef={wrapRef}/>
      )}
    </>
  );
}

// ════════════════════════════════════════════════════════════════
// BARRA DE NAVEGACIÓN UNIFICADA
// ════════════════════════════════════════════════════════════════
function HeroNavBar({ edicion, onBack }) {
  const navigate = useNavigate();

  return (
    <div className="gle-herobar">
      {/* Botón sutil — solo texto, sin caja */}
      <button className="gle-herobar__back" onClick={onBack}>
        ← Todas las ediciones
      </button>

      {/* Separador visual */}
      <div className="gle-herobar__sep" aria-hidden="true" />

      {/* Pills de edición — solo estos tres botones */}
      <div className="gle-herobar__pills">
        {EDICIONES.map(ed => {
          const isActive = ed.id === edicion.id;
          return (
            <button key={ed.id}
              className={`gle-herobar__pill${isActive ? ' gle-herobar__pill--on' : ''}`}
              style={isActive
                ? { background: ed.color, borderColor: ed.color, color: '#fff',
                    boxShadow: `0 0 0 3px ${ed.color}30, 0 4px 16px ${ed.color}45` }
                : {}
              }
              onClick={() => !isActive && navigate(ed.route)}
              disabled={isActive}
              title={ed.version}
            >
              {ed.edition}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// HERO TEMÁTICO — fondo oscuro con identidad cromática
// ════════════════════════════════════════════════════════════════
function HeroEdicion({ edicion, secciones, children }) {
  const total = totalFotos[edicion.id] ?? 0;
  return (
    <header className="gle-hero gle-hero--themed"
      style={{'--ep':edicion.color,'--epa':edicion.colorAccent,'--epd':edicion.colorDark,'--epl':edicion.colorLight}}>

      {/* Fondo oscuro con gradiente de color */}
      <div className="gle-hero__darkbg"/>

      {/* Patrón de puntos SVG */}
      <svg className="gle-hero__pattern" aria-hidden="true">
        <defs>
          <pattern id={`dots-${edicion.id}`} x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.4" fill="currentColor"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dots-${edicion.id})`}/>
      </svg>

      {/* Orbes de luz */}
      <div className="gle-hero__orb gle-hero__orb--l" style={{background:edicion.color}}/>
      <div className="gle-hero__orb gle-hero__orb--r" style={{background:edicion.colorAccent}}/>

      <div className="gle-hero__inner">
        {/* Barra de nav (children) */}
        {children}

        {/* Contenido principal */}
        <div className="gle-hero__main">
          {/* Logo con glow */}
          <div className="gle-hero__logo-wrap">
            <img src={edicion.logo} alt={edicion.version} className="gle-hero__logo-img"/>
            <div className="gle-hero__logo-glow" style={{background:edicion.color}}/>
          </div>

          {/* Texto e info */}
          <div className="gle-hero__text">
            <div className="gle-hero__eyebrow-wrap">
              <span className="gle-hero__edition-badge"
                style={{background:`${edicion.color}22`,borderColor:`${edicion.color}55`,color:edicion.colorAccent}}>
                Edición {edicion.edition}
              </span>
              <span className="gle-hero__year" style={{color:`${edicion.colorAccent}88`}}>
                {edicion.año}
              </span>
            </div>
            <h1 className="gle-hero__title">{edicion.version}</h1>
            <p className="gle-hero__desc">{edicion.descripcion}</p>

            {/* Stats */}
            <div className="gle-hero__stats">
              {total>0&&(
                <div className="gle-hero__stat">
                  <span className="gle-hero__stat-num" style={{color:edicion.colorAccent}}>{total}+</span>
                  <span className="gle-hero__stat-lbl">fotos</span>
                </div>
              )}
              {secciones.length>0&&(
                <div className="gle-hero__stat">
                  <span className="gle-hero__stat-num" style={{color:edicion.colorAccent}}>{secciones.length}</span>
                  <span className="gle-hero__stat-lbl">secciones</span>
                </div>
              )}
              <div className="gle-hero__stat">
                <span className="gle-hero__stat-num" style={{color:edicion.colorAccent}}>
                  {edicion.fecha.split(',')[0]}
                </span>
                <span className="gle-hero__stat-lbl">fecha del evento</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banda de acento inferior animada */}
      <div className="gle-hero__accent-bar"
        style={{background:`linear-gradient(90deg,transparent,${edicion.color},${edicion.colorAccent},${edicion.color},transparent)`}}/>
    </header>
  );
}

// ════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ════════════════════════════════════════════════════════════════
export default function GaleriaEdicion({ edicionId }) {
  const navigate      = useNavigate();
  const { seccionId } = useParams();
  const edicion       = EDICIONES.find(e=>e.id===edicionId);
  const secciones     = ESTRUCTURA[edicionId]??[];

  const activeFilter = seccionId
    ?(secciones.find(s=>s.slug===seccionId)?.id??'all')
    :'all';

  const handleBack = useCallback(()=>navigate('/galeria'),[navigate]);

  useEffect(()=>{
    if(!edicion)navigate('/galeria',{replace:true});
  },[edicion,navigate]);

  if(!edicion)return null;

  const shown = activeFilter==='all' ? secciones : secciones.filter(s=>s.id===activeFilter);

  const handleFilterClick = s => {
    if(s.id==='all'){
      navigate(`/galeria/${edicionId}`,{replace:true});
    } else {
      navigate(`/galeria/${edicionId}/${s.slug}`,{replace:true});
      setTimeout(()=>document.getElementById(s.id)?.scrollIntoView({behavior:'smooth'}),80);
    }
  };

  const pageStyle = {'--ep':edicion.color,'--epl':edicion.colorLight,'--epa':edicion.colorAccent,'--epd':edicion.colorDark};

  // ── PV 1.0 ───────────────────────────────────────────────────
  if(edicion.id==='pv1'){
    return (
      <main className="gle-page" data-edition={edicion.edition} style={pageStyle}>
        <HeroEdicion edicion={edicion} secciones={[]}>
          <HeroNavBar edicion={edicion} onBack={handleBack}/>
        </HeroEdicion>

        <div className="gle-body">
          <section className="gle-sec gle-sec--vis" style={{paddingTop:'3rem'}}>
            <div className="gle-sec__head">
              <div className="gle-sec__badge"
                style={{background:`linear-gradient(90deg,${edicion.color},${edicion.colorAccent})`}}>
                Galería
              </div>
              <div className="gle-sec__info">
                <h2 className="gle-sec__title">Momentos del evento</h2>
                <p className="gle-sec__desc">El inicio de Proyectando Vocaciones — 16 de Diciembre de 2022</p>
              </div>
              <div className="gle-sec__rule"
                style={{background:`linear-gradient(90deg,${edicion.color},transparent)`}}/>
            </div>
            <CollageMosaico fotos={IMG['pv1/todas']??[]} edicion={edicion}/>
          </section>
        </div>

        <footer className="gle-footer">
          <div className="gle-footer__inner">
            <div className="gle-footer__dot" style={{background:edicion.colorAccent}}/>
            <p>© Proyectando Vocaciones · Universidad Nacional de Trujillo</p>
            <div className="gle-footer__edition"
              style={{color:edicion.color,borderColor:`${edicion.color}40`}}>
              {edicion.version}
            </div>
          </div>
        </footer>
      </main>
    );
  }

  // ── PV 2.0 y PV 3.0 ─────────────────────────────────────────
  return (
    <main className="gle-page" data-edition={edicion.edition} style={pageStyle}>
      <HeroEdicion edicion={edicion} secciones={secciones}>
        <HeroNavBar edicion={edicion} onBack={handleBack}/>
      </HeroEdicion>

      <nav className="gle-nav">
        <div className="gle-nav__track">
          {[{id:'all',slug:'',label:'Todo'},...secciones].map(s=>(
            <button key={s.id}
              className={`gle-nav-btn${activeFilter===s.id?' gle-nav-btn--on':''}`}
              style={activeFilter===s.id
                ?{background:edicion.color,borderColor:edicion.color,color:'#fff',boxShadow:`0 4px 14px ${edicion.color}40`}
                :{borderColor:`${edicion.color}30`}}
              onClick={()=>handleFilterClick(s)}>
              {s.label||s.tag}
            </button>
          ))}
        </div>
      </nav>

      <div className="gle-body">
        {shown.length===0
          ?<div className="gle-empty" style={{padding:'6rem 2rem'}}><span>📷</span><p>Fotos próximamente</p></div>
          :shown.map(s=><Seccion key={s.id} seccion={s} edicion={edicion}/>)
        }
      </div>

      <footer className="gle-footer">
        <div className="gle-footer__inner">
          <div className="gle-footer__dot" style={{background:edicion.colorAccent}}/>
          <p>© Proyectando Vocaciones · Universidad Nacional de Trujillo</p>
          <div className="gle-footer__edition"
            style={{color:edicion.color,borderColor:`${edicion.color}40`}}>
            {edicion.version}
          </div>
        </div>
      </footer>
    </main>
  );
}