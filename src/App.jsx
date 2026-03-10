import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/home';
import Carreras from './pages/carrerras';
import Galeria from './pages/galeria';
import Edicion from './pages/ediciones';
import EdicionesHistoria from './pages/edicionesHistoria';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/carreras" element={<Carreras />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/ediciones" element={<EdicionesHistoria />} />
        <Route path="/ediciones/:version" element={<Edicion />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;