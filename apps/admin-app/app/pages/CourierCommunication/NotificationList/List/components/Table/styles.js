import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: {
    backgroundColor: '#fff',
    margin: '1rem 0',
    '& img': {
      border: '1px solid #ddd',
      borderRadius: '50%',
      overflow: 'hidden',
    },
  },
});
