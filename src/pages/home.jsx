import { useState, useEffect } from 'react';
import ScrollArrow from '../components/scroll_arrow';
import { scrollToSection } from '../lib/utils';
import '../css/welcome-home/home.css';
import { FaInfoCircle, FaUsers, FaBullseye, FaGraduationCap, FaRocket, FaEye } from 'react-icons/fa';

// Fotos de fondo — una por cada edición (PV 1.0, 2.0, 3.0)
import heroBg1 from '../assets/galeria/PV_1.0/Anotación 2026-03-09 182602.webp';
import heroBg2 from '../assets/galeria/PV_2.0/Fotos_grupales/WhatsApp Image 2025-02-24 at 3.31.28 PM.webp';
import heroBg3 from '../assets/galeria/PV_3.0/feria-area-a/20260228_094918.webp';

const HERO_BG_IMAGES = [heroBg1, heroBg2, heroBg3];
const CAROUSEL_INTERVAL = 5000;

const Home = () => {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % HERO_BG_IMAGES.length);
    }, CAROUSEL_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="home-main">

      {/* ========== SECCIÓN 1: HERO / HOME ========== */}
      <section id="home" className="section section-hero">
        {/* Carrusel de fondo — 3 fotos de las ediciones, opacas, sin flechas */}
        <div className="hero-bg-carousel" aria-hidden="true">
          {HERO_BG_IMAGES.map((src, i) => (
            <div
              key={i}
              className={`hero-bg-slide ${i === bgIndex ? 'hero-bg-slide--active' : ''}`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="section-content hero-content">
          <p className="hero-tag">SEDIPRO UNT presenta</p>
          <h1 className="hero-title">
            Proyectando <span className="highlight">Vocaciones</span>
          </h1>
          <p className="hero-subtitle">¡Un paso firme hacia tu futuro profesional!</p>
          <div className="hero-buttons">
            <button onClick={() => scrollToSection('quienes-somos')} className="btn btn-primary">
              Descubre más
            </button>
            <button onClick={() => scrollToSection('evento')} className="btn btn-outline">
              Sobre el Evento
            </button>
          </div>
        </div>
        <ScrollArrow onClick={() => scrollToSection('quienes-somos')} />
      </section>

      {/* ========== SECCIÓN 2: QUIÉNES SOMOS ========== */}
      <section id="quienes-somos" className="section section-quienes">
        <div className="section-content">
          <div className="qs-header">
            <h2 className="section-title section-title--qs">¿Quiénes Somos?</h2>
            <p className="qs-description">
              Somos la <strong>Sección Estudiantil de Dirección de Proyectos de la Universidad Nacional de Trujillo (SEDIPRO UNT)</strong>, un equipo multidisciplinario de estudiantes comprometidos con el desarrollo y progreso de la sociedad. Promovemos y aplicamos las buenas prácticas de la gestión de proyectos basadas en los principios del <strong>Project Management Institute (PMI)</strong>, a través de actividades académicas, sociales y ambientales.
            </p>
          </div>

          {/* Misión & Visión */}
          <div className="qs-mv-grid">
            <div className="mv-card">
              <div className="mv-card-top">
                <div className="mv-card-icon-wrap">
                  <FaRocket className="mv-icon" />
                </div>
                <span className="mv-badge mv-badge--mision">Misión</span>
              </div>
              <p className="mv-card-text">
                Ser un equipo colaborativo que realiza proyectos locales con <strong>impacto social</strong> gracias al apoyo de alianzas sólidas con personas comprometidas y competentes.
              </p>
            </div>

            <div className="mv-card mv-card--vision">
              <div className="mv-card-top">
                <div className="mv-card-icon-wrap mv-card-icon-wrap--light">
                  <FaEye className="mv-icon" />
                </div>
                <span className="mv-badge mv-badge--vision">Visión</span>
              </div>
              <p className="mv-card-text">
                Ser un <strong>referente consolidado</strong> en la gestión de proyectos con impacto social de la bicentenaria Universidad Nacional de Trujillo.
              </p>
            </div>
          </div>

        </div>
        <ScrollArrow onClick={() => scrollToSection('objetivos')} />
      </section>

      {/* ========== SECCIÓN 3: OBJETIVOS ========== */}
      <section id="objetivos" className="section section-objetivos">
        <div className="section-content">
          <div className="obj-header">
            <h2 className="section-title section-title--obj">Nuestros Objetivos</h2>
          </div>
          <div className="objetivos-grid">
            <div className="objetivo-card">
              <span className="obj-number">01</span>
              <div className="objetivo-icon-wrap">
                <FaInfoCircle className="objetivo-icon" />
              </div>
              <div className="objetivo-body">
                <h3>Informar</h3>
                <p>Ofrecer datos precisos y actuales sobre las carreras y oportunidades laborales del mercado.</p>
              </div>
            </div>
            <div className="objetivo-card">
              <span className="obj-number">02</span>
              <div className="objetivo-icon-wrap">
                <FaUsers className="objetivo-icon" />
              </div>
              <div className="objetivo-body">
                <h3>Conectar</h3>
                <p>Propiciar intercambios significativos entre estudiantes y referentes de cada sector.</p>
              </div>
            </div>
            <div className="objetivo-card">
              <span className="obj-number">03</span>
              <div className="objetivo-icon-wrap">
                <FaBullseye className="objetivo-icon" />
              </div>
              <div className="objetivo-body">
                <h3>Motivar</h3>
                <p>Alentar a los estudiantes a elegir carreras que los realicen tanto a nivel personal como profesional.</p>
              </div>
            </div>
            <div className="objetivo-card">
              <span className="obj-number">04</span>
              <div className="objetivo-icon-wrap">
                <FaGraduationCap className="objetivo-icon" />
              </div>
              <div className="objetivo-body">
                <h3>Orientar</h3>
                <p>Acompañar la elección universitaria de los estudiantes, alineando intereses y aptitudes con su proyección profesional.</p>
              </div>
            </div>
          </div>
        </div>
        <ScrollArrow onClick={() => scrollToSection('evento')} />
      </section>

      {/* ========== SECCIÓN 4: SOBRE EL EVENTO ========== */}
      <section id="evento" className="section section-evento">
        {/* Formas decorativas de fondo */}
        <div className="evento-blob evento-blob--1" aria-hidden="true" />
        <div className="evento-blob evento-blob--2" aria-hidden="true" />

        <div className="section-content">
          <h2 className="section-title section-title--evento">Sobre el Evento</h2>

          {/* Stats en fila superior */}
          <div className="evento-stats-row">
            <div className="stat-card stat-card--accent">
              <span className="stat-card-number">100+</span>
              <span className="stat-card-label">Asistentes esperados</span>
            </div>
            <div className="stat-card">
              <span className="stat-card-number">20+</span>
              <span className="stat-card-label">Carreras presentadas</span>
            </div>
          </div>

          {/* Texto descriptivo inferior */}
          <div className="evento-desc">
            <p>
              <strong>Proyectando Vocaciones</strong> es un proyecto de <strong>SEDIPRO UNT</strong> que orienta a estudiantes preuniversitarios de colegios y academias de <strong>La Libertad</strong> para que tomen una decisión informada sobre su futura carrera en la <strong>Universidad Nacional de Trujillo</strong>.
            </p>
          </div>
        </div>
        <ScrollArrow onClick={() => scrollToSection('publico')} />
      </section>

      {/* ========== SECCIÓN 5: PÚBLICO OBJETIVO ========== */}
      <section id="publico" className="section section-publico">
        <div className="section-content">
          <h2 className="section-title section-title--publico">Público Objetivo</h2>
          <p className="publico-intro">
            Un proyecto hecho para estudiantes que están definiendo su futuro profesional.
          </p>
          <div className="publico-grid">
            <div className="publico-card">
              <div className="publico-card-top">
                <div className="publico-card-icon-wrap">
                  <FaGraduationCap className="publico-icon" />
                </div>
                <span className="publico-num">01</span>
              </div>
              <h3>Estudiantes de secundaria</h3>
              <p>
                Especialmente aquellos de <strong>4.° y 5.° grado</strong> de colegios públicos y privados, que necesitan explorar y contrastar sus opciones antes de salir del colegio.
              </p>
              <ul className="publico-list">
                <li>Colegios públicos y privados</li>
                <li>4° y 5° de secundaria</li>
                <li>Explora opciones de carrera</li>
              </ul>
            </div>
            <div className="publico-card publico-card--dark">
              <div className="publico-card-top">
                <div className="publico-card-icon-wrap publico-card-icon-wrap--inv">
                  <FaBullseye className="publico-icon" />
                </div>
                <span className="publico-num publico-num--inv">02</span>
              </div>
              <h3>Estudiantes preuniversitarios</h3>
              <p>
                Jóvenes en academias e institutos que buscan afianzar o confirmar su elección de carrera con más información y autoconocimiento antes de su examen de admisión.
              </p>
              <ul className="publico-list">
                <li>Academias e institutos preuniversitarios</li>
                <li>En proceso de admisión UNT</li>
                <li>Confirmar y reforzar su vocación</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;