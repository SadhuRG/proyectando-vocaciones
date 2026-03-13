import {
  FaBars, FaTimes,
  FaHome, FaUsers, FaBullseye,
  FaCalendarAlt, FaUserGraduate,
  FaLayerGroup, FaImages
} from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { scrollToSection } from '../lib/utils';
import logo from '../assets/SEDIPRO-UNT.png';

const NAV_ITEMS = [
  { label: 'Home',            icon: <FaHome />,         type: 'section', target: 'home'          },
  { label: 'Quiénes Somos',   icon: <FaUsers />,        type: 'section', target: 'quienes-somos' },
  { label: 'Objetivos',       icon: <FaBullseye />,     type: 'section', target: 'objetivos'     },
  { label: 'Sobre el Evento', icon: <FaCalendarAlt />,  type: 'section', target: 'evento'        },
  { label: 'Público',         icon: <FaUserGraduate />, type: 'section', target: 'publico'       },
  { label: 'Ediciones',       icon: <FaLayerGroup />,   type: 'page',    target: '/ediciones', highlight: true },
  { label: 'Galería',         icon: <FaImages />,       type: 'page',    target: '/galeria',   highlight: true },
];

const SECTION_IDS = ['home', 'quienes-somos', 'objetivos', 'evento', 'publico'];

const Header = () => {
  const navigate   = useNavigate();
  const location   = useLocation();
  const [isScrolled,       setIsScrolled]    = useState(false);
  const [isMobileMenuOpen, setMobileMenu]    = useState(false);
  const [activeSection,    setActiveSection] = useState('home');
  const observerRef = useRef(null);

  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/' && location.pathname !== '/home') return;
    const opts = { root: null, rootMargin: '-40% 0px -55% 0px', threshold: 0 };
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, opts);
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [location.pathname]);

  const isActive = (item) => {
    if (item.type === 'page') return location.pathname.startsWith(item.target);
    if (location.pathname !== '/' && location.pathname !== '/home') return false;
    return activeSection === item.target;
  };

  const handleClick = (e, item) => {
    e.preventDefault();
    setMobileMenu(false);
    if (item.type === 'page') { navigate(item.target); return; }
    if (item.target === 'home') {
      if (location.pathname !== '/') { navigate('/'); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100); }
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (location.pathname !== '/' && location.pathname !== '/home') {
      navigate('/'); setTimeout(() => scrollToSection(item.target), 300);
    } else {
      scrollToSection(item.target);
    }
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">

        {/* ── Logo ── */}
        <div className="logo-container">
          <a
            href="#home"
            onClick={(e) => handleClick(e, { type: 'section', target: 'home' })}
            className="logo-link"
          >
            <img src="/Logo-SEDIPRO.png" alt="SEDIPRO UNT" className="logo-img" />
            <span className="logo-text">Proyectando Vocaciones</span>
          </a>
        </div>

        {/* ── Navegación ── */}
        <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.type === 'page' ? item.target : `#${item.target}`}
              onClick={(e) => handleClick(e, item)}
              className={[
                item.highlight ? 'nav-link--highlight' : '',
                isActive(item) ? 'active' : '',
              ].filter(Boolean).join(' ')}
            >
              <span className="nav-link-icon">{item.icon}</span>
              <span className="nav-link-text">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* ── Hamburguesa ── */}
        <button
          className="hamburger"
          onClick={() => setMobileMenu(!isMobileMenuOpen)}
          aria-label="Menú"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>
    </header>
  );
};

export default Header;