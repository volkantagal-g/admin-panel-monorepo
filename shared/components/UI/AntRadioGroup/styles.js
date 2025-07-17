import { createUseStyles } from 'react-jss';

export default createUseStyles({
  fullWidth: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    '& > label': {
      width: '100%',
      textAlign: 'center',
    },
  },
});
