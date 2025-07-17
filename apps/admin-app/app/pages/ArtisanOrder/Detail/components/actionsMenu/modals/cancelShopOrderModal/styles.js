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
      padding: '0 5px',
    },
    products: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    },
  };
});
