import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    select: { width: '100%', minWidth: '100px' },
    col: { marginBottom: '0.5rem' },
    dateWrapper: {
      width: '100%',
      justifyContent: 'center',
    },
  };
});
