import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categoryLabels, getCategories, getToursByCategory } from '../data/tours';
import TourModal from './TourModal';
import '../styles/Tour.css';

const Tours = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categories = getCategories();

  useEffect(() => {
    if (selectedCategory) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedCategory]);

  const handleCategorySelect = (category) => setSelectedCategory(category);
  const handleTourClick = (tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTour(null);
  };
  const handleBackToCategories = () => {
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="tours-page">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        {/* ========================= */}
        {/* HEADER SECTION */}
        {/* ========================= */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="page-heading">Explore Our Tours</h1>
          <div className="gold-divider"></div>
          <p className="page-subtext">
            Discover the beauty of Cape Town and South Africa with <span>ADM Travels</span>.
            Choose a category to browse our curated experiences.
          </p>
        </motion.div>

        {/* ========================= */}
        {/* CATEGORY OR TOUR SECTION */}
        {/* ========================= */}
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            // =========================
            // CATEGORY VIEW
            // =========================
            <motion.div
              key="categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex-wrapper">
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategorySelect(category)}
                    className="category-card"
                  >
                    <div className="emoji">
                      {category === 'nature' && '🌿'}
                      {category === 'cultural' && '🏛️'}
                      {category === 'city' && '🏙️'}
                      {category === 'tasting' && '🍷'}
                      {category === 'adventure' && '🚁'}
                    </div>
                    <h2>{categoryLabels[category]}</h2>
                    <p>{getToursByCategory(category).length} tours available</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            // =========================
            // TOURS VIEW (AFTER CATEGORY SELECT)
            // =========================
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Top Back Button */}
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleBackToCategories}
                className="back-btn centered"
              >
                ← Back to Categories
              </motion.button>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                {categoryLabels[selectedCategory]} Tours
              </h2>

              {/* Tour Cards */}
              <div className="tour-flex-wrapper">
                {getToursByCategory(selectedCategory).map((tour, index) => (
                  <motion.div
                    key={tour.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="tour-card"
                    onClick={() => handleTourClick(tour)}
                  >
                    <div className="tour-image">
                      <img
                        src={
                          tour.images?.[0] ||
                          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
                        }
                        alt={tour.name}
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800';
                        }}
                      />
                    </div>
                    <div className="tour-info">
                      <h3>{tour.name}</h3>
                      <p>{tour.description}</p>
                      <span className="details-link">View Details →</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Back Button */}
              <div className="bottom-back-btn-wrapper">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBackToCategories}
                  className="back-btn centered"
                >
                  ↑ Back to Categories
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================= */}
      {/* TOUR MODAL */}
      {/* ========================= */}
      <TourModal tour={selectedTour} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Tours;
