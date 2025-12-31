
import React from 'react';

// Define a set of soft, appealing colors for the wishes
const WISH_COLORS = [
  'rgba(255, 255, 255, 0.6)',
  'rgba(250, 250, 255, 0.6)',
  'rgba(240, 255, 255, 0.6)',
  'rgba(255, 245, 250, 0.6)',
];

interface WishBackgroundProps {
  wishes: string[];
}

const WishBackground: React.FC<WishBackgroundProps> = ({ wishes }) => {
  const renderedWishes = React.useMemo(() => {
    return wishes.map((wish, index) => {
      const style: React.CSSProperties = {
        // Start particles from just below the viewport
        top: '105vh', 
        left: `${Math.random() * 100}vw`,
        color: WISH_COLORS[Math.floor(Math.random() * WISH_COLORS.length)],
        '--sway': `${Math.random() * 8 - 4}vw`, // A random horizontal sway value
        '--r-start': `${Math.random() * 40 - 20}deg`, // A slight initial rotation
        animationDelay: `${Math.random() * 25}s`,
        animationDuration: `${Math.random() * 15 + 15}s`, // Duration between 15s and 30s
        fontSize: `${Math.random() * 10 + 14}px`,
      } as React.CSSProperties;

      return <span key={index} className="wish-particle" style={style}>{wish}</span>;
    });
  }, [wishes]);

  return <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">{renderedWishes}</div>;
};

export default WishBackground;