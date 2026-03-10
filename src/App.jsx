// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header        from './components/header';
import Footer        from './components/footer';
import ScrollToTop   from './components/ScrollToTop';
import Home          from './pages/home';
import Carreras      from './pages/carrerras';
import Galeria       from './pages/galeria';
import GaleriaEdicion from './components/organizadores/GaleriaEdicion';
import Edicion       from './pages/ediciones';
import EdicionesHistoria from './pages/edicionesHistoria';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        {/* ── Rutas generales ─────────────────────────────────── */}
        <Route path="/"       element={<Home />} />
        <Route path="/home"   element={<Home />} />
        <Route path="/carreras" element={<Carreras />} />

        {/* ── Galería índice ──────────────────────────────────── */}
        <Route path="/galeria" element={<Galeria />} />

        {/* ── PV 3.0  (key fuerza remonte al cambiar edición) ────── */}
        <Route path="/galeria/pv3"            element={<GaleriaEdicion key="pv3" edicionId="pv3" />} />
        <Route path="/galeria/pv3/:seccionId" element={<GaleriaEdicion key="pv3" edicionId="pv3" />} />

        {/* ── PV 2.0 ──────────────────────────────────────────── */}
        <Route path="/galeria/pv2"            element={<GaleriaEdicion key="pv2" edicionId="pv2" />} />
        <Route path="/galeria/pv2/:seccionId" element={<GaleriaEdicion key="pv2" edicionId="pv2" />} />

        {/* ── PV 1.0 ──────────────────────────────────────────── */}
        <Route path="/galeria/pv1"            element={<GaleriaEdicion key="pv1" edicionId="pv1" />} />

        {/* ── Ediciones historia ──────────────────────────────── */}
        <Route path="/ediciones"           element={<EdicionesHistoria />} />
        <Route path="/ediciones/:version"  element={<Edicion />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;