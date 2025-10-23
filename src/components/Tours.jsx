import React from 'react';
import '../styles/Tours.css';

const Tours = () => {
  const tours = [
    {
      name: 'Cape Point / Cape of Good Hope',
      description: 'Visit the most south-western tip of Africa with breathtaking views.',
      category: 'nature'
    },
    {
      name: 'Penguins at Boulders Beach',
      description: "See the famous African Penguins up close in Simon's Town.",
      category: 'nature'
    },
    {
      name: 'Muizenberg Beach',
      description: "Enjoy Cape Town's iconic colorful beach huts and surf culture.",
      price: null,
      category: 'nature'
    },
    {
      name: 'Kalk Bay to See the Seals',
      description: 'Meet friendly seals at the harbor and explore local shops.',
      price: null,
      category: 'nature'
    },
    {
      name: "Simon's Town",
      description: 'Charming naval town rich in history and seaside charm.',
      price: null,
      category: 'nature'
    },
    {
      name: 'Cape Point Vineyard',
      description: 'Enjoy wine tasting with spectacular mountain and ocean views.',
      price: null,
      category: 'nature'
    },
    {
      name: "Chapman's Peak Drive for Sunset",
      description: "Take one of the world's most scenic coastal drives at golden hour.",
      price: null,
      category: 'nature'
    },
    {
      name: 'Table Mountain Cableway',
      description: "Ride to the top of Cape Town's most famous landmark.",
      price: null,
      category: 'nature'
    },
    {
      name: 'Robben Island Tour',
      description: "Visit Nelson Mandela's prison and learn about South Africa's history.",
      price: null,
      category: 'cultural'
    },
    {
      name: 'Bo-Kaap Cultural Walk',
      description: 'Explore colorful houses and taste Cape Malay cuisine.',
      price: null,
      category: 'cultural'
    },
    {
      name: 'District Six Museum',
      description: "Discover the moving history of Cape Town's apartheid era.",
      price: null,
      category: 'cultural'
    },
    {
      name: 'Castle of Good Hope',
      description: "Step into South Africa's oldest surviving colonial building.",
      price: null,
      category: 'cultural'
    },
    {
      name: "Company's Garden",
      description: "Relax in Cape Town's historical park surrounded by museums.",
      price: null,
      category: 'cultural'
    },
    {
      name: 'City Tours',
      description: 'Experience the beauty and culture of Cape Town with our guided city tours.',
      price: null,
      category: 'city'
    },
    {
      name: 'V&A Waterfront',
      description: 'Shop, dine, and enjoy entertainment by the harbor.',
      price: null,
      category: 'city'
    },
    {
      name: 'Camps Bay & Clifton Beaches',
      description: 'Luxurious white-sand beaches and oceanfront restaurants.',
      price: null,
      category: 'city'
    },
    {
      name: 'Hout Bay Cruise',
      description: 'Boat trip to Seal Island and local markets.',
      price: null,
      category: 'city'
    },
    {
      name: 'Tea Tasting Experience',
      description: "Relax and sample Cape Town's finest local and imported teas.",
      price: null,
      category: 'tasting'
    },
    {
      name: 'Chocolate Tasting Experience',
      description: 'Indulge in artisanal chocolates made from African cocoa.',
      price: null,
      category: 'tasting'
    },
    {
      name: 'Stellenbosch Wine Route',
      description: 'Enjoy a day in the winelands with premium tastings.',
      price: null,
      category: 'tasting'
    },
    {
      name: 'Helicopter Scenic Flight',
      description: 'See Table Mountain and the coastline from the sky.',
      price: null,
      category: 'adventure'
    },
    {
      name: 'Shark Cage Diving (Gansbaai)',
      description: 'Get close to great white sharks — safely and thrillingly.',
      price: null,
      category: 'adventure'
    },
    {
      name: 'Safari Day Trip',
      description: 'See the Big Five on a full-day safari from Cape Town.',
      price: null,
      category: 'adventure'
    }
  ];

  return (
    <section id="tours" className="tours-section">
      <div className="tours-container">
        <h2 className="tours-heading">Explore Our Tours & Experiences</h2>
        <p className="tours-subheading">
          Discover the best of Cape Town with our curated selection of tours and activities
        </p>
        <div className="tours-grid">
          {tours.map((tour, index) => (
            <div key={index} className="tour-card fade-in">
              <div className="tour-content">
                <h3 className="tour-name">{tour.name}</h3>
                <p className="tour-description">{tour.description}</p>
                {tour.price && <p className="tour-price">{tour.price}</p>}
                <button className="tour-button">Book Tour</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tours;
