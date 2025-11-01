import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Tours from './components/Tours';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        {/* Navbar rendered outside Routes to appear on all pages */}
        <Navbar />
        
        {/* Routes - each page is separate */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        
        {/* Footer rendered outside Routes to appear on all pages */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
