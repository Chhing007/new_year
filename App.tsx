
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TimerStatus } from './types';
import TimerDisplay from './components/TimerDisplay';
import Confetti from './components/Confetti';
import Fireworks from './components/Fireworks';
import Settings from './components/Settings';
import WishBackground from './components/WishBackground';
import { SettingsIcon } from './components/Icons';
import { wishes } from './wishes';
import { themes, Theme } from './themes';

const App: React.FC = () => {
  const [status, setStatus] = useState<TimerStatus>(TimerStatus.Running);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isTickingSoundEnabled, setIsTickingSoundEnabled] = useState(false);
  const [selectedSound, setSelectedSound] = useState('beep');
  const [isCelebrationTime, setIsCelebrationTime] = useState(false);
  const [targetYear, setTargetYear] = useState(2026);
  
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.default);
  const [customWishes, setCustomWishes] = useState<string[]>([]);
  const [allWishes, setAllWishes] = useState<string[]>(wishes);

  const intervalRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const newYearDate = new Date(`2026-01-01T00:00:00+07:00`);
    const difference = newYearDate.getTime() - now.getTime();
    return Math.max(0, Math.floor(difference / 1000));
  }, []);

  useEffect(() => {
    try {
      const savedThemeKey = localStorage.getItem('countdown-theme') || 'default';
      setCurrentTheme(themes[savedThemeKey] || themes.default);

      const savedWishes = localStorage.getItem('custom-wishes');
      if (savedWishes) {
        const parsedWishes = JSON.parse(savedWishes);
        setCustomWishes(parsedWishes);
        setAllWishes([...wishes, ...parsedWishes]);
      }
    } catch (error) {
      console.error("Failed to load settings from localStorage:", error);
    }
    
    const initialSeconds = calculateTimeLeft();
    if (initialSeconds > 0) {
      setTimeLeft(initialSeconds);
      setStatus(TimerStatus.Running);
    } else {
      setTimeLeft(0);
      setStatus(TimerStatus.Idle);
      setIsCelebrationTime(true);
    }
  }, [calculateTimeLeft]);

  useEffect(() => {
    document.documentElement.style.setProperty('--gradient-bg', currentTheme.gradient);
    const themeKey = Object.keys(themes).find(key => themes[key].name === currentTheme.name) || 'default';
    localStorage.setItem('countdown-theme', themeKey);
  }, [currentTheme]);

  const playAlertSound = useCallback((soundType: string) => {
    if (document.hidden || !isSoundEnabled) return;
    if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const audioCtx = audioContextRef.current;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    const playNote = (frequency: number, startTime: number, duration: number) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.connect(g);
      g.connect(audioCtx.destination);
      o.type = 'sine';
      o.frequency.setValueAtTime(frequency, startTime);
      g.gain.setValueAtTime(0.5, startTime);
      g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      o.start(startTime);
      o.stop(startTime + duration);
    };
    const now = audioCtx.currentTime;
    if (soundType === 'bell') playNote(987.77, now, 0.4);
    else if (soundType === 'chime') { playNote(523.25, now, 0.2); playNote(783.99, now + 0.25, 0.3); }
    else playNote(440, now, 0.5);
  }, [isSoundEnabled]);

  const playTickSound = useCallback(() => {
    if (document.hidden || !isSoundEnabled || !isTickingSoundEnabled) return;
    if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const audioCtx = audioContextRef.current;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.connect(g);
    g.connect(audioCtx.destination);
    o.type = 'square';
    o.frequency.setValueAtTime(100, audioCtx.currentTime);
    g.gain.setValueAtTime(0.05, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    o.start(audioCtx.currentTime);
    o.stop(audioCtx.currentTime + 0.05);
  }, [isSoundEnabled, isTickingSoundEnabled]);

  useEffect(() => {
    if (status === TimerStatus.Running) {
      intervalRef.current = window.setInterval(() => {
        playTickSound();
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setStatus(TimerStatus.Idle);
            setIsCelebrationTime(true);
            playAlertSound(selectedSound);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [status, playAlertSound, selectedSound, playTickSound]);

  const handleAddWish = (wish: string) => {
    const updated = [...customWishes, wish];
    setCustomWishes(updated);
    setAllWishes([...wishes, ...updated]);
    localStorage.setItem('custom-wishes', JSON.stringify(updated));
  };

  const handleDeleteWish = (index: number) => {
    const updated = customWishes.filter((_, i) => i !== index);
    setCustomWishes(updated);
    setAllWishes([...wishes, ...updated]);
    localStorage.setItem('custom-wishes', JSON.stringify(updated));
  };
  
  const handleThemeChange = (themeName: string) => {
    const themeKey = Object.keys(themes).find(key => themes[key].name === themeName);
    if(themeKey) setCurrentTheme(themes[themeKey]);
  }

  const { accentColor } = currentTheme;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-4 overflow-hidden">
      {isCelebrationTime && (
        <>
          <WishBackground wishes={allWishes} />
          <Confetti key="confetti" />
          <Fireworks key="fireworks" />
        </>
      )}
      <div className={`w-full max-w-2xl mx-auto bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 space-y-8 z-10 relative transition-all duration-500 border ${status === TimerStatus.Running ? `animate-pulse-glow ${accentColor}` : 'border-slate-700'}`}>
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className={`absolute top-4 right-4 text-slate-500 hover:${accentColor.replace('text-','hover:text-')} transition-colors z-30`}
          aria-label="Open settings"
        >
          <SettingsIcon />
        </button>

        {isSettingsOpen && (
          <Settings
            selectedSound={selectedSound} onSoundChange={setSelectedSound}
            isSoundEnabled={isSoundEnabled} onSoundToggle={setIsSoundEnabled}
            isTickingSoundEnabled={isTickingSoundEnabled} onTickingSoundToggle={setIsTickingSoundEnabled}
            currentTheme={currentTheme} onThemeChange={handleThemeChange} themes={themes}
            customWishes={customWishes} onAddWish={handleAddWish} onDeleteWish={handleDeleteWish}
            onClose={() => setIsSettingsOpen(false)}
          />
        )}
        
        {isCelebrationTime ? (
          <div className="text-center animate-slide-in-bottom">
            <h1 className={`text-7xl md:text-9xl font-bold tracking-tighter transition-colors duration-500 ${accentColor} animate-breathing-glow`}>
              {targetYear}
            </h1>
            <h2 className={`text-2xl md:text-4xl font-semibold text-slate-300 -mt-2`}>
              Happy New Year!
            </h2>
          </div>
        ) : (
          <>
            <h1 className={`text-3xl md:text-5xl font-bold text-center tracking-wider transition-colors duration-500 ${accentColor} animate-breathing-glow`}>
              New Year Countdown
            </h1>
            <TimerDisplay seconds={timeLeft} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;