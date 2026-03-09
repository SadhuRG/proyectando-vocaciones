import { FaArrowUp, FaFacebook, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-container">

      {/* Redes sociales */}
      <div className="footer-social">
        <p className="footer-social-label">¡Síguenos en nuestras redes sociales!</p>
        <div className="footer-social-icons">
          <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="#" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
          <a href="#" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
          <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="#" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
            <FaTiktok />
          </a>
        </div>
      </div>

      {/* Fila inferior */}
      <div className="footer-bottom">
        <div className="footer-info">
          <p className="footer-brand">SEDIPRO UNT</p>
          <p className="footer-copy">© {new Date().getFullYear()} Sociedad Estudiantil de Dirección de Proyectos — Universidad Nacional de Trujillo</p>
        </div>
        <button
          className="btn-back-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Volver arriba"
        >
          <FaArrowUp size={14} />
          <span>Volver arriba</span>
        </button>
      </div>

    </div>
  </footer>
);

export default Footer;