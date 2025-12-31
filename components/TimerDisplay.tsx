
import React from 'react';

interface TimerDisplayProps {
  seconds: number;
}

// A component to render a single digit with an animation on change
const AnimatedDigit: React.FC<{ digit: string }> = ({ digit }) => {
  return (
    <span key={digit} className="animate-tick">
      {digit}
    </span>
  );
};

// A component for a time segment (e.g., Days, Hours)
const TimeSegment: React.FC<{ value: string; label: string }> = ({ value, label }) => {
    const renderDigits = (timeString: string) => {
        return timeString.split('').map((digit, index) => (
          <AnimatedDigit key={`${timeString}-${digit}-${index}`} digit={digit} />
        ));
    };

    return (
        <div className="flex flex-col items-center">
            <div className="text-4xl md:text-7xl font-mono">
                {renderDigits(value)}
            </div>
            <div className="text-sm md:text-base text-slate-400 uppercase tracking-widest mt-2">
                {label}
            </div>
        </div>
    );
};

const TimerDisplay: React.FC<TimerDisplayProps> = ({ seconds }) => {
  const formatTime = (timeInSeconds: number) => {
    const d = Math.floor(timeInSeconds / (3600 * 24));
    const h = Math.floor((timeInSeconds % (3600 * 24)) / 3600);
    const m = Math.floor((timeInSeconds % 3600) / 60);
    const s = timeInSeconds % 60;

    return {
      days: String(d).padStart(2, '0'),
      hours: String(h).padStart(2, '0'),
      minutes: String(m).padStart(2, '0'),
      seconds: String(s).padStart(2, '0'),
    };
  };

  const { days, hours, minutes, seconds: secs } = formatTime(seconds);

  return (
    <div className="text-center font-mono select-none">
      <div className="flex justify-around items-center">
        <TimeSegment value={days} label="Days" />
        <span className="text-4xl md:text-6xl text-slate-600 pb-8">:</span>
        <TimeSegment value={hours} label="Hours" />
        <span className="text-4xl md:text-6xl text-slate-600 pb-8">:</span>
        <TimeSegment value={minutes} label="Minutes" />
        <span className="text-4xl md:text-6xl text-slate-600 pb-8">:</span>
        <TimeSegment value={secs} label="Seconds" />
      </div>
    </div>
  );
};

export default TimerDisplay;
