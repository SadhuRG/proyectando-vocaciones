import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../css/ediciones.css';

const EdicionesHistoria = () => {
  // Datos de las ediciones directamente en el componente
  const edicionesData = [
    {
      id: 1,
      version: "1.0",
      year: 2024,
      title: "El Inicio",
      fecha: "Marzo - Noviembre 2024",
      description: "La primera edición de Proyectando Vocaciones marcó el comienzo de nuestra misión de orientar a los jóvenes en su elección vocacional. Un evento pionero que sentó las bases para futuras ediciones.",
      objetivos: [
        "Proporcionar información clara sobre las carreras disponibles en la región",
        "Conectar a los jóvenes con profesionales del ámbito laboral",
        "Crear un espacio de interacción entre estudiantes y universidades"
      ],
      actividades: [
        {
          nombre: "Feria Vocacional",
          descripcion: "Stands informativos de 10 carreras profesionales con material interactivo"
        },
        {
          nombre: "Charlas Introductorias",
          descripcion: "Presentaciones generales sobre cada área profesional disponible"
        },
        {
          nombre: "Sesiones de Preguntas",
          descripcion: "Espacios de consulta personalizada con orientadores vocacionales"
        },
        {
          nombre: "Material Informativo",
          descripcion: "Distribución de folletos y guías de orientación vocacional"
        }
      ],
      estadisticas: [
        { numero: "200+", label: "Asistentes" },
        { numero: "10", label: "Carreras" },
        { numero: "5", label: "Instituciones" }
      ],
      imagenes: [
        "/ediciones/pv2.0-organizadores.jpg",
        "/ediciones/pv2.0-recorrido.jpg",
        "/ediciones/pv2.0-estudiantes.jpg",
        "/ediciones/pv2.0-general.jpg"
      ],
      isActive: false
    },
    {
      id: 2,
      version: "2.0",
      year: 2025,
      title: "Crecimiento",
      fecha: "22 de Febrebro del 2025",
      description: "Proyectando Vocaciones 2.0 fue un proyecto social de SEDIPRO UNT que tuvo como objetivo guiar a estudiantes preuniversitarios de colegios y academias de Trujillo en la elección informada de su futura carrera en la Universidad Nacional de Trujillo. Se llevó a cabo el 22 de febrero en las instalaciones de la UNT, donde los aspirantes realizaron un recorrido por el campus y asistieron a charlas vocacionales de tres carreras de su interés.",
      objetivos: [
        "Proporcionar información clara y actualizada sobre las diversas opciones profesionales y campos laborales.",
        "Facilitar el contacto entre estudiantes y profesionales de diferentes áreas a través de la feria vocacional.",
        "Inspirar a los estudiantes a perseguir carreras que contribuyan a su desarrollo personal y profesional.",
    
      ],
      actividades: [
        {
          nombre: "7:30 am - 8:40 am",
          descripcion: "Programa de bienvenida. Auditorio Nicolás Copérnico."
        },
        {
          nombre: "9:00 am - 10:30 am",
          descripcion: "Recorrido por la Universidad Nacional de Trujillo."
        },
        {
          nombre: "11:00 am - 11:45 am",
          descripcion: "1ª Charla vocacional"
        },
        {
          nombre: "12:00 pm - 12:45 pm",
          descripcion: "2ª Charla vocacional"
        },
        {
          nombre: "1:00 pm - 1:45 pm",
          descripcion: "3ª Charla vocacional"
        }
      ],
      estadisticas: [
        { numero: "500+", label: "Asistentes" },
        { numero: "25", label: "Carreras" },
        { numero: "12", label: "Profesionales" }
      ],
      imagenes: [
        "/ediciones/pv2.0-organizadores.jpg",
        "/ediciones/pv2.0-recorrido.jpg",
        "/ediciones/pv2.0-estudiantes.jpg",
        "/ediciones/pv2.0-general.jpg"
      ],
      isActive: false
    },
    {
      id: 3,
      version: "3.0",
      year: 2026,
      title: "Expansión Total",
      fecha: "Marzo - Noviembre 2026",
      description: "Proyectando Vocaciones 3.0 fue un proyecto social de SEDIPRO UNT que tuvo como objetivo orientar a estudiantes preuniversitarios de Trujillo en la elección adecuada de su futura carrera en la Universidad Nacional de Trujillo. Se llevó a cabo el sábado 28 de febrero en las instalaciones de la UNT, donde los aspirantes realizaron un recorrido por la universidad, participaron en ferias vocacionales y asistieron a charlas informativas sobre 2 o 3 carreras de su interés.",
      objetivos: [
        "Ofrecer datos precisos y actuales sobre las carreras y oportunidades laborales del mercado",
        "Propiciar intercambios significativos entre estudiantes y referentes de cada sector.",
        "Alentar a los estudiantes a elegir carreras que los realicen tanto a nivel personal como profesional.",
        "Acompañar la elección universitaria de los estudiantes, alineando intereses y aptitudes con su proyección profesional.",
      ],
      actividades: [
        {
          nombre: "8:30 am - 9:45 am",
          descripcion: "ecorrido por la Universidad Nacional de Trujillo."
        },
        {
          nombre: "8:50 am - 10:30 am",
          descripcion: "Feria vocacional de las carreras universitarias"
        },
        {
          nombre: "10:30 am - 11:15 am",
          descripcion: "1ª Charla vocacional"
        },
        {
          nombre: "11:45 am - 12:30 pm",
          descripcion: "2ª Charla vocacional"
        },
        {
          nombre: "1:00 pm - 1:45 pm",
          descripcion: "3ª Charla vocacional"
        }
      ],
      estadisticas: [
        { numero: "1000+", label: "Asistentes" },
        { numero: "35+", label: "Carreras" },
        { numero: "20+", label: "Profesionales" }
      ],
      imagenes: [
        "/ediciones/pv2.0-organizadores.jpg",
        "/ediciones/pv2.0-recorrido.jpg",
        "/ediciones/pv2.0-estudiantes.jpg",
        "/ediciones/pv2.0-general.jpg"
      ],
      isActive: true
    }
  ];

  const [selectedEdition, setSelectedEdition] = useState(edicionesData[edicionesData.length - 1]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Funciones del carrusel
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === selectedEdition.imagenes.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedEdition.imagenes.length - 1 : prev - 1
    );
  };

  // Reset del índice de imagen al cambiar de edición
  const handleEditionChange = (edicion) => {
    setSelectedEdition(edicion);
    setCurrentImageIndex(0);
  };

  return (
    <div className="ediciones-page">
      {/* Header Section */}
      <div className="ediciones-header">
        <motion.p 
          className="ediciones-subtitle"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          NUESTRA HISTORIA
        </motion.p>
        <motion.h1 
          className="ediciones-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Ediciones <span className="ediciones-title-highlight">Anteriores</span>
        </motion.h1>
        <motion.p 
          className="ediciones-description"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Cada edición ha sido un paso más en nuestra misión de guiar a los jóvenes hacia su futuro profesional.
        </motion.p>
      </div>

      {/* Timeline Navigation */}
      <div className="timeline-wrapper">
        <div className="timeline-navigation">
          <div className="timeline-line-bg"></div>
          
          {edicionesData.map((edicion, index) => (
            <div key={edicion.id} className="timeline-point-wrapper">
              <motion.button
                className={`timeline-point ${selectedEdition.id === edicion.id ? 'active' : ''}`}
                onClick={() => handleEditionChange(edicion)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="timeline-dot"></div>
                {edicion.isActive && (
                  <span className="timeline-badge">ACTUAL</span>
                )}
              </motion.button>
              
              <motion.div 
                className="timeline-label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              >
                <div className="timeline-year">{edicion.year}</div>
                <div className="timeline-version">Versión {edicion.version}</div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Contenido de la edición seleccionada */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedEdition.id}
          className="edition-full-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header con fecha */}
          <div className="edition-content-header">
            <motion.div 
              className="edition-tag"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {selectedEdition.fecha}
            </motion.div>
            
            <motion.h2 
              className="edition-main-title"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Proyectando Vocaciones {selectedEdition.version}
            </motion.h2>

            <motion.h3 
              className="edition-subtitle"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              {selectedEdition.title}
            </motion.h3>
          </div>

          {/* Grid de contenido */}
          <div className="edition-grid">
            {/* Columna izquierda - Información */}
            <div className="edition-info-column">
              {/* 1. Descripción del Proyecto */}
              <motion.div 
                className="info-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <h4 className="section-title">
                  <span className="section-number">01</span>
                  Descripción del Proyecto
                </h4>
                <p className="section-text">{selectedEdition.description}</p>
              </motion.div>

              {/* Estadísticas */}
              <motion.div 
                className="stats-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                {selectedEdition.estadisticas.map((stat, idx) => (
                  <div key={idx} className="stat-card">
                    <div className="stat-number">{stat.numero}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* 2. Objetivos */}
              <motion.div 
                className="info-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <h4 className="section-title">
                  <span className="section-number">02</span>
                  Objetivos
                </h4>
                <ul className="objectives-list">
                  {selectedEdition.objetivos.map((objetivo, idx) => (
                    <motion.li 
                      key={idx} 
                      className="objective-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 + (idx * 0.1) }}
                    >
                      <span className="objective-icon">🎯</span>
                      <span>{objetivo}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* 3. Actividades Realizadas */}
              <motion.div 
                className="info-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <h4 className="section-title">
                  <span className="section-number">03</span>
                  Actividades Realizadas
                </h4>
                <div className="activities-grid">
                  {selectedEdition.actividades.map((actividad, idx) => (
                    <motion.div 
                      key={idx} 
                      className="activity-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.9 + (idx * 0.1) }}
                    >
                      <h5 className="activity-name">{actividad.nombre}</h5>
                      <p className="activity-description">{actividad.descripcion}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Columna derecha - Carrusel de imágenes */}
            <div className="edition-carousel-column">
              <motion.div 
                className="carousel-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="carousel-wrapper">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={selectedEdition.imagenes[currentImageIndex]}
                      alt={`${selectedEdition.title} - Imagen ${currentImageIndex + 1}`}
                      className="carousel-image"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                    />
                  </AnimatePresence>

                  {/* Botones de navegación */}
                  <button 
                    className="carousel-button carousel-button-prev"
                    onClick={prevImage}
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    className="carousel-button carousel-button-next"
                    onClick={nextImage}
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight size={24} />
                  </button>

                  {/* Indicadores */}
                  <div className="carousel-indicators">
                    {selectedEdition.imagenes.map((_, idx) => (
                      <button
                        key={idx}
                        className={`indicator ${idx === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(idx)}
                        aria-label={`Ir a imagen ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Contador */}
                  <div className="carousel-counter">
                    {currentImageIndex + 1} / {selectedEdition.imagenes.length}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EdicionesHistoria;