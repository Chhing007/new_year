
import React from 'react';

const FIREWORK_COUNT = 25;
const PARTICLE_COUNT = 50;
const COLORS = [
  '#FFC700', '#FF0000', '#FF007F', '#F000FF', '#8000FF',
  '#0000FF', '#007FFF', '#00FFFF', '#00FF7F', '#00FF00',
  '#7FFF00', '#FFFF00', '#FFFFFF'
];

const Fireworks: React.FC = () => {
  const fireworks = React.useMemo(() => {
    return Array.from({ length: FIREWORK_COUNT }).map((_, index) => {
      const top = `${Math.random() * 80 + 10}%`;
      const left = `${Math.random() * 80 + 10}%`;
      const animationDelay = `${Math.random() * 8}s`;

      const particles = Array.from({ length: PARTICLE_COUNT }).map((_, pIndex) => {
        const angle = (pIndex / PARTICLE_COUNT) * 360;
        const radius = Math.random() * 100 + 50;
        const particleStyle: React.CSSProperties = {
          backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)],
          '--angle': `${angle}deg`,
          '--radius': `${radius}px`,
          animationDelay: `${Math.random() * 0.2}s`,
        } as React.CSSProperties;

        return <div key={pIndex} className="firework-particle" style={particleStyle}></div>
      });
      
      const fireworkStyle: React.CSSProperties = {
        top,
        left,
        animationDelay,
      };

      return <div key={index} className="firework" style={fireworkStyle}>{particles}</div>;
    });
  }, []);

  return <div className="fixed inset-0 w-full h-full pointer-events-none z-40">{fireworks}</div>;
};

export default Fireworks;