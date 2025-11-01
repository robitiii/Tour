import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        {/* ============================= */}
        {/* HEADER TEXT */}
        {/* ============================= */}
        <h2 className="about-heading">About ADM Travels</h2>
        <div className="gold-divider"></div>
        <p className="about-subheading">
          Your trusted partner for unforgettable Cape Town experiences
        </p>

        {/* ============================= */}
        {/* ABOUT INTRO TEXT */}
        {/* ============================= */}
        <div className="about-text">
          <p className="about-paragraph">
            Welcome to <strong>ADM Travels</strong> — your Cape Town travel specialist dedicated to crafting
            breathtaking, personalized adventures. From scenic drives to Table Mountain’s peak to tranquil
            wine tours and cultural journeys, we bring South Africa’s Mother City to life.
          </p>
          <p className="about-paragraph">
            With deep local knowledge and years of experience, our mission is to turn your travels into
            lasting memories, built on authenticity, passion, and the spirit of discovery.
          </p>
        </div>

        {/* ============================= */}
        {/* HERO IMAGE SHOWCASE */}
        {/* ============================= */}
        <div className="about-image-wrapper fade-in">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600"
            alt="Cape Town coastal view"
            className="about-hero-image"
          />
        </div>

        {/* ============================= */}
        {/* TESTIMONIALS & REVIEWS */}
        {/* ============================= */}
        <div className="reviews-section">
          <h3 className="reviews-heading">What Our Travelers Say</h3>
          <div className="reviews-grid">
            {/* GOOGLE REVIEWS */}
            <div className="review-card google-review fade-in">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                alt="Google Reviews"
                className="review-logo"
              />
              <p className="review-text">
                ⭐⭐⭐⭐⭐ <br />
                “The best tour experience we’ve ever had! Professional, friendly, and knowledgeable — ADM
                Travels made our Cape Town adventure unforgettable.”
              </p>
              <span className="review-author">— Sarah T., Google Reviews</span>
            </div>

            {/* TRIPADVISOR REVIEWS */}
            <div className="review-card tripadvisor-review fade-in">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/23/TripAdvisor_Logo_circle-green_vertical-lockup_registered.svg"
                alt="TripAdvisor Reviews"
                className="review-logo"
              />
              <p className="review-text">
                ⭐⭐⭐⭐⭐ <br />
                “Highly recommend ADM Travels! Great service and attention to detail. We felt safe and
                inspired throughout our stay in Cape Town.”
              </p>
              <span className="review-author">— David M., TripAdvisor</span>
            </div>
          </div>

          {/* CALL TO ACTION */}
          <div className="review-cta">
            <a
              href="https://www.google.com/maps/place/ADM+Travels"
              target="_blank"
              rel="noopener noreferrer"
              className="review-button"
            >
              Read More on Google
            </a>
            <a
              href="https://www.tripadvisor.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="review-button"
            >
              View TripAdvisor Reviews
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
