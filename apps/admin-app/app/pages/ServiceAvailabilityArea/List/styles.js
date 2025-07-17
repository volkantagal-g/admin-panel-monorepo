import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    pageContainer: {
      width: '100%',
      height: '100%',
    },
    innerContainer: {
      width: '100%',
      height: ' calc(100% - 42px)',
      display: 'flex',
    },
  };
});
