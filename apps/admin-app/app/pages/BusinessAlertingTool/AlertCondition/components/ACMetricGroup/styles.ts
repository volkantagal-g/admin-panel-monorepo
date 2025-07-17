import { createUseStyles } from 'react-jss';

export default createUseStyles({
  metricGroupContainer: {
    display: 'flex',
    gap: '16px',
  },
  iconContainer: {
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    backgroundColor: '#F0F1F3',
    borderRadius: '8px',
    width: '60px',
    height: '60px',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
    gap: '4px',
  },
});
