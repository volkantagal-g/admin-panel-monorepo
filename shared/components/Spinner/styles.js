import { createUseStyles } from 'react-jss';

export default createUseStyles({
  verticalCenter: {
    width: '100%',
    height: 'calc(100vh - 64px)',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
