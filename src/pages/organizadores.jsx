import { motion } from 'framer-motion';
import React from 'react';
import '../css/organizadores/Organizadores.css';
import { organizadoresData } from '../data/organizadoresData';
import PixelTransition from '../components/organizadores/PixelTransition';
import InfiniteSlider from '../components/organizadores/InfiniteSlider';
import StaticTeam from '../components/organizadores/StaticTeam';


export default function Organizadores() {
  return (
    <div className="org-container">
      <div className="org-header">
        <PixelTransition
          firstContent={
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" }}>
              <motion.h1
                className="org-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ margin: 0 }}
              >
                Equipo <span className="highlight-text">Organizador</span>
              </motion.h1>
              <p className="org-subtitle" style={{ marginTop: '1rem' }}>
                Talento humano moviendo los engranajes de Proyectando Vocaciones 3.0.
              </p>
            </div>
          }
          secondContent={
            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" }}>
              <img
                src="organizadores/foto-ejemplo.png"
                alt="Logo Proyectando Vocaciones"
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
            </div>
          }
          gridSize={10}
          pixelColor="#ffffff"
          animationStepDuration={0.4}
          aspectRatio="35%"
          style={{ width: '100%', maxWidth: '800px', margin: '0 auto', background: '#ffffff', border: 'none' }}
        />
      </div>

      {organizadoresData.map((area, index) => (
        <section key={index} className="area-section">
          <div className="area-title-wrapper">
            <div className="area-line"></div>
            <h2 className="area-title">{area.area}</h2>
            <p className="org-subtitle" style={{ fontSize: '0.9rem' }}>{area.description}</p>
          </div>

          {/* Si es Directora o tiene pocos miembros, es estático */}
          {area.area === "Directora" || area.members.length <= 2 ? (
            <StaticTeam members={area.members} />
          ) : (
            <InfiniteSlider
              members={area.members}
              duration={area.members.length * 5}
            />
          )}
        </section>
      ))}
    </div>
  );
}