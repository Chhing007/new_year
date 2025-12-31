
import React, { useState, useEffect, useRef } from 'react';
import { wishes } from '../wishes';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
  buttonClass: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, accentColor, buttonClass }) => {
  const [wishIndex, setWishIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('animate-slide-in-bottom');
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      const intervalId = setInterval(() => {
        setAnimationClass('animate-slide-out-top');
        
        timeoutRef.current = window.setTimeout(() => {
          setWishIndex((prevIndex) => (prevIndex + 1) % wishes.length);
          setAnimationClass('animate-slide-in-bottom');
        }, 500); // Corresponds to the animation duration

      }, 3000);

      return () => {
        clearInterval(intervalId);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-xl shadow-2xl p-8 m-4 max-w-sm w-full text-center border border-slate-700 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={`text-3xl font-bold transition-colors duration-500 ${accentColor}`}>Happy New Year!</h2>
        <div className="mt-4 text-slate-300 h-12 flex items-center justify-center overflow-hidden">
            <p className={animationClass}>{wishes[wishIndex]}</p>
        </div>
        <button
          onClick={onClose}
          className={`mt-6 px-6 py-2 text-slate-900 font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 ${buttonClass}`}
        >
          Close
        </button>
      </div>
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in-scale {
          animation: fadeInScale 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Modal;
