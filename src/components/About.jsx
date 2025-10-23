import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="about-heading">About ADM Travels</h2>
        <p className="about-subheading">
          Your trusted partner for unforgettable Cape Town experiences
        </p>
        
        <div className="about-content">
          <div className="about-text">
            <p className="about-paragraph">
              Welcome to <strong>ADM Travels</strong>, Cape Town's premier travel agency dedicated to showcasing 
              the extraordinary beauty, culture, and adventure that South Africa's Mother City has to offer.
            </p>
            <p className="about-paragraph">
              Based in the heart of Cape Town, we specialize in creating personalized travel experiences that 
              capture the essence of this magnificent destination. From the iconic Table Mountain to the 
              historic Robben Island, from pristine beaches to world-class wine estates, we bring you closer 
              to the very best of Cape Town.
            </p>
            <p className="about-paragraph">
              Our team of local experts possesses intimate knowledge of every hidden gem, cultural landmark, 
              and breathtaking vista. We don't just plan tours—we craft memories that last a lifetime.
            </p>
          </div>

          <div className="about-features">
            <div className="feature-card fade-in">
              <div className="feature-icon">🌍</div>
              <h3>Local Expertise</h3>
              <p>Born and raised in Cape Town, we know every corner of this beautiful city</p>
            </div>
            <div className="feature-card fade-in">
              <div className="feature-icon">✨</div>
              <h3>Tailored Experiences</h3>
              <p>Every journey is customized to match your interests and preferences</p>
            </div>
            <div className="feature-card fade-in">
              <div className="feature-icon">🤝</div>
              <h3>Trusted Service</h3>
              <p>Hundreds of satisfied travelers have explored Cape Town with us</p>
            </div>
            <div className="feature-card fade-in">
              <div className="feature-icon">🎯</div>
              <h3>Best Value</h3>
              <p>Premium experiences at competitive prices with no hidden costs</p>
            </div>
          </div>

          <div className="about-mission">
            <h3>Our Mission</h3>
            <p>
              To inspire and empower travelers from around the world to discover the magic of Cape Town 
              through authentic, sustainable, and enriching experiences that celebrate our diverse culture, 
              stunning natural beauty, and warm South African hospitality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
