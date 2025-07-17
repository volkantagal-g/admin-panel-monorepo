import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    filterWrapper: { width: '100%' },
    status_1: { color: 'orange' },
    status_2: { color: 'green' },
    status_3: { color: 'red' },
    spinnerWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
  };
});
