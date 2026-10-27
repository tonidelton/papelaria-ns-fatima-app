import React from 'react';
import { colors } from '../theme';

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number';
  error?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  type = 'text',
  error,
  disabled = false,
  icon,
  className = '',
}: InputProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[#333333] mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-3 
            ${icon ? 'pl-10' : ''}
            bg-white
            border ${error ? 'border-[#C62828]' : 'border-[#E0E0E0]'}
            rounded-[10px]
            text-[#333333] text-base
            placeholder:text-[#999999]
            focus:outline-none focus:ring-2 ${error ? 'focus:ring-[#C62828]/20 focus:border-[#C62828]' : 'focus:ring-[#25B4D2]/20 focus:border-[#25B4D2]'}
            disabled:bg-[#F8F9FA] disabled:text-[#999999]
            transition-colors duration-200
          `}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-[#C62828]">{error}</p>
      )}
    </div>
  );
}
