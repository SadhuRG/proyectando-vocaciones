import { useScroll } from '../hooks/use_scroll';
import ScrollArrow from '../components/scroll_arrow';
import { scrollToSection } from '../lib/utils';
import '../css/welcome-home/home.css';
import '../css/quienes-somos/quienes-somos.css';
const Home = () => {
  const { showArrow } = useScroll();

  return (
    <main>
      {/* Sección Landing */}
      <section id="home" className="home-section bg-purple-800">
        <div className='home-content'> 
          <h1>Proyectando <span className='highlight'>Vocaciones</span></h1>
          <p className='subtitle'>¡Un paso firme hacia tu futuro profesional!</p>
          <div className='home-buttons'>
            <a className='btn btn-primary'>Más Información</a>
            <button onClick={() => scrollToSection('quienes-somos')} className="btn btn-secondary">Bajar</button>
          </div>
        </div>
      </section>

      {/* Sección Quiénes Somos */}
      <section id="quienes-somos" className='home-section bg-purple-200'>
        <div className='home-content'>
          <h2>¿Quiénes Somos?</h2>
          <p className='subtitle-QS-text'>
            Somos un equipo de voluntariado de profesionales dedicados a guiar a los jóvenes en la elección de su carrera universitaria. Con experiencia Universitaria, nuestro objetivo es brindar información clara y actualizada sobre las diferentes carreras de la UNT, ayudando a cada estudiante a descubrir su verdadera vocación y tomar decisiones informadas para su futuro académico y profesional.
          </p>
        </div>
        <h2>Valores</h2>
        <p>
          <li>Integridad</li>
          <li>Innovación</li>
          <li>Compromiso</li>
        </p>

        {showArrow && <ScrollArrow onClick={() => scrollToSection('quienes-somos')} />}

      </section>

      

    </main>
  );
};

export default Home;