import { FaArrowUp, FaFacebook, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { scrollToSection } from '../lib/utils';

const SOCIAL_LINKS = [
  { label: 'Facebook',  href: 'https://www.facebook.com/SEDIPROUNT',        icon: <FaFacebook />,   color: '#1877F2' },
  { label: 'Instagram', href: 'https://www.instagram.com/sediprount',        icon: <FaInstagram />,  color: '#E1306C' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/sediprount', icon: <FaLinkedinIn />, color: '#0A66C2' },
  { label: 'TikTok',    href: 'https://www.tiktok.com/@sediprount',          icon: <FaTiktok />,     color: '#69C9D0' },
  { label: 'YouTube',   href: 'https://www.youtube.com/@sediprount',         icon: <FaYoutube />,    color: '#FF0000' },
];

const NAV_QUICK = [
  { label: 'Inicio',         action: 'scroll', target: 'home'          },
  { label: 'Quiénes Somos',  action: 'scroll', target: 'quienes-somos' },
  { label: 'Objetivos',      action: 'scroll', target: 'objetivos'     },
  { label: 'Sobre el Evento',action: 'scroll', target: 'evento'        },
  { label: 'Ediciones',      action: 'page',   target: '/ediciones'    },
  { label: 'Galería',        action: 'page',   target: '/galeria'      },
];

const Footer = () => {
  const navigate = useNavigate();

  const handleNav = (item) => {
    if (item.action === 'page') { navigate(item.target); return; }
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToSection(item.target), 300);
    } else {
      scrollToSection(item.target);
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner">

        {/* ══ Cuerpo: 3 columnas ══ */}
        <div className="footer-cols">

          {/* Col 1 — Marca */}
          <div className="footer-col footer-col--brand">
            <div className="footer-brand-row">
              <img src="/Logo-SEDIPRO.png" alt="SEDIPRO UNT" className="footer-logo" />
              <p className="footer-brand-name">SEDIPRO UNT</p>
            </div>
            <p className="footer-brand-desc">
              Sección Estudiantil de Dirección de Proyectos — Universidad Nacional de Trujillo.
              Conectamos estudiantes con su futuro profesional.
            </p>
          </div>

          {/* Col 2 — Navegación rápida */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navegación</h4>
            <ul className="footer-nav-list">
              {NAV_QUICK.map((item) => (
                <li key={item.label}>
                  <button
                    className="footer-nav-link"
                    onClick={() => handleNav(item)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Redes */}
          <div className="footer-col">
            <h4 className="footer-col-title">Síguenos</h4>
            <div className="footer-social-grid">
              {SOCIAL_LINKS.map(({ label, href, icon, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  style={{ '--sc': color }}
                >
                  <span className="footer-social-btn-icon">{icon}</span>
                  <span className="footer-social-btn-label">{label}</span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ══ Pie ══ */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} SEDIPRO UNT · Universidad Nacional de Trujillo
          </p>
          <button
            className="btn-back-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <FaArrowUp size={11} />
            <span>Volver arriba</span>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;