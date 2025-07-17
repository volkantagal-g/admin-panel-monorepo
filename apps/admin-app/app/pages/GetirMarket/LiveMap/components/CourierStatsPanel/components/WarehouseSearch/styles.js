import { createUseStyles } from 'react-jss';

export default createUseStyles({
  searchWrapper: { margin: '8px' },
  searchInput: {
    borderRadius: '4px',
    boxShadow: '2px 2px 10px rgb(0 0 0 / 15%)',
    fontSize: '12px',
    '&:hover': { boxShadow: '2px 2px 10px rgb(0 0 0 / 8%) !important' },
  },
});
