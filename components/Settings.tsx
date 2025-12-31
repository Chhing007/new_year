
import React from 'react';

interface SettingsProps {
  selectedSound: string;
  onSoundChange: (sound: string) => void;
  isSoundEnabled: boolean;
  onSoundToggle: (enabled: boolean) => void;
  isTickingSoundEnabled: boolean;
  onTickingSoundToggle: (enabled: boolean) => void;
  onClose: () => void;
}

const ToggleSwitch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void; disabled?: boolean }> = ({ checked, onChange, disabled = false }) => (
  <button
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    disabled={disabled}
    className={`${
      checked ? 'bg-cyan-500' : 'bg-slate-600'
    } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed`}
  >
    <span
      className={`${
        checked ? 'translate-x-6' : 'translate-x-1'
      } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
    />
  </button>
);

const Settings: React.FC<SettingsProps> = ({ 
  selectedSound, 
  onSoundChange, 
  isSoundEnabled, 
  onSoundToggle, 
  isTickingSoundEnabled,
  onTickingSoundToggle,
}) => {
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

        <div className="flex items-center justify-between">
          <label htmlFor="ticking-sound-toggle" className={`text-slate-300 transition-opacity ${!isSoundEnabled ? 'opacity-50' : ''}`}>
            Ticking Sound
          </label>
          <ToggleSwitch
            checked={isTickingSoundEnabled}
            onChange={onTickingSoundToggle}
            disabled={!isSoundEnabled}
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
    </div>
  );
};

export default Settings;
