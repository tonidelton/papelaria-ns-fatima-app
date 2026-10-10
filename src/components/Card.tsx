import React from 'react';
import { colors, shadows, borderRadius } from '../theme';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
  shadow?: 'sm' | 'md' | 'lg' | 'none';
}

export default function Card({ children, className = '', onPress, shadow = 'md' }: CardProps) {
  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    none: 'shadow-none',
  };

  const Component = onPress ? 'button' : 'div';

  return (
    <Component
      onClick={onPress}
      className={`
        bg-white rounded-[14px] p-4
        ${shadowClasses[shadow]}
        ${onPress ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}
