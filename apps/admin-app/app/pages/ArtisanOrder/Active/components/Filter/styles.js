import { createUseStyles } from 'react-jss';

export default createUseStyles({
  filterWrapper: { width: '100%' },
  filterSelect: { width: '100%' },
  filterToggle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 9px',
    border: '1px solid #d9d9d9',
    borderRadius: '2px',
  },
  divider: { margin: '18px 0' },
});
