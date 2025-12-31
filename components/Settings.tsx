
import React from 'react';
import { themes, Theme } from '../themes';

interface SettingsProps {
  selectedSound: string;
  onSoundChange: (sound: string) => void;
  isSoundEnabled: boolean;
  onSoundToggle: (enabled: boolean) => void;
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  onClose: () => void;
}

const ToggleSwitch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
  <button
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`${
      checked ? 'bg-cyan-500' : 'bg-slate-600'
    } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500`}
  >
    <span
      className={`${
        checked ? 'translate-x-6' : 'translate-x-1'
      } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
    />
  </button>
);

const Settings: React.FC<SettingsProps> = ({ selectedSound, onSoundChange, isSoundEnabled, onSoundToggle, currentTheme, onThemeChange }) => {
  return (
    <div className="absolute top-14 right-4 bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-4 w-64 z-20 space-y-4">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-white">Sound</h3>
        <div className="flex items-center justify-between">
          <label htmlFor="sound-toggle" className="text-slate-300">
            Enable Sound
          </label>
          <ToggleSwitch
            checked={isSoundEnabled}
            onChange={onSoundToggle}
          />
        </div>

        <div>
          <label htmlFor="sound-select" className="block text-sm font-medium text-slate-300 mb-2">
            Alert Sound
          </label>
          <select
            id="sound-select"
            value={selectedSound}
            onChange={(e) => onSoundChange(e.target.value)}
            disabled={!isSoundEnabled}
            className="w-full bg-slate-700 border border-slate-600 text-white rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50"
          >
            <option value="beep">Beep</option>
            <option value="bell">Bell</option>
            <option value="chime">Chime</option>
          </select>
        </div>
      </div>
      
      <hr className="border-slate-700" />

      <div className="space-y-3">
        <h3 className="font-semibold text-lg text-white">Theme</h3>
        <div className="flex justify-around">
          {Object.values(themes).map(theme => (
             <button
                key={theme.name}
                onClick={() => onThemeChange(theme)}
                className={`w-12 h-8 rounded-full border-2 ${currentTheme.name === theme.name ? 'border-white' : 'border-transparent'} transition-all ${theme.background}`}
                aria-label={`Select ${theme.name} theme`}
             />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
