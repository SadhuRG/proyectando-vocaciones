import { FaBars, FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { scrollToSection } from '../lib/utils';
import logo from '../assets/SEDIPRO-UNT.png';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/' && location.pathname !== '/home') {
      navigate('/');
      setTimeout(() => scrollToSection(sectionId), 300);
    } else {
      scrollToSection(sectionId);
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageClick = (e, path) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo-container">
          <a href="#home" onClick={handleHomeClick} className="logo-link">
            <img src={logo} alt="Logo" className="logo-img" width={200} height={200} />
            <span className="logo-text">Proyectando Vocaciones</span>
          </a>
        </div>

        <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="#home" onClick={handleHomeClick}>Home</a>
          <a href="#quienes-somos" onClick={(e) => handleSectionClick(e, 'quienes-somos')}>Quiénes Somos</a>
          <a href="#objetivos" onClick={(e) => handleSectionClick(e, 'objetivos')}>Objetivos</a>
          <a href="#evento" onClick={(e) => handleSectionClick(e, 'evento')}>Sobre el Evento</a>
          <a href="#publico" onClick={(e) => handleSectionClick(e, 'publico')}>Público Objetivo</a>
          <a href="/ediciones" onClick={(e) => handlePageClick(e, '/ediciones')}>Ediciones</a>
          <a href="/galeria" onClick={(e) => handlePageClick(e, '/galeria')}>Galería</a>
        </nav>

        <button className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Menú">
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
};

export default Header;