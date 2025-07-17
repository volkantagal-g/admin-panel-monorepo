import { createUseStyles } from 'react-jss';

export default createUseStyles({
  container: {
    columnGap: 10,
    columnCount: 2,
    '& > *': {
      display: 'inline-block',
      width: '100%',
    },
    '@media (max-width: 768px)': { columnCount: 1 },
  },
});
