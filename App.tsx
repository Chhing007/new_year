
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TimerStatus } from './types';
import TimerDisplay from './components/TimerDisplay';
import Modal from './components/Modal';
import Confetti from './components/Confetti';
import Settings from './components/Settings';
import { SettingsIcon } from './components/Icons';

const App: React.FC = () => {
  const [status, setStatus] = useState<TimerStatus>(TimerStatus.Idle);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isTickingSoundEnabled, setIsTickingSoundEnabled] = useState(false);
  const [selectedSound, setSelectedSound] = useState('beep');

  const intervalRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const accentColor = 'text-amber-300';
  const buttonClass = 'bg-amber-400 hover:bg-amber-300 text-slate-900';

  const calculateTimeLeft = useCallback(() => {
    const now = new Date();

    // Get the current year in Cambodia's timezone (Asia/Phnom_Penh is UTC+7)
    // This avoids issues with clients in different timezones
    const yearFormatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Phnom_Penh',
        year: 'numeric'
    });
    const currentCambodiaYear = parseInt(yearFormatter.format(now), 10);
    const nextYearInCambodia = currentCambodiaYear + 1;

    // Create the target date for New Year in Cambodia using ISO 8601 format with timezone offset
    const newYearDate = new Date(`${nextYearInCambodia}-01-01T00:00:00+07:00`);

    // Calculate the difference from the client's current time
    const difference = newYearDate.getTime() - now.getTime();

    return Math.max(0, Math.floor(difference / 1000));
  }, []);

  const playAlertSound = useCallback((soundType: string) => {
    if (document.hidden || !isSoundEnabled) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const audioCtx = audioContextRef.current;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    const playNote = (frequency: number, startTime: number, duration: number) => {
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, startTime);
      gainNode.gain.setValueAtTime(0.5, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    const now = audioCtx.currentTime;

    switch (soundType) {
      case 'bell':
        playNote(987.77, now, 0.4); // B5
        break;
      case 'chime':
        playNote(523.25, now, 0.2); // C5
        playNote(783.99, now + 0.25, 0.3); // G5
        break;
      case 'beep':
      default:
        playNote(440, now, 0.5); // A4
        break;
    }
  }, [isSoundEnabled]);

  const playTickSound = useCallback(() => {
    if (document.hidden || !isSoundEnabled || !isTickingSoundEnabled) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const audioCtx = audioContextRef.current;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(100, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.05);
  }, [isSoundEnabled, isTickingSoundEnabled]);

  useEffect(() => {
    const initialSeconds = calculateTimeLeft();
    if (initialSeconds > 0) {
      setTimeLeft(initialSeconds);
      setStatus(TimerStatus.Running);
    } else {
      setTimeLeft(0);
      setStatus(TimerStatus.Idle);
      setIsModalOpen(true);
    }
  }, [calculateTimeLeft]);

  useEffect(() => {
    if (status === TimerStatus.Running) {
      intervalRef.current = window.setInterval(() => {
        playTickSound();
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setStatus(TimerStatus.Idle);
            setIsModalOpen(true);
            playAlertSound(selectedSound);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status, playAlertSound, selectedSound, playTickSound]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-4 overflow-hidden">
      {isModalOpen && <Confetti />}
      <div className={`w-full max-w-2xl mx-auto bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 space-y-8 z-10 relative transition-all duration-500 border ${status === TimerStatus.Running ? `animate-pulse-glow ${accentColor}` : 'border-slate-700'}`}>
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className={`absolute top-4 right-4 text-slate-500 hover:${accentColor.replace('text-','hover:text-')} transition-colors`}
          aria-label="Open settings"
        >
          <SettingsIcon />
        </button>

        {isSettingsOpen && (
          <Settings
            selectedSound={selectedSound}
            onSoundChange={setSelectedSound}
            isSoundEnabled={isSoundEnabled}
            onSoundToggle={setIsSoundEnabled}
            isTickingSoundEnabled={isTickingSoundEnabled}
            onTickingSoundToggle={setIsTickingSoundEnabled}
            onClose={() => setIsSettingsOpen(false)}
          />
        )}

        <h1 className={`text-3xl md:text-5xl font-bold text-center tracking-wider transition-colors duration-500 ${accentColor}`}>
          New Year Countdown
        </h1>
        
        <TimerDisplay seconds={timeLeft} />
        
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        accentColor={accentColor}
        buttonClass={buttonClass}
      />
    </div>
  );
};

export default App;
