import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PaystackButton } from 'react-paystack';
import '../styles/TourModal.css';

const TourModal = ({ tour, isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+27', // Default to South Africa
  });

  const publicKey = 'pk_test_e2780265954734e5655a5f40762183a906a8c172';
  const amount = Math.floor(parseFloat(tour?.price?.replace('$', '') || 0) * 100);

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

  if (!isOpen || !tour) return null;

  const isFormValid =
    formData.name.trim() !== '' &&
    /\S+@\S+\.\S+/.test(formData.email) &&
    formData.phone.trim() !== '' &&
    selectedDate;

    const paystackConfig = {
      email: formData.email,
      amount: Number(tour?.price?.toString().replace(/[^0-9.]/g, '') || 0) * 100,
      currency: 'ZAR', // or 'ZAR' if your dashboard supports it
      publicKey,
      metadata: {
        customer_name: formData.name,
        customer_phone: `${formData.countryCode}${formData.phone}`,
        tour_name: tour.name,
        tour_category: tour.category,
        date: selectedDate?.toLocaleDateString(),
        guests,
      },
      text: 'Confirm & Pay Securely',
      onSuccess: (ref) => {
        alert(`✅ Payment successful! Reference: ${ref.reference}`);
        console.log('Payment reference:', ref);
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

                {/* Personal Info */}
                <div className="booking-fields">
                  <div className="booking-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="booking-field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="booking-field">
                    <label>Phone Number</label>
                    <div className="phone-input-wrapper">
                      <select
                        className="country-code-select"
                        value={formData.countryCode}
                        onChange={(e) =>
                          setFormData({ ...formData, countryCode: e.target.value })
                        }
                      >
                        <option value="+1">🇺🇸 +1 (US)</option>
                        <option value="+27">🇿🇦 +27 (South Africa)</option>
                        <option value="+44">🇬🇧 +44 (UK)</option>
                        <option value="+234">🇳🇬 +234 (Nigeria)</option>
                        <option value="+61">🇦🇺 +61 (Australia)</option>
                        <option value="+91">🇮🇳 +91 (India)</option>
                        <option value="+49">🇩🇪 +49 (Germany)</option>
                        <option value="+33">🇫🇷 +33 (France)</option>
                        <option value="+81">🇯🇵 +81 (Japan)</option>
                        <option value="+971">🇦🇪 +971 (UAE)</option>
                        <option value="+55">🇧🇷 +55 (Brazil)</option>
                        <option value="+254">🇰🇪 +254 (Kenya)</option>
                      </select>

                      <input
                        type="tel"
                        placeholder="123 456 7890"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Date & Guests */}
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
                  <strong>Total:</strong> {tour.price} ZAR
                  console.log('Paystack config:', paystackConfig);
                </div>

                


                {/* Paystack button shows only when form is valid */}
                {isFormValid ? (
                  
                  <PaystackButton {...paystackConfig} className="PaystackButton" />
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    Please complete all details and select a date to continue.
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
