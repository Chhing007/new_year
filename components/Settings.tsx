
import React, { useState } from 'react';
import { Theme } from '../themes';

interface SettingsProps {
  selectedSound: string;
  onSoundChange: (sound: string) => void;
  isSoundEnabled: boolean;
  onSoundToggle: (enabled: boolean) => void;
  isTickingSoundEnabled: boolean;
  onTickingSoundToggle: (enabled: boolean) => void;
  onClose: () => void;
  currentTheme: Theme;
  onThemeChange: (themeName: string) => void;
  themes: Record<string, Theme>;
  customWishes: string[];
  onAddWish: (wish: string) => void;
  onDeleteWish: (index: number) => void;
}

const ToggleSwitch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void; disabled?: boolean }> = ({ checked, onChange, disabled = false }) => (
  <button
    role="switch" aria-checked={checked} onClick={() => onChange(!checked)} disabled={disabled}
    className={`${checked ? 'bg-cyan-500' : 'bg-slate-600'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed`}
  >
    <span className={`${checked ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
  </button>
);

const Settings: React.FC<SettingsProps> = ({ 
  selectedSound, onSoundChange, 
  isSoundEnabled, onSoundToggle, 
  isTickingSoundEnabled, onTickingSoundToggle,
  currentTheme, onThemeChange, themes,
  customWishes, onAddWish, onDeleteWish
}) => {
  const [newWish, setNewWish] = useState('');

  const handleAddClick = () => {
    if (newWish.trim()) {
      onAddWish(newWish.trim());
      setNewWish('');
    }
  };

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 z-20 space-y-4 overflow-y-auto">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-white border-b border-slate-700 pb-2">Sound</h3>
        <div className="flex items-center justify-between">
          <label className="text-slate-300">Enable Sound</label>
          <ToggleSwitch checked={isSoundEnabled} onChange={onSoundToggle} />
        </div>
        <div className="flex items-center justify-between">
          <label className={`text-slate-300 transition-opacity ${!isSoundEnabled ? 'opacity-50' : ''}`}>Ticking Sound</label>
          <ToggleSwitch checked={isTickingSoundEnabled} onChange={onTickingSoundToggle} disabled={!isSoundEnabled} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Alert Sound</label>
          <select value={selectedSound} onChange={(e) => onSoundChange(e.target.value)} disabled={!isSoundEnabled}
            className="w-full bg-slate-700 border border-slate-600 text-white rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50">
            <option value="beep">Beep</option>
            <option value="bell">Bell</option>
            <option value="chime">Chime</option>
          </select>
        </div>

        <h3 className="font-semibold text-lg text-white border-b border-slate-700 pb-2 pt-4">Appearance</h3>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Theme</label>
          <select value={currentTheme.name} onChange={(e) => onThemeChange(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 text-white rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
            {Object.values(themes).map((theme: Theme) => <option key={theme.name} value={theme.name}>{theme.name}</option>)}
          </select>
        </div>

        <h3 className="font-semibold text-lg text-white border-b border-slate-700 pb-2 pt-4">Custom Wishes</h3>
        <div className="space-y-2">
            <textarea
                value={newWish}
                onChange={(e) => setNewWish(e.target.value)}
                placeholder="Add your own wish..."
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-md p-2 h-20 resize-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
            <button onClick={handleAddClick} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2 rounded-md transition-colors">
                Add Wish
            </button>
        </div>
        <div className="space-y-2 max-h-32 overflow-y-auto">
            {customWishes.map((wish, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-700 rounded-md p-2">
                    <p className="text-slate-300 text-sm truncate pr-2">{wish}</p>
                    <button onClick={() => onDeleteWish(index)} className="text-red-400 hover:text-red-300 font-bold text-lg">&times;</button>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
