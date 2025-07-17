import { createUseStyles } from 'react-jss';

export default createUseStyles(({
  panelDocsContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '1rem',
  },
  panelDocList: {
    display: 'flex',
    flexDirection: 'column',
    padding: '4px 6px',
    maxHeight: '250px',
    overflow: 'auto',
    '& > *': { margin: '4px 0', display: 'flex', alignItems: 'center' },
  },
}));
