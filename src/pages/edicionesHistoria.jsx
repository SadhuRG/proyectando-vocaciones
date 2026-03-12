import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, GraduationCap } from 'lucide-react';
import '../css/ediciones.css';
import { editionsData } from '../data/editionsData';
// componentes de organizadores
import StaticTeam from '../components/organizadores/StaticTeam';
import InfiniteSlider from '../components/organizadores/InfiniteSlider';
import PixelTransition from '../components/organizadores/PixelTransition';
import '../css/organizadores/Organizadores.css';

const EdicionesHistoria = () => {
    const [selectedEdition, setSelectedEdition] = useState(editionsData[editionsData.length - 1]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showCarrerasModal, setShowCarrerasModal] = useState(false);
    // bloquear el modal al scrollear
    useEffect(() => {
        if (!showCarrerasModal) return;

        const html = document.documentElement;
        const body = document.body;

        const prevHtmlOverflow = html.style.overflow;
        const prevBodyOverflow = body.style.overflow;

        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';

        return () => {
            html.style.overflow = prevHtmlOverflow;
            body.style.overflow = prevBodyOverflow;
        };
        }, [showCarrerasModal]);

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

    const handleEditionChange = (edicion) => {
        setSelectedEdition(edicion);
        setCurrentImageIndex(0);
        setShowCarrerasModal(false);
    };

    return (
        <div
            className="ediciones-page"
            data-edition={selectedEdition.version}
        >
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

                    {editionsData.map((edicion, index) => (
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

                        <motion.div
                            className="edition-main-title"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            <PixelTransition
                                firstContent={
                                    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" }}>
                                        <img src={selectedEdition.logo} alt="Logo Proyectando Vocaciones" style={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain" }} />
                                    </div>
                                }
                                secondContent={
                                    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" }}>
                                        <img src={selectedEdition.todos} alt="Logo Proyectando Vocaciones" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                                    </div>
                                }
                                gridSize={10}
                                pixelColor="#ffffff"
                                animationStepDuration={0.4}
                                aspectRatio="35%"
                                style={{ width: '100%', maxWidth: '800px', margin: '0 auto', background: '#ffffff', border: 'none' }}
                            />
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
                        {/* Columna izquierda */}
                        <div className="edition-info-column">

                            {/* 01. Descripción */}
                            <motion.div className="info-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}>
                                <h4 className="section-title">
                                    <span className="section-number">01</span>
                                    Descripción del Proyecto
                                </h4>
                                <p className="section-text">{selectedEdition.description}</p>
                            </motion.div>

                            {/* Estadísticas */}
                            <motion.div className="stats-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}>
                                {selectedEdition.estadisticas.map((stat, idx) => (
                                    <div key={idx} className="stat-card">
                                        <div className="stat-number">{stat.numero}</div>
                                        <div className="stat-label">{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>

                            {/* 02. Aliados */}
                            <motion.div className="info-section aliados-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.55 }}>
                                <h4 className="section-title">
                                    <span className="section-number">02</span>
                                    Aliados
                                </h4>
                                <div className="aliados-track-wrapper">
                                    <div className="aliados-track">
                                        {[...selectedEdition.aliados, ...selectedEdition.aliados].map((logo, idx) => (
                                            <div key={idx} className="aliado-logo-card">
                                                <img src={logo.src} alt={logo.nombre} className="aliado-logo-img" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* 03. Carreras - Botón modal */}
                            <motion.div className="info-section carreras-preview-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.58 }}>
                                <h4 className="section-title">
                                    <span className="section-number">03</span>
                                    Carreras Participantes
                                </h4>
                                <p className="section-text carreras-preview-text">
                                    En esta edición participaron <strong>{selectedEdition.carreras?.length || 0} carreras</strong> de la Universidad Nacional de Trujillo. Conoce cada una de ellas y descubre el mundo de oportunidades que te espera.
                                </p>
                                <motion.button
                                    className="carreras-btn"
                                    onClick={() => setShowCarrerasModal(true)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <GraduationCap size={20} />
                                    <span>Ver las {selectedEdition.carreras?.length || 0} carreras participantes</span>
                                    <span className="carreras-btn-arrow">→</span>
                                </motion.button>
                            </motion.div>

                            {/* 04. Objetivos */}
                            <motion.div className="info-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6 }}>
                                <h4 className="section-title">
                                    <span className="section-number">04</span>
                                    Objetivos
                                </h4>
                                <ul className="objectives-list">
                                    {selectedEdition.objetivos.map((objetivo, idx) => (
                                        <motion.li key={idx} className="objective-item" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.7 + (idx * 0.1) }}>
                                            <span className="objective-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M12 13V2l8 4-8 4" /><path d="M20.561 10.222a9 9 0 1 1-12.55-5.29" /><path d="M8.002 9.997a5 5 0 1 0 8.9 2.02" />
                                                </svg>
                                            </span>
                                            <span>{objetivo}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* 05. Actividades */}
                            <motion.div className="info-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.8 }}>
                                <h4 className="section-title">
                                    <span className="section-number">05</span>
                                    Actividades Realizadas
                                </h4>
                                <div className="activities-grid">
                                    {selectedEdition.actividades.map((actividad, idx) => (
                                        <motion.div key={idx} className="activity-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.9 + (idx * 0.1) }}>
                                            <h5 className="activity-name">{actividad.nombre}</h5>
                                            <p className="activity-description">{actividad.descripcion}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* 06. Equipo Organizador */}
                            <motion.div className="info-section organizadores-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 1.0 }}>
                                <h4 className="section-title">
                                    <span className="section-number">06</span>
                                    Equipo Organizador
                                </h4>
                                <p className="area-description_edicion">
                                    Talento humano que hizo posible la realización de Proyectando Vocaciones {selectedEdition.version}, gracias al compromiso, esfuerzo y dedicación de cada uno.
                                </p>
                                {selectedEdition.organizadores.map((area, index) => (
                                    <section key={index} className="area-section_edicion">
                                        <div className="area-title-wrapper">
                                            <h5 className="area-title_edicion">{area.area}</h5>
                                            <p className="area-description_edicion">{area.description}</p>
                                        </div>
                                        {area.area.toLowerCase().includes("dirección") || area.members.length <= 2 ? (
                                            <StaticTeam members={area.members} />
                                        ) : (
                                            <InfiniteSlider members={area.members} duration={area.members.length * 5} />
                                        )}
                                    </section>
                                ))}
                            </motion.div>
                        </div>

                        {/* Columna derecha - Carrusel de imágenes */}
                        <div className="edition-carousel-column">
                            <motion.div className="carousel-container_edicion" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
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
                                    <button className="carousel-button carousel-button-prev" onClick={prevImage} aria-label="Imagen anterior"><ChevronLeft size={24} /></button>
                                    <button className="carousel-button carousel-button-next" onClick={nextImage} aria-label="Siguiente imagen"><ChevronRight size={24} /></button>
                                    <div className="carousel-indicators">
                                        {selectedEdition.imagenes.map((_, idx) => (
                                            <button key={idx} className={`indicator ${idx === currentImageIndex ? 'active' : ''}`} onClick={() => setCurrentImageIndex(idx)} aria-label={`Ir a imagen ${idx + 1}`} />
                                        ))}
                                    </div>
                                    <div className="carousel-counter">{currentImageIndex + 1} / {selectedEdition.imagenes.length}</div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* ===== MODAL CARRERAS ===== */}
            <AnimatePresence>
                {showCarrerasModal && (
                    <>
                        <motion.div
                            className="carreras-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setShowCarrerasModal(false)}
                        />
                        <motion.div
                            className="carreras-modal"
                            initial={{ opacity: 0, scale: 0.92, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 40 }}
                            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Header */}
                            <div className="carreras-modal-header">
                                <div className="carreras-modal-header-left">
                                    <div className="carreras-modal-icon">
                                        <GraduationCap size={22} />
                                    </div>
                                    <div>
                                        <h2 className="carreras-modal-title">Carreras Participantes</h2>
                                        <p className="carreras-modal-subtitle">Proyectando Vocaciones {selectedEdition.version} · {selectedEdition.fecha}</p>
                                    </div>
                                </div>
                                <button className="carreras-modal-close" onClick={() => setShowCarrerasModal(false)} aria-label="Cerrar">
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Contador */}
                            <div className="carreras-modal-count">
                                <span className="carreras-count-badge">{selectedEdition.carreras?.length || 0} carreras</span>
                                <p className="carreras-count-text">participaron en esta edición</p>
                            </div>

                            {/* Body scrolleable */}
                            <div
                                className="carreras-modal-body"
                                onWheel={(e) => e.stopPropagation()}
                                >
                                <div className="carreras-modal-grid">
                                    {(selectedEdition.carreras || []).map((carrera, idx) => (
                                        <motion.div
                                            key={idx}
                                            className="carrera-modal-card"
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.22, delay: idx * 0.035 }}
                                        >
                                            <div className="carrera-modal-logo">
                                                <img src={carrera.logo} alt={carrera.nombre} className="carrera-modal-img" />
                                            </div>
                                            <span className="carrera-modal-nombre">{carrera.nombre}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="carreras-modal-footer">
                                <button className="carreras-modal-btn-close" onClick={() => setShowCarrerasModal(false)}>
                                    Cerrar
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EdicionesHistoria;