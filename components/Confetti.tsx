
import React from 'react';

const CONFETTI_COUNT = 150;
const COLORS = [
  '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', 
  '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', 
  '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', 
  '#ff5722', '#ffffff', '#b0bec5'
];

const Confetti: React.FC = () => {
  const confettiPieces = React.useMemo(() => {
    return Array.from({ length: CONFETTI_COUNT }).map((_, index) => {
      const style: React.CSSProperties = {
        left: `${Math.random() * 100}vw`,
        backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)],
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 3 + 5}s`,
        transform: `rotate(${Math.random() * 360}deg)`,
      };
      return <div key={index} className="confetti-piece" style={style} />;
    });
  }, []);

  return <div className="fixed inset-0 w-full h-full pointer-events-none z-50">{confettiPieces}</div>;
};

export default Confetti;
