// Design System - Papelaria N. Sr.ª de Fátima
// Cores extraídas da logo da empresa

export const colors = {
  primary: '#25B4D2',      // Ciano - botões principais, header, links
  primaryDark: '#1E9AB3',
  primaryLight: '#E8F7FB',
  secondary: '#C6A46A',    // Dourado - badges, destaques, ícones
  secondaryDark: '#A8894F',
  secondaryLight: '#F5EDD8',
  cta: '#FF8C42',          // Laranja - botões "Comprar" e "Adicionar ao carrinho"
  ctaDark: '#E67A30',
  ctaLight: '#FFF0E5',
  background: '#F8F9FA',   // Fundo das telas
  surface: '#FFFFFF',
  text: '#333333',         // Texto principal
  textSecondary: '#666666',
  textLight: '#999999',
  success: '#2E7D32',
  successLight: '#E8F5E9',
  error: '#C62828',
  errorLight: '#FFEBEE',
  warning: '#F57F17',
  warningLight: '#FFF8E1',
  border: '#E0E0E0',
  borderLight: '#F0F0F0',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
};

export const borderRadius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  '2xl': 28,
  full: 9999,
};

export const shadows = {
  sm: '0 1px 3px rgba(0, 0, 0, 0.08)',
  md: '0 4px 12px rgba(0, 0, 0, 0.1)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
  xl: '0 12px 36px rgba(0, 0, 0, 0.15)',
};

export const typography = {
  fontFamily: {
    regular: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    medium: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    bold: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  fontSize: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    '2xl': 30,
    '3xl': 36,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const breakpoints = {
  mobile: 375,
  tablet: 768,
  desktop: 1024,
};

const theme = {
  colors,
  spacing,
  borderRadius,
  shadows,
  typography,
  breakpoints,
};

export default theme;
