import React from 'react';
import '../styles/Home.css';

const Home = () => {
  const scrollToTours = () => {
    const toursSection = document.getElementById('tours');
    if (toursSection) {
      toursSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="home-section">
      <video className="home-video" autoPlay loop muted playsInline>
        <source src="/video-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="home-overlay"></div>
      <div className="home-content fade-in">
        <h1 className="home-heading">Discover Cape Town with ADM Travels</h1>
        <p className="home-subheading">Your adventure starts here</p>
        <button className="home-button" onClick={scrollToTours}>
          Explore Tours
        </button>
      </div>
    </section>
  );
};

export default Home;
