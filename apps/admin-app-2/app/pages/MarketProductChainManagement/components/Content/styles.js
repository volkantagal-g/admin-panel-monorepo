import { createUseStyles } from 'react-jss';

import { colors, transitions } from '@app/pages/MarketProductChainManagement/styleVariables';

export default createUseStyles({
  content: {
    margin: '0',
    backgroundColor: colors.backgroundWhite,
    borderRadius: '8px',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    boxSizing: 'border-box',
    boxShadow: `0 1px 3px ${colors.boxShadowLight}`,
    border: `1px solid ${colors.borderGray}`,
    transition: transitions.default,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      border: '2px solid transparent',
      borderRadius: '8px',
      pointerEvents: 'none',
      transition: transitions.default,
      zIndex: 1,
    },
    '&.loading::before': {
      borderColor: colors.purple,
      boxShadow: `0 0 0 1px ${colors.purple}40`,
      animation: '$borderPulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
    },
  },
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '3px',
    background: colors.purple,
    opacity: 0,
    transition: transitions.default,
    '&.visible': { opacity: 1, animation: '$loadingAnimation 1.5s infinite ease-in-out' },
  },
  '@keyframes loadingAnimation': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  },
  '@keyframes borderPulse': {
    '0%': { borderColor: `${colors.purple}40`, boxShadow: '0 0 0 0 rgba(89, 54, 242, 0.4)' },
    '50%': { borderColor: colors.purple, boxShadow: '0 0 0 4px rgba(89, 54, 242, 0.1)' },
    '100%': { borderColor: `${colors.purple}40`, boxShadow: '0 0 0 0 rgba(89, 54, 242, 0.4)' },
  },
});
