import { createUseStyles } from 'react-jss';

export default createUseStyles({
  columChild: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    rowGap: '16px',
    width: '100%',
  },
  title: { lineHeight: '32px' },
});
