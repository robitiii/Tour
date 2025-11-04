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
  const [errors, setErrors] = useState({});

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

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

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        countryCode: '+27',
      });
      setSelectedDate(null);
      setGuests(1);
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen || !tour) return null;

  // Validation function that returns error object
  const validateForm = () => {
    const validationErrors = {};

    // Check name
    if (!formData.name.trim()) {
      validationErrors.name = 'Full name is required';
    }

    // Check email - more strict validation
    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      validationErrors.email = 'Email address is required';
    } else {
      // Check for spaces (invalid in email)
      if (/\s/.test(trimmedEmail)) {
        validationErrors.email = 'Email address cannot contain spaces';
      }
      // Better email regex: must have valid format with no spaces
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        validationErrors.email = 'Please enter a valid email address (e.g., name@example.com)';
      }
      // Additional check: must have at least one character before @, domain name, and TLD
      else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
        validationErrors.email = 'Please enter a valid email address with proper domain format';
      }
    }

    // Check phone
    if (!formData.phone.trim()) {
      validationErrors.phone = 'Phone number is required';
    }

    // Check date
    if (!selectedDate) {
      validationErrors.date = 'Please select a date';
    }

    // Check guests - must be a number >= 1
    const guestsNum = Number(guests);
    if (isNaN(guestsNum) || guestsNum < 1 || !Number.isInteger(guestsNum)) {
      validationErrors.guests = 'Guests must be a whole number greater than or equal to 1';
    }

    return validationErrors;
  };

  // Form is valid if no errors exist
  const isFormValid = Object.keys(validateForm()).length === 0;

  // Calculate price: Extract base price and multiply by number of guests
  const basePrice = Number(tour?.price?.toString().replace(/[^0-9.]/g, '') || 0);
  const totalPrice = basePrice * guests;
  
  // Format price for display (with currency symbol)
  const formatPrice = (amount) => {
    return `R${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const paystackConfig = {
    email: formData.email.trim(),
    amount: Math.round(totalPrice * 100), // Paystack expects amount in cents/kobo
    currency: 'ZAR',
    publicKey,
    metadata: {
      customer_name: formData.name,
      customer_phone: `${formData.countryCode}${formData.phone}`,
      tour_name: tour.name,
      tour_category: tour.category,
      date: selectedDate?.toLocaleDateString(),
      guests,
      base_price: basePrice,
      total_price: totalPrice,
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
                <span className="price-badge">{tour.price} per person</span>
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
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        // Clear error when user starts typing
                        if (errors.name) {
                          setErrors({ ...errors, name: '' });
                        }
                      }}
                      onBlur={() => {
                        const validationErrors = validateForm();
                        setErrors({ ...errors, name: validationErrors.name || '' });
                      }}
                      className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="booking-field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        // Remove spaces from email input
                        const emailValue = e.target.value.replace(/\s/g, '');
                        setFormData({ ...formData, email: emailValue });
                        // Clear error when user starts typing
                        if (errors.email) {
                          setErrors({ ...errors, email: '' });
                        }
                      }}
                      onBlur={() => {
                        // Trim whitespace on blur
                        const trimmedEmail = formData.email.trim();
                        if (trimmedEmail !== formData.email) {
                          setFormData({ ...formData, email: trimmedEmail });
                        }
                        const validationErrors = validateForm();
                        setErrors({ ...errors, email: validationErrors.email || '' });
                      }}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
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
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          // Clear error when user starts typing
                          if (errors.phone) {
                            setErrors({ ...errors, phone: '' });
                          }
                        }}
                        onBlur={() => {
                          const validationErrors = validateForm();
                          setErrors({ ...errors, phone: validationErrors.phone || '' });
                        }}
                        className={errors.phone ? 'error' : ''}
                      />
                    </div>
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                </div>

                {/* Date & Guests */}
                <div className="booking-fields">
                  <div className="booking-field">
                    <label>Select Date</label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                        // Clear error when date is selected
                        if (errors.date) {
                          setErrors({ ...errors, date: '' });
                        }
                      }}
                      minDate={new Date()}
                      placeholderText="Choose your date"
                      className={`date-picker ${errors.date ? 'error' : ''}`}
                    />
                    {errors.date && <span className="error-message">{errors.date}</span>}
                  </div>

                  <div className="booking-field">
                    <label>Guests</label>
                    <input
                      type="number"
                      min="1"
                      value={guests}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setGuests(value);
                        // Clear error when user starts typing
                        if (errors.guests) {
                          setErrors({ ...errors, guests: '' });
                        }
                      }}
                      onBlur={() => {
                        const validationErrors = validateForm();
                        setErrors({ ...errors, guests: validationErrors.guests || '' });
                      }}
                      className={`guest-input ${errors.guests ? 'error' : ''}`}
                    />
                    {errors.guests && <span className="error-message">{errors.guests}</span>}
                  </div>
                </div>

                <div className="booking-total">
                  <div className="price-breakdown">
                    <div className="price-line">
                      <span>Base Price (per person):</span>
                      <span>{formatPrice(basePrice)}</span>
                    </div>
                    <div className="price-line">
                      <span>Number of Guests:</span>
                      <span>{guests}</span>
                    </div>
                    <div className="price-line total-line">
                      <strong>Total Amount:</strong>
                      <strong>{formatPrice(totalPrice)}</strong>
                    </div>
                  </div>
                </div>

                


                {/* Paystack button shows only when form is valid */}
                {isFormValid ? (
                  <PaystackButton {...paystackConfig} className="PaystackButton" />
                ) : (
                  <div className="validation-message">
                    <p>Please complete all required fields to continue:</p>
                    <ul>
                      {(() => {
                        const validationErrors = validateForm();
                        return Object.keys(validationErrors).map((key) => (
                          <li key={key}>{validationErrors[key]}</li>
                        ));
                      })()}
                    </ul>
          </div>
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
