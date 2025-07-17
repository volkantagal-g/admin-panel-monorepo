import { createUseStyles } from 'react-jss';

export default createUseStyles({
  dateSelect: {
    minWidth: '100%',
    marginBottom: 8,
    '@media (min-width: 768px)': {
      marginBottom: 0,
      marginRight: 8,
      minWidth: '10rem',
    },
  },
});
