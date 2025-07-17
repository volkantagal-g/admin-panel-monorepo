export const colors = {
  backgroundLight: '#F5F5F5',
  backgroundWhite: '#FFFFFF',
  backgroundImage: '#F3F0FE',
  textDark: '#262626',
  textLight: '#8C8C8C',
  borderGray: '#E8E8E8',
  boxShadowLight: 'rgba(0, 0, 0, 0.1)',
  boxShadowDark: 'rgba(0, 0, 0, 0.15)',
  purple: '#5D3EBC',
  secondaryPurple: '#7849F7',
  gray: '#697488',
  lightGray: '#D4D4D4',
  red: '#D13333',
  tableBorder: '#F0F0F0',
  tableHeaderBackground: '#FAFAFA',
  tableHeaderBackgroundFixed: '#FAFAFA',
  dangerRed: '#FF4D4F',
  successGreen: '#52C41A',
  successBackground: 'rgba(82, 196, 26, 0.1)',
  errorRed: '#FF4D4F',
  errorBackground: 'rgba(255, 77, 79, 0.1)',
  lightPurple: '#F3F0FE',
  iconGray: '#666666',
  textGray: '#444444',
  lightBackgroundGray: '#F8F8F8',
  filterBackground: '#F5F5F7',
  inputHover: '#86868b',
  inputFocus: '#7a6b99',
  lightBlue: '#DFF9FB',
  waterBlue: '#3A8DF4',
  darkerText: '#353840',
  tagBackground: '#F1F1F5',
  tagBorder: '#E5E5EA',
  errorFallbackBackground: '#FFEBEE',
  errorFallbackText: '#C62828',
  badgeGray: '#F0F1F3',
  badgePurple: '#8063C9',
  inputGray: '#F6F6F6',
  inputBlack: '#191919',
  checkboxBorder: '#D9D9D9',
  borderGray2: '#E5E5E5',
  lightRed: '#FFEFEF',
  lightGreen: '#EBF6ED',
  darkGray: '#E2E2E2',
  disabledGray: '#A1A1A1',
};

export const transitions = {
  default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  fast: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
};

export const animations = {
  ripple: '@keyframes ripple { to { transform: scale(4); opacity: 0; } }',
  fadeIn: '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }',
  slideIn: '@keyframes slideIn { from { transform: translateY(-10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }',
  glow: '@keyframes glow { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }',
};

export const borderRadius = {
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '20px',
};

export const fontSizes = {
  xs: '12px',
  sm: '14px',
  base: '16px',
  lg: '18px',
  xl: '22px',
  xxl: '32px',
};

export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  sd: '12px',
  md: '16px',
  md2: '20px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

export const zIndex = {
  dropdown: 1000,
  modal: 1050,
  tooltip: 1100,
};
