import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => scrollToSection('home')}>
          <div className="navbar-logo-inner">
            <img
              src="/logo.png"
              alt="ADM Travels logo placeholder"
              className="navbar-logo-img"
            />
            <span className="navbar-company-name">ADM Travels</span>
          </div>
        </div>
        <button
          className="navbar-burger"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={`burger-line ${mobileOpen ? 'open' : ''}`}></span>
          <span className={`burger-line ${mobileOpen ? 'open' : ''}`}></span>
          <span className={`burger-line ${mobileOpen ? 'open' : ''}`}></span>
        </button>

        <ul className={`navbar-menu ${mobileOpen ? 'open' : ''}`}>
          <li onClick={() => scrollToSection('home')}>Home</li>
          <li onClick={() => scrollToSection('tours')}>Tours</li>
          <li onClick={() => scrollToSection('services')}>Services</li>
          <li onClick={() => scrollToSection('about')}>About</li>
          <li onClick={() => scrollToSection('contact')}>Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
