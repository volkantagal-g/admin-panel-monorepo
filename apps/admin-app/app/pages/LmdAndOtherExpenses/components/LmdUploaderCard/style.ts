import { createUseStyles } from 'react-jss';

export default createUseStyles({
  card: {
    background: '#FFFFFF',
    boxShadow: '0px 3px 12px -1px rgba(28, 52, 84, 0.13), 0px 2px 4px -1px rgba(28, 55, 90, 0.08)',
    borderRadius: '8px',
    padding: '22px',
  },
  block: { display: 'block' },
  errorContainer: {
    maxHeight: '200px',
    overflow: 'auto',
  },
});
