import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PaystackButton } from 'react-paystack';
import '../styles/TourModal.css';

const TourModal = ({ tour, isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [guests, setGuests] = useState(1);

  const publicKey = 'pk_test_e2780265954734e5655a5f40762183a906a8c172'; // Replace with your actual Paystack key
  const amount = parseFloat(tour?.price?.replace('$', '') || 0) * 100;
  const email = 'customer@example.com'; // Replace dynamically later

  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose();
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Debug: Check data being passed in
  console.log('Modal Open:', isOpen, 'Tour Data:', tour);

  if (!isOpen) return null; // Do not render at all when closed
  if (!tour) return null; // Ensure tour exists before rendering

  const paystackConfig = {
    email,
    amount,
    metadata: {
      tourName: tour.name,
      tourCategory: tour.category,
      date: selectedDate?.toLocaleDateString(),
      guests,
    },
    publicKey,
    text: 'Confirm & Pay Securely',
    onSuccess: () => {
      alert('✅ Payment successful! Your booking has been confirmed.');
      onClose();
    },
    onClose: () => alert('Payment window closed.'),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="tour-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>

            {/* Tour Image */}
            <div className="modal-image-wrapper">
              <img
                src={
                  tour.images?.[0] ||
                  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
                }
                alt={tour.name}
                className="modal-image"
              />
            </div>

            {/* Scrollable Content */}
            <div className="modal-content">
              <h2 className="modal-title">{tour.name}</h2>
              <p className="modal-description">{tour.description}</p>

              <div className="price-tags">
                <span className="price-badge">{tour.price}</span>
                <span className="category-badge">{tour.category}</span>
              </div>

              {/* Booking Section */}
              <div className="booking-section visible-booking">
                <h3>Reserve Your Spot</h3>

                <div className="booking-fields">
                  <div className="booking-field">
                    <label>Select Date</label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      minDate={new Date()}
                      placeholderText="Choose your date"
                      className="date-picker"
                    />
                  </div>

                  <div className="booking-field">
                    <label>Guests</label>
                    <input
                      type="number"
                      min="1"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="guest-input"
                    />
                  </div>
                </div>

                <div className="booking-total">
                  <strong>Total:</strong> {tour.price} USD
                </div>

                {selectedDate ? (
                  <PaystackButton
                    {...paystackConfig}
                    className="PaystackButton"
                  />
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    Please select a date to continue.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TourModal;
