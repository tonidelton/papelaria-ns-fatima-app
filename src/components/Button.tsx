import React from 'react';
import { colors, borderRadius, shadows, spacing } from '../theme';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'cta' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  className = '',
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center font-semibold
    transition-all duration-200 active:scale-[0.97]
    disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
  `;

  const variants = {
    primary: `bg-[${colors.primary}] text-white hover:bg-[${colors.primaryDark}]`,
    secondary: `bg-[${colors.secondary}] text-white hover:bg-[${colors.secondaryDark}]`,
    cta: `bg-[${colors.cta}] text-white hover:bg-[${colors.ctaDark}]`,
    outline: `border-2 border-[${colors.primary}] text-[${colors.primary}] bg-transparent hover:bg-[${colors.primaryLight}]`,
    ghost: `bg-transparent text-[${colors.primary}] hover:bg-[${colors.primaryLight}]`,
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'bg-[#25B4D2] text-white hover:bg-[#1E9AB3]',
    secondary: 'bg-[#C6A46A] text-white hover:bg-[#A8894F]',
    cta: 'bg-[#FF8C42] text-white hover:bg-[#E67A30]',
    outline: 'border-2 border-[#25B4D2] text-[#25B4D2] bg-transparent hover:bg-[#E8F7FB]',
    ghost: 'bg-transparent text-[#25B4D2] hover:bg-[#E8F7FB]',
  };

  return (
    <button
      onClick={onPress}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variantClasses[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        rounded-[10px]
        shadow-sm
        ${className}
      `}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        children
      )}
    </button>
  );
}
