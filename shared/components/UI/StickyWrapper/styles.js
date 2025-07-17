import { createUseStyles } from 'react-jss';

export default createUseStyles({
  stickyContainer: {
    position: 'fixed',
    backgroundColor: '#fff',
    padding: '24px',
    bottom: 24,
    right: 24,
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1001,
  },
  unStickyPosition: { position: 'relative' },
});
