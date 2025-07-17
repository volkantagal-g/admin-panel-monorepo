import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    title: {
      display: 'block',
      marginBottom: '15px',
    },
    buttonStyle: {
      display: 'block',
      width: '100%',
      border: 'none',
    },
    menuItem: {
      padding: 0,
      margin: 0,
      fontSize: '11px',
    },
    menuWrapper: { float: 'right' },
  };
});
