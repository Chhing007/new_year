
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TimerStatus } from './types';
import TimerDisplay from './components/TimerDisplay';
import Modal from './components/Modal';
import Confetti from './components/Confetti';

const App: React.FC = () => {
  const [status, setStatus] = useState<TimerStatus>(TimerStatus.Idle);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const playAlertSound = useCallback(() => {
    if (document.hidden) return; // Don't play sound if tab is not active

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
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // A4 pitch
    gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5);
  }, []);

  const calculateTimeLeft = () => {
    const now = new Date();
    const nextYear = now.getFullYear() + 1;
    const newYearDate = new Date(`January 1, ${nextYear} 00:00:00`);
    const difference = newYearDate.getTime() - now.getTime();
    return Math.max(0, Math.floor(difference / 1000));
  };

  useEffect(() => {
    const initialSeconds = calculateTimeLeft();
    if (initialSeconds > 0) {
      setTimeLeft(initialSeconds);
      setStatus(TimerStatus.Running);
    } else {
      // It's already past New Year's for the current year
      setTimeLeft(0);
      setStatus(TimerStatus.Idle);
      setIsModalOpen(true);
    }
  }, []);


  useEffect(() => {
    if (status === TimerStatus.Running) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setStatus(TimerStatus.Idle);
            setIsModalOpen(true);
            playAlertSound();
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
  }, [status, playAlertSound]);

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col items-center justify-center font-sans text-white p-4 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 overflow-hidden">
      {isModalOpen && <Confetti />}
      <div className="w-full max-w-2xl mx-auto bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-6 md:p-8 space-y-8 z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-cyan-400 tracking-wider">
          New Year Countdown
        </h1>
        
        <TimerDisplay seconds={timeLeft} />
        
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-3xl font-bold text-cyan-400">Happy New Year!</h2>
        <p className="mt-2 text-slate-300">Wishing peace and joy to the entire world!</p>
      </Modal>
    </div>
  );
};

export default App;
