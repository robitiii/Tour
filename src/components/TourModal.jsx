import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PaystackButton } from 'react-paystack';
import '../styles/TourModal.css';

const TourModal = ({ tour, isOpen, onClose }) => {
  const [isBooking, setIsBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [guests, setGuests] = useState(1);

  const publicKey = 'pk_test_xxxxxxxxxxxxxxxxxxxxxx'; // Replace with your Paystack public key
  const amount = parseFloat(tour?.price?.replace('$', '') || 0) * 100;
  const email = 'customer@example.com'; // Replace with real user email when integrated

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

  if (!tour) return null;

  const paystackConfig = {
    email,
    amount,
    metadata: {
      name: tour.name,
      date: selectedDate?.toLocaleDateString(),
      guests,
    },
    publicKey,
    text: 'Confirm & Pay Securely',
    onSuccess: () => {
      alert('Payment successful! Your booking has been confirmed 🎉');
      onClose();
    },
    onClose: () => alert('Payment window closed.'),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Modal Box */}
          <motion.div
            className="modal-container bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col relative scrollbar-hide"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
            >
              ✕
            </button>

            {/* Image Section */}
            <div className="relative w-full h-72 md:h-[22rem] bg-gray-100">
              <img
                src={
                  tour.images?.[0] ||
                  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
                }
                alt={tour.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto modal-content p-6 md:p-8 pb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {tour.name}
              </h2>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {tour.description}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold text-sm">
                  {tour.price}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm capitalize">
                  {tour.category}
                </span>
              </div>

              {/* Booking Section */}
              {!isBooking ? (
                <div className="text-center mt-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsBooking(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Book Now
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  className="booking-section mt-6 border-t border-gray-200 pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    Confirm Your Booking
                  </h3>

                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 justify-center">
                    <div className="flex flex-col">
                      <label className="text-gray-700 font-medium mb-2">
                        Select Date
                      </label>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        minDate={new Date()}
                        placeholderText="Pick a date"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-56 text-center"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-gray-700 font-medium mb-2">
                        Guests
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-24 text-center"
                      />
                    </div>
                  </div>

                  <div className="text-lg font-semibold text-gray-900 mb-6 text-center">
                    Total: {tour.price}
                  </div>

                  {selectedDate ? (
                    <PaystackButton
                      {...paystackConfig}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
                    />
                  ) : (
                    <p className="text-sm text-gray-500 italic text-center">
                      Please select a date to continue.
                    </p>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TourModal;
