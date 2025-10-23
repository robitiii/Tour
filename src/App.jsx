import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Tours from './components/Tours';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Home />
      <Tours />
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
