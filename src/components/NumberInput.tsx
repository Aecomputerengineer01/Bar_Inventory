import React from 'react';
import type { ChangeEvent, FocusEvent } from 'react';

interface NumberInputProps {
  value: number | '';
  onChange: (val: number | '') => void;
  placeholder?: string;
  className?: string;
  min?: number;
  disabled?: boolean;
  ariaLabel?: string;
  showSteppers?: boolean;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  placeholder = '0',
  className = '',
  min = 0,
  disabled = false,
  ariaLabel,
  showSteppers = false,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === '') {
      onChange('');
      return;
    }
    const parsed = parseInt(raw, 10);
    if (!isNaN(parsed)) {
      onChange(Math.max(min, parsed));
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleIncrement = () => {
    const current = value === '' ? 0 : Number(value);
    onChange(current + 1);
  };

  const handleDecrement = () => {
    const current = value === '' ? 0 : Number(value);
    if (current > min) {
      onChange(current - 1);
    } else {
      onChange(min);
    }
  };

  return (
    <div className="relative inline-flex items-center w-full">
      {showSteppers && !disabled && (
        <button
          type="button"
          tabIndex={-1}
          onClick={handleDecrement}
          className="w-6 h-8 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-l flex items-center justify-center text-sm font-semibold transition-colors border-r border-slate-200 select-none"
        >
          -
        </button>
      )}
      <input
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        min={min}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={ariaLabel}
        className={`w-full text-center py-1.5 px-2 bg-white text-slate-800 border border-slate-200 rounded-md shadow-sm font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all placeholder:text-slate-300 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed ${
          showSteppers ? 'rounded-none border-x-0' : ''
        } ${className}`}
      />
      {showSteppers && !disabled && (
        <button
          type="button"
          tabIndex={-1}
          onClick={handleIncrement}
          className="w-6 h-8 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-r flex items-center justify-center text-sm font-semibold transition-colors border-l border-slate-200 select-none"
        >
          +
        </button>
      )}
    </div>
  );
};
