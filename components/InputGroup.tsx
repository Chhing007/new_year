
import React from 'react';

interface InputGroupProps {
  values: {
    hours: string;
    minutes: string;
    seconds: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const TimeInput: React.FC<{
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  max: number;
}> = ({ name, label, value, onChange, disabled, max }) => (
  <div className="flex flex-col items-center">
    <label htmlFor={name} className="mb-2 text-sm font-medium text-slate-400">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type="number"
      min="0"
      max={max}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder="00"
      className="w-20 md:w-24 h-16 text-center text-3xl font-mono bg-slate-800 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
    />
  </div>
);

const InputGroup: React.FC<InputGroupProps> = ({ values, onChange, disabled }) => {
  return (
    <div className="flex justify-center space-x-4">
      <TimeInput 
        name="hours"
        label="Hours"
        value={values.hours}
        onChange={onChange}
        disabled={disabled}
        max={99}
      />
      <TimeInput 
        name="minutes"
        label="Minutes"
        value={values.minutes}
        onChange={onChange}
        disabled={disabled}
        max={59}
      />
      <TimeInput 
        name="seconds"
        label="Seconds"
        value={values.seconds}
        onChange={onChange}
        disabled={disabled}
        max={59}
      />
    </div>
  );
};

export default InputGroup;
