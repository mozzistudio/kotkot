'use client';

import { useId } from 'react';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  leftLabel?: string;
  rightLabel?: string;
  disabled?: boolean;
  className?: string;
}

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = false,
  leftLabel,
  rightLabel,
  disabled = false,
  className = '',
}: SliderProps) {
  const id = useId();
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <label htmlFor={id} className="text-sm font-medium text-[#111827]">
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-sm font-semibold text-[#059669]">
              {value}
            </span>
          )}
        </div>
      )}

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#e5e7eb] outline-none transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          background: `linear-gradient(to right, #10b981 0%, #10b981 ${percentage}%, #e5e7eb ${percentage}%)`,
        }}
      />

      {(leftLabel || rightLabel) && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#9ca3af]">{leftLabel}</span>
          <span className="text-xs text-[#9ca3af]">{rightLabel}</span>
        </div>
      )}
    </div>
  );
}
