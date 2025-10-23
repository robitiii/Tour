import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          © {currentYear} ADM Travels | Explore Cape Town with us
        </p>
      </div>
    </footer>
  );
};

export default Footer;
