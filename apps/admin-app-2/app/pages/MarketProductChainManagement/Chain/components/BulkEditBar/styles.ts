import { createUseStyles } from 'react-jss';

export default createUseStyles({
  '@keyframes slideUpFade': {
    from: {
      transform: 'translate3d(0, 20%, 0)',
      opacity: 0,
    },
    to: {
      transform: 'translate3d(0, 0, 0)',
      opacity: 1,
    },
  },
  '@keyframes slideDownFade': {
    from: {
      transform: 'translate3d(0, 0, 0)',
      opacity: 1,
    },
    to: {
      transform: 'translate3d(0, 20%, 0)',
      opacity: 0,
    },
  },
  wrapper: {
    position: 'fixed',
    bottom: 24,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    pointerEvents: 'none',
    zIndex: 1000,
  },
  container: {
    backgroundColor: '#6750A4',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.12)',
    padding: '8px 16px',
    borderRadius: '12px',
    minWidth: '320px',
    maxWidth: '90%',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    willChange: 'transform, opacity',
    pointerEvents: 'auto',
    opacity: 0,
    transform: 'translate3d(0, 20%, 0)',
    transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
  },
  visible: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  count: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#FFFFFF',
  },
  text: {
    fontSize: '13px',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '& .ant-btn': {
      height: '32px',
      padding: '0 12px',
      fontSize: '13px',
      fontWeight: 500,
      borderRadius: '6px',
      border: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      minWidth: '72px',

      '&-default': {
        color: '#FFFFFF',
        background: 'rgba(255, 255, 255, 0.12)',
        '&:hover': { background: 'rgba(255, 255, 255, 0.16)' },
      },
      '&-primary': {
        background: '#FFFFFF',
        color: '#6750A4',
        gap: '4px',
        '&:hover': { background: '#F4EFF4' },
        '& .anticon': { fontSize: '16px' },
      },
    },
  },
});
