import { createUseStyles } from 'react-jss';

import { colors, transitions } from '@app/pages/MarketProductChainManagement/styleVariables';

export default createUseStyles({
  paginationContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px 24px',
    position: 'relative',
    '&.loading::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.1)',
      zIndex: 1,
    },
    '& .ant-form': {
      padding: '24px',
      background: colors.backgroundWhite,
      border: `1px solid ${colors.borderGray}`,
      borderRadius: '8px',
      boxShadow: `0 1px 3px ${colors.boxShadowLight}`,
      '& .ant-row': {
        display: 'flex',
        gap: '16px',
        width: '100%',
        margin: '0',
        flexWrap: 'nowrap',
        alignItems: 'center',
      },
      '& .ant-col': { padding: '0' },
    },
    '& .ant-table-wrapper': {
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: `0 1px 3px ${colors.boxShadowLight}`,
      border: `1px solid ${colors.borderGray}`,
      transition: transitions.default,
    },
    '& .ant-table': {
      borderRadius: '8px',
      overflow: 'hidden',
    },
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    padding: '24px',
    margin: '24px',
    position: 'relative',
    overflow: 'hidden',
    transition: transitions.default,
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      border: '2px solid transparent',
      borderRadius: '8px',
      animation: '$borderGlow 2s ease-in-out infinite',
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      right: '-50%',
      bottom: '-50%',
      background: 'radial-gradient(circle, rgba(255,77,79,0.1) 0%, rgba(255,77,79,0) 70%)',
      animation: '$backgroundPulse 3s ease-in-out infinite',
    },
    '@media (max-width: 768px)': {
      padding: '16px',
      margin: '16px',
    },
  },
  errorResult: {
    position: 'relative',
    zIndex: 1,
    transition: transitions.default,
    '& .ant-result-icon': {
      animation: '$slideInDown 0.5s ease-out forwards',
      opacity: 0,
      '& .anticon': {
        animation: '$rotate 4s linear infinite',
        animationDelay: '0.5s',
      },
    },
    '& .ant-result-title': {
      animation: '$slideInDown 0.5s ease-out forwards, $pulse 2s ease-in-out infinite',
      animationDelay: '0.2s',
      opacity: 0,
    },
    '& .ant-result-subtitle': {
      animation: '$slideInDown 0.5s ease-out forwards, $smoothFloat 4s ease-in-out infinite',
      animationDelay: '0.4s',
      opacity: 0,
    },
  },
  '@keyframes slideInDown': {
    '0%': {
      transform: 'translateY(-20px)',
      opacity: 0,
    },
    '100%': {
      transform: 'translateY(0)',
      opacity: 1,
    },
  },
  '@keyframes pulse': {
    '0%, 100%': {
      opacity: 1,
      transform: 'scale(1)',
    },
    '50%': {
      opacity: 0.8,
      transform: 'scale(0.98)',
    },
  },
  '@keyframes smoothFloat': {
    '0%': { transform: 'translateY(0)' },
    '20%': { transform: 'translateY(-3px)' },
    '40%': { transform: 'translateY(-5px)' },
    '60%': { transform: 'translateY(-3px)' },
    '80%': { transform: 'translateY(-1px)' },
    '100%': { transform: 'translateY(0)' },
  },
  '@keyframes rotate': {
    '0%': { transform: 'rotate(0deg) scale(1)' },
    '25%': { transform: 'rotate(-10deg) scale(1.1)' },
    '75%': { transform: 'rotate(10deg) scale(0.9)' },
    '100%': { transform: 'rotate(0deg) scale(1)' },
  },
  '@keyframes borderGlow': {
    '0%, 100%': {
      borderColor: 'transparent',
      boxShadow: '0 0 10px rgba(255, 77, 79, 0)',
    },
    '50%': {
      borderColor: colors.dangerRed,
      boxShadow: '0 0 20px rgba(255, 77, 79, 0.5)',
    },
  },
  '@keyframes backgroundPulse': {
    '0%, 100%': {
      transform: 'scale(1)',
      opacity: 0.5,
    },
    '50%': {
      transform: 'scale(1.2)',
      opacity: 0.3,
    },
  },
});
