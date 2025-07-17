import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    alertTitle: { color: '#a94442' },
    alertBg: {
      backgroundColor: '#f2dede',
      borderColor: '#ebccd1',
      borderRadius: '4px',
      padding: '15px',
      marginBottom: '20px',
    },
    title: {
      display: 'block',
      margin: '15px 0',
    },
    buttonStyle: {
      display: 'block',
      width: '100%',
      border: 'none',
      padding: '0 5px',
    },
  };
});
