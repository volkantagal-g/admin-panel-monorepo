import { createUseStyles } from 'react-jss';

export default createUseStyles(({
  pagesContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '1rem',
  },
  pageListTitle: { margin: '0.5rem 0' },
  pageList: {
    display: 'flex',
    flexDirection: 'column',
    padding: '4px 6px',
    maxHeight: '250px',
    overflow: 'auto',
    '& > *': { margin: '4px 0', display: 'flex', alignItems: 'center' },
  },
  divider: { margin: '0.5rem 0' },
}));
