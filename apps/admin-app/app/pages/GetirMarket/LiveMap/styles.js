import { createUseStyles } from 'react-jss';

export default createUseStyles(() => ({
  pageContainer: {
    margin: '-0.25rem',
    width: props => (props?.isDeviceMobile ? 'calc(100% + 0.5rem)' : 'calc(100% + 0.35rem)'),
    height: props => (props?.isDeviceMobile ? 'calc(100% + 0.5rem)' : 'calc(100% + 0.35rem)'),
    position: 'relative',
  },
  topRightContainer: {
    position: 'absolute',
    top: '0.35rem',
    right: 0,
    zIndex: 999,
    width: 300,
    maxWidth: 300,
    pointerEvents: 'none',
    '@media (max-width: 992px)': { minHeight: '260px' },
  },
}));
