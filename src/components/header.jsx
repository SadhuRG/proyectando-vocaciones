import { editions } from '../lib/routes';
import { FaBars } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detectar scroll para cambiar header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEditionChange = (e) => {
    if (e.target.value) {
      navigate(`/ediciones/${e.target.value}`);
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else {
      navigate('/home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); // Cierra menú mobile si está abierto
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <div className="container">
        <div className="logo-container">
        </div>

        <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="#home" onClick={handleHomeClick}>Home</a>
          <a href="#quienes-somos" onClick={() => setIsMobileMenuOpen(false)}>Quiénes Somos</a>
          <a href="#objetivos" onClick={() => setIsMobileMenuOpen(false)}>Objetivos</a>
          <a href="#evento" onClick={() => setIsMobileMenuOpen(false)}>Sobre el Evento</a>
          <a href="#publico" onClick={() => setIsMobileMenuOpen(false)}>Público Objetivo</a>
          <a href="/carreras" onClick={() => setIsMobileMenuOpen(false)}>Carreras</a>
          <a href="/organizadores" onClick={() => setIsMobileMenuOpen(false)}>Organizadores</a>
          <a href="/ediciones" onClick={() => setIsMobileMenuOpen(false)}>Ediciones</a>
          <a href="/galeria" onClick={() => setIsMobileMenuOpen(false)}>Galería</a>
        </nav>

        <div className="flex items-center gap-4">
          <select onChange={handleEditionChange} className="edition-select">
            <option value="">Ediciones</option>
            {editions.map(ed => (
              <option key={ed.value} value={ed.value}>
                {ed.label}
              </option>
            ))}
          </select>

          <FaBars className="hamburger" onClick={toggleMobileMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;