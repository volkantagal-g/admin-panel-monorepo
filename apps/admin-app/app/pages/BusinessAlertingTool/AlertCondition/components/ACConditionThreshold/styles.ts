import { createUseStyles } from 'react-jss';

export default createUseStyles({
  thresholdContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    overflowX: 'scroll',
  },
  thresholdRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 150px)',
    gap: '8px',
    alignItems: 'center',
  },
  infoIcon: { color: 'red' },
  thresholdActionButton: { marginBottom: '24px' },
});
