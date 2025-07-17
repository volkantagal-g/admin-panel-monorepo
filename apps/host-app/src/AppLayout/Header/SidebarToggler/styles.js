import { createUseStyles } from 'react-jss';

export default createUseStyles({
  toggleWrapper: {
    paddingLeft: '0.5rem',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // center icon
    ' & > span[role="img"]': { margin: 'auto' },
  },
});
