import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    drawerWrapper: {
      height: 'calc(100vh - 123px)',
      marginTop: '72px',
      borderRadius: '2px',
    },
    jsonView: {
      width: '100%',
      height: 'auto',
      minHeight: '250px',
    },
  };
});
