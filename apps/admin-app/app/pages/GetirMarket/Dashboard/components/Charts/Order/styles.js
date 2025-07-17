import { createUseStyles } from 'react-jss';

export default createUseStyles(() => ({
  orderChart: { fontSize: '12px !important', backgroundColor: 'white', borderRadius: '2px' },
  header: {
    fontSize: '12px',
    padding: '1px 1px 1px 4px',
    display: 'flex',
    flexFlow: 'wrap',
    gap: '3px',
    '& > span': { marginRight: '1px' },
  },
}));
