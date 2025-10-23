import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tour: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        tour: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="contact-heading">Book Your Adventure</h2>
        <p className="contact-subheading">
          Get in touch with us to plan your perfect Cape Town experience
        </p>
        
        <div className="contact-content">
          <div className="contact-form-wrapper">
            {submitted ? (
              <div className="success-message fade-in">
                <h3>Thank you! We'll get back to you shortly.</h3>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tour">Select a Tour</label>
                  <select
                    id="tour"
                    name="tour"
                    value={formData.tour}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose a tour...</option>
                    <option value="cape-point">Cape Point / Cape of Good Hope</option>
                    <option value="penguins">Penguins at Boulders Beach</option>
                    <option value="table-mountain">Table Mountain Cableway</option>
                    <option value="robben-island">Robben Island Tour</option>
                    <option value="wine-route">Stellenbosch Wine Route</option>
                    <option value="safari">Safari Day Trip</option>
                    <option value="helicopter">Helicopter Scenic Flight</option>
                    <option value="other">Other / Custom Tour</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-button">
                  Send Inquiry
                </button>
              </form>
            )}
          </div>

          <div className="contact-info">
            <h3>Contact Information</h3>
            <div className="info-item">
              <span className="info-icon">📍</span>
              <p>Cape Town, South Africa</p>
            </div>
            <div className="info-item">
              <span className="info-icon">📞</span>
              <p>+27 82 123 4567</p>
            </div>
            <div className="info-item">
              <span className="info-icon">✉️</span>
              <p>info@admtravels.co.za</p>
            </div>
            <div className="social-links">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a href="#facebook" className="social-link">Facebook</a>
                <a href="#instagram" className="social-link">Instagram</a>
                <a href="#tiktok" className="social-link">TikTok</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
