import { createUseStyles } from 'react-jss';

export default createUseStyles({
  valueBoxContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  line: {
    width: '100%',
    height: '1px',
    margin: '8px 0',
    background: '#F6F6F6',
  },
  comparisonContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  comparisonSwitchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 12px',
    alignItems: 'center',
    border: '1px solid #D4D4D4',
    borderRadius: '8px',
  },
  componentBox: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '8px',
    '& > div:first-child': { width: '100%' },
  },
  deleteButton: {
    display: 'flex',
    '@media (max-width: 1200px)': { alignItems: 'center', marginTop: '8px' },
  },
});
