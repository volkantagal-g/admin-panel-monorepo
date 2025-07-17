import { createUseStyles } from 'react-jss';

export default createUseStyles({
  wrapper: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    '& img': {
      maxWidth: '100%',
      maxHeight: '100%',
    },
  },
});
